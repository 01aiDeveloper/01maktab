import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/common/use-auth';
import { queryKeys } from '@/constants/query-keys';
import { userApi } from '@/services/react-query/user';

interface ProfileData {
  id?: number;
  firstname?: string;
  lastname?: string;
  email?: string;
  phone?: string | number;
  photo?: string;
  coins?: number;
  birthday?: string;
  gender?: string;
  createdAt?: string;
}

export function useProfile() {
  const setUser = useAuth((state) => state.setUser);
  const isAuthenticated = useAuth((state) => state.isAuthenticated);

  return useQuery<ProfileData>({
    queryKey: queryKeys.auth.me,
    queryFn: async () => {
      const data: ProfileData = await userApi.getMe();
      setUser(data);
      return data;
    },
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 5, // 5 min cache
  });
}
