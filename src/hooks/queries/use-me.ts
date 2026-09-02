import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@/hooks/common/use-auth'
import { queryKeys } from '@/constants/query-keys'
import { userApi } from '@/services/react-query/user'

export function useMe() {
  const { accessToken, user, setUser } = useAuth()

  return useQuery({
    queryKey: queryKeys.auth.me,
    queryFn: async () => {
      const data = await userApi.getMe()
      if (data) setUser(data)
      return data
    },
    enabled: !!accessToken && !user,
    staleTime: Infinity,
    retry: false,
  })
}
