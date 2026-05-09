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

  useSocket(
    (data) => {
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
      console.log("slotFreed received:", data);
      console.log("current id:", id);
      console.log("match?", String(data.expertId) === String(id));
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

  const CATEGORY_COLORS = {
    Design: { bg: "#EDE9FE", color: "#5B21B6" },
    Engineering: { bg: "#DBEAFE", color: "#1E40AF" },
    Marketing: { bg: "#D1FAE5", color: "#065F46" },
    Finance: { bg: "#FEF3C7", color: "#92400E" },
  };

  if (loading)
    return (
      <div style={{ textAlign: "center", padding: "80px", color: "#6B7280" }}>
        <div style={{ fontSize: "32px", marginBottom: "12px" }}>⏳</div>
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
          borderRadius: "12px",
        }}
      >
        {error}
      </div>
    );

  const catColor = CATEGORY_COLORS[expert.category] || {
    bg: "#F3F4F6",
    color: "#374151",
  };
  const initials = expert.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div style={{ maxWidth: "780px", margin: "0 auto" }}>
      <button
        onClick={() => navigate("/")}
        style={{
          background: "none",
          border: "none",
          color: "#4F46E5",
          cursor: "pointer",
          fontSize: "14px",
          marginBottom: "20px",
          padding: 0,
          fontWeight: "500",
          display: "flex",
          alignItems: "center",
          gap: "4px",
        }}
      >
        ← Back to Experts
      </button>

      {/* Expert Profile Card */}
      <div
        style={{
          background: "#fff",
          borderRadius: "20px",
          overflow: "hidden",
          border: "1px solid #F3F4F6",
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          marginBottom: "24px",
        }}
      >
        {/* Banner */}
        <div
          style={{
            height: "100px",
            background: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)",
          }}
        />

        <div style={{ padding: "0 28px 28px" }}>
          {/* Avatar */}
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "20px",
              background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: "28px",
              fontWeight: "800",
              marginTop: "-40px",
              marginBottom: "16px",
              border: "4px solid #fff",
              boxShadow: "0 4px 12px rgba(79,70,229,0.3)",
            }}
          >
            {initials}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <div>
              <h2
                style={{
                  margin: "0 0 8px",
                  fontSize: "26px",
                  fontWeight: "800",
                  color: "#111827",
                }}
              >
                {expert.name}
              </h2>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                <span
                  style={{
                    background: catColor.bg,
                    color: catColor.color,
                    padding: "4px 14px",
                    borderRadius: "999px",
                    fontSize: "13px",
                    fontWeight: "600",
                  }}
                >
                  {expert.category}
                </span>
                <span
                  style={{
                    background: "#F3F4F6",
                    color: "#374151",
                    padding: "4px 14px",
                    borderRadius: "999px",
                    fontSize: "13px",
                    fontWeight: "500",
                  }}
                >
                  {expert.experience} years experience
                </span>
              </div>
            </div>
            <div
              style={{
                background: "#FEF3C7",
                color: "#92400E",
                padding: "10px 18px",
                borderRadius: "14px",
                fontSize: "20px",
                fontWeight: "800",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              ⭐ {expert.rating}
            </div>
          </div>

          <p
            style={{
              color: "#6B7280",
              fontSize: "15px",
              lineHeight: "1.7",
              marginTop: "16px",
            }}
          >
            {expert.bio}
          </p>
        </div>
      </div>

      {/* Slot Picker */}
      <div
        style={{
          background: "#fff",
          borderRadius: "20px",
          padding: "28px",
          border: "1px solid #F3F4F6",
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          marginBottom: "24px",
        }}
      >
        <h3
          style={{
            marginTop: 0,
            marginBottom: "20px",
            fontSize: "18px",
            fontWeight: "700",
            color: "#111827",
          }}
        >
          🗓 Available Time Slots
        </h3>
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
          padding: "16px",
          background: selectedSlot
            ? "linear-gradient(135deg, #4F46E5, #7C3AED)"
            : "#E5E7EB",
          color: selectedSlot ? "#fff" : "#9CA3AF",
          border: "none",
          borderRadius: "14px",
          fontSize: "16px",
          fontWeight: "700",
          cursor: selectedSlot ? "pointer" : "not-allowed",
          boxShadow: selectedSlot ? "0 4px 12px rgba(79,70,229,0.3)" : "none",
          transition: "all 0.2s",
        }}
      >
        {selectedSlot
          ? `Book ${selectedSlot.time} on ${selectedSlot.date} →`
          : "Select a time slot to continue"}
      </button>
    </div>
  );
};

export default ExpertDetail;
