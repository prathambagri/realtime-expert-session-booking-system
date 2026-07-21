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
    return <p className="text-lg">Loading bookings...</p>;
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Bookings</h1>
        <p className="text-gray-500">Total Bookings: {bookings.length}</p>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="text-left p-4">Customer</th>
              <th className="text-left p-4">Expert</th>
              <th className="text-left p-4">Date</th>
              <th className="text-left p-4">Time</th>
              <th className="text-left p-4">Status</th>
              <th className="text-center p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id} className="border-t hover:bg-slate-50">
                <td className="p-4">{booking.name}</td>
                <td className="p-4">{booking.expertId?.name}</td>
                <td className="p-4">{booking.date}</td>
                <td className="p-4">{booking.timeSlot}</td>
                <td className="p-4">
                  <StatusBadge status={booking.status} />
                </td>

                <td className="p-4 text-center">
                  <button
                    onClick={() => {
                      setSelectedBooking(booking);
                      setShowModal(true);
                    }}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Booking Status Modal */}
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

