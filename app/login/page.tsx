"use client"

import type React from "react"
import { ProfileSetup } from "@/components/auth/profile-setup"

import { useState, useEffect, useRef } from "react"
import { ArrowRight, Send } from "lucide-react"
import api from "@/lib/api"
import { cn } from "@/lib/utils"

type AuthStep = "INITIAL" | "OTP" | "PROFILE"
type LoginMethod = "phone" | "email"

export default function LoginPage() {
  const [step, setStep] = useState<AuthStep>("INITIAL")
  const [method, setMethod] = useState<LoginMethod>("phone")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [error, setError] = useState<string | null>(null)
  const [timer, setTimer] = useState(88) // 1:28 = 88 seconds
  const otpRefs = useRef<(HTMLInputElement | null)[]>([])

  // Timer logic for OTP
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (step === "OTP" && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [step, timer])

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Simple mask logic for (__) ___-__-__
    const val = e.target.value.replace(/\D/g, "")
    if (val.length <= 9) {
      setPhone(val)
    }
  }

  const formatPhoneDisplay = (val: string) => {
    const mask = "(__) ___-__-__"
    let formatted = mask
    for (let i = 0; i < val.length; i++) {
      formatted = formatted.replace("_", val[i])
    }
    return formatted
  }

  const handleInitialSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      // Demo API request
      await api.post("/auth/login", {
        type: method,
        identifier: method === "phone" ? `+998${phone}` : email,
      })
      setStep("OTP")
    } catch (err) {
      // For demo purposes, we move to OTP even if it fails, or show local fallback
      setStep("OTP")
      console.log("API request failed, using demo fallback", err)
    }
  }

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value[0]
    if (!/^\d*$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus()
    }
  }

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus()
    }
  }

  const handleOtpSubmit = async () => {
    const code = otp.join("")
    if (code.length < 6) return

    try {
      await api.post("/auth/verify", { code })
      setStep("PROFILE")
    } catch (err) {
      setError("Noto'g'ri kod")
      console.log("Verification failed", err)
      // For demo purposes, we still move forward
      setStep("PROFILE")
    }
  }

  const handleProfileComplete = (data: any) => {
    console.log("Profile data complete:", data)
    alert("Ro'yxatdan o'tish yakunlandi!")
    window.location.href = "/"
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div
        className={cn(
          "w-full bg-white rounded-[40px] shadow-sm p-8 md:p-12 flex flex-col items-center transition-all duration-300",
          step === "PROFILE" ? "max-w-[480px]" : "max-w-[440px]",
        )}
      >
        {step === "PROFILE" ? (
          <ProfileSetup onBack={() => setStep("OTP")} onComplete={handleProfileComplete} />
        ) : (
          <>
            {/* Logo */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">01MAKTAB</h1>
            </div>

            {step === "INITIAL" ? (
              <>
                <h2 className="text-xl font-medium text-gray-800 mb-6">
                  {method === "phone" ? "Telefon orqali kirish" : "Pochta orqali kirish"}
                </h2>

                {/* Tabs */}
                <div className="w-full bg-gray-100 rounded-xl p-1 flex mb-8">
                  <button
                    onClick={() => setMethod("phone")}
                    className={cn(
                      "flex-1 py-2.5 text-sm font-medium rounded-lg transition-all",
                      method === "phone" ? "bg-white shadow-sm text-gray-900" : "text-gray-500",
                    )}
                  >
                    Telefon
                  </button>
                  <button
                    onClick={() => setMethod("email")}
                    className={cn(
                      "flex-1 py-2.5 text-sm font-medium rounded-lg transition-all",
                      method === "email" ? "bg-white shadow-sm text-gray-900" : "text-gray-500",
                    )}
                  >
                    Pochta
                  </button>
                </div>

                <form onSubmit={handleInitialSubmit} className="w-full space-y-6">
                  {method === "phone" ? (
                    <div className="space-y-2">
                      <label className="text-sm text-gray-600 ml-1">Telefon raqami</label>
                      <div className="relative flex items-center border border-gray-200 rounded-xl p-3 focus-within:ring-2 focus-within:ring-gray-100 transition-all">
                        <div className="flex items-center gap-2 pr-3 border-r border-gray-100 mr-3">
                          <img src="https://flagcdn.com/uz.svg" alt="UZ" className="w-6 h-4 rounded-sm object-cover" />
                          <span className="text-gray-900 font-medium">+998</span>
                        </div>
                        <input
                          type="text"
                          value={formatPhoneDisplay(phone)}
                          onChange={handlePhoneChange}
                          className="flex-1 bg-transparent border-none outline-none text-gray-900 tracking-wider font-medium"
                          placeholder="(__) ___-__-__"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <label className="text-sm text-gray-600 ml-1">Email manzili</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-gray-100 outline-none transition-all font-medium"
                        placeholder="example@mail.com"
                        required
                      />
                    </div>
                  )}

                  <p className="text-[11px] leading-relaxed text-gray-400 text-center px-2">
                    Tugmani bosib, siz{" "}
                    <a href="#" className="underline">
                      shaxsiy ma'lumotlarni qayta ishlash shartlari
                    </a>{" "}
                    va{" "}
                    <a href="#" className="underline">
                      ommaviy taklif
                    </a>{" "}
                    bilan rozilik bildirasiz
                  </p>

                  <button
                    type="submit"
                    className="w-full bg-gray-200 text-gray-600 font-semibold py-4 rounded-2xl hover:bg-gray-300 transition-colors"
                  >
                    Kirish
                  </button>
                </form>

                <div className="w-full mt-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-px bg-gray-100 flex-1" />
                    <span className="text-xs font-medium text-gray-400 uppercase tracking-widest">Tez kirish</span>
                    <div className="h-px bg-gray-100 flex-1" />
                  </div>

                  <button className="w-full bg-[#54A9EB] text-white font-medium py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-[#4a96d1] transition-colors">
                    <Send className="w-5 h-5 fill-current" />
                    Telegram bilan kirish
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-xl font-medium text-gray-800 mb-2">Telefon raqamini tasdiqlang</h2>
                <p className="text-sm text-gray-500 mb-4 text-center">
                  Raqamiga yuborildi: +998 {phone.slice(0, 2)} {phone.slice(2, 5)} {phone.slice(5, 7)}{" "}
                  {phone.slice(7, 9)}
                </p>

                {error && <p className="text-sm text-red-500 font-medium mb-6">{error}</p>}

                <div className="flex gap-2 mb-8">
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      ref={(el) => (otpRefs.current[i] = el)}
                      type="text"
                      value={digit}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(i, e)}
                      className={cn(
                        "w-12 h-14 border rounded-xl text-center text-xl font-bold outline-none transition-all",
                        error ? "border-red-500 text-red-500" : "border-gray-200 focus:border-gray-400",
                      )}
                    />
                  ))}
                </div>

                <button
                  onClick={handleOtpSubmit}
                  className={cn(
                    "w-full py-4 rounded-2xl flex items-center justify-center gap-2 font-medium transition-all mb-6",
                    otp.join("").length === 6
                      ? "bg-gray-900 text-white"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed",
                  )}
                  disabled={otp.join("").length < 6}
                >
                  Keyingisi
                  <ArrowRight className="w-5 h-5" />
                </button>

                <p className="text-sm text-gray-400">Yangi kod olish: {formatTimer(timer)}</p>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}
