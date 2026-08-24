import { useState } from 'react';
import api from '@/lib/api';
import { useAuthStore } from '@/store/auth-store';

export interface UpdateProfilePayload {
  firstname?: string;
  lastname?: string;
  phone?: number | string;
  email?: string;
  birthday?: string;
  gender?: string;
  region?: string;
  photo?: string;
}

export function useUpdateProfile() {
  const setUser = useAuthStore((state) => state.setUser);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateProfile = async (payload: UpdateProfilePayload) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.patch('/user/me', payload);
      if (response.data?.data) {
        setUser(response.data.data);
      }
      return response.data?.data ?? null;
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
