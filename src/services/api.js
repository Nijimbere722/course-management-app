import axios from "axios";

// 👉 Replace with your real backend URL from Swagger
const API = axios.create({
  baseURL: "https://student-management-system-backend.up.railway.app/api",
});

// Attach token automatically
API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }

  return config;
});

export default API;