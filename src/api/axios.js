// src/api.js
import axios from "axios";


/**
 * We append /api/v1 here so all requests go to
 * `${BASE}/api/v1/...`
 */
const api = axios.create({
  baseURL: `https://api.paak-ble-project.me/api/v1`,
  withCredentials: true,
});

// ensure credentials on every request
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

    // if not 401 or we've already retried, or it's a refresh/me endpoint, bail
    if (
      status !== 401 ||
      originalRequest._retry ||
      url.endsWith("/users/me") ||
      url.endsWith("/users/refreshToken")
    ) {
      // if refresh itself 401, force login
      if (status === 401 && url.endsWith("/users/refreshToken")) {
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }

    // mark we’re retrying
    originalRequest._retry = true;

    try {
      // refresh the token
      await api.post("/users/refreshToken");
      // retry original
      return api(originalRequest);
    } catch (refreshError) {
      window.location.href = "/login";
      return Promise.reject(refreshError);
    }
  }
);

export default api;
