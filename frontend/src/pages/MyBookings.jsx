import { useState } from "react";
import API from "../api/axios";
import StatusBadge from "../components/StatusBadge";

const MyBookings = () => {
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

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "24px", color: "#111827" }}>My Bookings</h2>

      {/* Email Search Form */}
      <form
        onSubmit={fetchBookings}
        style={{
          background: "#fff",
          borderRadius: "12px",
          padding: "24px",
          border: "1px solid #E5E7EB",
          marginBottom: "24px",
        }}
      >
        <label
          style={{ fontSize: "14px", fontWeight: "500", color: "#374151" }}
        >
          Enter your email to view bookings
        </label>
        <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #D1D5DB",
              fontSize: "14px",
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "10px 20px",
              background: loading ? "#9CA3AF" : "#4F46E5",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: "14px",
            }}
          >
            {loading ? "Loading..." : "Search"}
          </button>
        </div>

        {error && (
          <p style={{ color: "#991B1B", fontSize: "14px", marginTop: "8px" }}>
            {error}
          </p>
        )}
      </form>

      {/* Bookings List */}
      {searched && (
        <>
          {bookings.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "40px",
                background: "#fff",
                borderRadius: "12px",
                border: "1px solid #E5E7EB",
                color: "#6B7280",
              }}
            >
              No bookings found for this email.
            </div>
          ) : (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              {bookings.map((booking) => (
                <div
                  key={booking._id}
                  style={{
                    background: "#fff",
                    borderRadius: "12px",
                    padding: "20px",
                    border: "1px solid #E5E7EB",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "12px",
                    }}
                  >
                    <h3 style={{ margin: 0, fontSize: "16px" }}>
                      {booking.expertId?.name || "Expert"}
                    </h3>
                    <StatusBadge status={booking.status} />
                  </div>

                  <p
                    style={{
                      margin: "4px 0",
                      fontSize: "14px",
                      color: "#6B7280",
                    }}
                  >
                    📅 {booking.date} at ⏰ {booking.timeSlot}
                  </p>
                  <p
                    style={{
                      margin: "4px 0",
                      fontSize: "14px",
                      color: "#6B7280",
                    }}
                  >
                    🏷 {booking.expertId?.category || "N/A"}
                  </p>

                  {booking.notes && (
                    <p
                      style={{
                        margin: "8px 0 0",
                        fontSize: "14px",
                        color: "#374151",
                      }}
                    >
                      📝 {booking.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MyBookings;
