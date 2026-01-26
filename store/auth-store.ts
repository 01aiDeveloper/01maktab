import { create } from "zustand"
import { persist } from "zustand/middleware"

interface User {
  id?: string
  name?: string
  email?: string
  phone?: string
  avatar?: string
}

interface AuthState {
  accessToken: string | null
  refreshToken: string | null
  user: User | null
  isAuthenticated: boolean
  prompt: "signin" | "signup" | null

  // Actions
  setTokens: (accessToken: string, refreshToken: string, prompt?: "signin" | "signup") => void
  setUser: (user: User) => void
  logout: () => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,
      prompt: null,

      setTokens: (accessToken, refreshToken, prompt = "signin") =>
        set({
          accessToken,
          refreshToken,
          isAuthenticated: true,
          prompt,
        }),

      setUser: (user) =>
        set({
          user,
        }),

      logout: () =>
        set({
          accessToken: null,
          refreshToken: null,
          user: null,
          isAuthenticated: false,
          prompt: null,
        }),

      clearAuth: () =>
        set({
          accessToken: null,
          refreshToken: null,
          user: null,
          isAuthenticated: false,
          prompt: null,
        }),
    }),
    {
      name: "auth-storage", // localStorage key
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        prompt: state.prompt,
      }),
    },
  ),
)
