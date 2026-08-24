"use client"

import { useEffect, useRef } from "react"

interface TelegramUser {
  id: number
  first_name: string
  last_name?: string
  username?: string
  photo_url?: string
  auth_date: number
  hash: string
}

interface TelegramLoginButtonProps {
  botUsername?: string
  onAuth: (user: TelegramUser) => void
}

declare global {
  interface Window {
    onTelegramAuth: (user: TelegramUser) => void
  }
}

export default function TelegramLoginButton({ botUsername = "O1AI_Contact_Bot", onAuth }: TelegramLoginButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.onTelegramAuth = onAuth

    const script = document.createElement("script")
    script.src = "https://telegram.org/js/telegram-widget.js?23"
    script.async = true
    script.setAttribute("data-telegram-login", botUsername)
    script.setAttribute("data-size", "large")
    script.setAttribute("data-onauth", "onTelegramAuth(user)")
    script.setAttribute("data-request-access", "write")

    containerRef.current?.appendChild(script)

    return () => {
      delete (window as any).onTelegramAuth
      script.remove()
    }
  }, [onAuth])

  return <div ref={containerRef} />
}
