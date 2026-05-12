'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { CardSlashSolid, TickCircleSolid, ClockSolid, Profile2UserSolid } from '@/components/ui/icons/badge-icons';
import { getMediaUrl } from '@/lib/utils';

type CardStatus = 'bought' | 'free' | 'waitlist' | 'presale';

const STATUS_CONFIG: Record<CardStatus, { label: string; bg: string; text: string; width: string }> = {
  bought: { label: 'Sotib olingan', bg: 'bg-[#1EBB4A]', text: 'text-white', width: 'w-[155px]' },
  free: { label: 'Bepul', bg: 'bg-[#1EBB4A]', text: 'text-white', width: 'w-[112px]' },
  waitlist: { label: 'Waitlist', bg: 'bg-[#3B5BFF]', text: 'text-white', width: 'w-[126px]' },
  presale: { label: 'Pre-sale', bg: 'bg-amber-500', text: 'text-white', width: 'w-[126px]' },
};

function formatCount(count: number): string {
  if (count >= 1000) {
    const k = count / 1000;
    return k % 1 === 0 ? `${k}K` : `${k.toFixed(1)}K`;
  }
  return String(count);
}

interface CatalogCardProps {
  id?: number;
  slug?: string;
  title: string;
  image: string;
  badge?: string;
  status?: CardStatus;
  enrollmentCount?: number;
  waitlistCount?: number;
  icon?: string;
  mentorName?: string;
  href: string;
  hideQueueStatus?: boolean;
}

export function CatalogCard({ title, image, badge, status, enrollmentCount, waitlistCount, icon, mentorName, href, hideQueueStatus }: CatalogCardProps) {
  const imgSrc = getMediaUrl(image) || '/placeholder.svg';
  const effectiveStatus = hideQueueStatus && (status === 'waitlist' || status === 'presale') ? undefined : status;
  const statusInfo = effectiveStatus ? STATUS_CONFIG[effectiveStatus] : null;

  return (
    <Link href={href} className="block group">
      <div className="relative rounded-[16px] sm:rounded-[20px] lg:rounded-[24px] cursor-pointer aspect-[425/512]">
        {/* Full-cover image */}
        <Image src={imgSrc} alt={title} fill className="object-cover rounded-[16px] sm:rounded-[20px] lg:rounded-[24px] transition-transform duration-300" />

        {/* Status badge — top left */}
        <div className="absolute top-2.5 left-2.5 sm:top-3.5 sm:left-3.5 z-10 flex flex-col gap-1.5">
          {statusInfo && (
            <div className={`inline-flex items-center justify-center gap-2 ${statusInfo.bg} ${statusInfo.text} h-[34px] ${statusInfo.width} px-3.5 rounded-[12px] text-[18px] leading-[22px] tracking-[-0.05em] font-semibold`}>
              {effectiveStatus === 'waitlist' || effectiveStatus === 'presale' ? (
                <ClockSolid className="w-[18px] h-[18px]" />
              ) : effectiveStatus === 'bought' ? (
                <TickCircleSolid className="w-[18px] h-[18px]" />
              ) : (
                <CardSlashSolid className="w-[18px] h-[18px]" />
              )}
              {statusInfo.label}
            </div>
          )}
          {!statusInfo && badge && (
            <div className="inline-flex items-center justify-center gap-2 bg-[#1EBB4A] text-white h-[34px] w-[112px] px-3.5 rounded-[12px] text-[18px] leading-[22px] tracking-[-0.05em] font-semibold">
              <CardSlashSolid className="w-[18px] h-[18px]" />
              {badge}
            </div>
          )}
          {enrollmentCount != null && enrollmentCount > 0 && (
            <div className="inline-flex items-center justify-center gap-2 bg-[#FAEF3B] text-black h-[34px] w-[216px] px-3.5 rounded-[12px] text-[18px] leading-[22px] tracking-[-0.05em] font-semibold">
              <Profile2UserSolid className="w-[22px] h-[22px]" />
              {formatCount(enrollmentCount)} sotib oldi
            </div>
          )}
          {!enrollmentCount && waitlistCount != null && waitlistCount > 0 && (
            <div className="inline-flex items-center justify-center gap-2 bg-[#FAEF3B] text-black h-[34px] w-[216px] px-3.5 rounded-[12px] text-[18px] leading-[22px] tracking-[-0.05em] font-semibold">
              <Profile2UserSolid className="w-[22px] h-[22px]" />
              {formatCount(waitlistCount)} odam kutmoqda
            </div>
          )}
        </div>

        {/* Icon circle — top right */}
        {icon && (
          <div className="absolute top-2.5 right-2.5 sm:top-3.5 sm:right-3.5 z-10 w-8 h-8 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-[18px] bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Image src={getMediaUrl(icon) || '/placeholder.svg'} alt="" width={24} height={24} className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 object-contain" />
          </div>
        )}

        {/* Bottom info overlay */}
        <div className="absolute z-10 rounded-[14px] sm:rounded-[18px] lg:rounded-[20px] flex items-end justify-between gap-2 p-3 sm:p-4 lg:p-5 bg-white bottom-0 left-0 right-0">
          <div className="min-w-0">
            <h3 className="text-[#1a1a1a] font-bold text-xs sm:text-base lg:text-lg leading-snug line-clamp-2">{title}</h3>
            {mentorName && <p className="text-gray-400 text-[10px] sm:text-sm mt-0.5 sm:mt-1 truncate">Mentor: {mentorName}</p>}
          </div>
          <div className="shrink-0">
            <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gray-400 group-hover:text-[#3B5BFF] transition-colors" />
          </div>
        </div>
      </div>
    </Link>
  );
}
