import { cookies } from "next/headers"

interface User {
  id?: number
  firstname?: string
  lastname?: string
  email?: string
  phone?: string
  photo?: string
  coins?: number
  birthday?: string
  gender?: "MALE" | "FEMALE"
  region?: string
  createdAt?: string
}

interface AuthData {
  accessToken: string | null
  refreshToken: string | null
  user: User | null
  isAuthenticated: boolean
  prompt: "signin" | "signup" | null
}

export async function getAuthFromCookie(): Promise<AuthData> {
  const cookieStore = await cookies()
  const authCookie = cookieStore.get("auth-storage")

  if (!authCookie?.value) {
    return {
      accessToken: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,
      prompt: null,
    }
  }

  try {
    const authData = JSON.parse(authCookie.value)
    return authData.state || {
      accessToken: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,
      prompt: null,
    }
  } catch {
    return {
      accessToken: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,
      prompt: null,
    }
  }
}
