'use client';

import { Clock, CheckCircle2, BanknoteX } from 'lucide-react';

export type CardStatus = 'bought' | 'free' | 'waitlist' | 'presale';

const STATUS_CONFIG: Record<CardStatus, { label: string; bg: string; text: string; width: string }> = {
  bought: { label: 'Sotib olingan', bg: 'bg-[#1EBB4A]', text: 'text-white', width: 'w-[172px]' },
  free: { label: 'Bepul', bg: 'bg-[#1EBB4A]', text: 'text-white', width: 'w-[124px]' },
  waitlist: { label: 'Waitlist', bg: 'bg-[#3B5BFF]', text: 'text-white', width: 'w-[140px]' },
  presale: { label: 'Pre-sale', bg: 'bg-amber-500', text: 'text-white', width: 'w-[140px]' },
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
  const info = STATUS_CONFIG[status];
  const sizeCls = size === 'sm'
    ? 'h-[30px] px-3 text-xs gap-1.5'
    : 'h-[38px] px-4 text-sm gap-2';
  const iconCls = size === 'sm' ? 'w-3.5 h-3.5' : 'w-[18px] h-[18px]';
  const widthCls = size === 'md' ? info.width : '';

  const Icon =
    status === 'waitlist' || status === 'presale' ? Clock :
    status === 'bought' ? CheckCircle2 :
    BanknoteX;

  return (
    <div className={`inline-flex items-center justify-center ${info.bg} ${info.text} ${sizeCls} ${widthCls} rounded-[12px] font-semibold ${className}`}>
      <Icon className={iconCls} />
      {info.label}
    </div>
  );
}
