import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import type { ApiResponse, ApiPresale } from '@/types/api';

export function usePresale(courseId: number | undefined) {
  return useQuery({
    queryKey: ['presale', courseId],
    queryFn: async () => {
      const res = await api.get<ApiResponse<ApiPresale>>(`/presales/${courseId}`);
      return res.data.data;
    },
    enabled: !!courseId,
    retry: false,
  });
}
