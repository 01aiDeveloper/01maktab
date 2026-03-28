'use client';

import { Users } from 'lucide-react';

function formatCount(count: number): string {
  if (count >= 1000) {
    const k = count / 1000;
    return k % 1 === 0 ? `${k}K` : `${k.toFixed(1)}K`;
  }
  return String(count);
}

interface EnrollmentBadgeProps {
  count: number;
  className?: string;
}

export function EnrollmentBadge({ count, className = '' }: EnrollmentBadgeProps) {
  if (!count || count <= 0) return null;

  return (
    <div className={`inline-flex items-center gap-1.5 bg-[#FAEF3B] text-black px-3 py-1.5 rounded-full text-xs font-semibold ${className}`}>
      <Users className="w-3.5 h-3.5" />
      <span>{formatCount(count)} odam kutmoqda</span>
    </div>
  );
}
