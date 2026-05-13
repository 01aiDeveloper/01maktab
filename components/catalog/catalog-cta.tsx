'use client';

import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

export function CatalogCta() {
  const t = useTranslations('catalog');
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab') || 'skills';
  const text =
    tab === 'courses'
      ? t('ctaCourses')
      : tab === 'professions'
        ? t('ctaProfessions')
        : t('ctaSkills');

  return (
    <section className="container pb-12! pt-4!">
      <div className="bg-[#EBEBEB] rounded-[22px] p-8 lg:p-10 text-center">
        <p className="text-[#1A1A1A] text-base lg:text-lg font-bold leading-relaxed max-w-lg mx-auto">
          {text}
        </p>
      </div>
    </section>
  );
}
