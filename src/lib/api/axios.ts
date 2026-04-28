import axios from "axios";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

// Public axios instance - no auth
export const publicAxios = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Private axios instance - with auth interceptor
export const privateAxios = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for private axios to add JWT token
privateAxios.interceptors.request.use(
  (config) => {
    // Get token from sessionStorage (or localStorage based on your auth setup)
    const token =
      typeof window !== "undefined"
        ? sessionStorage.getItem("authToken")
        : null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor for private axios to handle 401s
privateAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized - redirect to login
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        sessionStorage.removeItem("authToken");
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  },
);

export default { publicAxios, privateAxios };
