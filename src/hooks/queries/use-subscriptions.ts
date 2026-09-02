import { useQuery } from '@tanstack/react-query';
import { subscriptionApi } from '@/services/react-query/subscription';

export function usePublicSubscriptionPlans() {
  return useQuery({
    queryKey: ['subscription-plans', 'public'],
    queryFn: () => subscriptionApi.getPublicPlans(),
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
}
