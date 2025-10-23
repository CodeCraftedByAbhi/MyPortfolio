import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "http://localhost:5001",
  withCredentials: true,
});

// Add request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config; // ✅ must return config!
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
