import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import SlotPicker from "../components/SlotPicker";
import useSocket from "../hooks/useSocket";

const ExpertDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expert, setExpert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);

  const fetchExpert = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await API.get(`/experts/${id}`);
      setExpert(res.data);
    } catch (err) {
      setError("Failed to load expert details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpert();
  }, [id]);

  // real-time slot update
  useSocket(
      (data) => {
          // slot booked event
      if (String(data.expertId) === String(id)) {
        setExpert((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            availableSlots: prev.availableSlots.map((slot) =>
              slot.date === data.date && slot.time === data.time
                ? { ...slot, isBooked: true }
                : slot,
            ),
          };
        });
      }
    },
      (data) => {
        // slot freed event
         console.log("slotFreed received:", data);
         console.log("current id:", id);
      if (String(data.expertId) === String(id)) {
        setExpert((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            availableSlots: prev.availableSlots.map((slot) =>
              slot.date === data.date && slot.time === data.time
                ? { ...slot, isBooked: false }
                : slot,
            ),
          };
        });
      }
    },
  );

  if (loading)
    return (
      <div style={{ textAlign: "center", padding: "60px", color: "#6B7280" }}>
        Loading...
      </div>
    );

  if (error)
    return (
      <div
        style={{
          background: "#FEE2E2",
          color: "#991B1B",
          padding: "16px",
          borderRadius: "8px",
        }}
      >
        {error}
      </div>
    );

  return (
      <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          
      <button
        onClick={() => navigate("/")}
        style={{
          background: "none",
          border: "none",
          color: "#4F46E5",
          cursor: "pointer",
          fontSize: "14px",
          marginBottom: "16px",
          padding: 0,
        }}
      >
        ← Back to Experts
          </button>
          

      {/* Expert Info */}
      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          padding: "24px",
          border: "1px solid #E5E7EB",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2 style={{ margin: 0, color: "#111827" }}>{expert.name}</h2>
          <span
            style={{
              background: "#FEF3C7",
              color: "#92400E",
              padding: "4px 12px",
              borderRadius: "999px",
              fontWeight: "600",
            }}
          >
            ⭐ {expert.rating}
          </span>
        </div>
        <p style={{ color: "#6B7280", margin: "8px 0" }}>
          {expert.category} • {expert.experience} years experience
        </p>
        <p style={{ color: "#374151" }}>{expert.bio}</p>
      </div>

      {/* Slot Picker */}
      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          padding: "24px",
          border: "1px solid #E5E7EB",
          marginBottom: "24px",
        }}
      >
        <h3 style={{ marginTop: 0 }}>Available Time Slots</h3>
        <SlotPicker
          slots={expert.availableSlots}
          selectedSlot={selectedSlot}
          onSelectSlot={setSelectedSlot}
        />
      </div>

      {/* Book Button */}
      <button
        disabled={!selectedSlot}
        onClick={() =>
          navigate(`/booking/${id}`, { state: { selectedSlot, expert } })
        }
        style={{
          width: "100%",
          padding: "14px",
          background: selectedSlot ? "#4F46E5" : "#9CA3AF",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          fontSize: "16px",
          fontWeight: "600",
          cursor: selectedSlot ? "pointer" : "not-allowed",
        }}
      >
        {selectedSlot
          ? `Book ${selectedSlot.time} on ${selectedSlot.date} →`
          : "Select a slot to continue"}
      </button>
    </div>
  );
};

export default ExpertDetail;