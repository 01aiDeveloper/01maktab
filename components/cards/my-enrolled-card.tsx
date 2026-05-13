'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { getMediaUrl } from '@/lib/utils';

interface MyEnrolledCardProps {
  image: string;
  title: string;
  mentorName: string;
  moduleLabel?: string;
  lessonLabel?: string;
  href: string;
  variant?: 'light' | 'dark';
  icon?: string;
}

export function MyEnrolledCard({
  image,
  title,
  mentorName,
  moduleLabel,
  lessonLabel,
  href,
  variant = 'light',
  icon,
}: MyEnrolledCardProps) {
  const t = useTranslations('cards');
  const imgSrc = getMediaUrl(image) || '/placeholder.svg';
  const iconSrc = icon ? getMediaUrl(icon) : null;
  const isDark = variant === 'dark';

  return (
    <Link href={href} className="block group">
      <div className="relative rounded-3xl cursor-pointer h-102 border-0">
        {/* Full-cover image */}
        <Image
          src={imgSrc}
          alt={title}
          fill
          className="object-cover rounded-[20px] overflow-hidden transition-transform duration-300"
        />

        {/* Top badges: Модуль · Дарс */}
        {(moduleLabel || lessonLabel) && (
          <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
            {moduleLabel && (
              <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-lg">
                {moduleLabel}
              </span>
            )}
            {lessonLabel && (
              <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-lg">
                {lessonLabel}
              </span>
            )}
          </div>
        )}

        {/* Top right icon */}
        {iconSrc && (
          <div
            className="absolute top-3 right-3 z-10 flex items-center justify-center"
            style={{
              width: '57px',
              height: '57px',
              background: 'rgba(255, 255, 255, 0.2)',
              border: '0.581633px solid rgba(255, 255, 255, 0.17)',
              backdropFilter: 'blur(9.68418px)',
              borderRadius: '18px',
              padding: '8px',
            }}
          >
            <Image
              src={iconSrc}
              alt="course icon"
              width={40}
              height={40}
              className="w-full h-full object-contain"
            />
          </div>
        )}

        {/* Bottom info box — catalog-card bilan bir xil tuzilma */}
        <div
          className="absolute z-10 rounded-[20px] flex items-center justify-between gap-2 px-4"
          style={{
            bottom: '-4px',
            left: '-2px',
            right: '-2px',
            height: '126px',
            background: isDark ? '#1a1a1a' : '#ffffff',
          }}
        >
          <div className="min-w-0">
            <h3
              className="font-bold text-base leading-snug line-clamp-2"
              style={{ color: isDark ? '#ffffff' : '#1a1a1a' }}
            >
              {title}
            </h3>
            <p className="text-sm mt-1 truncate" style={{ color: isDark ? 'rgba(255,255,255,0.5)' : '#6b7280' }}>
              {t('mentor')}: {mentorName}
            </p>
          </div>
          {/* Pause icon */}
          <div className="shrink-0">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              style={{ color: isDark ? 'rgba(255,255,255,0.5)' : '#9ca3af' }}
            >
              <rect x="3" y="2.5" width="4.5" height="15" rx="2" fill="currentColor" />
              <rect x="12.5" y="2.5" width="4.5" height="15" rx="2" fill="currentColor" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
