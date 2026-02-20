'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { getMediaUrl } from '@/lib/utils';

interface CatalogCardProps {
  id?: number;
  slug?: string;
  title: string;
  image: string;
  badge?: string;
  icon?: string;
  mentorName?: string;
  href: string;
}

export function CatalogCard({ title, image, badge, icon, mentorName, href }: CatalogCardProps) {
  const imgSrc = getMediaUrl(image) || '/placeholder.svg';

  return (
    <Link href={href} className="block group">
      <div className="relative  rounded-3xl cursor-pointer h-102 border-0">
        {/* Full-cover image */}
        <Image src={imgSrc} alt={title} fill className="object-cover rounded-[20px] overflow-hidden transition-transform duration-300 " />

        {/* Badge — top left */}
        {badge && (
          <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-emerald-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold">
            <Image src="/images/skills/icon.png" alt="" width={14} height={14} className="w-3.5 h-3.5" />
            {badge}
          </div>
        )}

        {/* Icon circle — top right */}
        {icon && (
          <div className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Image src={getMediaUrl(icon) || '/placeholder.svg'} alt="" width={20} height={20} className="w-5 h-5 object-contain" />
          </div>
        )}

        {/* Glassmorphism overlay — image ustida, barcha burchagi yumaloq, fixed height */}
        <div
          className="absolute  z-10 rounded-[20px] flex items-center justify-between gap-2 px-4 bg-white"
          style={{
            bottom: '-4px',
            left: '-2px',
            right: '-2px',
            height: '126px',
            
          }}
        >
          <div className="min-w-0">
            <h3 className="text-[#1a1a1a] font-bold text-base leading-snug line-clamp-2">{title}</h3>
            {mentorName && <p className="text-gray-500 text-sm mt-1 truncate">Mentor: {mentorName}</p>}
          </div>
          <div className="shrink-0">
            <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-[#3B5BFF] transition-colors" />
          </div>
        </div>
      </div>
    </Link>
  );
}
