'use client';

import { useTranslations } from 'next-intl';
import { CardSlashSolid, TickCircleSolid, ClockSolid } from '@/components/ui/icons/badge-icons';

export type CardStatus = 'bought' | 'free' | 'waitlist' | 'presale';

const STATUS_STYLE: Record<CardStatus, { bg: string; text: string }> = {
  bought: { bg: 'bg-[#1EBB4A]', text: 'text-white' },
  free: { bg: 'bg-[#1EBB4A]', text: 'text-white' },
  waitlist: { bg: 'bg-[#FF7700]', text: 'text-white' },
  presale: { bg: 'bg-amber-500', text: 'text-white' },
};

const STATUS_KEY: Record<CardStatus, 'statusBought' | 'statusFree' | 'statusWaitlist' | 'statusPresale'> = {
  bought: 'statusBought',
  free: 'statusFree',
  waitlist: 'statusWaitlist',
  presale: 'statusPresale',
};

export interface StatusFlags {
  hasPurchased?: boolean;
  pricingType?: 'FREE' | 'PAID';
  price?: number;
  presalesEnabled?: boolean;
  waitlistEnabled?: boolean;
}

export function resolveStatus(f: StatusFlags): CardStatus | null {
  if (f.hasPurchased) return 'bought';
  if (f.pricingType === 'FREE' || f.price === 0) return 'free';
  if (f.presalesEnabled) return 'presale';
  if (f.waitlistEnabled) return 'waitlist';
  return null;
}

interface StatusBadgeProps {
  status: CardStatus;
  size?: 'sm' | 'md';
  className?: string;
}

export function StatusBadge({ status, size = 'md', className = '' }: StatusBadgeProps) {
  const t = useTranslations('cards');
  const style = STATUS_STYLE[status];
  const label = t(STATUS_KEY[status]);
  const sizeCls = size === 'sm'
    ? 'p-1.5 text-xs gap-1.5 tracking-[-0.05em]'
    : 'px-[14px] py-2 text-[18px] leading-[22px] tracking-[-0.05em] gap-2';
  const iconCls = size === 'sm' ? 'w-4 h-4' : 'w-[18px] h-[18px]';

  const Icon =
    status === 'presale' ? ClockSolid :
    status === 'waitlist' || status === 'bought' ? TickCircleSolid :
    CardSlashSolid;

  return (
    <div className={`inline-flex w-fit items-center ${style.bg} ${style.text} ${sizeCls} rounded-[12px] font-semibold ${className}`}>
      <Icon className={iconCls} />
      {label}
    </div>
  );
}
