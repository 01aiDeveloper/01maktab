"use client"

import { useEffect, useRef, useState, useTransition } from "react"
import { createPortal } from "react-dom"
import { useRouter } from "next/navigation"
import { useLocale } from "next-intl"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Check } from "lucide-react"
import { setUserLocale } from "@/i18n/locale"
import type { Locale } from "@/i18n/config"

const options: { value: Locale; label: string; short: string }[] = [
  { value: "uz", label: "O'zbekcha", short: "UZ" },
  { value: "ru", label: "Русский", short: "RU" },
]

interface LanguageSwitcherProps {
  isDark?: boolean
}

export function LanguageSwitcher({ isDark = false }: LanguageSwitcherProps) {
  const locale = useLocale() as Locale
  const [isOpen, setIsOpen] = useState(false)
  const [coords, setCoords] = useState<{ top: number; right: number } | null>(null)
  const [mounted, setMounted] = useState(false)
  const [isPending, startTransition] = useTransition()
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const router = useRouter()

  useEffect(() => setMounted(true), [])

  const current = options.find((o) => o.value === locale) ?? options[0]

  const computeCoords = () => {
    const el = triggerRef.current
    if (!el) return null
    const rect = el.getBoundingClientRect()
    return { top: rect.bottom + 8, right: window.innerWidth - rect.right }
  }

  const toggleOpen = () => {
    if (!isOpen) {
      const c = computeCoords()
      if (c) setCoords(c)
    }
    setIsOpen((v) => !v)
  }

  useEffect(() => {
    if (!isOpen) return
    const onScroll = () => {
      const c = computeCoords()
      if (c) setCoords(c)
    }
    window.addEventListener("scroll", onScroll, true)
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll, true)
      window.removeEventListener("resize", onScroll)
    }
  }, [isOpen])

  const handleSelect = (value: Locale) => {
    setIsOpen(false)
    if (value === locale) return
    startTransition(async () => {
      await setUserLocale(value)
      router.refresh()
    })
  }

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={toggleOpen}
        disabled={isPending}
        className={`flex items-center gap-1.5 rounded-xl px-3 h-9 text-sm font-semibold transition-colors ${
          isDark
            ? "bg-white/10 text-white hover:bg-white/15"
            : "bg-black/5 text-[#18181A] hover:bg-black/10"
        } ${isPending ? "opacity-60" : ""}`}
        aria-label="Language"
      >
        <span className="tabular-nums">{current.short}</span>
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {isOpen && coords && (
              <>
                <div className="fixed inset-0 z-[100]" onClick={() => setIsOpen(false)} />
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.18 }}
                  className="fixed w-40 bg-white rounded-xl border border-gray-200 overflow-hidden z-[101] shadow-lg"
                  style={{ top: coords.top, right: coords.right }}
                >
                  {options.map((opt) => {
                    const active = opt.value === locale
                    return (
                      <button
                        key={opt.value}
                        onClick={() => handleSelect(opt.value)}
                        className="w-full flex items-center justify-between gap-2 py-2.5 px-3 hover:bg-gray-100 text-left"
                      >
                        <span className="text-sm text-gray-900">{opt.label}</span>
                        {active && <Check className="h-4 w-4 text-[#3B5BFF]" />}
                      </button>
                    )
                  })}
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  )
}
