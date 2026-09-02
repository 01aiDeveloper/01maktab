import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/common/use-auth';
import { queryKeys } from '@/constants/query-keys';
import { courseApi } from '@/services/react-query/course';

export function useCourseModules(courseId: string | number | undefined) {
  const { accessToken } = useAuth();
  return useQuery({
    queryKey: queryKeys.course.modules('course', courseId ?? ''),
    queryFn: () => courseApi.getModules('course', courseId!),
    enabled: !!courseId && !!accessToken,
  });
}

export function useSkillModules(skillId: string | number | undefined) {
  const { accessToken } = useAuth();
  return useQuery({
    queryKey: queryKeys.course.modules('skill', skillId ?? ''),
    queryFn: () => courseApi.getModules('skill', skillId!),
    enabled: !!skillId && !!accessToken,
  });
}

export function useProfessionModules(professionId: string | number | undefined) {
  const { accessToken } = useAuth();
  return useQuery({
    queryKey: queryKeys.course.modules('profession', professionId ?? ''),
    queryFn: () => courseApi.getModules('profession', professionId!),
    enabled: !!professionId && !!accessToken,
  });
}
