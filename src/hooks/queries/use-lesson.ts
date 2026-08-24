import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import type { ApiResponse } from '@/types/api';
import type { Lesson } from '@/types/lesson';

export function useLesson(id: string | number) {
  return useQuery({
    queryKey: ['lesson', String(id)],
    queryFn: async () => {
      const res = await api.get<ApiResponse<Lesson>>(`/lesson/${id}`);
      return res.data.data;
    },
    enabled: !!id,
    retry: (failureCount, error: any) => {
      // 401 da retry qilmaymiz
      if (error?.response?.status === 401) return false;
      return failureCount < 1;
    },
  });
}
