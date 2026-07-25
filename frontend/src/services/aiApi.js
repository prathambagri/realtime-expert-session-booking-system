import API from "../api/axios";

export const recommendExpert = async (query) => {
  const res = await API.post("/api/ai/recommend", {
    query,
  });

  return res.data;
};
