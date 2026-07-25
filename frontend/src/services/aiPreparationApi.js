import API from "../api/axios";

export const generatePreparationPlan = async (expertId, goal) => {
  const res = await API.post("/api/ai/prepare", {
    expertId,
    goal,
  });

  return res.data;
};
