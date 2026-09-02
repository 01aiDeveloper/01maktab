import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/common/use-auth';
import type { ModuleTest } from '@/hooks/queries/use-module-test';
import { queryKeys } from '@/constants/query-keys';
import { courseApi } from '@/services/react-query/course';

export type CourseExam = ModuleTest;

export function useCourseExam(courseId: string | number | undefined) {
  const { accessToken } = useAuth();
  return useQuery<CourseExam>({
    queryKey: queryKeys.course.exam(courseId ?? ''),
    queryFn: () => courseApi.getExam(courseId!),
    enabled: !!courseId && !!accessToken,
    staleTime: 1000 * 60 * 5,
  });
}
