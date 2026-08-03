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
    } catch (err) {
      console.error(err);
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
      alert("Booking updated!");
    } catch (err) {
      alert("Failed to update booking.");
    }
  };

  if (loading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "80px",
          color: "#64748B",
        }}
      >
        Loading bookings...
      </div>
    );

  return (
    <div>
      {/* Header */}
      <div
        style={{
          background:
            "linear-gradient(135deg, #052e16 0%, #14532d 40%, #166534 70%, #15803d 100%)",
          borderRadius: "16px",
          padding: "28px 32px",
          marginBottom: "24px",
          color: "#fff",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <h1
          style={{
            margin: "0 0 4px",
            fontSize: "24px",
            fontWeight: "800",
            position: "relative",
          }}
        >
          Bookings
        </h1>
        <p
          style={{
            margin: "0 0 16px",
            color: "rgba(255,255,255,0.7)",
            fontSize: "13px",
            position: "relative",
          }}
        >
          Manage all customer bookings from one place.
        </p>
        <div
          style={{
            display: "inline-block",
            background: "rgba(255,255,255,0.15)",
            borderRadius: "8px",
            padding: "8px 16px",
            position: "relative",
          }}
        >
          <p
            style={{
              margin: "0 0 2px",
              fontSize: "10px",
              color: "rgba(255,255,255,0.6)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            Total Bookings
          </p>
          <p style={{ margin: 0, fontSize: "24px", fontWeight: "800" }}>
            {bookings.length}
          </p>
        </div>
      </div>

      {/* Table */}
      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          border: "1.5px solid #E2E8F0",
          overflow: "hidden",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr
              style={{
                background: "#F8FAFC",
                borderBottom: "1px solid #E2E8F0",
              }}
            >
              {["Customer", "Expert", "Date", "Time", "Status", "Action"].map(
                (h) => (
                  <th
                    key={h}
                    style={{
                      padding: "12px 16px",
                      textAlign: h === "Action" ? "center" : "left",
                      fontSize: "11px",
                      fontWeight: "700",
                      color: "#94A3B8",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, i) => (
              <tr
                key={booking._id}
                style={{
                  borderTop: i > 0 ? "1px solid #F1F5F9" : "none",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#F0FDF4")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                <td style={{ padding: "14px 16px" }}>
                  <p
                    style={{
                      margin: "0 0 2px",
                      fontWeight: "600",
                      color: "#0F172A",
                      fontSize: "14px",
                    }}
                  >
                    {booking.name}
                  </p>
                  <p style={{ margin: 0, fontSize: "12px", color: "#94A3B8" }}>
                    {booking.email}
                  </p>
                </td>
                <td
                  style={{
                    padding: "14px 16px",
                    color: "#475569",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  {booking.expertId?.name}
                </td>
                <td
                  style={{
                    padding: "14px 16px",
                    color: "#64748B",
                    fontSize: "13px",
                  }}
                >
                  {booking.date}
                </td>
                <td
                  style={{
                    padding: "14px 16px",
                    color: "#64748B",
                    fontSize: "13px",
                  }}
                >
                  {booking.timeSlot}
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <StatusBadge status={booking.status} />
                </td>
                <td style={{ padding: "14px 16px", textAlign: "center" }}>
                  <button
                    onClick={() => {
                      setSelectedBooking(booking);
                      setShowModal(true);
                    }}
                    style={{
                      padding: "6px 14px",
                      background: "#DCFCE7",
                      color: "#15803D",
                      border: "1px solid #BBF7D0",
                      borderRadius: "6px",
                      fontSize: "12px",
                      fontWeight: "600",
                      cursor: "pointer",
                    }}
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
