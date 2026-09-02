import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/constants/query-keys';
import { waitlistApi } from '@/services/react-query/waitlist';

export function useMyWaitlist() {
  return useQuery({
    queryKey: queryKeys.waitlist.mine,
    queryFn: waitlistApi.getMine,
  });
}

export function useJoinWaitlist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: waitlistApi.join,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.waitlist.mine });
    },
  });
}
