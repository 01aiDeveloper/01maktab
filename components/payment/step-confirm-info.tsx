'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { StepIndicator } from './step-indicator';
import { useUpdateProfile } from '@/hooks/use-update-profile';

interface UserInfo {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

interface StepConfirmInfoProps {
  userInfo: UserInfo;
  onNext: () => void;
  onBack: () => void;
}

export function StepConfirmInfo({ userInfo, onNext, onBack }: StepConfirmInfoProps) {
  const [form, setForm] = useState<UserInfo>(userInfo);
  const { updateProfile, isLoading } = useUpdateProfile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile({
        firstname: form.firstName,
        lastname: form.lastName,
        phone: form.phone,
        email: form.email,
      });
    } catch {
      // profile update failed — continue anyway
    }
    onNext();
  };

  return (
    <>
      <StepIndicator currentStep={1} />

      <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-900 mb-8">
        1-qadam: Ma&apos;lumotlaringizni tasdiqlang
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5 mb-10">
          <div>
            <label className="block text-sm text-gray-500 mb-1.5">Ism</label>
            <input
              type="text"
              required
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#3B5BFF]/30 focus:border-[#3B5BFF] transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1.5">Familiya</label>
            <input
              type="text"
              required
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#3B5BFF]/30 focus:border-[#3B5BFF] transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1.5">Telefon raqami</label>
            <input
              type="tel"
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#3B5BFF]/30 focus:border-[#3B5BFF] transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1.5">E-mail</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#3B5BFF]/30 focus:border-[#3B5BFF] transition-colors"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 h-12 rounded-xl bg-gray-100 text-gray-500 hover:bg-gray-200 font-medium text-sm transition-colors"
          >
            Orqaga
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 h-12 rounded-xl bg-[#3B5BFF] hover:bg-[#2d4ae6] text-white font-medium text-sm transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {isLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Saqlanmoqda...</> : 'Davom etish'}
          </button>
        </div>
      </form>
    </>
  );
}
