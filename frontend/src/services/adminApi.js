import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getDashboardStats = async () => {
  const response = await API.get("/api/admin/dashboard");
  return response.data;
};

export const getAllBookings = async () => {
  const response = await API.get("/api/admin/bookings");
  return response.data;
};

export const updateBookingStatus = (id, status) =>
  API.patch(`/api/admin/bookings/${id}/status`, { status });

export const getAllExperts = async ({
  page = 1,
  limit = 6,
  search = "",
  category = "",
  experience = "",
  status = "",
} = {}) => {
  const response = await API.get("/api/admin/experts", {
    params: {
      page,
      limit,
      search,
      category,
      experience,
      status,
    },
  });

  return response.data;
};


export const createExpert = (data) => API.post("/api/admin/experts", data);

export const updateExpert = async (id, expertData) => {
  const response = await API.put(`/api/admin/experts/${id}`, expertData);
  return response.data;
};

export const deleteExpert = async (id) => {
  const response = await API.delete(`/api/admin/experts/${id}`);
  return response.data;
};