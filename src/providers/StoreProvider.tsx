"use client"

import Cookies from "js-cookie"
import { useEffect, type ReactNode } from "react"
import { Provider } from "react-redux"
import {
  hydrateAuth,
  markHydrated,
  setTokens,
  setUser,
  type AuthState,
} from "@/store/features/auth/auth-slice"
import { store } from "@/store/store"

const AUTH_COOKIE = "auth-storage"

function readPersistedAuth(): Partial<AuthState> | null {
  const raw = Cookies.get(AUTH_COOKIE)
  if (!raw) return null

  try {
    const parsed = JSON.parse(raw)
    return parsed?.state ?? parsed
  } catch {
    Cookies.remove(AUTH_COOKIE, { path: "/" })
    return null
  }
}

export default function StoreProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const persisted = readPersistedAuth()
    if (persisted) store.dispatch(hydrateAuth(persisted))
    else store.dispatch(markHydrated())

    const devToken = process.env.NEXT_PUBLIC_DEV_ACCESS_TOKEN
    if (process.env.NEXT_PUBLIC_DEV_STAGE === "true" && devToken) {
      store.dispatch(
        setTokens({
          accessToken: devToken,
          refreshToken: process.env.NEXT_PUBLIC_DEV_REFRESH_TOKEN || "dev-refresh-token",
        }),
      )
      if (!store.getState().auth.user) {
        store.dispatch(
          setUser({
            id: 10,
            firstname: "Jasurbek",
            lastname: "Xakimbekov",
            phone: "998999847766",
            coins: 2000,
            gender: "MALE",
            createdAt: "2026-04-15T09:27:57.264Z",
          }),
        )
      }
    }

    const persist = () => {
      const { hydrated: _hydrated, ...auth } = store.getState().auth
      Cookies.set(AUTH_COOKIE, JSON.stringify({ state: auth, version: 0 }), {
        expires: 30,
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      })
    }
    persist()
    return store.subscribe(persist)
  }, [])

  return <Provider store={store}>{children}</Provider>
}
