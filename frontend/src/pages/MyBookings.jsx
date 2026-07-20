import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import StatusBadge from "../components/StatusBadge";

const CATEGORY_COLORS = {
  Design: { bg: "#EDE9FE", color: "#5B21B6" },
  Engineering: { bg: "#DBEAFE", color: "#1E40AF" },
  Marketing: { bg: "#D1FAE5", color: "#065F46" },
  Finance: { bg: "#FEF3C7", color: "#92400E" },
};

const MyBookings = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const fetchBookings = async (e) => {
    e.preventDefault();
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
    <div style={{ maxWidth: "720px", margin: "0 auto" }}>
      <button
        onClick={() => navigate("/")}
        style={{
          background: "none",
          border: "none",
          color: "#4F46E5",
          cursor: "pointer",
          fontSize: "14px",
          marginBottom: "20px",
          padding: 0,
          fontWeight: "500",
        }}
      >
        ← Back to Experts
      </button>

      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
          borderRadius: "20px",
          padding: "32px",
          color: "#fff",
          marginBottom: "24px",
        }}
      >
        <h2 style={{ margin: "0 0 8px", fontSize: "26px", fontWeight: "800" }}>
          My Bookings
        </h2>
        <p style={{ margin: "0 0 24px", opacity: 0.85, fontSize: "14px" }}>
          Enter your email to view all your sessions
        </p>
        <form
          onSubmit={fetchBookings}
          style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            style={{
              flex: 1,
              minWidth: 0,
              padding: "12px 18px",
              borderRadius: "12px",
              border: "none",
              fontSize: "15px",
              outline: "none",
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "12px 24px",
              background: "#fff",
              color: "#4F46E5",
              border: "none",
              borderRadius: "12px",
              cursor: loading ? "not-allowed" : "pointer",
              fontWeight: "700",
              fontSize: "14px",
            }}
          >
            {loading ? "..." : "Search"}
          </button>
        </form>
        {error && (
          <p style={{ color: "#FCA5A5", fontSize: "13px", margin: "8px 0 0" }}>
            {error}
          </p>
        )}
      </div>

      {/* Results */}
      {searched && (
        <>
          {bookings.length === 0 ? (
            <div
              style={{
                background: "#fff",
                borderRadius: "20px",
                padding: "60px",
                textAlign: "center",
                border: "1px solid #F3F4F6",
              }}
            >
              <div style={{ fontSize: "48px", marginBottom: "12px" }}>📭</div>
              <p style={{ color: "#6B7280", fontSize: "16px" }}>
                No bookings found for this email.
              </p>
              <button
                onClick={() => navigate("/")}
                style={{
                  marginTop: "16px",
                  padding: "10px 24px",
                  background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                Book a Session
              </button>
            </div>
          ) : (
            <>
              {/* Active Bookings */}
              {activeBookings.length > 0 && (
                <div style={{ marginBottom: "24px" }}>
                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: "700",
                      color: "#374151",
                      marginBottom: "12px",
                    }}
                  >
                    Active Bookings ({activeBookings.length})
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                    }}
                  >
                    {activeBookings.map((booking) => {
                      const catColor = CATEGORY_COLORS[
                        booking.expertId?.category
                      ] || { bg: "#F3F4F6", color: "#374151" };
                      return (
                        <div
                          key={booking._id}
                          style={{
                            background: "#fff",
                            borderRadius: "16px",
                            padding: "20px 24px",
                            border: "1px solid #F3F4F6",
                            boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "flex-start",
                              marginBottom: "12px",
                            }}
                          >
                            <div>
                              <h4
                                style={{
                                  margin: "0 0 6px",
                                  fontSize: "16px",
                                  fontWeight: "700",
                                  color: "#111827",
                                }}
                              >
                                {booking.expertId?.name || "Expert"}
                              </h4>
                              <span
                                style={{
                                  background: catColor.bg,
                                  color: catColor.color,
                                  padding: "2px 10px",
                                  borderRadius: "999px",
                                  fontSize: "12px",
                                  fontWeight: "600",
                                }}
                              >
                                {booking.expertId?.category || "N/A"}
                              </span>
                            </div>
                            <StatusBadge status={booking.status} />
                          </div>

                          <div
                            style={{
                              display: "flex",
                              gap: "16px",
                              marginBottom: "12px",
                            }}
                          >
                            <span
                              style={{ fontSize: "14px", color: "#6B7280" }}
                            >
                              📅 {booking.date}
                            </span>
                            <span
                              style={{ fontSize: "14px", color: "#6B7280" }}
                            >
                              ⏰ {booking.timeSlot}
                            </span>
                          </div>

                          {booking.notes && (
                            <p
                              style={{
                                margin: "0 0 12px",
                                fontSize: "14px",
                                color: "#374151",
                                background: "#F9FAFB",
                                padding: "10px 14px",
                                borderRadius: "8px",
                                borderLeft: "3px solid #4F46E5",
                              }}
                            >
                              📝 {booking.notes}
                            </p>
                          )}

                          <div
                            style={{
                              display: "flex",
                              gap: "8px",
                              flexWrap: "wrap",
                            }}
                          >
                            {booking.status === "pending" && (
                              <button
                                onClick={() =>
                                  updateStatus(booking._id, "confirmed")
                                }
                                style={{
                                  padding: "7px 16px",
                                  background: "#D1FAE5",
                                  color: "#065F46",
                                  border: "1px solid #6EE7B7",
                                  borderRadius: "8px",
                                  cursor: "pointer",
                                  fontSize: "13px",
                                  fontWeight: "500",
                                }}
                              >
                                ✓ Confirm
                              </button>
                            )}
                            {booking.status !== "completed" && (
                              <button
                                onClick={() =>
                                  updateStatus(booking._id, "completed")
                                }
                                style={{
                                  padding: "7px 16px",
                                  background: "#DBEAFE",
                                  color: "#1E40AF",
                                  border: "1px solid #93C5FD",
                                  borderRadius: "8px",
                                  cursor: "pointer",
                                  fontSize: "13px",
                                  fontWeight: "500",
                                }}
                              >
                                ✓ Complete
                              </button>
                            )}
                            <button
                              onClick={() => cancelBooking(booking._id)}
                              style={{
                                padding: "7px 16px",
                                background: "#FEE2E2",
                                color: "#991B1B",
                                border: "1px solid #FCA5A5",
                                borderRadius: "8px",
                                cursor: "pointer",
                                fontSize: "13px",
                                fontWeight: "500",
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Cancelled Bookings */}
              {cancelledBookings.length > 0 && (
                <div>
                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: "700",
                      color: "#9CA3AF",
                      marginBottom: "12px",
                    }}
                  >
                    Cancelled ({cancelledBookings.length})
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                    }}
                  >
                    {cancelledBookings.map((booking) => (
                      <div
                        key={booking._id}
                        style={{
                          background: "#F9FAFB",
                          borderRadius: "16px",
                          padding: "20px 24px",
                          border: "1px solid #F3F4F6",
                          opacity: 0.7,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <div>
                            <h4
                              style={{
                                margin: "0 0 4px",
                                fontSize: "15px",
                                fontWeight: "600",
                                color: "#6B7280",
                              }}
                            >
                              {booking.expertId?.name || "Expert"}
                            </h4>
                            <div style={{ display: "flex", gap: "12px" }}>
                              <span
                                style={{ fontSize: "13px", color: "#9CA3AF" }}
                              >
                                📅 {booking.date}
                              </span>
                              <span
                                style={{ fontSize: "13px", color: "#9CA3AF" }}
                              >
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
