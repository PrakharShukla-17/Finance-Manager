import axios from "axios";

const api = axios.create({
  baseURL: "https://finance-manager-1-e1lo.onrender.com/api", // backend root
});

// Attach token automatically if logged-in
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.token = `Bearer ${token}`;
  return config;
});

export default api;
