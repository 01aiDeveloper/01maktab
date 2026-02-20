import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import type { ApiResponse, ApiCourse } from '@/types/api';

export function useCourse(id: string | number) {
  return useQuery({
    queryKey: ['course', String(id)],
    queryFn: async () => {
      const res = await api.get<ApiResponse<ApiCourse>>(`/course/${id}/public`);
      return res.data.data;
    },
    enabled: !!id,
  });
}
