import { useQuery, useQueries } from '@tanstack/react-query';
import api from '@/lib/api';
import { useAuthStore } from '@/store/auth-store';

export interface TestOption {
  id: number;
  text: string;
  image: string | null;
}

export interface TestQuestion {
  id: number;
  text: string;
  type: 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE';
  points: number;
  orderId: number;
  image: string | null;
  options: TestOption[];
}

export interface ModuleTest {
  id: number;
  name: string;
  passingPercentage: number;
  maxAttempts: number;
  timeLimit: number;
  questionsCount: number;
  questions: TestQuestion[];
}

export function useModuleTest(moduleId: string | number | undefined) {
  return useQuery<ModuleTest>({
    queryKey: ['module-test', String(moduleId)],
    queryFn: async () => {
      const res = await api.get(`/test/module/${moduleId}`);
      return res.data?.data ?? res.data;
    },
    enabled: !!moduleId,
    staleTime: 1000 * 60 * 5,
  });
}

/**
 * Fetch questionsCount for multiple modules in parallel.
 * Returns a map: moduleId → questionsCount
 */
export function useModuleTestCounts(moduleIds: number[]) {
  const { accessToken } = useAuthStore();

  const results = useQueries({
    queries: moduleIds.map((id) => ({
      queryKey: ['module-test', String(id)],
      queryFn: async () => {
        const res = await api.get(`/test/module/${id}`);
        return res.data?.data ?? res.data;
      },
      enabled: !!accessToken,
      staleTime: 1000 * 60 * 5,
      retry: false,
    })),
  });

  const counts = new Map<number, number>();
  moduleIds.forEach((id, i) => {
    const data = results[i]?.data as ModuleTest | undefined;
    if (data?.questionsCount != null) {
      counts.set(id, data.questionsCount);
    }
  });

  return counts;
}
