'use client';

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
  if (!count || count <= 0) return null;

  const label = kind === 'enrolled' ? 'sotib oldi' : 'odam kutmoqda';

  return (
    <div className={`inline-flex items-center justify-center gap-2 bg-[#FAEF3B] text-black h-[34px] w-[216px] px-3.5 rounded-[12px] text-[18px] leading-[22px] tracking-[-0.05em] font-semibold ${className}`}>
      <Profile2UserSolid className="w-[22px] h-[22px]" />
      <span>{formatCount(count)} {label}</span>
    </div>
  );
}
