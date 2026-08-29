import { useQuery, useQueries } from '@tanstack/react-query';
import { useAuth } from '@/hooks/common/use-auth';
import { queryKeys } from '@/constants/query-keys';
import { learningApi } from '@/services/react-query/learning';
import type {
  ApiTestOption as TestOption,
  ApiTestQuestion as TestQuestion,
  ApiModuleTestResponse as ModuleTest,
} from '@/types/api';

export type { TestOption, TestQuestion, ModuleTest };

export function useModuleTest(moduleId: string | number | undefined) {
  const { accessToken } = useAuth();
  return useQuery<ModuleTest>({
    queryKey: queryKeys.lesson.moduleTest(moduleId ?? ''),
    queryFn: () => learningApi.getModuleTest(moduleId!),
    enabled: !!moduleId && !!accessToken,
    staleTime: 1000 * 60 * 5,
  });
}

/**
 * Fetch questionsCount for multiple modules in parallel.
 * Returns a map: moduleId → questionsCount
 */
export function useModuleTestCounts(moduleIds: string[]) {
  const { accessToken } = useAuth();

  const results = useQueries({
    queries: moduleIds.map((id) => ({
      queryKey: queryKeys.lesson.moduleTest(id),
      queryFn: () => learningApi.getModuleTest(id),
      enabled: !!accessToken,
      staleTime: 1000 * 60 * 5,
      retry: false,
    })),
  });

  const counts = new Map<string, number>();
  moduleIds.forEach((id, i) => {
    const data = results[i]?.data as ModuleTest | undefined;
    if (data?.questionsCount != null) {
      counts.set(id, data.questionsCount);
    }
  });

  return counts;
}
