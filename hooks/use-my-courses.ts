import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import type { ApiResponse } from '@/types/api';

export interface MyCourseItem {
  id: number;
  name: string;
  title: string;
  photo: string;
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
    queryKey: ['my-courses'],
    queryFn: async () => {
      const res = await api.get<ApiResponse<MyCourseItem[]>>('/course/my/courses');
      return res.data.data;
    },
  });
}

export function useMySkills() {
  return useQuery({
    queryKey: ['my-skills'],
    queryFn: async () => {
      const res = await api.get<ApiResponse<MyCourseItem[]>>('/course/my/skills');
      return res.data.data;
    },
  });
}

export function useMyProfessions() {
  return useQuery({
    queryKey: ['my-professions'],
    queryFn: async () => {
      const res = await api.get<ApiResponse<MyCourseItem[]>>('/course/my/professions');
      return res.data.data;
    },
  });
}
