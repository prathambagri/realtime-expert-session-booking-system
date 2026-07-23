import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getAdmins = async ({
  page = 1,
  limit = 6,
  search = "",
  status = "",
} = {}) => {
  const response = await API.get("/api/admin/admins", {
    params: {
      page,
      limit,
      search,
      status,
    },
  });

  return response.data;
};
