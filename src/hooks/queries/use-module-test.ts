import { useQuery, useQueries } from '@tanstack/react-query';
import { useAuth } from '@/hooks/common/use-auth';
import { queryKeys } from '@/constants/query-keys';
import { learningApi } from '@/services/react-query/learning';

export interface TestOption {
  id: string;
  text: string;
  image: string | null;
}

export interface TestQuestion {
  id: string;
  text: string;
  type: 'SINGLE' | 'MULTIPLE' | 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE';
  points: number;
  orderIndex?: number;
  image: string | null;
  options: TestOption[];
}

export interface ModuleTest {
  id: string;
  name: string;
  passingPercentage: number;
  maxAttempts: number;
  timeLimit: number;
  questionsCount: number;
  questions: TestQuestion[];
}

export function useModuleTest(moduleId: string | number | undefined) {
  return useQuery<ModuleTest>({
    queryKey: queryKeys.lesson.moduleTest(moduleId ?? ''),
    queryFn: () => learningApi.getModuleTest(moduleId!),
    enabled: !!moduleId,
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
