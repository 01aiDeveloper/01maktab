import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import type { ApiResponse, ApiProfession } from '@/types/api';

export function useProfession(id: string | number) {
  return useQuery({
    queryKey: ['profession', String(id)],
    queryFn: async () => {
      const res = await api.get<ApiResponse<ApiProfession>>(`/course/profession/${id}/public`);
      return res.data.data;
    },
    enabled: !!id,
  });
}
