import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser, SignInButton } from "@clerk/clerk-react";
import API from "../api/axios";
import StatusBadge from "../components/StatusBadge";

const CATEGORY_COLORS = {
  Design: "bg-purple-100 text-purple-800",
  Engineering: "bg-blue-100 text-blue-800",
  Marketing: "bg-emerald-100 text-emerald-800",
  Finance: "bg-amber-100 text-amber-800",
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

    if (!email.trim()) {
      return setError("Please enter your email");
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      return setError("Please enter a valid email");
    }

    setLoading(true);
    setError("");
    setSearched(false);

    try {
      const res = await API.get("/bookings", {
        params: { email },
      });

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
    } catch {
      alert("Failed to update status.");
    }
  };

  const cancelBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?"))
      return;

    try {
      await API.patch(`/bookings/${bookingId}/status`, {
        status: "cancelled",
      });

      setBookings((prev) =>
        prev.map((b) =>
          b._id === bookingId ? { ...b, status: "cancelled" } : b,
        ),
      );
    } catch {
      alert("Failed to cancel booking.");
    }
  };

  const activeBookings = bookings.filter((b) =>
    ["pending", "confirmed"].includes(b.status),
  );

  const completedBookings = bookings.filter((b) => b.status === "completed");

  const cancelledBookings = bookings.filter((b) => b.status === "cancelled");

  return (
    <div className="mx-auto max-w-3xl">
      <button
        onClick={() => navigate("/")}
        className="mb-6 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:shadow-md"
      >
        ← Back to Experts
      </button>

      {/* Header */}

      <div className="mb-8 overflow-hidden rounded-xl border border-indigo-200 bg-gradient-to-br from-indigo-700 via-indigo-600 to-violet-500 shadow-lg">
        <div className="px-8 py-8 text-white">
          <h2 className="mb-2 text-3xl font-extrabold tracking-tight">
            My Bookings
          </h2>

          <p className="mb-6 text-sm text-white/85">
            View, manage and cancel your upcoming expert sessions.
          </p>

          <form onSubmit={fetchBookings} className="flex flex-wrap gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="min-w-0 flex-1 rounded-xl border border-white/25 bg-white/15 px-4 py-3 text-white placeholder:text-white/70 backdrop-blur-sm outline-none transition focus:border-white/40 focus:ring-2 focus:ring-white/20"
            />

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-white px-6 py-3 font-bold text-indigo-700 transition hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </form>

          {error && <p className="mt-3 text-sm text-red-200">{error}</p>}

          {showSignIn && (
            <div className="mt-5 rounded-lg bg-white/15 p-4 backdrop-blur-sm">
              <p className="mb-3 text-center text-sm">
                Please sign in to view your bookings.
              </p>

              <SignInButton mode="modal">
                <button className="mx-auto block rounded-xl bg-white px-5 py-2.5 font-semibold text-indigo-700 transition hover:shadow-md">
                  Sign In
                </button>
              </SignInButton>
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      {searched && (
        <>
          {bookings.length === 0 ? (
            <div className="rounded-xl border border-slate-200 bg-white p-16 text-center shadow-lg">
              <div className="mb-4 text-6xl">📭</div>

              <h3 className="mb-2 text-xl font-bold text-slate-800">
                No Bookings Found
              </h3>

              <p className="mx-auto mb-6 max-w-sm text-slate-500">
                We couldn't find any bookings associated with this email
                address.
              </p>

              <button
                onClick={() => navigate("/")}
                className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-500 px-6 py-3 font-semibold text-white shadow-lg transition hover:-translate-y-px hover:shadow-lg"
              >
                Book Your First Session
              </button>
            </div>
          ) : (
            <>
              {/* Active Bookings */}

              {activeBookings.length > 0 && (
                <div className="mb-8">
                  <h3 className="mb-4 text-lg font-bold text-slate-800">
                    Active Bookings
                    <span className="ml-2 rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-700">
                      {activeBookings.length}
                    </span>
                  </h3>

                  <div className="space-y-5">
                    {activeBookings.map((booking) => (
                      <div
                        key={booking._id}
                        className="rounded-xl border border-slate-200 bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-lg"
                      >
                        <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
                          <div>
                            <h4 className="mb-2 text-xl font-bold text-slate-900">
                              {booking.expertId?.name || "Expert"}
                            </h4>

                            <span
                              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                CATEGORY_COLORS[booking.expertId?.category] ||
                                "bg-slate-100 text-slate-700"
                              }`}
                            >
                              {booking.expertId?.category || "N/A"}
                            </span>
                          </div>

                          <StatusBadge status={booking.status} />
                        </div>

                        <div className="mb-5 flex flex-wrap gap-6 text-sm text-slate-600">
                          <span>📅 {booking.date}</span>
                          <span>⏰ {booking.timeSlot}</span>
                        </div>

                        {booking.notes && (
                          <div className="mb-5 rounded-xl border border-indigo-100 bg-indigo-50 p-4">
                            <p className="text-sm leading-6 text-slate-700">
                              📝 {booking.notes}
                            </p>
                          </div>
                        )}

                        {["pending", "confirmed"].includes(booking.status) && (
                          <button
                            onClick={() => cancelBooking(booking._id)}
                            className="rounded-xl border border-red-200 bg-red-50 px-5 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100"
                          >
                            Cancel Booking
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {completedBookings.length > 0 && (
                <div className="mb-8">
                  <h3 className="mb-4 text-lg font-bold text-green-700">
                    Completed Sessions
                    <span className="ml-2 rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                      {completedBookings.length}
                    </span>
                  </h3>

                  <div className="space-y-4">
                    {completedBookings.map((booking) => (
                      <div
                        key={booking._id}
                        className="rounded-xl border border-green-200 bg-green-50 p-5"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-4">
                          <div>
                            <h4 className="mb-2 font-semibold text-slate-800">
                              {booking.expertId?.name || "Expert"}
                            </h4>

                            <div className="flex gap-4 text-sm text-slate-600">
                              <span>📅 {booking.date}</span>
                              <span>⏰ {booking.timeSlot}</span>
                            </div>
                          </div>

                          <StatusBadge status={booking.status} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Cancelled Bookings */}

              {cancelledBookings.length > 0 && (
                <div>
                  <h3 className="mb-4 text-lg font-bold text-slate-400">
                    Cancelled
                    <span className="ml-2 rounded-full bg-slate-200 px-3 py-1 text-sm font-semibold text-slate-600">
                      {cancelledBookings.length}
                    </span>
                  </h3>

                  <div className="space-y-4">
                    {cancelledBookings.map((booking) => (
                      <div
                        key={booking._id}
                        className="rounded-xl border border-slate-200 bg-slate-50 p-5 opacity-80"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-4">
                          <div>
                            <h4 className="mb-2 font-semibold text-slate-600">
                              {booking.expertId?.name || "Expert"}
                            </h4>

                            <div className="flex gap-4 text-sm text-slate-500">
                              <span>📅 {booking.date}</span>
                              <span>⏰ {booking.timeSlot}</span>
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
