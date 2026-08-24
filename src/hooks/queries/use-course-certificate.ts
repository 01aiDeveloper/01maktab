import { useMutation } from '@tanstack/react-query';
import { courseApi } from '@/services/react-query/course';

export interface GenerateCertificateResponse {
  file: string;
}

export function useGenerateCourseCertificate() {
  return useMutation({
    mutationFn: async (courseId: number | string) => {
      return courseApi.generateCertificate(courseId) as Promise<GenerateCertificateResponse>;
    },
  });
}
