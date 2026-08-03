import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", padding: "80px 20px" }}>
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100px",
          height: "100px",
          borderRadius: "24px",
          background: "#F0FDF4",
          border: "2px solid #BBF7D0",
          fontSize: "48px",
          marginBottom: "24px",
        }}
      >
        🔍
      </div>

      <h1
        style={{
          fontSize: "80px",
          fontWeight: "800",
          margin: "0 0 8px",
          letterSpacing: "-3px",
          background: "linear-gradient(135deg, #16A34A, #22C55E)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        404
      </h1>

      <h2
        style={{
          fontSize: "22px",
          fontWeight: "700",
          color: "#0F172A",
          margin: "0 0 12px",
        }}
      >
        Page Not Found
      </h2>

      <p
        style={{
          color: "#64748B",
          fontSize: "15px",
          maxWidth: "360px",
          margin: "0 auto 32px",
          lineHeight: "1.6",
        }}
      >
        The page you're looking for doesn't exist or has been moved.
      </p>

      <button
        onClick={() => navigate("/")}
        style={{
          padding: "12px 28px",
          background: "linear-gradient(135deg, #16A34A, #22C55E)",
          color: "#fff",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          fontSize: "15px",
          fontWeight: "600",
          boxShadow: "0 4px 20px rgba(22,163,74,0.3)",
          transition: "all 0.15s",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.transform = "translateY(-2px)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.transform = "translateY(0)")
        }
      >
        Back to Home
      </button>
    </div>
  );
};

export default NotFound;
