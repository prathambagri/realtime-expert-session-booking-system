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
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Unable to get AI recommendation. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-slate-800">🤖 AI Expert Finder</h2>

      <p className="mt-2 text-slate-500">
        Tell us what you're working on or where you need help, and AI will
        recommend the experts best suited to assist you.
      </p>

      {/* Suggestion Chips */}
      <div className="mt-5 flex flex-wrap gap-2">
        {suggestions.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setQuery(item)}
            className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700 transition hover:bg-indigo-200"
          >
            {item}
          </button>
        ))}
      </div>

      {/* Input */}
      <textarea
        rows={4}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Example: I'm building a React application and need help fixing authentication after login..."
        className="mt-5 w-full rounded-xl border border-slate-300 p-4 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
      />

      {/* Button */}
      <button
        onClick={handleAskAI}
        disabled={loading}
        className="mt-4 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "🔎 Finding the Best Expert..." : "🔍 Find the Best Expert"}
      </button>

      {/* Loading */}
      {loading && <AILoading />}

      {/* Error */}
      {error && (
        <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-red-600">
          {error}
        </div>
      )}

      {/* Empty State */}
      {!loading && recommendations.length === 0 && !error && (
        <div className="mt-8 rounded-xl border border-dashed border-slate-300 p-6 text-center text-slate-500">
          💡 Describe your project, problem, or learning goal, and AI will
          recommend the most suitable experts for you.
        </div>
      )}

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="mt-8 rounded-xl bg-indigo-50 border border-indigo-100 p-4">
          <h3 className="text-lg font-semibold text-indigo-800">
            🎯 Recommended Experts
          </h3>

          <p className="mt-1 text-sm text-slate-600">
            Based on your request, AI has selected the experts who best match
            your needs.
          </p>
        </div>
      )}
      {recommendations.map((item, index) => (
        <motion.div
          key={item.expert?._id || index}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.2 }}
          className="mt-8 rounded-2xl border border-indigo-100 bg-white p-6 shadow-md"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-800">
              {index === 0
                ? "🥇 Best Match"
                : index === 1
                  ? "🥈 Alternative Match"
                  : "🥉 Alternative Match"}
            </h3>

            <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-700">
              {item.confidence}% Match
            </span>
          </div>

          <div className="mt-4 rounded-xl bg-indigo-50 p-4">
            <h4 className="font-semibold text-slate-800">Why this expert?</h4>

            <p className="mt-2 text-slate-700">{item.reason}</p>
          </div>

          <div className="mt-5">
            <h4 className="font-semibold text-slate-800">Strengths</h4>

            <div className="mt-3 flex flex-wrap gap-2">
              {(item.strengths || []).map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700"
                >
                  ✓ {skill}
                </span>
              ))}
            </div>
          </div>

          {item.expert && (
            <>
              <div className="mt-6">
                <ExpertCard expert={item.expert} />
              </div>
            </>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default AIBookingAssistant;
