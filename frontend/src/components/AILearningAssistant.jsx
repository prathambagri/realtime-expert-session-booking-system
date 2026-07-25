import { useState } from "react";
import { generatePreparationPlan } from "../services/aiPreparationApi";

const AILearningAssistant = ({ expertId }) => {
  const [goal, setGoal] = useState("");
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState(null);
  const [error, setError] = useState("");

  const generatePlan = async () => {
    if (!goal.trim()) {
      return setError("Please describe what you'd like help with.");
    }

    try {
      setLoading(true);
      setError("");
      setPlan(null);

      const data = await generatePreparationPlan(expertId, goal);

      setPlan(data);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message || "Failed to generate learning plan.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-slate-800">
        🤖 AI Learning Assistant
      </h2>

      <p className="mt-2 text-slate-600">
        Prepare for your upcoming expert session with a personalized learning
        plan.
      </p>

      <textarea
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        rows={4}
        placeholder="What do you want help with?"
        className="mt-5 w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
      />

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      <button
        onClick={generatePlan}
        disabled={loading}
        className="mt-5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Generating..." : "Generate Learning Plan"}
      </button>

      {plan && (
        <div className="mt-8 space-y-8">
          <section>
            <h3 className="text-xl font-semibold">📝 Session Summary</h3>

            <p className="mt-3 text-slate-700">{plan.summary}</p>
          </section>

          <section>
            <h3 className="text-xl font-semibold">✅ Session Checklist</h3>

            <ul className="mt-3 list-disc space-y-2 pl-5">
              {plan.sessionChecklist?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold">❓ Questions To Ask</h3>

            <ul className="mt-3 list-disc space-y-2 pl-5">
              {plan.questionsToAsk?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold">💡 Preparation Tips</h3>

            <ul className="mt-3 list-disc space-y-2 pl-5">
              {plan.tips?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>
        </div>
      )}
    </div>
  );
};

export default AILearningAssistant;
