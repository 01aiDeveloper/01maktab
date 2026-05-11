import { useMutation } from '@tanstack/react-query';
import api from '@/lib/api';

export interface GenerateCertificateResponse {
  file: string;
}

export function useGenerateCourseCertificate() {
  return useMutation({
    mutationFn: async (courseId: number | string) => {
      const res = await api.get(`/course-certificate/generate/${courseId}`);
      const data: GenerateCertificateResponse = res.data?.data ?? res.data;
      return data;
    },
  });
}
