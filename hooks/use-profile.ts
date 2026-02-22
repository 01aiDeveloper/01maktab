import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { useAuthStore } from '@/store/auth-store';

interface ProfileData {
  id?: number;
  firstname?: string;
  lastname?: string;
  email?: string;
  phone?: string | number;
  avatar?: string;
  coins?: number;
  birthday?: string;
  gender?: string;
  createdAt?: string;
}

export function useProfile() {
  const setUser = useAuthStore((state) => state.setUser);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return useQuery<ProfileData>({
    queryKey: ['profile', 'me'],
    queryFn: async () => {
      const res = await api.get('/user/me');
      const data: ProfileData = res.data?.data ?? res.data;
      setUser(data);
      return data;
    },
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 5, // 5 min cache
  });
}
