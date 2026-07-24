import { useEffect, useState } from "react";
import { getAllBookings, updateBookingStatus } from "../../services/adminApi";
import BookingStatusModal from "../../components/admin/BookingStatusModal";
import StatusBadge from "../../components/StatusBadge";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const data = await getAllBookings();
      setBookings(data);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (status) => {
    try {
      await updateBookingStatus(selectedBooking._id, status);

      await fetchBookings();

      setShowModal(false);
      setSelectedBooking(null);

      alert("Booking updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update booking.");
    }
  };

  if (loading) {
    return (
      <div className="flex h-60 items-center justify-center">
        <p className="text-lg font-medium text-slate-500">
          Loading bookings...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-xl bg-gradient-to-br from-indigo-700 via-indigo-600 to-violet-500 p-8 text-white shadow-lg">
        <h1 className="text-3xl font-extrabold tracking-tight">Bookings</h1>

        <p className="mt-2 text-white/80">
          Manage all customer bookings from one place.
        </p>

        <div className="mt-6 inline-flex rounded-lg bg-white/15 px-5 py-3 backdrop-blur-sm">
          <div>
            <p className="text-xs uppercase tracking-wider text-white/70">
              Total Bookings
            </p>

            <p className="text-3xl font-bold">{bookings.length}</p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
        <table className="w-full border-collapse">
          <thead className="bg-slate-100">
            <tr className="text-sm font-semibold uppercase tracking-wide text-slate-600">
              <th className="p-5 text-left">Customer</th>
              <th className="p-5 text-left">Expert</th>
              <th className="p-5 text-left">Date</th>
              <th className="p-5 text-left">Time</th>
              <th className="p-5 text-left">Status</th>
              <th className="p-5 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => (
              <tr
                key={booking._id}
                className="border-t border-slate-100 transition hover:bg-indigo-50/40"
              >
                <td className="p-5">
                  <div>
                    <p className="font-semibold text-slate-900">
                      {booking.name}
                    </p>

                    <p className="text-sm text-slate-500">{booking.email}</p>
                  </div>
                </td>

                <td className="p-5 font-medium text-slate-700">
                  {booking.expertId?.name}
                </td>

                <td className="p-5 text-slate-600">{booking.date}</td>

                <td className="p-5 text-slate-600">{booking.timeSlot}</td>

                <td className="p-5">
                  <StatusBadge status={booking.status} />
                </td>

                <td className="p-5 text-center">
                  <button
                    onClick={() => {
                      setSelectedBooking(booking);
                      setShowModal(true);
                    }}
                    className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-500 px-4 py-2 text-sm font-semibold text-white shadow transition hover:-translate-y-px hover:shadow-lg"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <BookingStatusModal
        isOpen={showModal}
        booking={selectedBooking}
        onClose={() => {
          setShowModal(false);
          setSelectedBooking(null);
        }}
        onSave={handleUpdateStatus}
      />
    </div>
  );
}
