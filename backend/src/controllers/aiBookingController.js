const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const improveBookingDescription = async (req, res) => {
  try {
    const { problem, expertName, category } = req.body;

    if (!problem?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Problem description is required.",
      });
    }

    const prompt = `You are an AI assistant that improves booking notes for technical mentoring sessions.

The user has already described their problem.
Your job is ONLY to rewrite it professionally.

Expert Name:
${expertName}

Expert Category:
${category}

Original Problem:
${problem}

Rules:
- Preserve the user's original meaning exactly.
- Do NOT invent new technologies, systems, tools, or errors.
- Do NOT assume facts that the user did not mention.
- Rewrite the text so it is clearer, more structured, and more professional.
- Keep it between 50 and 120 words.
- Do NOT greet the expert.
- Do NOT write an email or letter.
- Do NOT solve the problem.
- Return only the rewritten booking description.`;

    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL,
      contents: prompt,
    });

    return res.json({
      success: true,
      improvedDescription: response.text.trim(),
    });
  } catch (error) {
    console.error("AI Booking Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to improve description.",
    });
  }
};

module.exports = {
  improveBookingDescription,
};
