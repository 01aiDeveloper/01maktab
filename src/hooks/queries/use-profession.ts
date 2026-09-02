import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/common/use-auth';
import { courseApi } from '@/services/react-query/course';

export function useProfession(id: string | number) {
  const { accessToken } = useAuth();
  const isAuthenticated = Boolean(accessToken);

  return useQuery({
    queryKey: ['profession', String(id), isAuthenticated ? 'client' : 'public'],
    queryFn: () => courseApi.getProfession(id, isAuthenticated),
    enabled: !!id,
  });
}
