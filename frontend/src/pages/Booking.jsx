import { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import BookingForm from "../components/BookingForm";
import AILearningAssistant from "../components/AILearningAssistant";

const Booking = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const { selectedSlot, expert } = state || {};

  if (!selectedSlot || !expert) {
    return (
      <div style={{ textAlign: "center", padding: "80px" }}>
        <div style={{ fontSize: "52px", marginBottom: "16px" }}>⚠️</div>
        <p style={{ color: "#64748B", marginBottom: "24px", fontSize: "15px" }}>
          No slot selected.
        </p>
        <button
          onClick={() => navigate("/")}
          style={{
            padding: "12px 28px",
            background: "#16A34A",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "700",
            fontSize: "14px",
            boxShadow: "0 4px 16px rgba(22,163,74,0.3)",
          }}
        >
          Back to Experts
        </button>
      </div>
    );
  }

  if (success) {
    return (
      <div style={{ maxWidth: "780px", margin: "0 auto" }}>
        <div
          style={{
            background: "#fff",
            borderRadius: "20px",
            overflow: "hidden",
            border: "1.5px solid #E2E8F0",
            boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
            marginBottom: "20px",
          }}
        >
          {/* Success Header */}
          <div
            style={{
              background:
                "linear-gradient(135deg, #052e16 0%, #14532d 40%, #166534 70%, #15803d 100%)",
              padding: "32px",
              textAlign: "center",
              color: "#fff",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                fontSize: "36px",
                marginBottom: "8px",
                position: "relative",
              }}
            >
              🎉
            </div>
            <h2
              style={{
                margin: 0,
                fontSize: "20px",
                fontWeight: "700",
                letterSpacing: "-0.3px",
                position: "relative",
              }}
            >
              Booking Confirmed!
            </h2>
            <p
              style={{
                margin: "4px 0 0",
                color: "rgba(255,255,255,0.7)",
                fontSize: "13px",
                position: "relative",
              }}
            >
              Your session has been successfully booked
            </p>
          </div>

          <div style={{ padding: "32px" }}>
            {/* Session Details */}
            <div
              style={{
                background: "#F0FDF4",
                border: "1.5px solid #BBF7D0",
                borderRadius: "12px",
                padding: "20px",
                marginBottom: "24px",
              }}
            >
              <p
                style={{
                  margin: "0 0 8px",
                  fontSize: "11px",
                  color: "#15803D",
                  fontWeight: "700",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Session Details
              </p>
              <p
                style={{
                  margin: "0 0 6px",
                  fontWeight: "800",
                  color: "#0F172A",
                  fontSize: "18px",
                }}
              >
                {expert.name}
              </p>
              <p
                style={{
                  margin: "0 0 4px",
                  color: "#475569",
                  fontSize: "14px",
                }}
              >
                📅 {selectedSlot.date}
              </p>
              <p style={{ margin: 0, color: "#475569", fontSize: "14px" }}>
                ⏰ {selectedSlot.time}
              </p>
            </div>

            {/* Buttons */}
            <div style={{ display: "flex", gap: "12px", marginBottom: "32px" }}>
              <button
                onClick={() => navigate("/")}
                style={{
                  flex: 1,
                  padding: "12px",
                  background: "linear-gradient(135deg, #16A34A, #22C55E)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: "700",
                  fontSize: "14px",
                  boxShadow: "0 4px 16px rgba(22,163,74,0.3)",
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
                  color: "#16A34A",
                  border: "1.5px solid #16A34A",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: "700",
                  fontSize: "14px",
                }}
              >
                My Bookings
              </button>
            </div>

            {/* AI Learning Assistant */}
            <AILearningAssistant expertId={expert._id} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "560px", margin: "0 auto" }}>
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
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
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
          transition: "all 0.15s",
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
        ← Back
      </button>

      <div
        style={{
          background: "#fff",
          borderRadius: "20px",
          overflow: "hidden",
          border: "1.5px solid #E2E8F0",
          boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
        }}
      >
        {/* Header */}
        <div
          style={{
            background:
              "linear-gradient(135deg, #052e16 0%, #14532d 40%, #166534 70%, #15803d 100%)",
            padding: "28px 32px",
            color: "#fff",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          <h2
            style={{
              margin: "0 0 6px",
              fontSize: "22px",
              fontWeight: "800",
              letterSpacing: "-0.4px",
              position: "relative",
            }}
          >
            Complete Your Booking
          </h2>
          <p
            style={{
              margin: 0,
              opacity: 0.8,
              fontSize: "14px",
              position: "relative",
            }}
          >
            Fill in your details to confirm your session.
          </p>
        </div>

        <div style={{ padding: "28px" }}>
          {/* Session Summary */}
          <div
            style={{
              background: "#F0FDF4",
              border: "1.5px solid #BBF7D0",
              borderRadius: "10px",
              padding: "16px 20px",
              marginBottom: "24px",
            }}
          >
            <p
              style={{
                margin: "0 0 6px",
                fontSize: "11px",
                color: "#15803D",
                fontWeight: "700",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Session Details
            </p>
            <p
              style={{
                margin: "0 0 6px",
                fontWeight: "800",
                color: "#0F172A",
                fontSize: "16px",
              }}
            >
              {expert.name} • {expert.category}
            </p>
            <p style={{ margin: 0, fontSize: "14px", color: "#475569" }}>
              📅 {selectedSlot.date} &nbsp; ⏰ {selectedSlot.time}
            </p>
          </div>

          <BookingForm
            expertId={id}
            expert={expert}
            selectedSlot={selectedSlot}
            onSuccess={() => setSuccess(true)}
          />
        </div>
      </div>
    </div>
  );
};

export default Booking;
