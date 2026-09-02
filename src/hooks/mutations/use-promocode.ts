import { useMutation } from '@tanstack/react-query';
import type { PromocodeTargetType } from '@/types/api';
import { commerceApi } from '@/services/react-query/commerce';

interface CheckPromocodeArgs {
  code: string;
  targetId: string;
  price: number;
  type?: PromocodeTargetType;
}

export function useCheckPromocode() {
  return useMutation({
    mutationFn: (payload: CheckPromocodeArgs) => commerceApi.checkPromocode(payload),
  });
}

// Backward-compat alias for older imports
export const useValidatePromocode = useCheckPromocode;
