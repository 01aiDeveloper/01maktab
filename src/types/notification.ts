import type { Uuid } from "@/types/api-contracts"

export interface Notification {
  id: Uuid
  targetId: Uuid | null
  photo: string | null
  title: string | null
  description: string | null
  body: string | null
  createdAt: string
  isRead: boolean
}

export interface NotificationEvent {
  type: "notification"
  data: Notification
}
