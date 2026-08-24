"use client"

import { useCallback } from "react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { selectAuth } from "@/store/selectors"
import {
  clearAuth,
  setTokens,
  setUser,
  type AuthUser,
} from "@/store/features/auth/auth-slice"

export type AuthController = ReturnType<typeof useAuthController>

function useAuthController() {
  const auth = useAppSelector(selectAuth)
  const dispatch = useAppDispatch()

  const updateTokens = useCallback(
    (accessToken: string, refreshToken: string, prompt: "signin" | "signup" = "signin") =>
      dispatch(setTokens({ accessToken, refreshToken, prompt })),
    [dispatch],
  )
  const updateUser = useCallback((user: AuthUser) => dispatch(setUser(user)), [dispatch])
  const resetAuth = useCallback(() => dispatch(clearAuth()), [dispatch])

  return {
    ...auth,
    setTokens: updateTokens,
    setUser: updateUser,
    logout: resetAuth,
    clearAuth: resetAuth,
  }
}

export function useAuth(): AuthController
export function useAuth<TResult>(selector: (auth: AuthController) => TResult): TResult
export function useAuth<TResult>(selector?: (auth: AuthController) => TResult) {
  const auth = useAuthController()
  return selector ? selector(auth) : auth
}
