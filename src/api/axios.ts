import axios from "axios";

// Create an Axios instance with default configuration
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://api.clipspin.com/v1",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000, // 30 seconds
});

// Add a request interceptor to include auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
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
      localStorage.removeItem("auth_token");
      window.location.href = "/auth/sign-in";
    }

    // Handle server errors
    if (response && response.status >= 500) {
      console.error("Server error:", response.data);
      // You could trigger a global error notification here
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
