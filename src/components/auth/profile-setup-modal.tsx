'use client';

import { useEffect, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useUpdateProfile } from '@/hooks/mutations/use-update-profile';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useRegions } from '@/hooks/queries/use-address';
import { Search } from 'lucide-react';

const DAYS = Array.from({ length: 31 }, (_, i) => String(i + 1));
const MONTH_VALUES = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'] as const;
const YEARS = Array.from({ length: 100 }, (_, i) => String(new Date().getFullYear() - i));

type FormValues = {
  firstName: string;
  lastName: string;
  email?: string;
  birthDay: string;
  birthMonth: string;
  birthYear: string;
  region: string;
  gender: string;
};

interface ProfileSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const inputCls = 'h-12.5! rounded-[10px] border-gray-200 text-sm text-gray-900';

export function ProfileSetupModal({ isOpen, onClose }: ProfileSetupModalProps) {
  const { data: regions = [] } = useRegions();
  const t = useTranslations('profileSetup');
  const { updateProfile, isLoading: isSubmitting, error, setError } = useUpdateProfile();

  const schema = useMemo(() => z.object({
    firstName: z.string().min(1, t('errFirstname')),
    lastName: z.string().min(1, t('errLastname')),
    email: z.string().email(t('errEmail')).optional().or(z.literal('')),
    birthDay: z.string().min(1, t('errDay')),
    birthMonth: z.string().min(1, t('errMonth')),
    birthYear: z.string().min(1, t('errYear')),
    region: z.string().min(1, t('errRegion')),
    gender: z.string().min(1, t('errGender')),
  }), [t]);

  const MONTHS = MONTH_VALUES.map((value) => ({ value, label: t(`months.${value}`) }));

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      birthDay: '',
      birthMonth: '',
      birthYear: '',
      region: '',
      gender: '',
    },
  });

  const watched = watch();
  const isFormFilled =
    watched.firstName && watched.lastName && watched.birthDay && watched.birthMonth && watched.birthYear && watched.region && watched.gender;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      reset();
      setError(null);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, reset, setError]);

  const onSubmit = async (data: FormValues) => {
    setError(null);
    const birthday = new Date(Date.UTC(parseInt(data.birthYear), parseInt(data.birthMonth) - 1, parseInt(data.birthDay))).toISOString();

    try {
      await updateProfile({
        firstname: data.firstName,
        lastname: data.lastName,
        ...(data.email ? { email: data.email } : {}),
        birthday,
        gender: data.gender,
        region: data.region,
      });
      onClose();
    } catch {
      // error is handled inside hook
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={(e) => e.preventDefault()} />
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center py-2 px-4">
          <div className="w-full max-w-md bg-white rounded-[24px] shadow-2xl p-5">
        <div className="w-full flex flex-col items-center">
          <h1 className="text-xl font-bold tracking-tight text-gray-900 mb-2">
            <span className="font-black">01AI</span>
          </h1>

          <div className="text-center mb-2">
            <h2 className="text-base font-bold text-gray-900">{t('title')}</h2>
          </div>

          {error && <p className="text-xs text-red-500 font-medium mb-2 text-center">{error}</p>}

          <form className="w-full space-y-3" onSubmit={handleSubmit(onSubmit)}>
            {/* Ism & Familiya */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  {t('firstnameLabel')}<span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder={t('firstnamePlaceholder')}
                  {...register('firstName')}
                  className={`${inputCls} ${errors.firstName ? 'border-red-400' : ''}`}
                />
                {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName.message}</p>}
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  {t('lastnameLabel')}<span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder={t('lastnamePlaceholder')}
                  {...register('lastName')}
                  className={`${inputCls} ${errors.lastName ? 'border-red-400' : ''}`}
                />
                {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName.message}</p>}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs text-gray-600 mb-1">{t('emailLabel')}</label>
              <Input
                type="email"
                placeholder={t('emailPlaceholder')}
                {...register('email')}
                className={`${inputCls} ${errors.email ? 'border-red-400' : ''}`}
              />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
            </div>

            {/* Tug'ilgan sana */}
            <div>
              <label className="block text-xs text-gray-600 mb-1">
                {t('birthdayLabel')}<span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <div>
                  <Controller
                    name="birthDay"
                    control={control}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className={`w-full h-12.5! rounded-[10px] border-gray-200 text-sm ${errors.birthDay ? 'border-red-400' : ''}`}>
                          <SelectValue placeholder={t('dayPlaceholder')} />
                        </SelectTrigger>
                        <SelectContent>
                          {DAYS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <div>
                  <Controller
                    name="birthMonth"
                    control={control}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className={`w-full h-12.5! rounded-[10px] border-gray-200 text-sm ${errors.birthMonth ? 'border-red-400' : ''}`}>
                          <SelectValue placeholder={t('monthPlaceholder')} />
                        </SelectTrigger>
                        <SelectContent>
                          {MONTHS.map((m) => <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <Controller
                    name="birthYear"
                    control={control}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className={`w-full h-12.5! rounded-[10px] border-gray-200 text-sm ${errors.birthYear ? 'border-red-400' : ''}`}>
                          <SelectValue placeholder={t('yearPlaceholder')} />
                        </SelectTrigger>
                        <SelectContent>
                          {YEARS.map((y) => <SelectItem key={y} value={y}>{y}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>
              {(errors.birthDay || errors.birthMonth || errors.birthYear) && (
                <p className="text-xs text-red-500 mt-1">{t('errBirthday')}</p>
              )}
            </div>

            {/* Viloyat */}
            <div>
              <label className="block text-xs text-gray-600 mb-1">
                {t('regionLabel')}<span className="text-red-500">*</span>
              </label>
              <Controller
                name="region"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      className={`w-full h-12.5! rounded-[10px] border-gray-200 text-sm [&>svg:last-child]:ml-auto ${errors.region ? 'border-red-400' : ''}`}
                    >
                      <Search className="w-4 h-4 text-gray-400 shrink-0" />
                      <SelectValue placeholder={t('regionPlaceholder')} />
                    </SelectTrigger>
                    <SelectContent>
                      {regions.map((region) => (
                        <SelectItem key={region.id} value={region.region}>
                          {region.region}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.region && <p className="text-xs text-red-500 mt-1">{errors.region.message}</p>}
            </div>

            {/* Jins */}
            <div>
              <label className="block text-xs text-gray-600 mb-1">
                {t('genderLabel')}<span className="text-red-500">*</span>
              </label>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <Tabs value={field.value} onValueChange={field.onChange}>
                    <TabsList className={`w-full h-12.5 rounded-[10px] bg-[#F4F4F4] p-1 ${errors.gender ? 'ring-1 ring-red-400' : ''}`}>
                      <TabsTrigger value="MALE" className="flex-1 rounded-[8px] text-sm font-medium">
                        {t('male')}
                      </TabsTrigger>
                      <TabsTrigger value="FEMALE" className="flex-1 rounded-[8px] text-sm font-medium">
                        {t('female')}
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                )}
              />
              {errors.gender && <p className="text-xs text-red-500 mt-1">{errors.gender.message}</p>}
            </div>

            {/* Terms */}
            <p className="text-xs text-center text-gray-500 leading-relaxed">
              {t('termsBefore')}{' '}
              <a href="/docs/privacy-policy.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline underline-offset-2">
                {t('termsLink')}
              </a>{' '}
              {t('termsAnd')}{' '}
              <a href="/docs/public-offer.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline underline-offset-2">
                {t('publicOfferLink')}
              </a>{' '}
              {t('termsAfter')}
            </p>

            {/* Submit */}
            <Button
              type="submit"
              disabled={!isFormFilled || isSubmitting}
              className="w-full h-12.5 rounded-[10px] font-semibold text-sm mt-1 transition-opacity cursor-pointer text-white hover:opacity-90 disabled:opacity-100 disabled:bg-[#E5E7EB] disabled:text-gray-400 disabled:cursor-not-allowed"
              style={isFormFilled ? { background: 'linear-gradient(135deg, #2A51E6 0%, #4469F6 100%)' } : undefined}
            >
              {isSubmitting ? t('saving') : t('submit')}
            </Button>
          </form>
        </div>
          </div>
        </div>
      </div>
    </div>
  );
}
