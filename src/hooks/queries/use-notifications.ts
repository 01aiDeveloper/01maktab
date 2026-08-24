import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@/constants/query-keys"
import { useAuth } from "@/hooks/common/use-auth"
import { notificationApi } from "@/services/react-query/notification"

export function useNotifications(pageNumber = 1, pageSize = 20) {
  return useQuery({
    queryKey: queryKeys.notifications.list(pageNumber, pageSize),
    queryFn: () => notificationApi.getList(pageNumber, pageSize),
    staleTime: 1000 * 60,
  })
}

export function useUnreadNotificationCount() {
  const { isAuthenticated } = useAuth()
  return useQuery({
    queryKey: queryKeys.notifications.unreadCount,
    queryFn: notificationApi.getUnreadCount,
    enabled: isAuthenticated,
    staleTime: 30_000,
    retry: false,
  })
}
