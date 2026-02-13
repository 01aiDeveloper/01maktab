'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { getMediaUrl } from '@/lib/utils';

interface CatalogCardProps {
  id: number | string;
  slug?: string;
  title: string;
  subtitle: string;
  image: string;
  badge?: string;
  badgeColor?: 'blue' | 'green' | 'yellow';
  href: string;
}

const BADGE_COLORS = {
  blue: 'bg-blue-500 text-white',
  green: 'bg-emerald-500 text-white',
  yellow: 'bg-yellow-400 text-black',
};

export function CatalogCard({
  title,
  subtitle,
  image,
  badge,
  badgeColor = 'green',
  href,
}: CatalogCardProps) {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="bg-white rounded-[22px] overflow-hidden cursor-pointer group shadow-[0_1px_4px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-shadow h-full"
      >
        {/* Image Area */}
        <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-50 to-gray-100 p-5">
          {/* Badge */}
          {badge && (
            <div className={`absolute top-4 left-4 z-10 px-2.5 py-1 rounded-md text-[11px] font-semibold ${BADGE_COLORS[badgeColor]}`}>
              {badge}
            </div>
          )}

          {/* Menu icon top right */}
          <div className="absolute top-4 right-4 z-10 w-7 h-7 bg-white/80 backdrop-blur-sm rounded-lg flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-gray-400">
              <rect x="0.5" y="0.5" width="4.5" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.2" />
              <rect x="7" y="0.5" width="4.5" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.2" />
              <rect x="0.5" y="7" width="4.5" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.2" />
              <rect x="7" y="7" width="4.5" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </div>

          {/* Course Image */}
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src={getMediaUrl(image)}
              alt={title}
              fill
              className="object-contain p-2"
            />
          </div>
        </div>

        {/* Content */}
        <div className="px-4 py-3.5 flex items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="font-bold text-[15px] text-gray-900 truncate leading-tight">{title}</h3>
            <p className="text-xs text-gray-400 truncate mt-0.5">{subtitle}</p>
          </div>
          <div className="w-7 h-7 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-50 transition-colors">
            <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#3B5BFF] transition-colors" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
