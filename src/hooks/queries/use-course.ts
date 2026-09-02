import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/common/use-auth';
import { queryKeys } from '@/constants/query-keys';
import { courseApi } from '@/services/react-query/course';

export function useCourse(id: string | number) {
  const { accessToken } = useAuth();
  const isAuthenticated = Boolean(accessToken);

  return useQuery({
    queryKey: [...queryKeys.course.detail(id), isAuthenticated ? 'client' : 'public'],
    queryFn: () => courseApi.getCourse(id, isAuthenticated),
    enabled: !!id,
  });
}
