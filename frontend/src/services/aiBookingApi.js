import API from "../api/axios";

export const improveBookingDescription = async (
  problem,
  expertName,
  category,
) => {
  const res = await API.post("/api/ai/improve-booking", {
    problem,
    expertName,
    category,
  });

  return res.data;
};
