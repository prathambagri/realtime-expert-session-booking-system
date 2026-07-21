import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser, SignInButton } from "@clerk/clerk-react";
import API from "../api/axios";
import StatusBadge from "../components/StatusBadge";

const CATEGORY_COLORS = {
  Design: "bg-purple-100 text-purple-800",
  Engineering: "bg-blue-100 text-blue-800",
  Marketing: "bg-green-100 text-green-800",
  Finance: "bg-yellow-100 text-yellow-800",
};

const MyBookings = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useUser();
  const [email, setEmail] = useState("");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  const fetchBookings = async (e) => {
    e.preventDefault();
    if (!isSignedIn) {
      setShowSignIn(true);
      return;
    }
    if (!email.trim()) return setError("Please enter your email");
    if (!/\S+@\S+\.\S+/.test(email))
      return setError("Please enter a valid email");
    setLoading(true);
    setError("");
    setSearched(false);
    try {
      const res = await API.get("/bookings", { params: { email } });
      setBookings(res.data);
      setSearched(true);
    } catch (err) {
      setError("Failed to fetch bookings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (bookingId, status) => {
    try {
      await API.patch(`/bookings/${bookingId}/status`, { status });
      setBookings((prev) =>
        prev.map((b) => (b._id === bookingId ? { ...b, status } : b)),
      );
    } catch (err) {
      alert("Failed to update status. Please try again.");
    }
  };

  const cancelBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?"))
      return;
    try {
      await API.patch(`/bookings/${bookingId}/status`, { status: "cancelled" });
      setBookings((prev) =>
        prev.map((b) =>
          b._id === bookingId ? { ...b, status: "cancelled" } : b,
        ),
      );
    } catch (err) {
      alert("Failed to cancel booking. Please try again.");
    }
  };

  const activeBookings = bookings.filter((b) => b.status !== "cancelled");
  const cancelledBookings = bookings.filter((b) => b.status === "cancelled");

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={() => navigate("/")}
        className="text-indigo-600 font-medium text-sm mb-5 flex items-center gap-1 hover:text-indigo-800"
      >
        ← Back to Experts
      </button>

      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-8 text-white mb-6">
        <h2 className="text-2xl font-extrabold mb-2">My Bookings</h2>
        <p className="text-white/80 text-sm mb-6">
          Enter your email to view all your sessions
        </p>
        <form onSubmit={fetchBookings} className="flex gap-2 flex-wrap">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="flex-1 min-w-0 px-4 py-3 rounded-xl text-gray-800 text-sm outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-white text-indigo-600 font-bold rounded-xl cursor-pointer text-sm disabled:opacity-60"
          >
            {loading ? "..." : "Search"}
          </button>
        </form>
        {error && <p className="text-red-300 text-sm mt-2">{error}</p>}
        {showSignIn && (
          <div className="mt-3 p-3 bg-white/20 rounded-xl text-center">
            <p className="text-white text-sm mb-2">
              Please sign in to view your bookings
            </p>
            <SignInButton mode="modal">
              <button className="px-4 py-2 bg-white text-indigo-600 rounded-lg font-bold text-sm cursor-pointer border-none">
                Sign In
              </button>
            </SignInButton>
          </div>
        )}
      </div>

      {/* Results */}
      {searched && (
        <>
          {bookings.length === 0 ? (
            <div className="bg-white rounded-2xl p-16 text-center border border-gray-100">
              <div className="text-5xl mb-3">📭</div>
              <p className="text-gray-500 text-base">
                No bookings found for this email.
              </p>
              <button
                onClick={() => navigate("/")}
                className="mt-4 px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold text-sm cursor-pointer"
              >
                Book a Session
              </button>
            </div>
          ) : (
            <>
              {/* Active Bookings */}
              {activeBookings.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-bold text-gray-700 mb-3">
                    Active Bookings ({activeBookings.length})
                  </h3>
                  <div className="flex flex-col gap-3">
                    {activeBookings.map((booking) => (
                      <div
                        key={booking._id}
                        className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="text-base font-bold text-gray-900 mb-1">
                              {booking.expertId?.name || "Expert"}
                            </h4>
                            <span
                              className={`text-xs font-semibold px-3 py-0.5 rounded-full ${CATEGORY_COLORS[booking.expertId?.category] || "bg-gray-100 text-gray-700"}`}
                            >
                              {booking.expertId?.category || "N/A"}
                            </span>
                          </div>
                          <StatusBadge status={booking.status} />
                        </div>

                        <div className="flex gap-4 mb-3">
                          <span className="text-sm text-gray-500">
                            📅 {booking.date}
                          </span>
                          <span className="text-sm text-gray-500">
                            ⏰ {booking.timeSlot}
                          </span>
                        </div>

                        {booking.notes && (
                          <p className="text-sm text-gray-700 bg-gray-50 px-4 py-2.5 rounded-lg border-l-4 border-indigo-500 mb-3">
                            📝 {booking.notes}
                          </p>
                        )}

                        <div className="flex gap-2 flex-wrap">
                          {booking.status === "pending" && (
                            <button
                              onClick={() =>
                                updateStatus(booking._id, "confirmed")
                              }
                              className="px-4 py-1.5 bg-green-100 text-green-800 border border-green-300 rounded-lg text-xs font-medium cursor-pointer hover:bg-green-200"
                            >
                              ✓ Confirm
                            </button>
                          )}
                          {booking.status !== "completed" && (
                            <button
                              onClick={() =>
                                updateStatus(booking._id, "completed")
                              }
                              className="px-4 py-1.5 bg-blue-100 text-blue-800 border border-blue-300 rounded-lg text-xs font-medium cursor-pointer hover:bg-blue-200"
                            >
                              ✓ Complete
                            </button>
                          )}
                          <button
                            onClick={() => cancelBooking(booking._id)}
                            className="px-4 py-1.5 bg-red-100 text-red-800 border border-red-300 rounded-lg text-xs font-medium cursor-pointer hover:bg-red-200"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Cancelled Bookings */}
              {cancelledBookings.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-gray-400 mb-3">
                    Cancelled ({cancelledBookings.length})
                  </h3>
                  <div className="flex flex-col gap-3">
                    {cancelledBookings.map((booking) => (
                      <div
                        key={booking._id}
                        className="bg-gray-50 rounded-2xl p-5 border border-gray-100 opacity-70"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="text-sm font-semibold text-gray-500 mb-1">
                              {booking.expertId?.name || "Expert"}
                            </h4>
                            <div className="flex gap-3">
                              <span className="text-xs text-gray-400">
                                📅 {booking.date}
                              </span>
                              <span className="text-xs text-gray-400">
                                ⏰ {booking.timeSlot}
                              </span>
                            </div>
                          </div>
                          <StatusBadge status={booking.status} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default MyBookings;
