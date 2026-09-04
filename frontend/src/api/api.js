import axios from "axios";

const API = axios.create({
  baseURL: " https://placement-management-system-1-1ti8.onrender.com",
});

// ==========================
// Request Interceptor
// Automatically attach JWT Token
// ==========================
API.interceptors.request.use(
  (config) => {
    const user =
      JSON.parse(localStorage.getItem("user")) ||
      JSON.parse(sessionStorage.getItem("user"));

    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ==========================
// Response Interceptor
// Handle Unauthorized Access
// ==========================
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("user");
      sessionStorage.removeItem("user");

      alert("Session expired. Please login again.");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default API;