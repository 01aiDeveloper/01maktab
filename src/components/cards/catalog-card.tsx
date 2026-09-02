'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { CardSlashSolid, TickCircleSolid, ClockSolid, Profile2UserSolid } from '@/components/ui/icons/badge-icons';
import { getMediaUrl } from '@/lib/utils';

type CardStatus = 'bought' | 'free' | 'waitlist' | 'presale' | 'available';

const STATUS_STYLE: Record<CardStatus, { bg: string; text: string }> = {
  bought: { bg: 'bg-[#1EBB4A]', text: 'text-white' },
  free: { bg: 'bg-[#1EBB4A]', text: 'text-white' },
  waitlist: { bg: 'bg-[#2A51E6]', text: 'text-white' },
  presale: { bg: 'bg-amber-500', text: 'text-white' },
  available: { bg: 'bg-[#1EBB4A]', text: 'text-white' },
};

const STATUS_KEY: Record<CardStatus, 'statusBought' | 'statusFree' | 'statusWaitlist' | 'statusPresale' | 'statusAvailable'> = {
  bought: 'statusBought',
  free: 'statusFree',
  waitlist: 'statusWaitlist',
  presale: 'statusPresale',
  available: 'statusAvailable',
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
  const t = useTranslations('cards');
  const initialSrc = getMediaUrl(image) || '/placeholder.svg';
  const [imgSrc, setImgSrc] = useState(initialSrc);
  const effectiveStatus = hideQueueStatus && (status === 'waitlist' || status === 'presale') ? undefined : status;
  const statusStyle = effectiveStatus ? STATUS_STYLE[effectiveStatus] : null;
  const statusLabel = effectiveStatus ? t(STATUS_KEY[effectiveStatus]) : null;

  return (
    <Link href={href} className="block group">
      <div className="relative rounded-[16px] sm:rounded-[20px] lg:rounded-[24px] cursor-pointer aspect-[425/512] overflow-hidden bg-gradient-to-br from-[#3B5BFF] to-[#2A3F8F]">
        {/* Full-cover image */}
        <Image
          quality={90} src={imgSrc}
          alt={title}
          fill
          sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 280px"
          className="object-cover object-center rounded-[16px] sm:rounded-[20px] lg:rounded-[24px] transition-transform duration-300"
          onError={() => setImgSrc('/placeholder.svg')}
        />

        {/* Status badge — top left */}
        <div className="absolute top-2.5 left-2.5 sm:top-3.5 sm:left-3.5 z-10 flex flex-col items-start gap-1.5">
          {statusStyle && statusLabel && (
            <div className={`inline-flex w-fit items-center gap-2 ${statusStyle.bg} ${statusStyle.text} h-[31px] px-[17px] rounded-[11px] text-[14px] leading-[25px] tracking-[-0.7px] font-[450]`}>
              {effectiveStatus === 'waitlist' || effectiveStatus === 'presale' ? (
                <ClockSolid className="w-5 h-5" />
              ) : effectiveStatus === 'bought' || effectiveStatus === 'available' ? (
                <TickCircleSolid className="w-5 h-5" />
              ) : (
                <CardSlashSolid className="w-5 h-5" />
              )}
              {statusLabel}
            </div>
          )}
          {!statusStyle && badge && (
            <div className="inline-flex w-fit items-center gap-2 bg-[#1EBB4A] text-white h-[31px] px-[17px] rounded-[11px] text-[14px] leading-[25px] tracking-[-0.7px] font-[450]">
              <CardSlashSolid className="w-5 h-5" />
              {badge}
            </div>
          )}
          {enrollmentCount != null && enrollmentCount > 0 && (
            <div className="inline-flex w-fit items-center gap-2 bg-[#FFF000] text-[#18181A] h-[31px] px-[17px] rounded-[11px] text-[14px] leading-[25px] tracking-[-0.7px] font-[450]">
              <Profile2UserSolid className="w-5 h-5" />
              {formatCount(enrollmentCount)} {t('enrolled')}
            </div>
          )}
          {!enrollmentCount && waitlistCount != null && waitlistCount > 0 && (
            <div className="inline-flex w-fit items-center gap-2 bg-[#FFF000] text-[#18181A] h-[31px] px-[17px] rounded-[11px] text-[14px] leading-[25px] tracking-[-0.7px] font-[450]">
              <Profile2UserSolid className="w-5 h-5" />
              {formatCount(waitlistCount)} {t('waiting')}
            </div>
          )}
        </div>

        {/* Icon circle — top right */}
        {icon && (
          <div className="absolute top-2.5 right-2.5 sm:top-3.5 sm:right-3.5 z-10 w-10 h-10 sm:w-[45.6px] sm:h-[45.6px] rounded-[14.4px] bg-white/20 border border-white/[0.17] backdrop-blur-[8px] flex items-center justify-center">
            <Image quality={90} src={getMediaUrl(icon) || '/placeholder.svg'} alt="" width={28} height={28} className="w-6 h-6 sm:w-7 sm:h-7 object-contain" />
          </div>
        )}

        {/* Bottom info overlay — frosted */}
        <div
          className="absolute z-10 rounded-t-[20px] flex items-center justify-between gap-2 px-5 bottom-0 left-0 right-0 h-[104.8px] bg-white/80 backdrop-blur-[47.52px]"
        >
          <div className="min-w-0">
            <h3 className="text-[#18181A] font-semibold text-[19px] sm:text-[22.4px] leading-[1.05] tracking-[-1.12px] capitalize line-clamp-2">{title}</h3>
            {mentorName && <p className="text-[#9F9F9F] text-[13px] sm:text-[16px] mt-1 truncate">{t('mentor')}: {mentorName}</p>}
          </div>
          <div className="shrink-0">
            <ArrowUpRight className="w-7 h-7 sm:w-8 sm:h-8 text-[#18181A] group-hover:text-[#3B5BFF] transition-colors" />
          </div>
        </div>
      </div>
    </Link>
  );
}
