'use client';

import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useSmartBack } from '@/hooks/use-smart-back';

export function CatalogHero() {
  const t = useTranslations('catalog');
  const tCommon = useTranslations('common');
  const goBack = useSmartBack('/');

  return (
    <section className="container pt-8! pb-4!">
      <div className="grid grid-cols-2 gap-3 sm:gap-4 h-[160px] sm:h-[200px] lg:h-[260px]">
        {/* Left: Dark Card */}
        <div className="relative bg-gradient-to-br from-[#111] to-[#1a1a1a] rounded-[20px] sm:rounded-[24px] p-4 sm:p-6 lg:p-8 flex flex-col justify-between overflow-hidden">
          <button
            type="button"
            onClick={goBack}
            className="inline-flex items-center gap-1.5 sm:gap-2 text-white/50 hover:text-white transition-colors text-xs sm:text-sm w-fit cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>{tCommon('backShort')}</span>
          </button>
          <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold text-white">{t('title')}</h1>
        </div>

        {/* Right: Illustration Card */}
        <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-[20px] sm:rounded-[24px] overflow-hidden">
          <Image
            src="/images/profile-hero.png"
            alt="Catalog"
            fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover"
            priority
            quality={90}
          />
        </div>
      </div>
    </section>
  );
}
