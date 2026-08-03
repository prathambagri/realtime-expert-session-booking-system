import { useState } from "react";
import { generatePreparationPlan } from "../services/aiPreparationApi";

const AILearningAssistant = ({ expertId }) => {
  const [goal, setGoal] = useState("");
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState(null);
  const [error, setError] = useState("");

  const generatePlan = async () => {
    if (!goal.trim())
      return setError("Please describe what you'd like help with.");
    try {
      setLoading(true);
      setError("");
      setPlan(null);
      const data = await generatePreparationPlan(expertId, goal);
      setPlan(data);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to generate learning plan.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        borderRadius: "16px",
        border: "1.5px solid #E2E8F0",
        background: "#fff",
        padding: "28px",
        textAlign: "left",
        boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "8px",
        }}
      >
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "8px",
            background: "#DCFCE7",
            border: "1px solid #BBF7D0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
          }}
        >
          🤖
        </div>
        <h2
          style={{
            margin: 0,
            fontSize: "18px",
            fontWeight: "700",
            color: "#0F172A",
          }}
        >
          AI Learning Assistant
        </h2>
      </div>

      <p
        style={{
          color: "#64748B",
          fontSize: "13px",
          marginBottom: "20px",
          lineHeight: "1.6",
        }}
      >
        Prepare for your upcoming expert session with a personalized learning
        plan.
      </p>

      <textarea
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        rows={4}
        placeholder="What do you want help with? e.g. I want to improve my React skills..."
        style={{
          width: "100%",
          padding: "14px",
          background: "#F8FAFC",
          border: "1.5px solid #E2E8F0",
          borderRadius: "10px",
          color: "#0F172A",
          fontSize: "14px",
          outline: "none",
          resize: "vertical",
          boxSizing: "border-box",
          fontFamily: "inherit",
          lineHeight: "1.6",
        }}
        onFocus={(e) => (e.target.style.borderColor = "#16A34A")}
        onBlur={(e) => (e.target.style.borderColor = "#E2E8F0")}
      />

      {error && (
        <p style={{ margin: "8px 0 0", fontSize: "13px", color: "#DC2626" }}>
          {error}
        </p>
      )}

      <button
        onClick={generatePlan}
        disabled={loading}
        style={{
          marginTop: "12px",
          padding: "12px 24px",
          background: loading ? "#E2E8F0" : "#16A34A",
          color: loading ? "#94A3B8" : "#fff",
          border: "none",
          borderRadius: "8px",
          fontSize: "14px",
          fontWeight: "600",
          cursor: loading ? "not-allowed" : "pointer",
          boxShadow: loading ? "none" : "0 4px 16px rgba(22,163,74,0.3)",
        }}
      >
        {loading ? "Generating..." : "Generate Learning Plan"}
      </button>

      {plan && (
        <div
          style={{
            marginTop: "32px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {/* Summary */}
          <div
            style={{
              padding: "20px",
              borderRadius: "10px",
              border: "1.5px solid #E2E8F0",
              background: "#F8FAFC",
            }}
          >
            <h3
              style={{
                margin: "0 0 10px",
                fontSize: "15px",
                fontWeight: "700",
                color: "#0F172A",
              }}
            >
              📝 Session Summary
            </h3>
            <p
              style={{
                margin: 0,
                color: "#475569",
                fontSize: "14px",
                lineHeight: "1.7",
              }}
            >
              {plan.summary}
            </p>
          </div>

          {/* Checklist */}
          <div
            style={{
              padding: "20px",
              borderRadius: "10px",
              border: "1.5px solid #E2E8F0",
              background: "#F8FAFC",
            }}
          >
            <h3
              style={{
                margin: "0 0 10px",
                fontSize: "15px",
                fontWeight: "700",
                color: "#0F172A",
              }}
            >
              ✅ Session Checklist
            </h3>
            <ul
              style={{
                margin: 0,
                padding: "0 0 0 20px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              {plan.sessionChecklist?.map((item, i) => (
                <li
                  key={i}
                  style={{
                    color: "#475569",
                    fontSize: "14px",
                    lineHeight: "1.6",
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Questions */}
          <div
            style={{
              padding: "20px",
              borderRadius: "10px",
              border: "1px solid #BBF7D0",
              background: "#F0FDF4",
            }}
          >
            <h3
              style={{
                margin: "0 0 10px",
                fontSize: "15px",
                fontWeight: "700",
                color: "#15803D",
              }}
            >
              ❓ Questions To Ask
            </h3>
            <ul
              style={{
                margin: 0,
                padding: "0 0 0 20px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              {plan.questionsToAsk?.map((item, i) => (
                <li
                  key={i}
                  style={{
                    color: "#475569",
                    fontSize: "14px",
                    lineHeight: "1.6",
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Tips */}
          <div
            style={{
              padding: "20px",
              borderRadius: "10px",
              border: "1px solid #BBF7D0",
              background: "#F0FDF4",
            }}
          >
            <h3
              style={{
                margin: "0 0 10px",
                fontSize: "15px",
                fontWeight: "700",
                color: "#15803D",
              }}
            >
              💡 Preparation Tips
            </h3>
            <ul
              style={{
                margin: 0,
                padding: "0 0 0 20px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              {plan.tips?.map((item, i) => (
                <li
                  key={i}
                  style={{
                    color: "#475569",
                    fontSize: "14px",
                    lineHeight: "1.6",
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default AILearningAssistant;
