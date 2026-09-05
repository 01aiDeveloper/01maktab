'use client';

import { useState } from 'react';
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
  index?: number;
}

export function SkillCard({
  id, slug, image, title, iconUrl, badge, href,
  enrollmentCount, waitlistCount,
  hasPurchased, pricingType, price, presalesEnabled, waitlistEnabled,
  hideQueueStatus,
  index,
}: SkillCardProps) {
  const rawStatus = resolveStatus({ hasPurchased, pricingType, price, presalesEnabled, waitlistEnabled });
  const status = hideQueueStatus ? null : rawStatus;
  const countNum = enrollmentCount ?? waitlistCount ?? 0;
  const countKind = enrollmentCount ? 'enrolled' : 'waitlist';
  const cardSlug = slug || id?.toString() || 'skill';
  const linkHref = href || `/skills/${cardSlug}`;
  const [imgSrc, setImgSrc] = useState(getMediaUrl(image) || '/placeholder.svg');

  return (
    <Link href={linkHref} className="block group">
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        whileHover={{ y: -8, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{
          duration: 0.45,
          ease: [0.25, 0.1, 0.25, 1],
          delay: index != null ? (index % 4) * 0.08 : 0,
        }}
        className="relative overflow-hidden rounded-[20px] aspect-3/4 min-w-[160px] cursor-pointer bg-gradient-to-br from-[#3B5BFF] to-[#2A3F8F] shadow-[0_10px_24px_rgba(24,38,86,0.08)] hover:shadow-[0_20px_35px_rgba(24,38,86,0.18)] transition-all duration-300"
        className="relative overflow-hidden rounded-[20px] aspect-3/4 min-w-[160px] cursor-pointer bg-gradient-to-br from-[#3B5BFF] to-[#2A3F8F] shadow-[0_10px_24px_rgba(24,38,86,0.08)] hover:shadow-[0_20px_35px_rgba(24,38,86,0.18)] transition-shadow duration-300"
      >
        <Image
          quality={90} src={imgSrc}
          alt={title}
          fill
          sizes="(max-width: 640px) 83vw, (max-width: 1024px) 33vw, 280px"
          className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
          onError={() => setImgSrc('/placeholder.svg')}
        />

        <div className="absolute top-2.5 left-2.5 right-2.5 z-10 flex items-start gap-2.5">
          <div className="w-12 h-12 bg-white/20 border border-white/[0.17] backdrop-blur-[8px] rounded-[15px] flex items-center justify-center shrink-0">
          <div className="w-12 h-12 bg-white/20 border border-white/[0.17] backdrop-blur-[8px] rounded-[15px] flex items-center justify-center shrink-0 transition-transform duration-300 ease-out group-hover:scale-110">
            <Image quality={90} src={iconUrl ? getMediaUrl(iconUrl) : '/images/skills/icon.png'} alt={title} width={32} height={32} />
          </div>

          {countNum > 0 && <EnrollmentBadge count={countNum} kind={countKind} />}
          {status ? (
            <StatusBadge status={status} />
          ) : badge ? (
            <div className="flex items-center gap-1.5 bg-emerald-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold">
              <Image quality={90} src={'/images/skills/icon.png'} alt="" width={14} height={14} className="w-3.5 h-3.5" />
              {badge}
            </div>
          ) : null}
        </div>

        <div className="absolute bottom-0 left-0 right-0 flex items-center px-4.5 h-[84px] bg-white/20 backdrop-blur-[43px] rounded-[20px] transition-all duration-300 group-hover:bg-white/30">
        <motion.div
          className="absolute bottom-0 left-0 right-0 flex items-center px-4.5 h-[84px] bg-white/20 backdrop-blur-[43px] rounded-[20px] transition-colors duration-300 group-hover:bg-white/30"
          initial={{ y: 6, opacity: 0.92 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.35, delay: (index != null ? (index % 4) * 0.08 : 0) + 0.1 }}
        >
          <h3 className="text-white flex-1 text-[20px] font-semibold leading-[20px] tracking-[-0.05em] capitalize">
            {title}
          </h3>
          <div className="absolute top-3 right-3 transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1">
          <div className="absolute top-3 right-3 transition-transform duration-300 ease-out group-hover:translate-x-1.5 group-hover:-translate-y-1.5">
            <Image quality={90} src="/icons/main-arrow.svg" alt="arrow" width={20} height={20} unoptimized className="opacity-80 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
        </motion.div>

      </motion.div>
    </Link>
  );
}
