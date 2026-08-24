import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/constants/query-keys';
import { courseApi } from '@/services/react-query/course';

export interface MyCourseItem {
  id: number;
  name: string;
  title: string;
  photo: string;
  /** Katalog/bosh sahifa kartochka rasmi (vertikal) */
  cardImage?: string | null;
  icon: string;
  decorImage: string;
  moduleTitle: string;
  isOpen: boolean;
  mentor: {
    id: number;
    fullname: string;
    photo: string;
  };
  totalLessons: number;
  completedLessons: number;
}

export function useMyCourses() {
  return useQuery({
    queryKey: queryKeys.course.mine('courses'),
    queryFn: () => courseApi.getMine<MyCourseItem>('courses'),
  });
}

export function useMySkills() {
  return useQuery({
    queryKey: queryKeys.course.mine('skills'),
    queryFn: () => courseApi.getMine<MyCourseItem>('skills'),
  });
}

export function useMyProfessions() {
  return useQuery({
    queryKey: queryKeys.course.mine('professions'),
    queryFn: () => courseApi.getMine<MyCourseItem>('professions'),
  });
}
