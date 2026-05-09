const SlotPicker = ({ slots, selectedSlot, onSelectSlot }) => {
  // Group slots by date
  const grouped = slots.reduce((acc, slot) => {
    if (!acc[slot.date]) acc[slot.date] = [];
    acc[slot.date].push(slot);
    return acc;
  }, {});

  return (
    <div>
      {Object.entries(grouped).map(([date, dateSlots]) => (
        <div key={date} style={{ marginBottom: "20px" }}>
          <h4 style={{ color: "#374151", marginBottom: "10px" }}>
            📅 {new Date(date).toDateString()}
          </h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {dateSlots.map((slot) => (
              <button
                key={slot._id}
                disabled={slot.isBooked}
                onClick={() => onSelectSlot(slot)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                  border: "1px solid",
                  cursor: slot.isBooked ? "not-allowed" : "pointer",
                  fontSize: "14px",
                  transition: "all 0.2s",
                  borderColor: slot.isBooked
                    ? "#E5E7EB"
                    : selectedSlot?._id === slot._id
                      ? "#4F46E5"
                      : "#D1D5DB",
                  background: slot.isBooked
                    ? "#F3F4F6"
                    : selectedSlot?._id === slot._id
                      ? "#4F46E5"
                      : "#fff",
                  color: slot.isBooked
                    ? "#9CA3AF"
                    : selectedSlot?._id === slot._id
                      ? "#fff"
                      : "#374151",
                }}
              >
                {slot.isBooked ? `${slot.time} ✗` : slot.time}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SlotPicker;
