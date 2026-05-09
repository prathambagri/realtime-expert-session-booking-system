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
      <div style={{ textAlign: "center", padding: "60px" }}>
        <p style={{ color: "#6B7280" }}>No slot selected.</p>
        <button
          onClick={() => navigate("/")}
          style={{
            padding: "10px 20px",
            background: "#4F46E5",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            marginTop: "12px",
          }}
        >
          Back to Experts
        </button>
      </div>
    );
  }

  if (success) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "60px",
          background: "#fff",
          borderRadius: "12px",
          border: "1px solid #E5E7EB",
        }}
      >
        <div style={{ fontSize: "48px", marginBottom: "16px" }}>🎉</div>
        <h2 style={{ color: "#065F46" }}>Booking Confirmed!</h2>
        <p style={{ color: "#6B7280" }}>
          Your session with <strong>{expert.name}</strong> is booked for{" "}
          <strong>{selectedSlot.time}</strong> on{" "}
          <strong>{selectedSlot.date}</strong>
        </p>
        <div
          style={{
            display: "flex",
            gap: "12px",
            justifyContent: "center",
            marginTop: "24px",
          }}
        >
          <button
            onClick={() => navigate("/")}
            style={{
              padding: "10px 20px",
              background: "#4F46E5",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Back to Experts
          </button>
          <button
            onClick={() => navigate("/my-bookings")}
            style={{
              padding: "10px 20px",
              background: "#fff",
              color: "#4F46E5",
              border: "1px solid #4F46E5",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            View My Bookings
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}>
      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          padding: "24px",
          border: "1px solid #E5E7EB",
          marginBottom: "24px",
        }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{
            background: "none",
            border: "none",
            color: "#4F46E5",
            cursor: "pointer",
            fontSize: "14px",
            marginBottom: "16px",
            padding: 0,
          }}
        >
          ← Back
        </button>
              
        <h2 style={{ marginTop: 0, color: "#111827" }}>
          Complete Your Booking
        </h2>
        <div
          style={{
            background: "#F3F4F6",
            borderRadius: "8px",
            padding: "12px 16px",
            marginBottom: "24px",
          }}
        >
          <p style={{ margin: 0, fontSize: "14px", color: "#374151" }}>
            <strong>{expert.name}</strong> — {expert.category}
          </p>
          <p style={{ margin: "4px 0 0", fontSize: "14px", color: "#6B7280" }}>
            📅 {selectedSlot.date} at ⏰ {selectedSlot.time}
          </p>
        </div>

        <BookingForm
          expertId={id}
          selectedSlot={selectedSlot}
          onSuccess={() => setSuccess(true)}
        />
      </div>
    </div>
  );
};

export default Booking;
