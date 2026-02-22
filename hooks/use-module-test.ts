import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';

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
