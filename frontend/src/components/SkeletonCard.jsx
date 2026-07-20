const SkeletonCard = () => {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "16px",
        padding: "24px",
        border: "1px solid #F3F4F6",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
      }}
    >
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .skeleton {
          background: linear-gradient(90deg, #F3F4F6 25%, #E5E7EB 50%, #F3F4F6 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          border-radius: 8px;
        }
      `}</style>

      {/* Top accent */}
      <div
        style={{ height: "4px", borderRadius: "4px", marginBottom: "20px" }}
        className="skeleton"
      />

      {/* Header row */}
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
          className="skeleton"
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "14px",
            flexShrink: 0,
          }}
        />
        <div style={{ flex: 1 }}>
          <div
            className="skeleton"
            style={{ height: "18px", width: "60%", marginBottom: "8px" }}
          />
          <div className="skeleton" style={{ height: "14px", width: "40%" }} />
        </div>
        <div
          className="skeleton"
          style={{ width: "52px", height: "32px", borderRadius: "10px" }}
        />
      </div>

      {/* Bio lines */}
      <div
        className="skeleton"
        style={{ height: "14px", width: "100%", marginBottom: "8px" }}
      />
      <div
        className="skeleton"
        style={{ height: "14px", width: "80%", marginBottom: "20px" }}
      />

      {/* Button */}
      <div
        className="skeleton"
        style={{ height: "40px", width: "100%", borderRadius: "10px" }}
      />
    </div>
  );
};

export default SkeletonCard;
