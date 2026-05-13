'use client';

import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { useSmartBack } from '@/hooks/use-smart-back';

export default function CommunityPage() {
  const t = useTranslations('community');
  const tCommon = useTranslations('common');
  const goBack = useSmartBack('/');

  return (
    <>
      <SiteHeader variant="light" />

      <main className="min-h-screen bg-[#f5f5f5]">
        {/* Hero Section */}
        <section className="container pt-8 pb-4">
          {/* Back link - mobile only */}

          {/* Desktop: 2 columns, Mobile: stacked */}
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4">
            {/* Right card first on mobile */}
            <div
              className="lg:hidden relative rounded-[20px] overflow-hidden h-60 "
              style={{ background: 'linear-gradient(270deg, #C6B0CD 0%, #9E9AA2 35%, #C0B6B8 65%, #BD92AB 100%)' }}
            >
              <button
                type="button"
                onClick={goBack}
                className="lg:hidden pt-4 pl-4 inline-flex items-center gap-2 text-[#18181A]/50 hover:text-[#18181A] transition-colors text-sm mb-3 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{tCommon('backShort')}</span>
              </button>
              <div className="absolute inset-0 flex items-center justify-center">
                <Image src="/icons/lock.svg" alt="lock" width={70} height={70} unoptimized />
              </div>
            </div>

            {/* Left: Dark Card */}
            <div className="relative bg-linear-to-br from-[#111] to-[#1a1a1a] rounded-3xl p-7 lg:p-8 flex flex-col justify-between h-50 lg:h-60">
              <button
                type="button"
                onClick={goBack}
                className="hidden lg:inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm w-fit cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{tCommon('backShort')}</span>
              </button>
              <h1 className="text-3xl lg:text-4xl font-bold text-white leading-tight whitespace-pre-line">
                {t('comingSoonTitle')}
              </h1>
            </div>

            {/* Right: Lock Card (desktop only) */}
            <div
              className="hidden lg:flex items-center justify-center relative rounded-[40px] overflow-hidden h-60"
              style={{ background: 'linear-gradient(270deg, #C6B0CD 0%, #9E9AA2 35%, #C0B6B8 65%, #BD92AB 100%)' }}
            >
              <Image src="/icons/lock.svg" alt="lock" width={70} height={70} unoptimized />
            </div>
          </div>
        </section>

        {/* Spacer to push footer down */}
        <div className="flex-1 min-h-75" />
      </main>

      <SiteFooter />
    </>
  );
}
