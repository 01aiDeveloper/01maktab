import { useMutation, useQueryClient } from "@tanstack/react-query"
import { queryKeys } from "@/constants/query-keys"
import { notificationApi } from "@/services/react-query/notification"

export function useMarkNotificationAsRead() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (notificationId?: string) => notificationApi.markAsRead(notificationId),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["notifications"] }),
        queryClient.invalidateQueries({ queryKey: queryKeys.notifications.unreadCount }),
      ])
    },
  })
}
