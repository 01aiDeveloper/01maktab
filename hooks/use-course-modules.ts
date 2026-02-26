import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import type { ApiResponse, ApiCourseModules } from '@/types/api';
import { useAuthStore } from '@/store/auth-store';

export function useCourseModules(courseId: string | number | undefined) {
  const { accessToken } = useAuthStore();
  return useQuery({
    queryKey: ['modules', 'course', String(courseId)],
    queryFn: async () => {
      const res = await api.get<ApiResponse<ApiCourseModules>>(`/course/${courseId}/module`);
      return res.data.data;
    },
    enabled: !!courseId && !!accessToken,
  });
}

export function useSkillModules(skillId: string | number | undefined) {
  const { accessToken } = useAuthStore();
  return useQuery({
    queryKey: ['modules', 'skill', String(skillId)],
    queryFn: async () => {
      const res = await api.get<ApiResponse<ApiCourseModules>>(`/course/skill/${skillId}/module`);
      return res.data.data;
    },
    enabled: !!skillId && !!accessToken,
  });
}

export function useProfessionModules(professionId: string | number | undefined) {
  const { accessToken } = useAuthStore();
  return useQuery({
    queryKey: ['modules', 'profession', String(professionId)],
    queryFn: async () => {
      const res = await api.get<ApiResponse<ApiCourseModules>>(`/course/profession/${professionId}/module`);
      return res.data.data;
    },
    enabled: !!professionId && !!accessToken,
  });
}
