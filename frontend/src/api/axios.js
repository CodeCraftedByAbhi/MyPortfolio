// src/api/axios.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5001/", // notice the /public
  withCredentials: true,
});

export default axiosInstance;
