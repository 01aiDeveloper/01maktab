import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface AuthUser {
  id?: number
  firstname?: string
  lastname?: string
  email?: string
  phone?: string | number
  photo?: string
  coins?: number
  birthday?: string
  gender?: string
  region?: string
  createdAt?: string
}

export interface AuthState {
  accessToken: string | null
  refreshToken: string | null
  user: AuthUser | null
  isAuthenticated: boolean
  prompt: "signin" | "signup" | null
  hydrated: boolean
}

export const initialAuthState: AuthState = {
  accessToken: null,
  refreshToken: null,
  user: null,
  isAuthenticated: false,
  prompt: null,
  hydrated: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    hydrateAuth: (state, action: PayloadAction<Partial<AuthState>>) => ({
      ...state,
      ...action.payload,
      isAuthenticated: Boolean(action.payload.accessToken),
      hydrated: true,
    }),
    setTokens: (
      state,
      action: PayloadAction<{
        accessToken: string
        refreshToken: string
        prompt?: "signin" | "signup"
      }>,
    ) => {
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
      state.prompt = action.payload.prompt ?? "signin"
      state.isAuthenticated = true
    },
    setUser: (state, action: PayloadAction<AuthUser>) => {
      state.user = { ...state.user, ...action.payload }
    },
    clearAuth: (state) => ({ ...initialAuthState, hydrated: state.hydrated }),
    markHydrated: (state) => {
      state.hydrated = true
    },
  },
})

export const { clearAuth, hydrateAuth, markHydrated, setTokens, setUser } = authSlice.actions
export default authSlice.reducer
