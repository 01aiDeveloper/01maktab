'use client';
import { useState } from 'react';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useUpdateProfile } from '@/hooks/mutations/use-update-profile';

interface ProfileSetupProps {
  onBack: () => void;
  onComplete: () => void;
  isModal?: boolean;
}

export function ProfileSetup({ onBack, onComplete, isModal }: ProfileSetupProps) {
  const t = useTranslations('profileSetupStandalone');
  const { updateProfile, isLoading: isSubmitting, error, setError } = useUpdateProfile();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    // phone: "",
    birthDay: '',
    birthMonth: '',
    birthYear: '',
    gender: '',
    // region: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    let birthday: string | undefined;
    if (formData.birthYear && formData.birthMonth && formData.birthDay) {
      birthday = new Date(parseInt(formData.birthYear), parseInt(formData.birthMonth) - 1, parseInt(formData.birthDay)).toISOString();
    }

    const payload: Record<string, string> = {
      firstname: formData.firstName,
      lastname: formData.lastName,
    };
    if (formData.gender) payload.gender = formData.gender.toUpperCase();
    if (birthday) payload.birthday = birthday;

    try {
      await updateProfile(payload);
      onComplete();
      if (typeof window !== 'undefined') {
        window.location.href = '/';
      }
    } catch {
      // error is handled inside hook
    }
  };

  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  const months = [t('months.1'), t('months.2'), t('months.3'), t('months.4'), t('months.5'), t('months.6'), t('months.7'), t('months.8'), t('months.9'), t('months.10'), t('months.11'), t('months.12')];
  const years = Array.from({ length: 100 }, (_, i) => (2024 - i).toString());

  return (
    <div className={cn('w-full flex flex-col items-center', isModal ? 'p-0' : 'p-0')}>
      <div className="w-full flex items-center justify-between mb-8">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6 text-gray-900" />
        </button>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">01AI</h1>
        <div className="w-10" /> {/* Spacer */}
      </div>

      <div className="text-center mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-1 flex items-center justify-center gap-2">{t('greeting')}</h2>
        <p className="text-sm text-gray-400">{t('fillBelow')}</p>
      </div>

      {error && <p className="text-sm text-red-500 font-medium mb-4 text-center">{error}</p>}

      <form className="w-full space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[13px] font-medium text-gray-600 ml-1">{t('firstnameLabel')}</label>
            <Input
              placeholder={t('firstnamePlaceholder')}
              className="h-12 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-gray-200 transition-all"
              required
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[13px] font-medium text-gray-600 ml-1">{t('lastnameLabel')}</label>
            <Input
              placeholder={t('lastnamePlaceholder')}
              className="h-12 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-gray-200 transition-all"
              required
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            />
          </div>
        </div>

        {/* <div className="space-y-1.5">
          <label className="text-[13px] font-medium text-gray-600 ml-1">Telefon raqami *</label>
          <div className="relative flex items-center bg-gray-50 border border-transparent rounded-xl p-3 focus-within:bg-white focus-within:border-gray-200 transition-all">
            <div className="flex items-center gap-2 pr-3 border-r border-gray-200 mr-3">
              <img src="https://flagcdn.com/uz.svg" alt="UZ" className="w-6 h-4 rounded-sm object-cover" />
              <span className="text-gray-900 font-medium">+998</span>
            </div>
            <input
              type="text"
              className="flex-1 bg-transparent border-none outline-none text-gray-900 font-medium"
              placeholder="(90) 123-45-67"
              required
            />
          </div>
        </div> */}

        <div className="space-y-1.5">
          <label className="text-[13px] font-medium text-gray-600 ml-1">{t('birthdayLabel')}</label>
          <div className="grid grid-cols-3 gap-3">
            <div className="relative">
              <select
                className="w-full h-12 rounded-xl bg-gray-50 border-transparent px-4 appearance-none text-gray-900 focus:bg-white focus:border-gray-200 transition-all outline-none"
                value={formData.birthDay}
                onChange={(e) => setFormData({ ...formData, birthDay: e.target.value })}
              >
                <option value="">{t('dayPlaceholder')}</option>
                {days.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
            <div className="relative">
              <select
                className="w-full h-12 rounded-xl bg-gray-50 border-transparent px-4 appearance-none text-gray-900 focus:bg-white focus:border-gray-200 transition-all outline-none"
                value={formData.birthMonth}
                onChange={(e) => setFormData({ ...formData, birthMonth: e.target.value })}
              >
                <option value="">{t('monthPlaceholder')}</option>
                {months.map((m, i) => (
                  <option key={m} value={i + 1}>
                    {m}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
            <div className="relative">
              <select
                className="w-full h-12 rounded-xl bg-gray-50 border-transparent px-4 appearance-none text-gray-900 focus:bg-white focus:border-gray-200 transition-all outline-none"
                value={formData.birthYear}
                onChange={(e) => setFormData({ ...formData, birthYear: e.target.value })}
              >
                <option value="">{t('yearPlaceholder')}</option>
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[13px] font-medium text-gray-600 ml-1">{t('genderLabel')}</label>
          <div className="relative">
            <select
              className="w-full h-12 rounded-xl bg-gray-50 border-transparent px-4 appearance-none text-gray-900 focus:bg-white focus:border-gray-200 transition-all outline-none"
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            >
              <option value="">{t('genderPlaceholder')}</option>
              <option value="MALE">{t('male')}</option>
              <option value="FEMALE">{t('female')}</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* <div className="space-y-1.5">
          <label className="text-[13px] font-medium text-gray-600 ml-1">Viloyat</label>
          <div className="relative">
            <select
              className="w-full h-12 rounded-xl bg-gray-50 border-transparent px-4 appearance-none text-gray-900 focus:bg-white focus:border-gray-200 transition-all outline-none"
              value={formData.region}
              onChange={(e) => setFormData({ ...formData, region: e.target.value })}
            >
              <option value="">Qaysi viloyatdansiz?</option>
              {regions.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div> */}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#E5E7EB] hover:bg-gray-300 text-gray-600 font-semibold py-7 rounded-2xl shadow-none mt-4 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? t('saving') : t('start')}
        </Button>
      </form>
    </div>
  );
}
