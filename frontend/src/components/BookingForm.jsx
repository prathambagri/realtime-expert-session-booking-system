import { useState } from "react";
import API from "../api/axios";

const BookingForm = ({ expertId, selectedSlot, onSuccess }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.name.trim()) return "Name is required";
    if (!form.email.trim()) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(form.email)) return "Email is invalid";
    if (!form.phone.trim()) return "Phone is required";
    if (!/^\d{10}$/.test(form.phone)) return "Phone must be 10 digits";
    if (!selectedSlot) return "Please select a time slot";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) return setError(err);

    setLoading(true);
    setError("");

    try {
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
      setError(err.response?.data?.error || "Booking failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #D1D5DB",
    fontSize: "14px",
    marginTop: "4px",
    boxSizing: "border-box",
  };

  const labelStyle = {
    fontSize: "14px",
    fontWeight: "500",
    color: "#374151",
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div
          style={{
            background: "#FEE2E2",
            color: "#991B1B",
            padding: "10px",
            borderRadius: "8px",
            marginBottom: "16px",
            fontSize: "14px",
          }}
        >
          {error}
        </div>
      )}

      <div style={{ marginBottom: "16px" }}>
        <label style={labelStyle}>Name</label>
        <input
          style={inputStyle}
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your full name"
        />
      </div>

      <div style={{ marginBottom: "16px" }}>
        <label style={labelStyle}>Email</label>
        <input
          style={inputStyle}
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="your@email.com"
        />
      </div>

      <div style={{ marginBottom: "16px" }}>
        <label style={labelStyle}>Phone</label>
        <input
          style={inputStyle}
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="10 digit phone number"
        />
      </div>

      <div style={{ marginBottom: "16px" }}>
        <label style={labelStyle}>Notes (optional)</label>
        <textarea
          style={{ ...inputStyle, height: "80px", resize: "vertical" }}
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder="Any additional notes..."
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        style={{
          width: "100%",
          padding: "12px",
          background: loading ? "#9CA3AF" : "#4F46E5",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          fontSize: "16px",
          fontWeight: "600",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Booking..." : "Confirm Booking"}
      </button>
    </form>
  );
};

export default BookingForm;
