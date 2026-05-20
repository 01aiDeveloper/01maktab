'use client';

import Image from 'next/image';
import { Download } from 'lucide-react';
import { getMediaUrl } from '@/lib/utils';
import type { CourseCertificate } from '@/types/api.types';

interface MyCertificateCardProps {
  item: CourseCertificate;
  dark?: boolean;
}

export function MyCertificateCard({ item, dark = false }: MyCertificateCardProps) {
  const fileUrl = item.file ? getMediaUrl(item.file) : null;
  // Preview rasm: thumbnail bor bo'lsa undan, bo'lmasa shablon rasmi.
  // PDF faylni <Image>'da ko'rsatib bo'lmaydi.
  const previewSrc = item.thumbnail
    ? getMediaUrl(item.thumbnail)
    : item.template
      ? getMediaUrl(item.template)
      : null;

  const handleDownload = () => {
    if (!fileUrl) return;
    const a = document.createElement('a');
    a.href = fileUrl;
    a.download = item.title || 'certificate';
    a.target = '_blank';
    a.click();
  };

  return (
    <div className="block group cursor-pointer" onClick={handleDownload}>
      <div className="relative rounded-3xl h-102 border-0">
        {/* Full-cover image — certificate file preview */}
        {/* Background gradient */}
        <div
          className="absolute inset-0 rounded-[20px]"
          style={{ background: 'linear-gradient(180deg, #888888 0%, #000000 100%)' }}
        />

        {previewSrc && (
          <Image
            src={previewSrc}
            alt={item.title}
            fill
            className="object-cover rounded-[20px] overflow-hidden opacity-60"
          />
        )}

        {/* Bottom info box */}
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
            <h3
              className="font-bold text-base leading-snug line-clamp-2"
              style={{ color: dark ? '#ffffff' : '#1a1a1a' }}
            >
              {item.course?.title || item.course?.name || item.courseTitle || item.courseName || item.title}
            </h3>
            <p className="text-sm mt-1 truncate" style={{ color: dark ? 'rgba(255,255,255,0.5)' : '#6b7280' }}>
              {new Date(item.createdAt).toLocaleDateString('ru-RU')}
            </p>
          </div>

          {/* Download icon — circle */}
          <div
            className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: dark ? '#ffffff' : '#1a1a1a' }}
          >
            <Download className="w-4 h-4" style={{ color: dark ? '#1a1a1a' : '#ffffff' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
