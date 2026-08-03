import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import SlotPicker from "../components/SlotPicker";
import useSocket from "../hooks/useSocket";

const CATEGORY_COLORS = {
  Design: { bg: "#F3E8FF", color: "#7C3AED", border: "#DDD6FE" },
  Engineering: { bg: "#EFF6FF", color: "#1D4ED8", border: "#BFDBFE" },
  Marketing: { bg: "#DCFCE7", color: "#15803D", border: "#BBF7D0" },
  Finance: { bg: "#FEF9C3", color: "#A16207", border: "#FDE047" },
};

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
      <div style={{ textAlign: "center", padding: "80px", color: "#64748B" }}>
        <div style={{ fontSize: "32px", marginBottom: "12px" }}>⏳</div>
        Loading...
      </div>
    );

  if (error)
    return (
      <div
        style={{
          padding: "16px",
          borderRadius: "10px",
          border: "1px solid #FCA5A5",
          background: "#FEF2F2",
          color: "#DC2626",
        }}
      >
        {error}
      </div>
    );

  const cat = CATEGORY_COLORS[expert.category] || {
    bg: "#F1F5F9",
    color: "#475569",
    border: "#CBD5E1",
  };
  const initials = expert.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div style={{ maxWidth: "780px", margin: "0 auto" }}>
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        style={{
          background: "#fff",
          border: "1.5px solid #E2E8F0",
          color: "#64748B",
          cursor: "pointer",
          fontSize: "14px",
          marginBottom: "24px",
          padding: "8px 16px",
          fontWeight: "500",
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          borderRadius: "8px",
          transition: "all 0.15s",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "#16A34A";
          e.currentTarget.style.color = "#16A34A";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "#E2E8F0";
          e.currentTarget.style.color = "#64748B";
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
          border: "1.5px solid #E2E8F0",
          boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
          marginBottom: "20px",
        }}
      >
        {/* Banner */}
        <div
          style={{
            height: "100px",
            background:
              "linear-gradient(135deg, #052e16 0%, #14532d 40%, #166534 70%, #15803d 100%)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-20px",
              right: "-20px",
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.05)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
        </div>

        <div style={{ padding: "0 28px 28px" }}>
          {/* Avatar */}
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, #16A34A, #22C55E)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: "24px",
              fontWeight: "800",
              marginTop: "-36px",
              marginBottom: "16px",
              border: "3px solid #fff",
              boxShadow: "0 8px 24px rgba(22,163,74,0.25)",
              position:"relative"
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
                  margin: "0 0 10px",
                  fontSize: "26px",
                  fontWeight: "800",
                  color: "#0F172A",
                  letterSpacing: "-0.5px",
                }}
              >
                {expert.name}
              </h2>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                <span
                  style={{
                    background: cat.bg,
                    color: cat.color,
                    border: `1px solid ${cat.border}`,
                    padding: "4px 14px",
                    borderRadius: "999px",
                    fontSize: "12px",
                    fontWeight: "600",
                  }}
                >
                  {expert.category}
                </span>
                <span
                  style={{
                    background: "#F1F5F9",
                    color: "#475569",
                    border: "1px solid #E2E8F0",
                    padding: "4px 14px",
                    borderRadius: "999px",
                    fontSize: "12px",
                    fontWeight: "500",
                  }}
                >
                  {expert.experience} years exp
                </span>
              </div>
            </div>
            <div
              style={{
                background: "#FEF9C3",
                border: "1px solid #FDE047",
                color: "#A16207",
                padding: "8px 16px",
                borderRadius: "10px",
                fontSize: "18px",
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
              color: "#475569",
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
          borderRadius: "16px",
          padding: "24px",
          border: "1.5px solid #E2E8F0",
          boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
          marginBottom: "20px",
        }}
      >
        <h3
          style={{
            marginTop: 0,
            marginBottom: "20px",
            fontSize: "16px",
            fontWeight: "700",
            color: "#0F172A",
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
            ? "linear-gradient(135deg, #16A34A, #22C55E)"
            : "#E2E8F0",
          color: selectedSlot ? "#fff" : "#94A3B8",
          border: "none",
          borderRadius: "12px",
          fontSize: "15px",
          fontWeight: "700",
          cursor: selectedSlot ? "pointer" : "not-allowed",
          boxShadow: selectedSlot ? "0 4px 20px rgba(22,163,74,0.3)" : "none",
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
