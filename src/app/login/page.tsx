"use client"

import React, { useState, useCallback } from "react"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { authApi } from "@/services/react-query/auth"
import { useAuth } from "@/hooks/common/use-auth"
import TelegramLoginButton from "@/components/auth/telegram-login-button"

function LoginContent() {
  const t = useTranslations("login")
  const router = useRouter()
  const { setTokens, setUser } = useAuth()
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
      const data = await authApi.telegramLogin(user)

      if (data) {
        const { accessToken, refreshToken, prompt } = data
        setTokens(accessToken, refreshToken, prompt)

        if (data.user) {
          setUser(data.user)
        }
      }

      router.push("/classroom")
    } catch (err: any) {
      setError(err.response?.data?.message || t("errorDefault"))
      setIsLoading(false)
    }
  }, [router, setTokens, setUser, t])

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="flex flex-col items-center text-center">
        <h1 className="mb-2 text-2xl font-semibold text-[#18181A]">{t("title")}</h1>
        <p className="mb-8 text-sm text-[#18181A]/60">{t("subtitle")}</p>

        <TelegramLoginButton onAuth={handleTelegramAuth} bgColor="#ffffff" />

        {isLoading && <p className="mt-4 text-sm text-[#18181A]/40">{t("loading")}</p>}
        {error && <p className="mt-4 max-w-xs text-sm font-medium text-red-500">{error}</p>}
      </div>
    </main>
  )
}

export default function LoginPage() {
  return <LoginContent />
}
