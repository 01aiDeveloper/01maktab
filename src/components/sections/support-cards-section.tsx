'use client';

import { useTranslations } from 'next-intl';
import { SupportCard } from '@/components/cards/support-card';

export function SupportCardsSection() {
  const t = useTranslations('supportCards');
  const supportCards = [
    {
      title: t('teacherTitle'),
      subtitle: t('teacherSubtitle'),
      bullets: [t('teacherB1'), t('teacherB2'), t('teacherB3')],
      illustration: '/icons/professions/card-icon1.webp',
    },
    {
      title: t('hoursTitle'),
      subtitle: t('hoursSubtitle'),
      bullets: [t('hoursB1'), t('hoursB2'), t('hoursB3')],
      illustration: '/icons/professions/card-icon2.webp',
    },
    {
      title: t('recordTitle'),
      subtitle: t('recordSubtitle'),
      bullets: [t('recordB1'), t('recordB2'), t('recordB3')],
      illustration: '/icons/professions/card-icon3.webp',
    },
  ];

  return (
    <section className="w-full py-8">
      <div className="container mx-auto px-4">
        <h2 className="font-suisse text-2xl lg:text-3xl font-bold text-white mb-8 text-center">{t('sectionTitle')}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {supportCards.map((card, index) => (
            <SupportCard key={index} title={card.title} subtitle={card.subtitle} bullets={card.bullets} illustration={card.illustration} />
          ))}
        </div>
      </div>
    </section>
  );
}
