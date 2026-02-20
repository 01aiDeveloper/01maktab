'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Layers, BookMarked, Play, Pause } from 'lucide-react';
import { cn, getMediaUrl } from '@/lib/utils';
import type { MyCourseItem } from '@/hooks/use-my-courses';

interface MyCourseCardProps {
  item: MyCourseItem;
  /** Where to navigate on click */
  href: string;
  /** Dark card variant (for Kasblarim section) */
  dark?: boolean;
}

export function MyCourseCard({ item, href, dark = false }: MyCourseCardProps) {
  const photoUrl = getMediaUrl(item.photo);
  const progress = item.totalLessons > 0
    ? Math.round((item.completedLessons / item.totalLessons) * 100)
    : 0;

  return (
    <Link href={href} className="block group">
      <div
        className={cn(
          'relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer',
          dark ? 'bg-[#2a2a2a]' : 'bg-gray-100',
        )}
      >
        {/* Background image */}
        {photoUrl && (
          <Image
            src={photoUrl}
            alt={item.title || item.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

        {/* Top badges */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          {item.moduleTitle && (
            <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm text-white text-[11px] font-medium px-2 py-1 rounded-full">
              <Layers className="w-3 h-3" />
              <span>{item.moduleTitle}</span>
            </div>
          )}
          <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm text-white text-[11px] font-medium px-2 py-1 rounded-full">
            <BookMarked className="w-3 h-3" />
            <span>Dars: {item.completedLessons}/{item.totalLessons}</span>
          </div>
        </div>

        {/* Play/Pause button top-right */}
        <div className="absolute top-3 right-3">
          <div className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
            {item.isOpen ? (
              <Pause className="w-3.5 h-3.5 text-white fill-white" />
            ) : (
              <Play className="w-3.5 h-3.5 text-white fill-white" />
            )}
          </div>
        </div>

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          {/* Progress bar */}
          <div className="w-full h-[3px] bg-white/20 rounded-full mb-2.5 overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>

          <h3 className="text-white font-semibold text-sm leading-tight mb-0.5 line-clamp-1">
            {item.title || item.name}
          </h3>
          {item.mentor?.fullname && (
            <p className="text-white/60 text-xs">
              Mentor: {item.mentor.fullname}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
