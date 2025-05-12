import axios from "axios";

const api = axios.create({
  baseURL: "/api/v1",
  withCredentials: true,
});

// Request interceptor to ensure credentials are sent
api.interceptors.request.use((config) => {
  config.withCredentials = true;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;
    const url = originalRequest.url || "";

    // Skip refresh attempt if already retried or specific endpoints
    if (
      status !== 401 ||
      originalRequest._retry ||
      url.endsWith("/users/me") ||
      url.endsWith("/users/refreshToken")
    ) {
      if (status === 401 && url.endsWith("/users/refreshToken")) {
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }

    originalRequest._retry = true;
    try {
      // Attempt to refresh token
      await api.post("/users/refreshToken", {}, { withCredentials: true });
      // Retry original request
      return api(originalRequest);
    } catch (refreshError) {
      window.location.href = "/login";
      return Promise.reject(refreshError);
    }
  }
);

export default api;
