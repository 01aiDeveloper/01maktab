'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Layers, BookMarked, Play, Pause } from 'lucide-react';
import { getMediaUrl } from '@/lib/utils';
import type { MyCourseItem } from '@/hooks/use-my-courses';

interface MyCourseCardProps {
  item: MyCourseItem;
  href: string;
  dark?: boolean;
}

export function MyCourseCard({ item, href, dark = false }: MyCourseCardProps) {
  const photoUrl = getMediaUrl(item.photo);

  return (
    <Link href={href} className="block group">
      <div className="relative rounded-3xl cursor-pointer h-102 border-0">
        {/* Full-cover image */}
        {photoUrl ? (
          <Image
            src={photoUrl}
            alt={item.title || item.name}
            fill
            className="object-cover rounded-[20px] overflow-hidden transition-transform duration-300 "
          />
        ) : (
          <div className="absolute inset-0 rounded-[20px] bg-gray-200" />
        )}

        {/* Top badges: Module + Dars */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
          {item.moduleTitle && (
            <span className="flex items-center gap-1 bg-black/50 backdrop-blur-sm text-white text-[11px] font-medium px-2.5 py-1 rounded-lg">
              <Layers className="w-3 h-3" />
              {item.moduleTitle}
            </span>
          )}
          <span className="flex items-center gap-1 bg-black/50 backdrop-blur-sm text-white text-[11px] font-medium px-2.5 py-1 rounded-lg">
            <BookMarked className="w-3 h-3" />
            Dars: {item.completedLessons}/{item.totalLessons}
          </span>
        </div>

        {/* Play/Pause — top right */}
        {/* <div className="absolute top-3 right-3 z-10">
          <div className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
            {item.isOpen ? <Pause className="w-3.5 h-3.5 text-white fill-white" /> : <Play className="w-3.5 h-3.5 text-white fill-white" />}
          </div>
        </div> */}

        {/* Bottom info box — catalog-card bilan bir xil */}
        <div
          className="absolute z-10 rounded-[20px] flex items-center justify-between gap-2 px-4"
          style={{
            bottom: '-4px',
            left: '-2px',
            right: '-2px',
            height: '126px',
            background: dark ? '#1a1a1a' : '#ffffff',
          }}
        >
          <div className="min-w-0">
            <h3 className="font-bold text-base leading-snug line-clamp-2" style={{ color: dark ? '#ffffff' : '#1a1a1a' }}>
              {item.title || item.name}
            </h3>
            {item.mentor?.fullname && (
              <p className="text-sm mt-1 truncate" style={{ color: dark ? 'rgba(255,255,255,0.5)' : '#6b7280' }}>
                Mentor: {item.mentor.fullname}
              </p>
            )}
          </div>
          {/* Pause icon — circle */}
          <div
            className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: dark ? '#ffffff' : '#1a1a1a' }}
          >
            <Pause className="w-4 h-4" style={{ color: dark ? '#1a1a1a' : '#ffffff' }} />
          </div>
        </div>
      </div>
    </Link>
  );
}
