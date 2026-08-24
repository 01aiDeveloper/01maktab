import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/constants/query-keys';
import { courseApi, type CourseKind } from '@/services/react-query/course';

interface CoursePublicInfo {
  id: number;
  format: string;
  name: string;
  title: string;
  description: string;
  photo: string | null;
  icon: string | null;
  price: number;
  pricingType: string;
  decorImage: string | null;
}

export function useCourseInfo(courseId: string | number | undefined, courseType: string = 'course') {
  return useQuery<CoursePublicInfo>({
    queryKey: queryKeys.course.info(courseType, courseId ?? ''),
    queryFn: () => courseApi.getPublicInfo(courseType as CourseKind, courseId!),
    enabled: !!courseId,
    staleTime: 1000 * 60 * 5,
  });
}
