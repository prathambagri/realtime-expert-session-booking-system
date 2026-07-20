import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        textAlign: "center",
        padding: "80px 20px",
      }}
    >
      <div style={{ fontSize: "80px", marginBottom: "16px" }}>🔍</div>
      <h1
        style={{
          fontSize: "48px",
          fontWeight: "800",
          color: "#111827",
          margin: "0 0 8px",
        }}
      >
        404
      </h1>
      <h2
        style={{
          fontSize: "24px",
          fontWeight: "600",
          color: "#374151",
          margin: "0 0 16px",
        }}
      >
        Page Not Found
      </h2>
      <p style={{ color: "#6B7280", fontSize: "16px", marginBottom: "32px" }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <button
        onClick={() => navigate("/")}
        style={{
          padding: "14px 32px",
          background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
          color: "#fff",
          border: "none",
          borderRadius: "12px",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "600",
          boxShadow: "0 4px 12px rgba(79,70,229,0.3)",
        }}
      >
        Back to Home
      </button>
    </div>
  );
};

export default NotFound;
