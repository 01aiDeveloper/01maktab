import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/constants/query-keys';
import { courseApi } from '@/services/react-query/course';

export function useCourse(id: string | number) {
  return useQuery({
    queryKey: queryKeys.course.detail(id),
    queryFn: () => courseApi.getCourse(id),
    enabled: !!id,
  });
}
