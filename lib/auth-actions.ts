"use server"

import { cookies } from "next/headers"

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

interface AuthData {
  accessToken: string | null
  refreshToken: string | null
  user: User | null
  isAuthenticated: boolean
  prompt: "signin" | "signup" | null
}

// Server-side cookie'ga yozish
export async function setAuthCookie(authData: AuthData) {
  const cookieStore = await cookies()

  cookieStore.set("auth-storage", JSON.stringify({ state: authData }), {
    httpOnly: false, // Client tomondan o'qish uchun
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 kun
    path: "/",
  })
}

// Server-side cookie'ni o'chirish
export async function clearAuthCookie() {
  const cookieStore = await cookies()
  cookieStore.delete("auth-storage")
}
