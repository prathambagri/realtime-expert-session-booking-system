import { useState } from "react";
import { motion } from "framer-motion";
import { recommendExpert } from "../services/aiApi";
import ExpertCard from "./ExpertCard";
import AILoading from "./AILoading";

const suggestions = [
  "Fix a bug in my project",
  "Review my application architecture",
  "Prepare for a technical interview",
  "Improve my UI/UX design",
  "Build a full-stack web application",
  "Plan a digital marketing strategy",
  "Get career guidance",
  "Learn a new technology",
];

const AIBookingAssistant = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState("");

  const handleAskAI = async () => {
    if (!query.trim()) return;
    try {
      setLoading(true);
      setError("");
      setRecommendations([]);
      const res = await recommendExpert(query);
      setRecommendations(res.recommendations || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to get AI recommendation. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        marginBottom: "32px",
        borderRadius: "16px",
        border: "1.5px solid #E2E8F0",
        background: "#fff",
        padding: "28px",
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
          AI Expert Finder
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
        Tell us what you're working on and AI will recommend the best expert for
        you.
      </p>

      {/* Suggestion Chips */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          marginBottom: "20px",
        }}
      >
        {suggestions.map((item) => (
          <button
            key={item}
            onClick={() => setQuery(item)}
            style={{
              padding: "6px 14px",
              borderRadius: "999px",
              border: "1.5px solid",
              borderColor: query === item ? "#16A34A" : "#E2E8F0",
              background: query === item ? "#DCFCE7" : "#F8FAFC",
              color: query === item ? "#15803D" : "#64748B",
              fontSize: "12px",
              fontWeight: "500",
              cursor: "pointer",
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => {
              if (query !== item) {
                e.currentTarget.style.borderColor = "#16A34A";
                e.currentTarget.style.color = "#15803D";
                e.currentTarget.style.background = "#F0FDF4";
              }
            }}
            onMouseLeave={(e) => {
              if (query !== item) {
                e.currentTarget.style.borderColor = "#E2E8F0";
                e.currentTarget.style.color = "#64748B";
                e.currentTarget.style.background = "#F8FAFC";
              }
            }}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Textarea */}
      <textarea
        rows={4}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Example: I'm building a React app and need help with authentication..."
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

      {/* Button */}
      <button
        onClick={handleAskAI}
        disabled={loading || !query.trim()}
        style={{
          marginTop: "12px",
          padding: "12px 24px",
          background: loading || !query.trim() ? "#E2E8F0" : "#16A34A",
          color: loading || !query.trim() ? "#94A3B8" : "#fff",
          border: "none",
          borderRadius: "8px",
          fontSize: "14px",
          fontWeight: "600",
          cursor: loading || !query.trim() ? "not-allowed" : "pointer",
          transition: "all 0.15s",
          boxShadow:
            loading || !query.trim()
              ? "none"
              : "0 4px 16px rgba(22,163,74,0.3)",
        }}
      >
        {loading ? "🔎 Finding Best Expert..." : "🔍 Find the Best Expert"}
      </button>

      {/* Loading */}
      {loading && <AILoading />}

      {/* Error */}
      {error && (
        <div
          style={{
            marginTop: "16px",
            padding: "14px",
            borderRadius: "10px",
            border: "1px solid #FCA5A5",
            background: "#FEF2F2",
            color: "#DC2626",
            fontSize: "13px",
          }}
        >
          {error}
        </div>
      )}

      {/* Empty State */}
      {!loading && recommendations.length === 0 && !error && (
        <div
          style={{
            marginTop: "20px",
            padding: "24px",
            borderRadius: "10px",
            border: "2px dashed #E2E8F0",
            textAlign: "center",
            color: "#94A3B8",
            fontSize: "13px",
            background: "#F8FAFC",
          }}
        >
          💡 Describe your project or problem and AI will find the most suitable
          expert for you.
        </div>
      )}

      {/* Recommendations Header */}
      {recommendations.length > 0 && (
        <div
          style={{
            marginTop: "24px",
            padding: "16px",
            borderRadius: "10px",
            border: "1px solid #BBF7D0",
            background: "#F0FDF4",
          }}
        >
          <h3
            style={{
              margin: "0 0 4px",
              fontSize: "15px",
              fontWeight: "700",
              color: "#15803D",
            }}
          >
            🎯 Recommended Experts
          </h3>
          <p style={{ margin: 0, fontSize: "12px", color: "#64748B" }}>
            Based on your request, AI selected the experts who best match your
            needs.
          </p>
        </div>
      )}

      {/* Recommendation Cards */}
      {recommendations.map((item, index) => (
        <motion.div
          key={item.expert?._id || index}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.2 }}
          style={{
            marginTop: "16px",
            borderRadius: "12px",
            border: "1.5px solid #E2E8F0",
            background: "#F8FAFC",
            padding: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "12px",
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: "14px",
                fontWeight: "700",
                color: "#0F172A",
              }}
            >
              {index === 0
                ? "🥇 Best Match"
                : index === 1
                  ? "🥈 Alternative"
                  : "🥉 Alternative"}
            </h3>
            <span
              style={{
                padding: "4px 12px",
                borderRadius: "999px",
                background: "#DCFCE7",
                border: "1px solid #BBF7D0",
                color: "#15803D",
                fontSize: "12px",
                fontWeight: "700",
              }}
            >
              {item.confidence}% Match
            </span>
          </div>

          {/* Why this expert */}
          <div
            style={{
              padding: "12px 16px",
              borderRadius: "8px",
              background: "#F0FDF4",
              border: "1px solid #BBF7D0",
              marginBottom: "12px",
            }}
          >
            <p
              style={{
                margin: "0 0 4px",
                fontSize: "12px",
                fontWeight: "600",
                color: "#15803D",
              }}
            >
              Why this expert?
            </p>
            <p
              style={{
                margin: 0,
                fontSize: "13px",
                color: "#475569",
                lineHeight: "1.6",
              }}
            >
              {item.reason}
            </p>
          </div>

          {/* Strengths */}
          <div style={{ marginBottom: "16px" }}>
            <p
              style={{
                margin: "0 0 8px",
                fontSize: "12px",
                fontWeight: "600",
                color: "#64748B",
              }}
            >
              Strengths
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {(item.strengths || []).map((skill) => (
                <span
                  key={skill}
                  style={{
                    padding: "3px 10px",
                    borderRadius: "999px",
                    background: "#DCFCE7",
                    border: "1px solid #BBF7D0",
                    color: "#15803D",
                    fontSize: "11px",
                    fontWeight: "500",
                  }}
                >
                  ✓ {skill}
                </span>
              ))}
            </div>
          </div>

          {item.expert && <ExpertCard expert={item.expert} />}
        </motion.div>
      ))}
    </div>
  );
};

export default AIBookingAssistant;
