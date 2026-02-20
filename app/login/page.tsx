"use client"

import React, { useState, useEffect, useRef, Suspense } from "react"
import { ArrowRight, Send } from "lucide-react"
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

  // Check for OTP in URL params (from Telegram bot)
  useEffect(() => {
    const otpFromUrl = searchParams.get("otp")
    if (otpFromUrl && otpFromUrl.length === 6) {
      setStep("TELEGRAM_OTP")
      setTelegramOtp(otpFromUrl.split(""))
    }
  }, [searchParams])

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

  const handleTelegramOtpSubmit = async () => {
    const code = telegramOtp.join("")
    if (code.length < 6 || isVerifying) return

    setError(null)
    setIsVerifying(true)

    try {
      const response = await api.post("/auth/telegram/signin", { code })

      // Save tokens and user data to store
      if (response.data?.data) {
        const { accessToken, refreshToken, prompt } = response.data.data

        // Save tokens to Zustand store (which will persist to localStorage)
        setTokens(accessToken, refreshToken, prompt)

        // If user data is provided, save it
        if (response.data.data.user) {
          setUser(response.data.data.user)
        }
      }

      // Redirect to home page - modal will handle profile setup if needed
      window.location.href = "/"
    } catch (err: any) {
      setError(err.response?.data?.message || "Noto'g'ri kod yoki kod muddati tugagan")
      console.log("Telegram verification failed", err)
    } finally {
      setIsVerifying(false)
    }
  }

  const handleTelegramLogin = () => {
    // Redirect to Telegram bot
    window.open("https://t.me/maktab01bot", "_blank")
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div
        className={cn(
          "w-full bg-white rounded-[40px] shadow-sm p-8 md:p-12 flex flex-col items-center transition-all duration-300",
          "max-w-[440px]",
        )}
      >
        <>
            {/* Logo */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">01MAKTAB</h1>
            </div>

            {step === "TELEGRAM_OTP" ? (
              <>
                <h2 className="text-xl font-medium text-gray-800 mb-2">Telegram kodini kiriting</h2>
                <p className="text-sm text-gray-500 mb-4 text-center">
                  Telegram botdan olingan 6 raqamli kodni kiriting
                </p>

                {error && <p className="text-sm text-red-500 font-medium mb-6">{error}</p>}

                <div className="flex gap-2 mb-8">
                  {telegramOtp.map((digit, i) => (
                    <input
                      key={i}
                      ref={(el) => (telegramOtpRefs.current[i] = el)}
                      type="text"
                      value={digit}
                      onChange={(e) => handleTelegramOtpChange(i, e.target.value)}
                      onKeyDown={(e) => handleTelegramOtpKeyDown(i, e)}
                      className={cn(
                        "w-12 h-14 border rounded-xl text-center text-xl font-bold outline-none transition-all",
                        error ? "border-red-500 text-red-500" : "border-gray-200 focus:border-gray-400",
                      )}
                    />
                  ))}
                </div>

                <button
                  onClick={handleTelegramOtpSubmit}
                  className={cn(
                    "w-full py-4 rounded-2xl flex items-center justify-center gap-2 font-medium transition-all mb-6",
                    telegramOtp.join("").length === 6 && !isVerifying
                      ? "bg-gray-900 text-white"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed",
                  )}
                  disabled={telegramOtp.join("").length < 6 || isVerifying}
                >
                  {isVerifying ? "Tekshirilmoqda..." : "Kirish"}
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  onClick={() => setStep("INITIAL")}
                  className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
                >
                  Orqaga qaytish
                </button>
              </>
            ) : (
              <>
                <h2 className="text-xl font-medium text-gray-800 mb-8">
                  Tizimga kirish
                </h2>

                <div className="w-full">
                  <button
                    onClick={handleTelegramLogin}
                    className="w-full bg-[#54A9EB] text-white font-medium py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-[#4a96d1] transition-colors"
                  >
                    <Send className="w-5 h-5 fill-current" />
                    Telegram bilan kirish
                  </button>
                </div>
              </>
            )}
          </>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  )
}
