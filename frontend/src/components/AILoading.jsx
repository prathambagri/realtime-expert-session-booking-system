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
      className="mt-6 rounded-2xl border border-indigo-100 bg-indigo-50 p-6"
    >
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent"></div>

        <div>
          <h3 className="font-bold text-slate-800">
            🤖 AI is analyzing your request
          </h3>

          <p className="text-sm text-slate-500">Please wait a few seconds...</p>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {steps.map((step, index) => (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: index * 0.5,
            }}
            className="flex items-center gap-2 text-slate-700"
          >
            <span>✔</span>
            <span>{step}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AILoading;
