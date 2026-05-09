const StatusBadge = ({ status }) => {
  const styles = {
    pending: { background: "#FEF3C7", color: "#92400E" },
    confirmed: { background: "#D1FAE5", color: "#065F46" },
    completed: { background: "#DBEAFE", color: "#1E40AF" },
    cancelled: { background: "#FEE2E2", color: "#991B1B" },
  };

  return (
    <span
      style={{
        ...styles[status],
        padding: "4px 12px",
        borderRadius: "999px",
        fontSize: "12px",
        fontWeight: "600",
        textTransform: "capitalize",
      }}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
