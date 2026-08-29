import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/common/use-auth';
import { queryKeys } from '@/constants/query-keys';
import { courseApi } from '@/services/react-query/course';

export interface CourseBadgeItem {
  id: number;
  title: string;
  icon: string;
  description: string;
  isClaimed?: boolean;
}

export function useCourseBadges(courseId?: number | string) {
  const { accessToken } = useAuth();
  return useQuery({
    queryKey: queryKeys.course.badges(courseId ?? 'my'),
    queryFn: () => courseApi.getBadges() as Promise<CourseBadgeItem[]>,
    enabled: !!accessToken,
  });
}
