// src/api/axios.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://my-portfolio-backend-murex.vercel.app/", // notice the /public
  withCredentials: true,
});

export default axiosInstance;
