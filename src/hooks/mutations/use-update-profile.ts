import { useState } from 'react';
import { useAuth } from '@/hooks/common/use-auth';
import { userApi, type UpdateProfilePayload } from '@/services/react-query/user';

export type { UpdateProfilePayload } from '@/services/react-query/user';

export function useUpdateProfile() {
  const setUser = useAuth((state) => state.setUser);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateProfile = async (payload: UpdateProfilePayload) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await userApi.updateMe(payload);
      if (data) setUser(data);
      return data ?? null;
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ??
        "Ma'lumotlarni saqlashda xatolik yuz berdi";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { updateProfile, isLoading, error, setError };
}
