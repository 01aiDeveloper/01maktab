import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import Cookies from "js-cookie"

interface User {
  id?: number
  firstname?: string
  lastname?: string
  email?: string
  phone?: string
  avatar?: string
  coins?: number
  birthday?: string
  gender?: "MALE" | "FEMALE"
  createdAt?: string
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

// Cookie storage implementation for Zustand (Next.js compatible)
const cookieStorage = {
  getItem: (name: string): string | null => {
    // Check if we're in browser environment
    if (typeof window === "undefined") return null
    return Cookies.get(name) || null
  },
  setItem: (name: string, value: string): void => {
    // Check if we're in browser environment
    if (typeof window === "undefined") return

    Cookies.set(name, value, {
      expires: 30, // 30 kun
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    })
  },
  removeItem: (name: string): void => {
    // Check if we're in browser environment
    if (typeof window === "undefined") return
    Cookies.remove(name, { path: "/" })
  },
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
      name: "auth-storage", // Cookie key nomi
      storage: createJSONStorage(() => cookieStorage),
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
