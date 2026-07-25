import API from "../api/axios";

export const askFollowUpQuestion = async (expertId, goal, question) => {
  const res = await API.post("/api/ai/chat", {
    expertId,
    goal,
    question,
  });

  return res.data;
};
