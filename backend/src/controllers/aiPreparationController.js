const { GoogleGenAI } = require("@google/genai");
const Expert = require("../models/Expert");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const prepareSession = async (req, res) => {
  try {
    const { expertId, goal } = req.body;

    if (!expertId || !goal) {
      return res.status(400).json({
        success: false,
        message: "Expert ID and goal are required.",
      });
    }

    const expert = await Expert.findById(expertId);

    if (!expert) {
      return res.status(404).json({
        success: false,
        message: "Expert not found.",
      });
    }

    const prompt = `
You are an AI Learning Assistant helping users prepare for a live session with a human expert.

The goal is NOT to teach the entire topic or solve the user's problem.

Instead, help the user maximize the value of their upcoming expert session.

User Goal:
${goal}

Expert Details:
Name: ${expert.name}
Category: ${expert.category}
Experience: ${expert.experience}
Bio: ${expert.bio}

Return ONLY valid JSON in the following format:

{
  "summary": "...",
  "sessionChecklist": [
    "...",
    "...",
    "...",
    "..."
  ],
  "questionsToAsk": [
    "...",
    "...",
    "...",
    "..."
  ],
  "tips": [
    "...",
    "...",
    "...",
    "..."
  ]
}

Rules:

- summary should be 2–3 concise sentences.
- sessionChecklist must contain exactly 4 actionable preparation steps.
- questionsToAsk must contain exactly 4 thoughtful questions for the expert.
- tips must contain exactly 4 practical preparation tips.
- Do not provide coding solutions.
- Do not explain the topic in depth.
- Do not recommend courses or YouTube videos.
- Focus entirely on helping the user prepare for the expert session.
- Return ONLY valid JSON.
`;

    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL,
      contents: prompt,
    });

    const text = response.text.trim();

    const data = JSON.parse(text);

    return res.json({
      success: true,
      ...data,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate learning assistant.",
    });
  }
};

module.exports = {
  prepareSession,
};
