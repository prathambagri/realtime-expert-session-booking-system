import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser, SignInButton } from "@clerk/clerk-react";
import API from "../api/axios";
import StatusBadge from "../components/StatusBadge";

const CATEGORY_COLORS = {
  Design: { bg: "#F3E8FF", color: "#7C3AED", border: "#DDD6FE" },
  Engineering: { bg: "#EFF6FF", color: "#1D4ED8", border: "#BFDBFE" },
  Marketing: { bg: "#DCFCE7", color: "#15803D", border: "#BBF7D0" },
  Finance: { bg: "#FEF9C3", color: "#A16207", border: "#FDE047" },
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
    } catch {
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
      await API.patch(`/bookings/${bookingId}/status`, { status: "cancelled" });
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

  const cardStyle = {
    background: "#fff",
    borderRadius: "12px",
    padding: "20px 24px",
    border: "1.5px solid #E2E8F0",
    marginBottom: "12px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
  };

  return (
    <div style={{ maxWidth: "720px", margin: "0 auto" }}>
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        style={{
          background: "#fff",
          border: "1.5px solid #E2E8F0",
          color: "#64748B",
          cursor: "pointer",
          fontSize: "14px",
          marginBottom: "24px",
          padding: "8px 16px",
          fontWeight: "500",
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          borderRadius: "8px",
          transition: "all 0.15s",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "#16A34A";
          e.currentTarget.style.color = "#16A34A";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "#E2E8F0";
          e.currentTarget.style.color = "#64748B";
        }}
      >
        ← Back to Experts
      </button>

      {/* Header */}
      <div
        style={{
          background:
            "linear-gradient(135deg, #052e16 0%, #14532d 40%, #166534 70%, #15803d 100%)",
          borderRadius: "16px",
          padding: "32px",
          marginBottom: "24px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-30px",
            right: "-30px",
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.05)",
          }}
        />
        <h2
          style={{
            margin: "0 0 6px",
            fontSize: "24px",
            fontWeight: "800",
            color: "#fff",
          }}
        >
          My Bookings
        </h2>
        <p
          style={{
            margin: "0 0 24px",
            color: "rgba(255,255,255,0.6)",
            fontSize: "14px",
          }}
        >
          View and manage your expert sessions.
        </p>

        <form
          onSubmit={fetchBookings}
          style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            style={{
              flex: 1,
              minWidth: 0,
              padding: "12px 16px",
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.2)",
              background: "rgba(255,255,255,0.12)",
              color: "#fff",
              fontSize: "14px",
              outline: "none",
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "12px 24px",
              background: "#fff",
              color: "#15803D",
              border: "none",
              borderRadius: "8px",
              fontWeight: "700",
              fontSize: "14px",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </form>

        {error && (
          <p style={{ margin: "10px 0 0", fontSize: "13px", color: "#FCA5A5" }}>
            {error}
          </p>
        )}

        {showSignIn && (
          <div
            style={{
              marginTop: "16px",
              padding: "16px",
              background: "rgba(255,255,255,0.1)",
              borderRadius: "10px",
              textAlign: "center",
            }}
          >
            <p style={{ margin: "0 0 12px", color: "#fff", fontSize: "14px" }}>
              Please sign in to view your bookings.
            </p>
            <SignInButton mode="modal">
              <button
                style={{
                  padding: "8px 20px",
                  background: "#fff",
                  color: "#15803D",
                  border: "none",
                  borderRadius: "8px",
                  fontWeight: "700",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
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
            <div
              style={{
                background: "#fff",
                borderRadius: "16px",
                padding: "60px",
                textAlign: "center",
                border: "1.5px solid #E2E8F0",
              }}
            >
              <div style={{ fontSize: "48px", marginBottom: "12px" }}>📭</div>
              <h3
                style={{
                  margin: "0 0 8px",
                  color: "#0F172A",
                  fontSize: "18px",
                  fontWeight: "700",
                }}
              >
                No Bookings Found
              </h3>
              <p
                style={{
                  color: "#64748B",
                  fontSize: "14px",
                  marginBottom: "20px",
                }}
              >
                No bookings found for this email address.
              </p>
              <button
                onClick={() => navigate("/")}
                style={{
                  padding: "10px 24px",
                  background: "#16A34A",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
              >
                Book a Session
              </button>
            </div>
          ) : (
            <>
              {/* Active Bookings */}
              {activeBookings.length > 0 && (
                <div style={{ marginBottom: "28px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginBottom: "14px",
                    }}
                  >
                    <h3
                      style={{
                        margin: 0,
                        fontSize: "15px",
                        fontWeight: "700",
                        color: "#0F172A",
                      }}
                    >
                      Active Bookings
                    </h3>
                    <span
                      style={{
                        padding: "2px 10px",
                        borderRadius: "999px",
                        background: "#DCFCE7",
                        border: "1px solid #BBF7D0",
                        color: "#15803D",
                        fontSize: "12px",
                        fontWeight: "600",
                      }}
                    >
                      {activeBookings.length}
                    </span>
                  </div>

                  {activeBookings.map((booking) => {
                    const cat = CATEGORY_COLORS[booking.expertId?.category] || {
                      bg: "#F1F5F9",
                      color: "#475569",
                      border: "#CBD5E1",
                    };
                    return (
                      <div key={booking._id} style={cardStyle}>
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
                                margin: "0 0 8px",
                                fontSize: "16px",
                                fontWeight: "700",
                                color: "#0F172A",
                              }}
                            >
                              {booking.expertId?.name || "Expert"}
                            </h4>
                            <span
                              style={{
                                background: cat.bg,
                                color: cat.color,
                                border: `1px solid ${cat.border}`,
                                padding: "2px 10px",
                                borderRadius: "999px",
                                fontSize: "11px",
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
                          <span style={{ fontSize: "13px", color: "#64748B" }}>
                            📅 {booking.date}
                          </span>
                          <span style={{ fontSize: "13px", color: "#64748B" }}>
                            ⏰ {booking.timeSlot}
                          </span>
                        </div>

                        {booking.notes && (
                          <div
                            style={{
                              padding: "12px 14px",
                              borderRadius: "8px",
                              background: "#F8FAFC",
                              border: "1px solid #E2E8F0",
                              borderLeft: "3px solid #16A34A",
                              marginBottom: "12px",
                            }}
                          >
                            <p
                              style={{
                                margin: 0,
                                fontSize: "13px",
                                color: "#475569",
                                lineHeight: "1.6",
                              }}
                            >
                              📝 {booking.notes}
                            </p>
                          </div>
                        )}

                        {["pending", "confirmed"].includes(booking.status) && (
                          <button
                            onClick={() => cancelBooking(booking._id)}
                            style={{
                              padding: "6px 16px",
                              background: "#FEE2E2",
                              border: "1px solid #FCA5A5",
                              borderRadius: "6px",
                              color: "#DC2626",
                              fontSize: "13px",
                              fontWeight: "500",
                              cursor: "pointer",
                            }}
                          >
                            Cancel Booking
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Completed Bookings */}
              {completedBookings.length > 0 && (
                <div style={{ marginBottom: "28px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginBottom: "14px",
                    }}
                  >
                    <h3
                      style={{
                        margin: 0,
                        fontSize: "15px",
                        fontWeight: "700",
                        color: "#15803D",
                      }}
                    >
                      Completed Sessions
                    </h3>
                    <span
                      style={{
                        padding: "2px 10px",
                        borderRadius: "999px",
                        background: "#DCFCE7",
                        border: "1px solid #BBF7D0",
                        color: "#15803D",
                        fontSize: "12px",
                        fontWeight: "600",
                      }}
                    >
                      {completedBookings.length}
                    </span>
                  </div>

                  {completedBookings.map((booking) => (
                    <div
                      key={booking._id}
                      style={{
                        ...cardStyle,
                        borderColor: "#BBF7D0",
                        background: "#F0FDF4",
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
                              margin: "0 0 6px",
                              fontSize: "15px",
                              fontWeight: "600",
                              color: "#0F172A",
                            }}
                          >
                            {booking.expertId?.name || "Expert"}
                          </h4>
                          <div style={{ display: "flex", gap: "12px" }}>
                            <span
                              style={{ fontSize: "13px", color: "#64748B" }}
                            >
                              📅 {booking.date}
                            </span>
                            <span
                              style={{ fontSize: "13px", color: "#64748B" }}
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
              )}

              {/* Cancelled Bookings */}
              {cancelledBookings.length > 0 && (
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginBottom: "14px",
                    }}
                  >
                    <h3
                      style={{
                        margin: 0,
                        fontSize: "15px",
                        fontWeight: "700",
                        color: "#94A3B8",
                      }}
                    >
                      Cancelled
                    </h3>
                    <span
                      style={{
                        padding: "2px 10px",
                        borderRadius: "999px",
                        background: "#F1F5F9",
                        border: "1px solid #E2E8F0",
                        color: "#94A3B8",
                        fontSize: "12px",
                        fontWeight: "600",
                      }}
                    >
                      {cancelledBookings.length}
                    </span>
                  </div>

                  {cancelledBookings.map((booking) => (
                    <div
                      key={booking._id}
                      style={{
                        ...cardStyle,
                        opacity: 0.7,
                        background: "#F8FAFC",
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
                              margin: "0 0 6px",
                              fontSize: "14px",
                              fontWeight: "600",
                              color: "#475569",
                            }}
                          >
                            {booking.expertId?.name || "Expert"}
                          </h4>
                          <div style={{ display: "flex", gap: "12px" }}>
                            <span
                              style={{ fontSize: "12px", color: "#94A3B8" }}
                            >
                              📅 {booking.date}
                            </span>
                            <span
                              style={{ fontSize: "12px", color: "#94A3B8" }}
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
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default MyBookings;
