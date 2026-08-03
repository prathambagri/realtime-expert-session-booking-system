import { useEffect, useState } from "react";

export default function BookingStatusModal({
  isOpen,
  onClose,
  booking,
  onSave,
}) {
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    if (booking) setStatus(booking.status);
  }, [booking]);

  if (!isOpen) return null;

  const statusColors = {
    pending: "#FEF9C3",
    confirmed: "#DCFCE7",
    completed: "#DBEAFE",
    cancelled: "#FEE2E2",
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
        backdropFilter: "blur(4px)",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "16px",
          boxShadow: "0 24px 48px rgba(0,0,0,0.15)",
          width: "100%",
          maxWidth: "420px",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "linear-gradient(135deg, #052e16 0%, #15803d 100%)",
            padding: "20px 24px",
            color: "#fff",
          }}
        >
          <h2 style={{ margin: 0, fontSize: "18px", fontWeight: "700" }}>
            Update Booking Status
          </h2>
        </div>

        <div style={{ padding: "24px" }}>
          {/* Booking Info */}
          <div
            style={{
              background: "#F8FAFC",
              borderRadius: "10px",
              padding: "14px 16px",
              marginBottom: "20px",
              border: "1.5px solid #E2E8F0",
            }}
          >
            <p
              style={{ margin: "0 0 6px", fontSize: "14px", color: "#0F172A" }}
            >
              <strong>Customer:</strong> {booking?.name}
            </p>
            <p style={{ margin: 0, fontSize: "14px", color: "#0F172A" }}>
              <strong>Expert:</strong> {booking?.expertId?.name}
            </p>
          </div>

          {/* Status Select */}
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontSize: "12px",
              fontWeight: "600",
              color: "#64748B",
            }}
          >
            Select Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={{
              width: "100%",
              padding: "11px 14px",
              borderRadius: "8px",
              border: "1.5px solid #E2E8F0",
              fontSize: "14px",
              outline: "none",
              color: "#0F172A",
              background: statusColors[status] || "#F8FAFC",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            <option value="pending">⏳ Pending</option>
            <option value="confirmed">✅ Confirmed</option>
            <option value="completed">🎉 Completed</option>
            <option value="cancelled">❌ Cancelled</option>
          </select>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "10px",
              marginTop: "24px",
            }}
          >
            <button
              onClick={onClose}
              style={{
                padding: "10px 20px",
                borderRadius: "8px",
                border: "1.5px solid #E2E8F0",
                background: "#fff",
                color: "#64748B",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
            <button
              onClick={() => onSave(status)}
              style={{
                padding: "10px 20px",
                borderRadius: "8px",
                background: "#16A34A",
                color: "#fff",
                border: "none",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(22,163,74,0.3)",
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
