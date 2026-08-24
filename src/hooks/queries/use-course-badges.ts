import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';

export interface CourseBadgeItem {
  id: number;
  title: string;
  icon: string;
  description: string;
}

export function useCourseBadges(courseId: number | undefined) {
  return useQuery({
    queryKey: ['course-badges', courseId],
    queryFn: async () => {
      const res = await api.get(`/course-badge`, { params: { courseId } });
      const items = res.data?.data?.data ?? res.data?.data ?? [];
      return items as CourseBadgeItem[];
    },
    enabled: !!courseId,
  });
}
