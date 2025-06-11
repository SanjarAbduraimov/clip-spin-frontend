import axios from "axios";

import { STORAGE_KEY } from "@/auth/context/authProvider";
import { config } from "@/constants/config";

// Create an Axios instance with default configuration
const axiosInstance = axios.create({
  baseURL: config.apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 3000000, // 30 seconds
});

// Add a request interceptor to include auth token
axiosInstance.interceptors.request.use(
  // eslint-disable-next-line @typescript-eslint/no-shadow
  (config) => {
    const token = localStorage.getItem(STORAGE_KEY);
    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Add a response interceptor to handle common errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;

    // Handle authentication errors
    if (response && response.status === 401) {
      // Clear auth token and redirect to login
      localStorage.removeItem(STORAGE_KEY);
      window.location.href = "/auth/sign-in";
    }

    // Handle server errors
    if (response && response.status >= 500) {
      // console.error("Server error:", response.data);
      // You could trigger a global error notification here
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
