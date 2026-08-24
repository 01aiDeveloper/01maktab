import { useQuery } from '@tanstack/react-query';
import { courseApi } from '@/services/react-query/course';

export function useSkill(id: string | number) {
  return useQuery({
    queryKey: ['skill', String(id)],
    queryFn: () => courseApi.getSkill(id),
    enabled: !!id,
  });
}
