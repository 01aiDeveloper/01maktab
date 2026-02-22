import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';

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
    queryKey: ['course-info', courseType, courseId],
    queryFn: async () => {
      const endpoint =
        courseType === 'skill'
          ? `/skill/${courseId}/public/info`
          : courseType === 'profession'
          ? `/profession/${courseId}/public/info`
          : `/course/${courseId}/public/info`;

      const res = await api.get(endpoint);
      return res.data?.data ?? res.data;
    },
    enabled: !!courseId,
    staleTime: 1000 * 60 * 5,
  });
}
