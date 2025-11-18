// src/utils/api.js
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // backend URL
  withCredentials: true, // if cookies/session are used
});


API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.token) {
    config.headers.Authorization = "Bearer " + user.token;
  }
  return config;
});

export default API;
