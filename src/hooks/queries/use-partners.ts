import { useQuery } from '@tanstack/react-query';
import { partnerApi } from '@/services/react-query/partner';

export function usePartners(pageSize = 20, pageNumber = 1) {
  return useQuery({
    queryKey: ['partners', 'public', pageSize, pageNumber],
    queryFn: () => partnerApi.getPublicList(pageSize, pageNumber),
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}

export function usePartner(id: string | number | undefined) {
  return useQuery({
    queryKey: ['partner', 'public', String(id)],
    queryFn: () => partnerApi.getOne(id!),
    enabled: !!id,
    staleTime: 1000 * 60 * 60,
  });
}
