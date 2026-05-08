'use client';

import Image from 'next/image';
import { Clock } from 'lucide-react';

export type CardStatus = 'bought' | 'free' | 'waitlist' | 'presale';

const STATUS_CONFIG: Record<CardStatus, { label: string; bg: string; text: string }> = {
  bought: { label: 'Sotib olingan', bg: 'bg-emerald-500', text: 'text-white' },
  free: { label: 'Bepul', bg: 'bg-[#EF4444]', text: 'text-white' },
  waitlist: { label: 'Waitlist', bg: 'bg-[#3B5BFF]', text: 'text-white' },
  presale: { label: 'Pre-sale', bg: 'bg-amber-500', text: 'text-white' },
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
    ? 'px-2.5 py-1 text-[10px] gap-1'
    : 'px-3 py-1.5 text-xs gap-1.5';
  const iconCls = size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5';

  return (
    <div className={`inline-flex items-center ${info.bg} ${info.text} ${sizeCls} rounded-lg font-semibold ${className}`}>
      {status === 'waitlist' || status === 'presale' ? (
        <Clock className={iconCls} />
      ) : (
        <Image src="/images/skills/icon.png" alt="" width={16} height={16} className={iconCls} />
      )}
      {info.label}
    </div>
  );
}
