const SlotPicker = ({ slots, selectedSlot, onSelectSlot }) => {
  const grouped = slots.reduce((acc, slot) => {
    if (!acc[slot.date]) acc[slot.date] = [];
    acc[slot.date].push(slot);
    return acc;
  }, {});

  return (
    <div>
      {Object.entries(grouped).map(([date, dateSlots]) => (
        <div key={date} style={{ marginBottom: "24px" }}>
          <h4
            style={{
              color: "#64748B",
              marginBottom: "12px",
              fontSize: "12px",
              fontWeight: "600",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            📅 {new Date(date).toDateString()}
          </h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {dateSlots.map((slot) => (
              <button
                key={slot._id}
                disabled={slot.isBooked}
                onClick={() => onSelectSlot(slot)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                  border: "1.5px solid",
                  cursor: slot.isBooked ? "not-allowed" : "pointer",
                  fontSize: "13px",
                  fontWeight: "500",
                  transition: "all 0.15s",
                  borderColor: slot.isBooked
                    ? "#E2E8F0"
                    : selectedSlot?._id === slot._id
                      ? "#16A34A"
                      : "#E2E8F0",
                  background: slot.isBooked
                    ? "#F8FAFC"
                    : selectedSlot?._id === slot._id
                      ? "#DCFCE7"
                      : "#fff",
                  color: slot.isBooked
                    ? "#CBD5E1"
                    : selectedSlot?._id === slot._id
                      ? "#15803D"
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
