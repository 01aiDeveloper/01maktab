import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import type { ApiResponse, ApiWaitlistEntry } from '@/types/api';

export function useMyWaitlist() {
  return useQuery({
    queryKey: ['my-waitlist'],
    queryFn: async () => {
      const res = await api.get<ApiResponse<ApiWaitlistEntry[]>>('/course/my/waitlist');
      return res.data.data;
    },
  });
}

export function useJoinWaitlist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (courseId: number) => {
      const res = await api.post<ApiResponse<ApiWaitlistEntry>>(`/course/${courseId}/waitlist`);
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-waitlist'] });
    },
  });
}
