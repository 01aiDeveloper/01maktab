import { useQuery } from '@tanstack/react-query';
import { mockMarketProducts, getMockProductById } from '@/lib/mock/market-data';
import type { MarketProduct } from '@/types/market';

export function useMarketProducts() {
  return useQuery<MarketProduct[]>({
    queryKey: ['market', 'products'],
    queryFn: async () => {
      // mock — replace with real API call later
      return Promise.resolve(mockMarketProducts);
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useMarketProduct(id: string | undefined) {
  return useQuery<MarketProduct | undefined>({
    queryKey: ['market', 'product', id],
    queryFn: async () => {
      if (!id) return undefined;
      return Promise.resolve(getMockProductById(id));
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
}
