"use client"

import React, { useState, useCallback } from "react"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { authApi } from "@/services/react-query/auth"
import { useAuth } from "@/hooks/common/use-auth"
import TelegramLoginButton from "@/components/auth/telegram-login-button"
import { ArrowUpRight, Check, ShieldCheck } from "lucide-react"

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
    <main className="relative min-h-screen overflow-hidden bg-[#eef3ff] px-4 py-8 text-[#18181A] sm:px-6">
      <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#9bb3ff]/40 blur-3xl" />
      <div className="absolute -bottom-40 -right-24 h-[30rem] w-[30rem] rounded-full bg-[#c5a8ff]/30 blur-3xl" />
      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/60" />

      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-[32px] border border-white/80 bg-white/65 shadow-[0_30px_90px_rgba(55,74,145,0.18)] backdrop-blur-xl lg:grid-cols-[0.9fr_1.1fr]">
          <div className="hidden flex-col justify-between bg-[#172451] p-10 text-white lg:flex xl:p-14">
            <div>
              <div className="mb-20 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-sm font-black text-[#172451]">01</span>
                <span className="text-2xl font-bold tracking-[-0.06em]">01AI</span>
              </div>
              <p className="mb-5 text-sm font-medium uppercase tracking-[0.2em] text-white/45">Learning, reimagined</p>
              <h2 className="max-w-sm text-4xl font-semibold leading-[1.05] tracking-[-0.06em] xl:text-5xl">
                Bilimingizni keyingi bosqichga olib chiqing.
              </h2>
            </div>
            <div className="flex items-center gap-3 text-sm text-white/60">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10"><Check className="h-4 w-4 text-[#a9c0ff]" /></span>
              Bitta akkaunt. Barcha imkoniyatlar.
            </div>
          </div>

          <section className="flex min-h-[580px] flex-col items-center justify-center px-6 py-12 text-center sm:px-12">
            <div className="mb-10 flex items-center gap-2 lg:hidden">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#172451] text-xs font-black text-white">01</span>
              <span className="text-2xl font-bold tracking-[-0.06em]">01AI</span>
            </div>
            <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-[22px] bg-gradient-to-br from-[#2a51e6] to-[#7d91ff] shadow-[0_12px_30px_rgba(42,81,230,0.3)]">
              <ArrowUpRight className="h-8 w-8 text-white" strokeWidth={1.8} />
            </div>
            <h1 className="max-w-md text-3xl font-bold tracking-[-0.05em] sm:text-4xl">{t("title")}</h1>
            <p className="mt-4 max-w-sm text-[15px] leading-6 text-[#18181A]/55">{t("subtitle")}</p>

            <div className="mt-9 flex min-h-12 min-w-[220px] items-center justify-center rounded-2xl border border-[#dce3f5] bg-[#f8faff] px-5 py-3 shadow-sm transition hover:border-[#aebfff] hover:shadow-md">
              <TelegramLoginButton onAuth={handleTelegramAuth} />
            <div className="mt-9 flex min-h-12 min-w-[220px] items-center justify-center rounded-2xl border border-[#dce3f5] bg-[#f8faff] px-5 py-3 shadow-sm transition hover:border-[#aebfff] hover:shadow-md [color-scheme:only_light]">
              <TelegramLoginButton onAuth={handleTelegramAuth} bgColor="#f8faff" />
            </div>

            {isLoading && <p className="mt-4 text-sm text-[#18181A]/45">{t("loading")}</p>}
            {error && <p className="mt-4 max-w-xs text-sm font-medium text-red-500">{error}</p>}

            <div className="mt-10 flex items-center gap-2 text-xs text-[#18181A]/45">
              <ShieldCheck className="h-4 w-4 text-[#2a51e6]" />
              Telegram orqali xavfsiz kirish
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

export default function LoginPage() {
  return <LoginContent />
}
