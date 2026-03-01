"use client"

import React, { useState, useEffect, useRef, Suspense } from "react"
import api from "@/lib/api"
import { cn } from "@/lib/utils"
import { useSearchParams } from "next/navigation"
import { useAuthStore } from "@/store/auth-store"

type AuthStep = "INITIAL" | "TELEGRAM_OTP"

function LoginContent() {
  const searchParams = useSearchParams()
  const { setTokens, setUser } = useAuthStore()
  const [step, setStep] = useState<AuthStep>("INITIAL")
  const [telegramOtp, setTelegramOtp] = useState(["", "", "", "", "", ""])
  const [error, setError] = useState<string | null>(null)
  const [isVerifying, setIsVerifying] = useState(false)
  const telegramOtpRefs = useRef<(HTMLInputElement | null)[]>([])
  const tgLinkRef = useRef<HTMLAnchorElement>(null)

  // Check for OTP in URL params (from Telegram bot)
  useEffect(() => {
    const otpFromUrl = searchParams.get("otp")
    if (otpFromUrl && otpFromUrl.length === 6) {
      setStep("TELEGRAM_OTP")
      setTelegramOtp(otpFromUrl.split(""))
    }
  }, [searchParams])

  // Auto-submit when all 6 digits entered
  useEffect(() => {
    if (telegramOtp.join("").length === 6 && step === "TELEGRAM_OTP") {
      handleTelegramOtpSubmit()
    }
  }, [telegramOtp])

  const handleTelegramOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value[0]
    if (!/^\d*$/.test(value)) return

    const newOtp = [...telegramOtp]
    newOtp[index] = value
    setTelegramOtp(newOtp)

    if (value && index < 5) {
      telegramOtpRefs.current[index + 1]?.focus()
    }
  }

  const handleTelegramOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !telegramOtp[index] && index > 0) {
      telegramOtpRefs.current[index - 1]?.focus()
    }
  }

  const handleTelegramOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6)
    if (!pasted) return
    const newOtp = ["", "", "", "", "", ""]
    pasted.split("").forEach((ch, i) => { newOtp[i] = ch })
    setTelegramOtp(newOtp)
    const nextIndex = Math.min(pasted.length, 5)
    telegramOtpRefs.current[nextIndex]?.focus()
  }

  const handleTelegramOtpSubmit = async () => {
    const code = telegramOtp.join("")
    if (code.length < 6 || isVerifying) return

    setError(null)
    setIsVerifying(true)

    try {
      const response = await api.post("/auth/telegram/signin", { code })

      if (response.data?.data) {
        const { accessToken, refreshToken, prompt } = response.data.data
        setTokens(accessToken, refreshToken, prompt)

        if (response.data.data.user) {
          setUser(response.data.data.user)
        }
      }

      window.location.href = "/classroom"
    } catch (err: any) {
      setError(err.response?.data?.message || "Noto'g'ri kod yoki kod muddati tugagan")
      setIsVerifying(false)
    }
  }

  const handleBotLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setStep("TELEGRAM_OTP")
    setTimeout(() => {
      telegramOtpRefs.current[0]?.focus()
    }, 100)
    // Open tg:// without navigating away
    const a = document.createElement("a")
    a.href = "tg://resolve?domain=maktab01bot"
    a.click()
  }

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
        <h1 className="text-[28px] font-bold text-[#18181A] mb-3">Kodni Kiriting</h1>
        <p className="text-[15px] text-[#18181A]/60 mb-8 leading-snug">
          <a
            href="tg://resolve?domain=maktab01bot"
            onClick={handleBotLinkClick}
            className="font-semibold text-[#18181A] underline underline-offset-2 cursor-pointer"
          >
            @maktab01bot
          </a>{" "}
          telegram botiga kiring va 1 daqiqalik kodingizni oling.
        </p>

        {step === "INITIAL" ? (
          /* Bo'sh OTP preview */
          <div className="flex gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="w-11.5 h-13.5 rounded-[14px] border-2 border-[#E5E5EA]"
              />
            ))}
          </div>
        ) : (
          /* Faol OTP inputlar */
          <>
            <div className="flex gap-2">
              {telegramOtp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => { telegramOtpRefs.current[i] = el }}
                  type="text"
                  inputMode="numeric"
                  value={digit}
                  onChange={(e) => handleTelegramOtpChange(i, e.target.value)}
                  onKeyDown={(e) => handleTelegramOtpKeyDown(i, e)}
                  onPaste={handleTelegramOtpPaste}
                  maxLength={1}
                  disabled={isVerifying}
                  className={cn(
                    "w-11.5 h-13.5 rounded-[14px] border-2 text-center text-[20px] font-bold outline-none transition-all caret-transparent",
                    isVerifying
                      ? "border-[#18181A] text-[#18181A]/40 bg-gray-50"
                      : error
                      ? "border-red-400 text-red-500 bg-red-50"
                      : digit
                      ? "border-[#18181A] text-[#18181A]"
                      : "border-[#E5E5EA] text-[#18181A] focus:border-[#18181A]"
                  )}
                />
              ))}
            </div>

            {error && (
              <p className="text-sm text-red-500 font-medium mt-4">{error}</p>
            )}

            {isVerifying && (
              <p className="text-sm text-[#18181A]/40 mt-4">Tekshirilmoqda...</p>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-[#18181A] border-t-transparent" />
      </div>
    }>
      <LoginContent />
    </Suspense>
  )
}
