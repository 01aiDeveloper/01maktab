import { useQuery } from '@tanstack/react-query';
import { courseApi } from '@/services/react-query/course';

export function useProfession(id: string | number) {
  return useQuery({
    queryKey: ['profession', String(id)],
    queryFn: () => courseApi.getProfession(id),
    enabled: !!id,
  });
}
