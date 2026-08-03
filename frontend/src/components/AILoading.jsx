import { motion } from "framer-motion";

const steps = [
  "Reading your request...",
  "Analyzing expert profiles...",
  "Finding the best match...",
];

const AILoading = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        marginTop: "20px",
        borderRadius: "12px",
        border: "1px solid #BBF7D0",
        background: "#F0FDF4",
        padding: "24px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            border: "3px solid #16A34A",
            borderTopColor: "transparent",
            animation: "spin 0.8s linear infinite",
            flexShrink: 0,
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <div>
          <h3
            style={{
              margin: 0,
              fontWeight: "700",
              color: "#0F172A",
              fontSize: "14px",
            }}
          >
            🤖 AI is analyzing your request
          </h3>
          <p style={{ margin: 0, fontSize: "12px", color: "#64748B" }}>
            Please wait a few seconds...
          </p>
        </div>
      </div>

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {steps.map((step, index) => (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.5 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#15803D",
              fontSize: "13px",
            }}
          >
            <span style={{ color: "#16A34A" }}>✔</span>
            <span>{step}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AILoading;
