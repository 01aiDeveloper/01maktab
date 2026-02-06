"use client"

import axios from "axios"

// Get API base URL from environment variable
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://dev-api.01maktab.uz/api/v1"

// Global axios instance for API
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Lazy import to avoid server-side issues
let authStorePromise: Promise<typeof import("@/store/auth-store")> | null = null

const getAuthStore = async () => {
  if (typeof window === "undefined") return null
  if (!authStorePromise) {
    authStorePromise = import("@/store/auth-store")
  }
  return authStorePromise
}

// Request interceptor - Add auth token to requests
api.interceptors.request.use(
  async (config) => {
    if (typeof window !== "undefined") {
      const authModule = await getAuthStore()
      if (authModule) {
        const token = authModule.useAuthStore.getState().accessToken
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
      }
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
        if (typeof window !== "undefined") {
          const authModule = await getAuthStore()
          if (authModule) {
            const refreshToken = authModule.useAuthStore.getState().refreshToken

            if (refreshToken) {
              // Call refresh token endpoint
              const response = await axios.post(
                `${API_BASE_URL}/auth/refresh`,
                { refreshToken },
              )

              const { accessToken, refreshToken: newRefreshToken } = response.data.data

              // Update tokens in store
              authModule.useAuthStore.getState().setTokens(accessToken, newRefreshToken)

              // Retry original request with new token
              originalRequest.headers.Authorization = `Bearer ${accessToken}`
              return api(originalRequest)
            }
          }
        }
      } catch (refreshError) {
        // If refresh fails, logout user
        if (typeof window !== "undefined") {
          const authModule = await getAuthStore()
          if (authModule) {
            authModule.useAuthStore.getState().clearAuth()
          }
          window.location.href = "/login"
        }
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)

export default api
