import api from "@/services/api"
import type { Notification } from "@/types/notification"
import { unwrapApiData, unwrapPaginatedData } from "@/types/api-contracts"

export const notificationApi = {
  async getList(pageNumber = 1, pageSize = 20) {
    const response = await api.get("/notification", { params: { pageNumber, pageSize } })
    return unwrapPaginatedData<Notification>(response.data)
  },
  async getUnreadCount() {
    const response = await api.get("/notification/unread-count")
    return unwrapApiData<{ count: number }>(response.data).count
  },
  async markAsRead(notificationId?: string) {
    const response = await api.post("/notification/mark-as-read", notificationId ? { notificationId } : {})
    return response.data?.data ?? response.data
  },
}
