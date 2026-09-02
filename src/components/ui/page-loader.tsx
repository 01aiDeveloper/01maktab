'use client';

import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

interface PageLoaderProps {
  fullPage?: boolean;
  className?: string;
}

export function PageLoader({ fullPage = false, className }: PageLoaderProps) {
  const t = useTranslations('common');
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-4',
        fullPage ? 'min-h-screen' : 'py-24',
        className,
      )}
    >
      <div className="relative w-14 h-14">
        <span className="absolute inset-0 rounded-full border-4 border-gray-100" />
        <span className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#3B5BFF] animate-spin" />
        <span className="absolute inset-[18px] rounded-full bg-[#3B5BFF] animate-ping opacity-60" />
        <span className="absolute inset-[18px] rounded-full bg-[#3B5BFF]" />
      </div>
      <p className="text-sm text-gray-400 animate-pulse">{t('loading')}</p>
    </div>
  );
}
