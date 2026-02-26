import { useQuery } from '@tanstack/react-query'
import api from '@/lib/api'
import { useAuthStore } from '@/store/auth-store'

export function useMe() {
  const { accessToken, user, setUser } = useAuthStore()

  return useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const res = await api.get('/user/me')
      const data = res.data?.data
      if (data) setUser(data)
      return data
    },
    enabled: !!accessToken && !user,
    staleTime: Infinity,
    retry: false,
  })
}
