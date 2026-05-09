import { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import BookingForm from "../components/BookingForm";

const Booking = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const { selectedSlot, expert } = state || {};

  if (!selectedSlot || !expert) {
    return (
      <div style={{ textAlign: "center", padding: "80px" }}>
        <div style={{ fontSize: "48px", marginBottom: "16px" }}>⚠️</div>
        <p style={{ color: "#6B7280", marginBottom: "20px" }}>
          No slot selected.
        </p>
        <button
          onClick={() => navigate("/")}
          style={{
            padding: "12px 24px",
            background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
            color: "#fff",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Back to Experts
        </button>
      </div>
    );
  }

  if (success) {
    return (
      <div style={{ maxWidth: "500px", margin: "0 auto" }}>
        <div
          style={{
            background: "#fff",
            borderRadius: "20px",
            overflow: "hidden",
            border: "1px solid #F3F4F6",
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
              padding: "40px",
              color: "#fff",
            }}
          >
            <div style={{ fontSize: "56px", marginBottom: "12px" }}>🎉</div>
            <h2 style={{ margin: 0, fontSize: "26px", fontWeight: "800" }}>
              Booking Confirmed!
            </h2>
          </div>
          <div style={{ padding: "32px" }}>
            <div
              style={{
                background: "#F3F4F6",
                borderRadius: "14px",
                padding: "20px",
                marginBottom: "24px",
                textAlign: "left",
              }}
            >
              <p
                style={{
                  margin: "0 0 8px",
                  fontSize: "14px",
                  color: "#6B7280",
                }}
              >
                Session details
              </p>
              <p
                style={{
                  margin: "0 0 6px",
                  fontWeight: "700",
                  color: "#111827",
                  fontSize: "16px",
                }}
              >
                {expert.name}
              </p>
              <p
                style={{
                  margin: "0 0 4px",
                  color: "#6B7280",
                  fontSize: "14px",
                }}
              >
                📅 {selectedSlot.date}
              </p>
              <p style={{ margin: 0, color: "#6B7280", fontSize: "14px" }}>
                ⏰ {selectedSlot.time}
              </p>
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={() => navigate("/")}
                style={{
                  flex: 1,
                  padding: "12px",
                  background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "12px",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
              >
                Find More Experts
              </button>
              <button
                onClick={() => navigate("/my-bookings")}
                style={{
                  flex: 1,
                  padding: "12px",
                  background: "#fff",
                  color: "#4F46E5",
                  border: "2px solid #4F46E5",
                  borderRadius: "12px",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
              >
                My Bookings
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "540px", margin: "0 auto" }}>
      <button
        onClick={() => navigate(-1)}
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
        ← Back
      </button>

      <div
        style={{
          background: "#fff",
          borderRadius: "20px",
          overflow: "hidden",
          border: "1px solid #F3F4F6",
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
            padding: "24px 28px",
            color: "#fff",
          }}
        >
          <h2
            style={{ margin: "0 0 4px", fontSize: "22px", fontWeight: "800" }}
          >
            Complete Your Booking
          </h2>
          <p style={{ margin: 0, opacity: 0.85, fontSize: "14px" }}>
            Fill in your details to confirm the session
          </p>
        </div>

        <div style={{ padding: "28px" }}>
          {/* Session Summary */}
          <div
            style={{
              background: "#F8F7FF",
              border: "1px solid #E0E7FF",
              borderRadius: "14px",
              padding: "16px 20px",
              marginBottom: "24px",
            }}
          >
            <p
              style={{
                margin: "0 0 4px",
                fontSize: "13px",
                color: "#6B7280",
                fontWeight: "500",
              }}
            >
              BOOKING SESSION
            </p>
            <p
              style={{
                margin: "0 0 6px",
                fontWeight: "700",
                color: "#111827",
                fontSize: "16px",
              }}
            >
              {expert.name} — {expert.category}
            </p>
            <p
              style={{
                margin: 0,
                fontSize: "14px",
                color: "#4F46E5",
                fontWeight: "500",
              }}
            >
              📅 {selectedSlot.date} &nbsp; ⏰ {selectedSlot.time}
            </p>
          </div>

          <BookingForm
            expertId={id}
            selectedSlot={selectedSlot}
            onSuccess={() => setSuccess(true)}
          />
        </div>
      </div>
    </div>
  );
};

export default Booking;
