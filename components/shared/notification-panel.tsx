"use client"

import type { ReactNode } from "react"
import { useState, useRef, useEffect } from "react"
import { Bell, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslations } from "next-intl"

type Tab = "all" | "courses" | "events"

interface NotificationItem {
  id: string
  category: "courses" | "events"
  group: "week" | "month"
  text: ReactNode
  time: string
  unread?: boolean
}

interface NotificationPanelProps {
  isDark?: boolean
}

export function NotificationPanel({ isDark = true }: NotificationPanelProps) {
  const t = useTranslations("notifications")
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>("all")
  const panelRef = useRef<HTMLDivElement>(null)

  const items: NotificationItem[] = [
    {
      id: "1",
      category: "courses",
      group: "week",
      text: (
        <>
          {t("waitlistAvailablePrefix")} <b>AI Ijodkor</b> {t("waitlistAvailableSuffix")}
        </>
      ),
      time: t("hoursAgo", { n: 2 }),
      unread: true,
    },
    {
      id: "2",
      category: "courses",
      group: "week",
      text: (
        <>
          <b>ML Engineer</b> {t("homeworkAvailable")}
        </>
      ),
      time: t("daysAgo", { n: 1 }),
      unread: true,
    },
    {
      id: "3",
      category: "courses",
      group: "week",
      text: (
        <>
          {t("newPresalePrefix")} <b>AI in Startup</b> {t("newPresaleSuffix")}
        </>
      ),
      time: t("daysAgo", { n: 3 }),
      unread: true,
    },
    {
      id: "4",
      category: "courses",
      group: "month",
      text: (
        <>
          {t("reminder")} <b>ML Engineer</b> {t("finalDeadline", { date: "20 Mart" })}
        </>
      ),
      time: "May 18",
    },
    {
      id: "5",
      category: "courses",
      group: "month",
      text: <>{t("balanceAdded", { amount: 200 })}</>,
      time: "May 12",
    },
    {
      id: "6",
      category: "events",
      group: "month",
      text: (
        <>
          {t("hackathonPrefix")} <b>AI Hackathon</b> {t("hackathonSuffix")}
        </>
      ),
      time: "May 08",
    },
  ]

  const unreadCount = items.filter((i) => i.unread).length

  const filtered = items.filter((i) =>
    activeTab === "all" ? true : i.category === activeTab,
  )
  const week = filtered.filter((i) => i.group === "week")
  const month = filtered.filter((i) => i.group === "month")

  useEffect(() => {
    if (!open) return
    function onClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", onClickOutside)
    return () => document.removeEventListener("mousedown", onClickOutside)
  }, [open])

  return (
    <div className="relative" ref={panelRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t("title")}
        className={`relative flex items-center justify-center w-9 h-9 rounded-xl transition-colors ${
          isDark
            ? "bg-white/10 hover:bg-white/20 text-white"
            : "bg-black/5 hover:bg-black/10 text-[#18181A]"
        }`}
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full right-0 mt-3 w-[420px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl border border-gray-100 shadow-xl z-50 overflow-hidden"
          >
            <div className="flex items-center justify-between px-5 pt-5 pb-3">
              <h3 className="text-2xl font-bold text-[#18181A]">{t("title")}</h3>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-500 hover:text-gray-900 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-5">
              <div className="inline-flex items-center gap-1 bg-[#F4F4F6] rounded-full p-1">
                {(["all", "courses", "events"] as Tab[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      activeTab === tab
                        ? "bg-[#18181A] text-white"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {t(`tabs.${tab}`)}
                  </button>
                ))}
              </div>
            </div>

            <div className="max-h-[480px] overflow-y-auto px-5 py-4 space-y-5">
              {week.length > 0 && (
                <div>
                  <p className="text-base font-bold text-[#18181A] mb-2">{t("week")}</p>
                  <ul className="space-y-3">
                    {week.map((n) => (
                      <NotificationRow key={n.id} item={n} />
                    ))}
                  </ul>
                </div>
              )}

              {month.length > 0 && (
                <div>
                  <p className="text-base font-bold text-[#18181A] mb-2">{t("month")}</p>
                  <ul className="space-y-3">
                    {month.map((n) => (
                      <NotificationRow key={n.id} item={n} />
                    ))}
                  </ul>
                </div>
              )}

              {filtered.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-6">{t("empty")}</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function NotificationRow({ item }: { item: NotificationItem }) {
  return (
    <li className="flex items-start justify-between gap-3">
      <div className="flex-1 min-w-0">
        <p className="text-sm text-[#18181A] leading-snug">{item.text}</p>
        <p className="text-xs text-gray-500 mt-1">{item.time}</p>
      </div>
      <span
        className={`mt-1 w-4 h-4 rounded-md shrink-0 ${
          item.unread ? "bg-[#3B5BFF]" : "bg-[#E5E7EB]"
        }`}
        aria-hidden
      />
    </li>
  )
}
