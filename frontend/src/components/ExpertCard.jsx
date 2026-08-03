import { useNavigate } from "react-router-dom";

const CATEGORY_COLORS = {
  Design: { bg: "#F3E8FF", color: "#7C3AED", border: "#DDD6FE" },
  Engineering: { bg: "#EFF6FF", color: "#1D4ED8", border: "#BFDBFE" },
  Marketing: { bg: "#DCFCE7", color: "#15803D", border: "#BBF7D0" },
  Finance: { bg: "#FEF9C3", color: "#A16207", border: "#FDE047" },
};

const ExpertCard = ({ expert }) => {
  const navigate = useNavigate();
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
    <div
      onClick={() => navigate(`/experts/${expert._id}`)}
      style={{
        background: "#fff",
        border: "1.5px solid #E2E8F0",
        borderRadius: "16px",
        padding: "24px",
        cursor: "pointer",
        transition: "all 0.2s",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#16A34A";
        e.currentTarget.style.boxShadow = "0 8px 32px rgba(22,163,74,0.12)";
        e.currentTarget.style.transform = "translateY(-3px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#E2E8F0";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Top accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: "linear-gradient(90deg, #16A34A, #22C55E)",
        }}
      />

      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "14px",
          marginBottom: "16px",
        }}
      >
        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "12px",
            background: "linear-gradient(135deg, #16A34A, #22C55E)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: "16px",
            fontWeight: "700",
            flexShrink: 0,
            boxShadow: "0 4px 12px rgba(22,163,74,0.25)",
          }}
        >
          {initials}
        </div>

        <div style={{ flex: 1 }}>
          <h3
            style={{
              margin: "0 0 6px",
              fontSize: "16px",
              fontWeight: "700",
              color: "#0F172A",
            }}
          >
            {expert.name}
          </h3>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                background: cat.bg,
                color: cat.color,
                border: `1px solid ${cat.border}`,
                padding: "2px 10px",
                borderRadius: "999px",
                fontSize: "11px",
                fontWeight: "600",
              }}
            >
              {expert.category}
            </span>
            <span style={{ color: "#94A3B8", fontSize: "12px" }}>
              {expert.experience} yrs
            </span>
          </div>
        </div>

        <div
          style={{
            background: "#FEF9C3",
            border: "1px solid #FDE047",
            color: "#A16207",
            padding: "4px 10px",
            borderRadius: "8px",
            fontSize: "13px",
            fontWeight: "700",
          }}
        >
          ⭐ {expert.rating}
        </div>
      </div>

      {/* Bio */}
      <p
        style={{
          color: "#64748B",
          fontSize: "13px",
          lineHeight: "1.6",
          margin: "0 0 16px",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {expert.bio}
      </p>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: "14px",
          borderTop: "1px solid #F1F5F9",
        }}
      >
        <span style={{ fontSize: "12px", color: "#94A3B8" }}>View Profile</span>
        <span
          style={{
            color: "#16A34A",
            fontSize: "13px",
            fontWeight: "700",
          }}
        >
          →
        </span>
      </div>
    </div>
  );
};

export default ExpertCard;
