import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/constants/query-keys';
import { courseApi } from '@/services/react-query/course';

export interface CourseBadgeItem {
  id: number;
  title: string;
  icon: string;
  description: string;
}

export function useCourseBadges(courseId: number | undefined) {
  return useQuery({
    queryKey: queryKeys.course.badges(courseId ?? 0),
    queryFn: () => courseApi.getBadges(courseId!) as Promise<CourseBadgeItem[]>,
    enabled: !!courseId,
  });
}
