'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Folder, FileText, Pause } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { getMediaUrl } from '@/lib/utils';
import type { MyCourseItem } from '@/hooks/use-my-courses';

interface MyCourseCardProps {
  item: MyCourseItem;
  href: string;
  dark?: boolean;
}

export function MyCourseCard({ item, href, dark = false }: MyCourseCardProps) {
  const t = useTranslations('cards');
  const photoUrl = getMediaUrl(item.cardImage || item.photo);
  const iconUrl = item.icon ? getMediaUrl(item.icon) : null;

  return (
    <Link href={href} className="block group">
      <div className="relative rounded-3xl cursor-pointer h-102 border-0">
        {/* Full-cover image */}
        {photoUrl ? (
          <Image
            quality={90} src={photoUrl}
            alt={item.title || item.name}
            fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover rounded-[20px] overflow-hidden transition-transform duration-300 "
          />
        ) : (
          <div className="absolute inset-0 rounded-[20px] bg-gray-200" />
        )}

        {/* Top row: pills (chapda, sig'masa wrap) + icon (o'ngda) */}
        <div className="absolute top-2.5 left-2.5 right-2.5 z-10 flex items-start justify-between gap-2">
          <div className="flex flex-wrap items-start gap-2 min-w-0">
            {item.moduleTitle && (
              <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-[8px] border border-white/[0.17] text-white text-[13px] font-medium tracking-[-0.4px] px-3 h-[31px] rounded-[11px] max-w-full min-w-0">
                <Folder className="w-4 h-4 shrink-0" />
                <span className="truncate min-w-0">{item.moduleTitle}</span>
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-[8px] border border-white/[0.17] text-white text-[13px] font-medium tracking-[-0.4px] px-3 h-[31px] rounded-[11px] whitespace-nowrap">
              <FileText className="w-4 h-4 shrink-0" />
              {t('lessonProgress', { done: item.completedLessons, total: item.totalLessons })}
            </span>
          </div>

          {iconUrl && (
            <div
              className="shrink-0 flex items-center justify-center"
              style={{
                width: '48px',
                height: '48px',
                background: 'rgba(255, 255, 255, 0.2)',
                border: '0.581633px solid rgba(255, 255, 255, 0.17)',
                backdropFilter: 'blur(8px)',
                borderRadius: '15px',
                padding: '8px',
              }}
            >
              <Image
                quality={90} src={iconUrl}
                alt="course icon"
                width={32}
                height={32}
                className="w-full h-full object-contain"
              />
            </div>
          )}
        </div>

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
                {t('mentor')}: {item.mentor.fullname}
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
