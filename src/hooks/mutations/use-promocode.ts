import { useMutation } from '@tanstack/react-query';
import api from '@/lib/api';
import type {
  ApiResponse,
  ApiPromocodeCheck,
  PromocodeTargetType,
} from '@/types/api';

interface CheckPromocodeArgs {
  code: string;
  targetId: number;
  price: number;
  type?: PromocodeTargetType;
}

export function useCheckPromocode() {
  return useMutation({
    mutationFn: async ({ code, targetId, price, type = 'course' }: CheckPromocodeArgs) => {
      const res = await api.post<ApiResponse<ApiPromocodeCheck>>('/promocode/check', {
        code,
        targetId,
        price,
        type,
      });
      return res.data.data;
    },
  });
}

// Backward-compat alias for older imports
export const useValidatePromocode = useCheckPromocode;
