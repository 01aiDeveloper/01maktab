'use client';

import { useTranslations } from 'next-intl';
import { Profile2UserSolid } from '@/components/ui/icons/badge-icons';

function formatCount(count: number): string {
  if (count >= 1000) {
    const k = count / 1000;
    return k % 1 === 0 ? `${k}K` : `${k.toFixed(1)}K`;
  }
  return String(count);
}

interface EnrollmentBadgeProps {
  count: number;
  kind?: 'enrolled' | 'waitlist';
  className?: string;
}

export function EnrollmentBadge({ count, kind = 'waitlist', className = '' }: EnrollmentBadgeProps) {
  const t = useTranslations('cards');
  if (!count || count <= 0) return null;

  const label = kind === 'enrolled' ? t('enrolled') : t('waiting');

  return (
    <div className={`inline-flex w-fit items-center gap-2 bg-[#FAEF3B] text-black px-[14px] py-2 rounded-[12px] text-[18px] leading-[22px] tracking-[-0.05em] font-semibold ${className}`}>
      <Profile2UserSolid className="w-[22px] h-[22px]" />
      <span>{formatCount(count)} {label}</span>
    </div>
  );
}
