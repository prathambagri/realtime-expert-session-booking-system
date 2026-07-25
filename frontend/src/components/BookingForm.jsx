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
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImproveNotes = async () => {
    if (improving) return;

    if (!form.notes.trim()) {
      return setError("Please describe your problem before using AI.");
    }

    try {
      setImproving(true);
      setError("");

      const res = await improveBookingDescription(
        form.notes,
        expert.name,
        expert.category,
      );

      setForm((prev) => ({
        ...prev,
        notes: res.improvedDescription,
      }));
    } catch (err) {
      console.error(err);

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

    if (!/^\d{10}$/.test(form.phone))
      return "Phone number must contain exactly 10 digits.";

    if (!selectedSlot) return "Please select a time slot.";

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validate();

    if (validationError) {
      return setError(validationError);
    }

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
      console.error(err);

      setError(
        err.response?.data?.error || "Booking failed. Please try again.",
      );
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
        <div className="mb-2 flex items-center justify-between">
          <label className="block text-sm font-semibold text-slate-700">
            Describe Your Problem (Optional)
          </label>

          <button
            type="button"
            onClick={handleImproveNotes}
            disabled={improving || !form.notes.trim()}
            className="rounded-lg bg-indigo-50 px-3 py-1.5 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-100 disabled:cursor-not-allowed disabled:opacity-50"
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
          className="w-full resize-y rounded-xl border border-slate-300 px-4 py-3 transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
        />

        {form.notes.trim() && !improving && (
          <p className="mt-2 text-xs text-slate-500">
            💡 AI can rewrite your description to make it clearer and more
            professional for the expert.
          </p>
        )}
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