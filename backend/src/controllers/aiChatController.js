const { GoogleGenAI } = require("@google/genai");
const Expert = require("../models/Expert");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const askFollowUpQuestion = async (req, res) => {
  try {
    const { expertId, goal, question } = req.body;

    if (!expertId || !goal || !question) {
      return res.status(400).json({
        success: false,
        message: "expertId, goal and question are required.",
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
You are an AI learning assistant.

Expert Details:
Name: ${expert.name}
Category: ${expert.category}
Experience: ${expert.experience}
Bio: ${expert.bio}

User Goal:
${goal}

User Question:
${question}

Answer the user's question clearly and accurately.

Keep the answer:
- Easy to understand
- Practical
- Well structured
- Under 250 words
`;

    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL,
      contents: prompt,
    });

    return res.json({
      success: true,
      answer: response.text,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate AI response.",
    });
  }
};

module.exports = {
  askFollowUpQuestion,
};
