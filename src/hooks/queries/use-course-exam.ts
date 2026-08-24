import { useQuery } from '@tanstack/react-query';
import type { ModuleTest } from '@/hooks/queries/use-module-test';
import { queryKeys } from '@/constants/query-keys';
import { courseApi } from '@/services/react-query/course';

export type CourseExam = ModuleTest;

export function useCourseExam(courseId: string | number | undefined) {
  return useQuery<CourseExam>({
    queryKey: queryKeys.course.exam(courseId ?? ''),
    queryFn: () => courseApi.getExam(courseId!),
    enabled: !!courseId,
    staleTime: 1000 * 60 * 5,
  });
}
