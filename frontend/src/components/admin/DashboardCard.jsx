const CARD_STYLES = {
  "Total Experts": {
    icon: "👨‍💼",
    bg: "#DCFCE7",
    color: "#15803D",
    border: "#BBF7D0",
  },
  "Total Bookings": {
    icon: "📅",
    bg: "#DBEAFE",
    color: "#1D4ED8",
    border: "#BFDBFE",
  },
  Pending: { icon: "⏳", bg: "#FEF9C3", color: "#A16207", border: "#FDE047" },
  Confirmed: { icon: "✅", bg: "#DCFCE7", color: "#15803D", border: "#BBF7D0" },
  Completed: { icon: "🎉", bg: "#F3E8FF", color: "#7C3AED", border: "#DDD6FE" },
  Cancelled: { icon: "❌", bg: "#FEE2E2", color: "#DC2626", border: "#FCA5A5" },
};

const DashboardCard = ({ title, value }) => {
  const style = CARD_STYLES[title] || {
    icon: "📊",
    bg: "#F1F5F9",
    color: "#475569",
    border: "#E2E8F0",
  };

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "12px",
        padding: "24px",
        border: "1.5px solid #E2E8F0",
        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        transition: "all 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)";
        e.currentTarget.style.borderColor = style.border;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)";
        e.currentTarget.style.borderColor = "#E2E8F0";
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "16px",
        }}
      >
        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "10px",
            background: style.bg,
            border: `1px solid ${style.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "22px",
          }}
        >
          {style.icon}
        </div>
        <div
          style={{
            width: "40px",
            height: "4px",
            borderRadius: "999px",
            background: style.bg,
            border: `1px solid ${style.border}`,
          }}
        />
      </div>

      <p
        style={{
          margin: "0 0 8px",
          fontSize: "12px",
          fontWeight: "600",
          color: "#94A3B8",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
        }}
      >
        {title}
      </p>
      <h2
        style={{
          margin: 0,
          fontSize: "32px",
          fontWeight: "800",
          color: "#0F172A",
        }}
      >
        {value}
      </h2>
    </div>
  );
};

export default DashboardCard;
