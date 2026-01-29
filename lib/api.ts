import axios from "axios"
import { useAuthStore } from "@/store/auth-store"

// Get API base URL from environment variable
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://dev-api.01maktab.uz/api/v1"

// Global axios instance for API
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor - Add auth token to requests
api.interceptors.request.use(
  (config) => {
    // Get token from Zustand store
    const token = useAuthStore.getState().accessToken

    // Add Authorization header if token exists
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor - Handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // If token expired (401) and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = useAuthStore.getState().refreshToken

        if (refreshToken) {
          // Call refresh token endpoint
          const response = await axios.post(
            `${API_BASE_URL}/auth/refresh`,
            { refreshToken },
          )

          const { accessToken, refreshToken: newRefreshToken } = response.data.data

          // Update tokens in store
          useAuthStore.getState().setTokens(accessToken, newRefreshToken)

          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${accessToken}`
          return api(originalRequest)
        }
      } catch (refreshError) {
        // If refresh fails, logout user
        useAuthStore.getState().clearAuth()
        window.location.href = "/login"
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)

export default api
