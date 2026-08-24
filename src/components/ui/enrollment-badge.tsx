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
    <div className={`inline-flex w-fit items-center justify-center gap-2 bg-[#FFF000] text-[#18181A] px-[17px] h-[31px] rounded-[11px] text-[14px] leading-[25px] tracking-[-0.7px] font-[450] whitespace-nowrap ${className}`}>
      <Profile2UserSolid className="w-5 h-5 shrink-0" />
      <span>{formatCount(count)} {label}</span>
    </div>
  );
}
