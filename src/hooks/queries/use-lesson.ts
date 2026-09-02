import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/constants/query-keys';
import { learningApi } from '@/services/react-query/learning';

export function useLesson(id: string | number) {
  return useQuery({
    queryKey: queryKeys.lesson.detail(id),
    queryFn: () => learningApi.getLesson(id),
    enabled: !!id,
    retry: (failureCount, error: any) => {
      // 401 da retry qilmaymiz
      if (error?.response?.status === 401) return false;
      return failureCount < 1;
    },
  });
}
