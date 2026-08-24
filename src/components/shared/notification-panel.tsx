"use client"

import { useEffect, useRef, useState } from "react"
import { Bell, X } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { useMarkNotificationAsRead } from "@/hooks/mutations/use-notifications"
import { useNotifications, useUnreadNotificationCount } from "@/hooks/queries/use-notifications"
import type { Notification } from "@/types/notification"

interface NotificationPanelProps {
  isDark?: boolean
}

function formatNotificationTime(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ""
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)
}

export function NotificationPanel({ isDark = true }: NotificationPanelProps) {
  const t = useTranslations("notifications")
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const notifications = useNotifications()
  const unread = useUnreadNotificationCount()
  const markAsRead = useMarkNotificationAsRead()
  const items = notifications.data?.data ?? []

  useEffect(() => {
    if (!open) return
    function onClickOutside(event: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", onClickOutside)
    return () => document.removeEventListener("mousedown", onClickOutside)
  }, [open])

  return (
    <div className="relative" ref={panelRef}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={t("title")}
        className={`relative flex items-center justify-center w-9 h-9 rounded-xl transition-colors ${
          isDark ? "bg-white/10 hover:bg-white/20 text-white" : "bg-black/5 hover:bg-black/10 text-[#18181A]"
        }`}
      >
        <Bell className="w-5 h-5" />
        {(unread.data ?? 0) > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
            {unread.data}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.25, ease: "easeOut" }}
            className="fixed top-0 right-0 bottom-0 h-screen w-full max-w-[480px] bg-white shadow-2xl z-50 flex flex-col"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
              <h3 className="text-2xl font-bold text-[#18181A]">{t("title")}</h3>
              <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-gray-900" aria-label="Close">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {notifications.isLoading && <p className="text-sm text-gray-500 text-center py-8">Loading...</p>}
              {notifications.isError && <p className="text-sm text-red-500 text-center py-8">{t("empty")}</p>}
              {!notifications.isLoading && !notifications.isError && items.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-8">{t("empty")}</p>
              )}
              <ul className="space-y-4">
                {items.map((item) => (
                  <NotificationRow key={item.id} item={item} onRead={(id) => markAsRead.mutate(id)} />
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function NotificationRow({ item, onRead }: { item: Notification; onRead: (id: string) => void }) {
  return (
    <li>
      <button
        type="button"
        onClick={() => !item.isRead && onRead(item.id)}
        className="w-full flex items-start justify-between gap-3 text-left"
      >
        <div className="flex-1 min-w-0">
          {item.title && <p className="text-sm font-semibold text-[#18181A]">{item.title}</p>}
          <p className="text-sm text-[#18181A] leading-snug">{item.description || item.body || ""}</p>
          <p className="text-xs text-gray-500 mt-1">{formatNotificationTime(item.createdAt)}</p>
        </div>
        <span
          className={`mt-1 w-4 h-4 rounded-md shrink-0 ${item.isRead ? "bg-[#E5E7EB]" : "bg-[#3B5BFF]"}`}
          aria-hidden
        />
      </button>
    </li>
  )
}
