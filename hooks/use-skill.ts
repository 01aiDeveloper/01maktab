import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import type { ApiResponse, ApiSkill } from '@/types/api';

export function useSkill(id: string | number) {
  return useQuery({
    queryKey: ['skill', String(id)],
    queryFn: async () => {
      const res = await api.get<ApiResponse<ApiSkill>>(`/course/skill/${id}/public`);
      return res.data.data;
    },
    enabled: !!id,
  });
}
