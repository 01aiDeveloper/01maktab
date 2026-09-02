"use client"

import { useEffect, type ReactNode } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { queryKeys } from "@/constants/query-keys"
import type { NotificationEvent } from "@/types/notification"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://app-dev.01ai.uz/api/v1"

export default function NotificationStreamProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient()

  useEffect(() => {
    const eventSource = new EventSource(`${API_BASE_URL}/notification/stream`)
    eventSource.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data) as NotificationEvent
        if (payload.type !== "notification") return
        void queryClient.invalidateQueries({ queryKey: ["notifications"] })
        void queryClient.invalidateQueries({ queryKey: queryKeys.notifications.unreadCount })
      } catch {
        // Invalid events are ignored; EventSource keeps the connection alive.
      }
    }
    return () => eventSource.close()
  }, [queryClient])

  return children
}
