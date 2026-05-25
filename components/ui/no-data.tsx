'use client';

import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface NoDataProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function NoData({ title, description, icon, className }: NoDataProps) {
  const t = useTranslations('noData');
  const finalTitle = title ?? t('messageDefault');
  return (
    <div className={cn('flex flex-col items-center justify-center gap-3 py-16 text-center', className)}>
      <div className="w-16 h-16 rounded-2xl  flex items-center justify-center text-2xl mb-1">
        {icon ? icon : <Image quality={95} src="/images/common/nodata.png" alt="No data" width={200} height={200} className={`object-contain  `} />}
      </div>
      <p className="text-sm font-medium text-gray-500">{finalTitle}</p>
      {description && <p className="text-xs text-gray-400 max-w-xs leading-relaxed">{description}</p>}
    </div>
  );
}
