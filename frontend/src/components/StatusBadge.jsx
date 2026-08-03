const StatusBadge = ({ status }) => {
  const styles = {
    pending: {
      background: "#FEF9C3",
      color: "#A16207",
      border: "1px solid #FDE047",
    },
    confirmed: {
      background: "#DCFCE7",
      color: "#15803D",
      border: "1px solid #BBF7D0",
    },
    completed: {
      background: "#DBEAFE",
      color: "#1D4ED8",
      border: "1px solid #BFDBFE",
    },
    cancelled: {
      background: "#FEE2E2",
      color: "#DC2626",
      border: "1px solid #FCA5A5",
    },
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
