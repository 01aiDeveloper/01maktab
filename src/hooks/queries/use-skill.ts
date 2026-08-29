import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/common/use-auth';
import { courseApi } from '@/services/react-query/course';

export function useSkill(id: string | number) {
  const { accessToken } = useAuth();
  const isAuthenticated = Boolean(accessToken);

  return useQuery({
    queryKey: ['skill', String(id), isAuthenticated ? 'client' : 'public'],
    queryFn: () => courseApi.getSkill(id, isAuthenticated),
    enabled: !!id,
  });
}
