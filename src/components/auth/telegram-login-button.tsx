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
  bgColor?: string
  className?: string
}

declare global {
  interface Window {
    onTelegramAuth: (user: TelegramUser) => void
  }
}

export default function TelegramLoginButton({ botUsername = "O1AI_Contact_Bot", onAuth }: TelegramLoginButtonProps) {
export default function TelegramLoginButton({
  botUsername = "O1AI_Contact_Bot",
  onAuth,
  bgColor = "#f8faff",
  className = "",
}: TelegramLoginButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.onTelegramAuth = onAuth

    const container = containerRef.current
    if (!container) return

    container.innerHTML = ""

    const applyIframeStyles = (iframe: HTMLIFrameElement) => {
      iframe.style.colorScheme = "only light"
      iframe.style.backgroundColor = bgColor
      iframe.style.setProperty("background-color", bgColor, "important")
      iframe.setAttribute("allowtransparency", "true")
    }

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node instanceof HTMLIFrameElement) {
            applyIframeStyles(node)
          } else if (node instanceof HTMLElement) {
            const iframes = node.querySelectorAll("iframe")
            iframes.forEach(applyIframeStyles)
          }
        }
      }
    })

    observer.observe(container, { childList: true, subtree: true })

    const script = document.createElement("script")
    script.src = "https://telegram.org/js/telegram-widget.js?23"
    script.async = true
    script.setAttribute("data-telegram-login", botUsername)
    script.setAttribute("data-size", "large")
    script.setAttribute("data-onauth", "onTelegramAuth(user)")
    script.setAttribute("data-request-access", "write")

    containerRef.current?.appendChild(script)
    container.appendChild(script)

    const timer = setInterval(() => {
      const iframes = container.querySelectorAll("iframe")
      if (iframes.length > 0) {
        iframes.forEach(applyIframeStyles)
      }
    }, 100)

    return () => {
      clearInterval(timer)
      observer.disconnect()
      delete (window as any).onTelegramAuth
      script.remove()
      if (container) {
        container.innerHTML = ""
      }
    }
  }, [botUsername, onAuth])
  }, [botUsername, onAuth, bgColor])

  return <div ref={containerRef} />
  return (
    <div
      ref={containerRef}
      className={`telegram-login-wrapper flex items-center justify-center [color-scheme:only_light] ${className}`}
      style={{
        colorScheme: "only light",
        // @ts-expect-error custom CSS property
        "--tg-bg": bgColor,
      }}
    />
  )
}
