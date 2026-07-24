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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Full Name
        </label>

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          className="w-full rounded-xl border border-slate-300 px-4 py-3 transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Email Address
        </label>

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="your@email.com"
          className="w-full rounded-xl border border-slate-300 px-4 py-3 transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Phone Number
        </label>

        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="10 digit phone number"
          className="w-full rounded-xl border border-slate-300 px-4 py-3 transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Notes (Optional)
        </label>

        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          rows={4}
          placeholder="Any additional information..."
          className="w-full resize-y rounded-xl border border-slate-300 px-4 py-3 transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full rounded-xl px-6 py-3 text-base font-semibold text-white shadow-lg transition ${
          loading
            ? "cursor-not-allowed bg-slate-400"
            : "bg-gradient-to-r from-indigo-600 to-violet-600 hover:-translate-y-px hover:shadow-lg"
        }`}
      >
        {loading ? "Booking..." : "Confirm Booking"}
      </button>
    </form>
  );
};

export default BookingForm;
