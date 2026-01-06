import axios from "axios"

// Global axios instance for demo API
const api = axios.create({
  baseURL: "https://api.demo.01maktab.uz", // Placeholder demo API URL
  headers: {
    "Content-Type": "application/json",
  },
})

// Optional interceptors can be added here
api.interceptors.request.use((config) => {
  // Add token logic if needed later
  return config
})

export default api
