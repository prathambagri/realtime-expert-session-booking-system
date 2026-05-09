import { useNavigate } from "react-router-dom";

const ExpertCard = ({ expert }) => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        border: "1px solid #E5E7EB",
        borderRadius: "12px",
        padding: "20px",
        cursor: "pointer",
        transition: "box-shadow 0.2s",
        background: "#fff",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)")
      }
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
      onClick={() => navigate(`/experts/${expert._id}`)}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3 style={{ margin: 0, fontSize: "18px", color: "#111827" }}>
          {expert.name}
        </h3>
        <span
          style={{
            background: "#FEF3C7",
            color: "#92400E",
            padding: "4px 10px",
            borderRadius: "999px",
            fontSize: "12px",
            fontWeight: "600",
          }}
        >
          ⭐ {expert.rating}
        </span>
      </div>

      <p style={{ color: "#6B7280", margin: "6px 0", fontSize: "14px" }}>
        {expert.category} • {expert.experience} years exp
      </p>

      <p style={{ color: "#374151", fontSize: "14px", margin: "10px 0 0" }}>
        {expert.bio}
      </p>

      <button
        style={{
          marginTop: "16px",
          background: "#4F46E5",
          color: "#fff",
          border: "none",
          padding: "8px 16px",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "14px",
        }}
      >
        View Profile →
      </button>
    </div>
  );
};

export default ExpertCard;
