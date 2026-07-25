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
        <div style={{ fontSize: "52px", marginBottom: "18px" }}>⚠️</div>

        <p
          style={{
            color: "#6B7280",
            marginBottom: "24px",
            fontSize: "16px",
          }}
        >
          No slot selected.
        </p>

        <button
          onClick={() => navigate("/")}
          style={{
            padding: "14px 28px",
            background:
              "linear-gradient(135deg,#4338CA 0%,#6366F1 55%,#8B5CF6 100%)",
            color: "#fff",
            border: "none",
            borderRadius: "14px",
            cursor: "pointer",
            fontWeight: "700",
            boxShadow: "0 10px 24px rgba(99,102,241,.25)",
          }}
        >
          Back to Experts
        </button>
      </div>
    );
  }

  if (success) {
    return (
      <div style={{ maxWidth: "850px", margin: "0 auto" }}>
        <div
          style={{
            background: "#fff",
            borderRadius: "24px",
            overflow: "hidden",
            border: "1px solid #E5E7EB",
            boxShadow: "0 15px 40px rgba(15,23,42,.08)",
            textAlign: "center",
          }}
        >
          {/* Success Header */}
          <div
            style={{
              background:
                "linear-gradient(135deg,#4338CA 0%,#6366F1 55%,#8B5CF6 100%)",
              padding: "48px",
              color: "#fff",
            }}
          >
            <div style={{ fontSize: "64px", marginBottom: "14px" }}>🎉</div>

            <h2
              style={{
                margin: 0,
                fontSize: "30px",
                fontWeight: "800",
                letterSpacing: "-0.5px",
              }}
            >
              Booking Confirmed!
            </h2>
          </div>

          <div style={{ padding: "34px" }}>
            {/* Session Details */}
            <div
              style={{
                background: "#F9FAFB",
                border: "1px solid #E5E7EB",
                borderRadius: "16px",
                padding: "22px",
                marginBottom: "28px",
                textAlign: "left",
              }}
            >
              <p
                style={{
                  margin: "0 0 8px",
                  fontSize: "13px",
                  color: "#6B7280",
                  fontWeight: "600",
                  letterSpacing: ".5px",
                }}
              >
                SESSION DETAILS
              </p>

              <p
                style={{
                  margin: "0 0 8px",
                  fontWeight: "800",
                  color: "#111827",
                  fontSize: "18px",
                }}
              >
                {expert.name}
              </p>

              <p
                style={{
                  margin: "0 0 6px",
                  color: "#4B5563",
                  fontSize: "15px",
                }}
              >
                📅 {selectedSlot.date}
              </p>

              <p
                style={{
                  margin: 0,
                  color: "#4B5563",
                  fontSize: "15px",
                }}
              >
                ⏰ {selectedSlot.time}
              </p>
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", gap: "12px", marginBottom: "32px" }}>
              <button
                onClick={() => navigate("/")}
                style={{
                  flex: 1,
                  padding: "14px",
                  background: "linear-gradient(135deg,#4338CA,#7C3AED)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "14px",
                  cursor: "pointer",
                  fontWeight: "700",
                  fontSize: "14px",
                  boxShadow: "0 8px 20px rgba(99,102,241,.25)",
                }}
              >
                Find More Experts
              </button>

              <button
                onClick={() => navigate("/my-bookings")}
                style={{
                  flex: 1,
                  padding: "14px",
                  background: "#fff",
                  color: "#4338CA",
                  border: "1px solid #C7D2FE",
                  borderRadius: "14px",
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
      <button
        onClick={() => navigate(-1)}
        style={{
          background: "#fff",
          border: "1px solid #E5E7EB",
          color: "#374151",
          cursor: "pointer",
          fontSize: "14px",
          marginBottom: "24px",
          padding: "10px 18px",
          fontWeight: "600",
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,.05)",
        }}
      >
        ← Back
      </button>

      <div
        style={{
          background: "#fff",
          borderRadius: "24px",
          overflow: "hidden",
          border: "1px solid #E5E7EB",
          boxShadow: "0 12px 35px rgba(15,23,42,.08)",
        }}
      >
        <div
          style={{
            background:
              "linear-gradient(135deg,#4338CA 0%,#6366F1 55%,#8B5CF6 100%)",
            padding: "30px 32px",
            color: "#fff",
          }}
        >
          <h2
            style={{
              margin: "0 0 6px",
              fontSize: "26px",
              fontWeight: "800",
              letterSpacing: "-0.4px",
            }}
          >
            Complete Your Booking
          </h2>

          <p
            style={{
              margin: 0,
              opacity: 0.9,
              fontSize: "15px",
            }}
          >
            Fill in your details to confirm your session.
          </p>
        </div>

        <div style={{ padding: "32px" }}>
          <div
            style={{
              background: "#F9FAFB",
              border: "1px solid #E5E7EB",
              borderRadius: "16px",
              padding: "18px 22px",
              marginBottom: "28px",
            }}
          >
            <p
              style={{
                margin: "0 0 6px",
                fontSize: "13px",
                color: "#6B7280",
                fontWeight: "600",
                letterSpacing: ".5px",
              }}
            >
              SESSION DETAILS
            </p>

            <p
              style={{
                margin: "0 0 8px",
                fontWeight: "800",
                color: "#111827",
                fontSize: "18px",
              }}
            >
              {expert.name} • {expert.category}
            </p>

            <p
              style={{
                margin: 0,
                fontSize: "15px",
                color: "#374151",
              }}
            >
              📅 {selectedSlot.date} &nbsp;&nbsp; ⏰ {selectedSlot.time}
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