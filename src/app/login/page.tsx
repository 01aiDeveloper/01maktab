"use client"

import React, { useState, useCallback } from "react"
import { useTranslations } from "next-intl"
import api from "@/lib/api"
import { useAuthStore } from "@/store/auth-store"
import TelegramLoginButton from "@/components/auth/telegram-login-button"

function LoginContent() {
  const t = useTranslations("login")
  const { setTokens, setUser } = useAuthStore()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)


  const handleTelegramAuth = useCallback(async (user: {
    id: number
    first_name: string
    last_name?: string
    username?: string
    photo_url?: string
    auth_date: number
    hash: string
  }) => {
    setError(null)
    setIsLoading(true)


    try {
      const response = await api.post("/auth/telegram/login", user)

      if (response.data?.data) {
        const { accessToken, refreshToken, prompt } = response.data.data
        setTokens(accessToken, refreshToken, prompt)

        if (response.data.data.user) {
          setUser(response.data.data.user)
        }
      }

      window.location.href = "/classroom"
    } catch (err: any) {
      setError(err.response?.data?.message || t("errorDefault"))
      setIsLoading(false)
    }
  }, [setTokens, setUser])

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      {/* Logo */}
      <div className="mb-10 flex flex-col items-center">
        <span
          className="text-[#18181A]"
          style={{
            fontFamily: "'Suisse Intl', sans-serif",
            fontWeight: 600,
            fontSize: "34.58px",
            letterSpacing: "0%",
            lineHeight: 1,
          }}
        >
          01AI
        </span>
      </div>

      <div className="flex flex-col items-center text-center max-w-85 w-full">
        <h1 className="text-[28px] font-bold text-[#18181A] mb-3">{t("title")}</h1>
        <p className="text-[15px] text-[#18181A]/60 mb-8 leading-snug">
          {t("subtitle")}
        </p>

        <TelegramLoginButton onAuth={handleTelegramAuth} />

        {isLoading && (
          <p className="text-sm text-[#18181A]/40 mt-4">{t("loading")}</p>
        )}

        {error && (
          <p className="text-sm text-red-500 font-medium mt-4">{error}</p>
        )}
      </div>
    </div>
  )
}

export default function LoginPage() {
  return <LoginContent />
}
