import { useNavigate } from "react-router-dom";

const CATEGORY_COLORS = {
  Design: { bg: "#EDE9FE", color: "#5B21B6" },
  Engineering: { bg: "#DBEAFE", color: "#1E40AF" },
  Marketing: { bg: "#D1FAE5", color: "#065F46" },
  Finance: { bg: "#FEF3C7", color: "#92400E" },
};

const ExpertCard = ({ expert }) => {
  const navigate = useNavigate();
  const catColor = CATEGORY_COLORS[expert.category] || {
    bg: "#F3F4F6",
    color: "#374151",
  };
  const initials = expert.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div
      onClick={() => navigate(`/experts/${expert._id}`)}
      style={{
        background: "#fff",
        borderRadius: "16px",
        padding: "24px",
        cursor: "pointer",
        border: "1px solid #F3F4F6",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        transition: "all 0.2s",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(79,70,229,0.12)";
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.borderColor = "#C7D2FE";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.06)";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderColor = "#F3F4F6";
      }}
    >
      {/* Top accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: "linear-gradient(90deg, #4F46E5, #7C3AED)",
        }}
      />

      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          marginBottom: "16px",
        }}
      >
        {/* Avatar */}
        <div
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "14px",
            background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: "18px",
            fontWeight: "700",
            flexShrink: 0,
          }}
        >
          {initials}
        </div>
        <div style={{ flex: 1 }}>
          <h3
            style={{
              margin: 0,
              fontSize: "17px",
              fontWeight: "700",
              color: "#111827",
            }}
          >
            {expert.name}
          </h3>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              marginTop: "4px",
            }}
          >
            <span
              style={{
                background: catColor.bg,
                color: catColor.color,
                padding: "2px 10px",
                borderRadius: "999px",
                fontSize: "12px",
                fontWeight: "600",
              }}
            >
              {expert.category}
            </span>
            <span style={{ fontSize: "12px", color: "#9CA3AF" }}>
              {expert.experience} yrs exp
            </span>
          </div>
        </div>
        <div
          style={{
            background: "#FEF3C7",
            color: "#92400E",
            padding: "6px 10px",
            borderRadius: "10px",
            fontSize: "13px",
            fontWeight: "700",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          ⭐ {expert.rating}
        </div>
      </div>

      {/* Bio */}
      <p
        style={{
          color: "#6B7280",
          fontSize: "14px",
          lineHeight: "1.6",
          margin: "0 0 16px",
          minHeight: "44px",
        }}
      >
        {expert.bio}
      </p>

      {/* Button */}
      <button
        style={{
          width: "100%",
          padding: "10px",
          background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
          color: "#fff",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: "600",
        }}
      >
        View Profile →
      </button>
    </div>
  );
};

export default ExpertCard;
