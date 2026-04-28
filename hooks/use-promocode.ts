import { useMutation } from '@tanstack/react-query';
import api from '@/lib/api';
import type { ApiResponse, ApiPromocodeValidation } from '@/types/api';

export function useValidatePromocode() {
  return useMutation({
    mutationFn: async ({ code, courseId }: { code: string; courseId: number }) => {
      const res = await api.post<ApiResponse<ApiPromocodeValidation>>(
        '/promocode/validate',
        { code, courseId },
      );
      return res.data.data;
    },
  });
}
