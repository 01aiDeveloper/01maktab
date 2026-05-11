import { useMutation } from '@tanstack/react-query';
import api from '@/lib/api';

export interface GenerateCertificateResponse {
  file: string;
}

export function useGenerateCourseCertificate() {
  return useMutation({
    mutationFn: async (courseId: number | string) => {
      console.log('[useGenerateCourseCertificate] GET /course-certificate/generate/' + courseId);
      const res = await api.get(`/course-certificate/generate/${courseId}`);
      console.log('[useGenerateCourseCertificate] raw response status:', res.status);
      console.log('[useGenerateCourseCertificate] raw response data:', res.data);
      const data: GenerateCertificateResponse = res.data?.data ?? res.data;
      console.log('[useGenerateCourseCertificate] unwrapped:', data);
      return data;
    },
  });
}
