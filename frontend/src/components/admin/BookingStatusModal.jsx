import { useEffect, useState } from "react";

export default function BookingStatusModal({
  isOpen,
  onClose,
  booking,
  onSave,
}) {
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    if (booking) {
      setStatus(booking.status);
    }
  }, [booking]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
        <h2 className="text-2xl font-bold mb-5">Update Booking Status</h2>

        <p className="mb-2">
          <strong>Customer:</strong> {booking?.name}
        </p>

        <p className="mb-4">
          <strong>Expert:</strong> {booking?.expertId?.name}
        </p>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border rounded-lg p-3"
        >
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="border px-5 py-2 rounded-lg">
            Cancel
          </button>

          <button
            onClick={() => onSave(status)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
