const { GoogleGenAI } = require("@google/genai");
const Expert = require("../models/Expert");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

exports.recommendExpert = async (req, res) => {
  try {
    const { query } = req.body;

    // Fetch experts from MongoDB
    const experts = await Expert.find().select(
      "name category experience rating availableSlots",
    );

    // Format experts for Gemini
    const expertsData = experts
      .map(
        (expert) => `
Name: ${expert.name}
Category: ${expert.category}
Experience: ${expert.experience}
Rating: ${expert.rating}
Available Slots: ${expert.availableSlots
          .filter((slot) => !slot.isBooked)
          .map((slot) => `${slot.date} ${slot.time}`)
          .join(", ")}
`,
      )
      .join("\n-------------------------\n");

    // Build prompt
    const prompt = `
You are an AI expert recommendation assistant.

User Request:
${query}

Available Experts:
${expertsData}

Choose the TOP 3 experts.

Return ONLY valid JSON.

{
  "recommendations":[
    {
      "recommendedExpert":"Expert Name",
      "confidence":95,
      "reason":"Why this expert is the best match",
      "strengths":[
        "React",
        "Frontend",
        "Interview Prep"
      ]
    },
    {
      "recommendedExpert":"Expert Name",
      "confidence":90,
      "reason":"...",
      "strengths":[
        "...",
        "...",
        "..."
      ]
    },
    {
      "recommendedExpert":"Expert Name",
      "confidence":85,
      "reason":"...",
      "strengths":[
        "...",
        "...",
        "..."
      ]
    }
  ]
}

Rules:

- Return exactly three experts.
- Confidence should decrease from first to third.
- Use ONLY experts from the list.
- Return valid JSON only.
- No markdown.
`;
      
    // Generate AI response
    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL,
      contents: prompt,
    });

    const aiResponse = JSON.parse(response.text);

    const recommendations = aiResponse.recommendations.map((item) => {
      const expert = experts.find(
        (e) =>
          e.name.trim().toLowerCase() ===
          item.recommendedExpert.trim().toLowerCase(),
      );

      return {
        expert,
        confidence: item.confidence,
        reason: item.reason,
        strengths: item.strengths,
      };
    });

    res.json({
      success: true,
      recommendations,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
