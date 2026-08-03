import { useState } from "react";
import API from "../api/axios";
import { improveBookingDescription } from "../services/aiBookingApi";

const BookingForm = ({ expertId, expert, selectedSlot, onSuccess }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [improving, setImproving] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImproveNotes = async () => {
    if (improving || !form.notes.trim())
      return setError("Please describe your problem before using AI.");
    try {
      setImproving(true);
      setError("");
      const res = await improveBookingDescription(
        form.notes,
        expert.name,
        expert.category,
      );
      setForm((prev) => ({ ...prev, notes: res.improvedDescription }));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to improve description.");
    } finally {
      setImproving(false);
    }
  };

  const validate = () => {
    if (!form.name.trim()) return "Name is required.";
    if (!form.email.trim()) return "Email is required.";
    if (!/\S+@\S+\.\S+/.test(form.email)) return "Invalid email address.";
    if (!form.phone.trim()) return "Phone number is required.";
    if (!/^\d{10}$/.test(form.phone)) return "Phone must be exactly 10 digits.";
    if (!selectedSlot) return "Please select a time slot.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) return setError(err);
    try {
      setLoading(true);
      setError("");
      await API.post("/bookings", {
        expertId,
        name: form.name,
        email: form.email,
        phone: form.phone,
        date: selectedSlot.date,
        timeSlot: selectedSlot.time,
        notes: form.notes,
      });
      onSuccess();
    } catch (err) {
      setError(
        err.response?.data?.error || "Booking failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    background: '#F8FAFC',
    border: '1.5px solid #E2E8F0',
    borderRadius: '8px',
    color: '#0F172A',
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "8px",
    fontSize: "13px",
    fontWeight: "600",
    color: "#475569",
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "20px" }}
    >
      {error && (
        <div
          style={{
            padding: "12px 16px",
            borderRadius: "8px",
            border: "1px solid #FCA5A5",
            background: "#FEF2F2",
            color: "#DC2626",
            fontSize: "13px",
          }}
        >
          {error}
        </div>
      )}

      <div>
        <label style={labelStyle}>Full Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          style={inputStyle}
          onFocus={(e) => (e.target.style.borderColor = "#16A34A")}
          onBlur={(e) => (e.target.style.borderColor = "#E2E8F0")}
        />
      </div>

      <div>
        <label style={labelStyle}>Email Address</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="your@email.com"
          style={inputStyle}
          onFocus={(e) => (e.target.style.borderColor = "#16A34A")}
          onBlur={(e) => (e.target.style.borderColor = "#E2E8F0")}
        />
      </div>

      <div>
        <label style={labelStyle}>Phone Number</label>
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="10 digit phone number"
          style={inputStyle}
          onFocus={(e) => (e.target.style.borderColor = "#16A34A")}
          onBlur={(e) => (e.target.style.borderColor = "#E2E8F0")}
        />
      </div>

      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "8px",
          }}
        >
          <label style={{ ...labelStyle, marginBottom: 0 }}>
            Describe Your Problem
          </label>
          <button
            type="button"
            onClick={handleImproveNotes}
            disabled={improving || !form.notes.trim()}
            style={{
              padding: "5px 12px",
              background: "#DCFCE7",
              border: "1px solid #BBF7D0",
              borderRadius: "6px",
              color: "#15803D",
              fontSize: "12px",
              fontWeight: "600",
              cursor:
                improving || !form.notes.trim() ? "not-allowed" : "pointer",
              opacity: improving || !form.notes.trim() ? 0.5 : 1,
            }}
          >
            {improving ? "🤖 Improving..." : "✨ Improve with AI"}
          </button>
        </div>
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          rows={5}
          placeholder="Describe the issue you'd like help with..."
          style={{ ...inputStyle, resize: "vertical" }}
          onFocus={(e) => (e.target.style.borderColor = "#16A34A")}
          onBlur={(e) => (e.target.style.borderColor = "#E2E8F0")}
        />
        {form.notes.trim() && !improving && (
          <p style={{ margin: "6px 0 0", fontSize: "12px", color: "#64748B" }}>
            💡 AI can rewrite your description to make it clearer for the
            expert.
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        style={{
          width: "100%",
          padding: "14px",
          background: loading ? "#E2E8F0" : "#16A34A",
          color: loading ? "#94A3B8" : "#fff",
          boxShadow: loading ? "none" : "0 4px 16px rgba(22,163,74,0.3)",
          border: "none",
          borderRadius: "8px",
          fontSize: "15px",
          fontWeight: "700",
          cursor: loading ? "not-allowed" : "pointer",
          transition: "all 0.15s",
        }}
      >
        {loading ? "Booking..." : "Confirm Booking"}
      </button>
    </form>
  );
};

export default BookingForm;
