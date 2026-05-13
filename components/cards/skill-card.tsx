'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getMediaUrl } from '@/lib/utils';
import { EnrollmentBadge } from '@/components/ui/enrollment-badge';
import { StatusBadge, resolveStatus, type StatusFlags } from '@/components/ui/status-badge';

interface SkillCardProps extends StatusFlags {
  id?: number;
  slug?: string;
  image: string;
  title: string;
  iconUrl?: string | null;
  badge?: string;
  href?: string;
  enrollmentCount?: number;
  waitlistCount?: number;
  hideQueueStatus?: boolean;
}

export function SkillCard({
  id, slug, image, title, iconUrl, badge, href,
  enrollmentCount, waitlistCount,
  hasPurchased, pricingType, price, presalesEnabled, waitlistEnabled,
  hideQueueStatus,
}: SkillCardProps) {
  const rawStatus = resolveStatus({ hasPurchased, pricingType, price, presalesEnabled, waitlistEnabled });
  const status = hideQueueStatus ? null : rawStatus;
  const countNum = enrollmentCount ?? waitlistCount ?? 0;
  const countKind = enrollmentCount ? 'enrolled' : 'waitlist';
  const cardSlug = slug || id?.toString() || 'skill';
  const linkHref = href || `/skills/${cardSlug}`;

  return (
    <Link href={linkHref}>
      <motion.div
        whileHover={{ scale: 1.01, y: -1 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="relative overflow-hidden rounded-3xl aspect-3/4 min-w-[160px] cursor-pointer group"
      >
        <Image
          src={getMediaUrl(image) || '/placeholder.svg'}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {status ? (
          <div className="absolute top-3 right-3 z-10">
            <StatusBadge status={status} />
          </div>
        ) : badge && (
          <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 bg-emerald-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold">
            <Image src={'/images/skills/icon.png'} alt="" width={14} height={14} className="w-3.5 h-3.5" />
            {badge}
          </div>
        )}

        {countNum > 0 ? (
          <div className="absolute top-3 left-3 z-10">
            <EnrollmentBadge count={countNum} kind={countKind} />
          </div>
        ) : null}

        <div className="absolute bottom-0 left-0 right-0 flex items-center px-4.5 h-[104px] bg-white/20 backdrop-blur-[53.25px] rounded-[25px]">
          <h3 className="text-white flex-1 text-2xl font-semibold leading-[25px] tracking-[-0.05em]">
            {title}
          </h3>
          <div className="absolute top-3 right-2.5">
            <Image src="/icons/main-arrow.svg" alt="arrow" width={20} height={20} unoptimized />
          </div>
        </div>

      </motion.div>
    </Link>
  );
}
