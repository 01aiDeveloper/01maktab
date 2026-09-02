import type { RootState } from "@/store/store"

export const selectAuth = (state: RootState) => state.auth
export const selectAccessToken = (state: RootState) => state.auth.accessToken
export const selectCurrentUser = (state: RootState) => state.auth.user
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated
