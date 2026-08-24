'use client';

import { useTranslations } from 'next-intl';
import { useSmartBack } from '@/hooks/common/use-smart-back';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { EventHero } from '@/components/events/event-hero';
import { EventAbout } from '@/components/events/event-about';
import { EventProgram } from '@/components/events/event-program';
import { EventBenefits } from '@/components/events/event-benefits';

export default function EventPage() {
  const t = useTranslations('eventPage');
  const goBack = useSmartBack('/');

  const eventData = {
    title: t('title'),
    description: t('description'),
    date: t('date'),
    location: t('location'),
    about: {
      title: t('aboutTitle'),
      content: t('aboutContent'),
    },
    program: [
      {
        id: 1,
        title: t('stage1'),
        items: [
          { order: 1, text: t('stage1Item1') },
          { order: 2, text: t('stage1Item2') },
          { order: 3, text: t('stage1Item3') },
        ],
      },
      { id: 2, title: t('stage2'), items: [] },
      { id: 3, title: t('stage3'), items: [] },
      { id: 4, title: t('stage4'), items: [] },
      { id: 5, title: t('stage5'), items: [] },
    ],
    benefits: [t('benefit1'), t('benefit2'), t('benefit3'), t('benefit4')],
  };

  return (
    <div className="min-h-screen bg-[#0b0b0b]">
      <SiteHeader variant="light" />

      <main className="min-h-screen bg-[#0b0b0b]">
        <EventHero event={eventData} onBack={goBack} />

        <div className="container mx-auto my-12 lg:my-16 max-w-[1200px] space-y-8 lg:space-y-12">
          <EventAbout title={eventData.about.title} content={eventData.about.content} />
          <EventProgram program={eventData.program} />
          <EventBenefits benefits={eventData.benefits} />
        </div>
      </main>

      <SiteFooter variant="dark" />
    </div>
  );
}
