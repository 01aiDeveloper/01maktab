import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import type { ModuleTest } from '@/hooks/use-module-test';

export type CourseExam = ModuleTest;

export function useCourseExam(courseId: string | number | undefined) {
  return useQuery<CourseExam>({
    queryKey: ['course-exam', String(courseId)],
    queryFn: async () => {
      const res = await api.get(`/exam/course/${courseId}`);
      return res.data?.data ?? res.data;
    },
    enabled: !!courseId,
    staleTime: 1000 * 60 * 5,
  });
}
