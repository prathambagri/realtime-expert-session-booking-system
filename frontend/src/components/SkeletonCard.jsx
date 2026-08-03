export default function SkeletonCard() {
  return (
    <div
      style={{
        background: "#fff",
        border: "1.5px solid #E2E8F0",
        borderRadius: "16px",
        padding: "24px",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .sk {
          background: linear-gradient(90deg, #F1F5F9 25%, #E2E8F0 50%, #F1F5F9 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          border-radius: 6px;
        }
      `}</style>

      <div style={{ display: "flex", gap: "14px", marginBottom: "16px" }}>
        <div
          className="sk"
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "12px",
            flexShrink: 0,
          }}
        />
        <div style={{ flex: 1 }}>
          <div
            className="sk"
            style={{ height: "16px", width: "55%", marginBottom: "8px" }}
          />
          <div className="sk" style={{ height: "12px", width: "35%" }} />
        </div>
        <div
          className="sk"
          style={{ width: "52px", height: "28px", borderRadius: "8px" }}
        />
      </div>

      <div
        className="sk"
        style={{ height: "13px", width: "100%", marginBottom: "6px" }}
      />
      <div
        className="sk"
        style={{ height: "13px", width: "75%", marginBottom: "20px" }}
      />

      <div
        style={{
          borderTop: "1px solid #F1F5F9",
          paddingTop: "14px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div className="sk" style={{ height: "12px", width: "30%" }} />
        <div className="sk" style={{ height: "12px", width: "15%" }} />
      </div>
    </div>
  );
}
