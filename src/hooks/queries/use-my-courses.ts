import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/common/use-auth';
import { queryKeys } from '@/constants/query-keys';
import { courseApi } from '@/services/react-query/course';

export interface MyCourseItem {
  id: number;
  name: string;
  title: string;
  photo: string;
  cardImage?: string | null;
  icon: string;
  decorImage: string;
  moduleTitle: string;
  isOpen: boolean;
  mentor: {
    id: number | string;
    fullname: string;
    photo: string;
  };
  totalLessons: number;
  completedLessons: number;
}

export function useMyCourses() {
  const { accessToken } = useAuth();
  return useQuery({
    queryKey: queryKeys.course.mine('courses'),
    queryFn: () => courseApi.getMine<MyCourseItem>('courses'),
    enabled: !!accessToken,
  });
}

export function useMySkills() {
  const { accessToken } = useAuth();
  return useQuery({
    queryKey: queryKeys.course.mine('skills'),
    queryFn: () => courseApi.getMine<MyCourseItem>('skills'),
    enabled: !!accessToken,
  });
}

export function useMyProfessions() {
  const { accessToken } = useAuth();
  return useQuery({
    queryKey: queryKeys.course.mine('professions'),
    queryFn: () => courseApi.getMine<MyCourseItem>('professions'),
    enabled: !!accessToken,
  });
}
