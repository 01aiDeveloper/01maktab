'use client';

import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useSmartBack } from '@/hooks/use-smart-back';

export function ProfileHero() {
  const t = useTranslations('profile');
  const tCommon = useTranslations('common');
  const goBack = useSmartBack('/');

  return (
    <section className="pt-2 pb-4">
      {/* Mobile layout */}
      <div className="lg:hidden relative rounded-[24px] overflow-hidden h-64">
        <Image
          src="/images/profile-hero.png"
          alt="Profile"
          fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover"
          priority
          quality={90}
        />
        {/* Orqaga button top left */}
        <button
          type="button"
          onClick={goBack}
          className="absolute top-4 left-4 inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm z-10 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{tCommon('backShort')}</span>
        </button>
        {/* Profil text bottom */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-6 pt-10 pb-5">
          <h1 className="text-3xl font-bold text-white">{t('title')}</h1>
        </div>
      </div>

      {/* Desktop layout */}
      <div className="hidden lg:grid grid-cols-[1fr_1.2fr] gap-4 h-60">
        {/* Left: Dark Card */}
        <div className="relative bg-gradient-to-br from-[#111] to-[#1a1a1a] rounded-[24px] p-8 flex flex-col justify-between overflow-hidden">
          <button
            type="button"
            onClick={goBack}
            className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm w-fit cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{tCommon('backShort')}</span>
          </button>
          <h1 className="text-4xl font-bold text-white">{t('title')}</h1>
        </div>

        {/* Right: Illustration Card */}
        <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-[24px] overflow-hidden">
          <Image
            src="/images/profile-hero.png"
            alt="Profile"
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
