import axios from "axios";

const baseURL = "http://127.0.0.1:5000/api/v1";

export const api = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export const authapi = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically include the accessToken in every request for "api" instance
authapi.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor to handle cases where the accessToken expires
authapi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // If 401 error (unauthorized)
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Get refresh token and request new access token
        const response = await axios.post(`${baseURL}auth/refresh/`);

        // Store new access token
        const newAccessToken = response.data.access;
        localStorage.setItem("accessToken", newAccessToken);

        // Update headers with new token
        authapi.defaults.headers["Authorization"] = `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        // Retry failed request
        return authapi(originalRequest);
      } catch (err) {
        // If refresh fails, logout
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  },
);
