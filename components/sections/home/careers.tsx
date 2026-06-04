'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { MainTitle } from '@/components/ui/main-title';
import { Subtitle } from '@/components/ui/subtitle';
import { MainButton } from '@/components/ui/main-button';
import { EnrollmentBadge } from '@/components/ui/enrollment-badge';
import type { Career } from '@/types/api.types';

const STATIC_IMAGES = ['/images/hero4.jpg', '/images/hero6.jpg'];
const STATIC_TITLE_KEYS = ['dataAnalyst', 'mlEngineer'] as const;


interface CareersSectionProps {
  careers: Career[];
}

export function CareersSection({ careers: apiCareers }: CareersSectionProps) {
  const t = useTranslations('careers');
  const tCommon = useTranslations('common');
  // console.table(apiCareers.map((c) => ({ id: c.id, name: c.name, description: c.description?.slice(0, 50) })));
  // console.log('[CareersSection] apiCareers count:', apiCareers.length);

  // Transform API careers to display format
  const careers = useMemo(() => {
    return apiCareers.map((career: Career, index: number) => {
      const titleKey = STATIC_TITLE_KEYS[index];
      return {
        id: career.id.toString(),
        label: career.name,
        title: titleKey ? t(`staticTitles.${titleKey}`) : career.name,
        cardColor: index % 2 === 0 ? 'bg-[#111111]' : 'bg-gray-100',
        textColor: index % 2 === 0 ? 'text-white' : 'text-black',
        buttonVariant: (index % 2 === 0 ? 'gradient' : 'black'),
        titleClassName: index === 1 ? '!lg:text-[55px]' : '',
        imageUrl: STATIC_IMAGES[index] || '/placeholder.svg',
        slug: career.slug || career.name.toLowerCase().replace(/\s+/g, '-'),
        enrollmentCount: career.waitlistCount || career.enrollmentCount || 0,
      };
    });
  }, [apiCareers, t]);

  // console.table(careers.map((c) => ({ id: c.id, label: c.label, cardColor: c.cardColor })));
  // console.log('[CareersSection] careers (transformed) count:', careers.length);

  const [activeTab, setActiveTab] = useState<string>(careers[0]?.id || '');

  // Agar ma'lumot bo'lmasa, hech narsa ko'rsatmaydi
  if (careers.length === 0) {
    return null;
  }

  const activeData = careers.find((c) => c.id === activeTab)!;

  return (
    <section id="kasblar" className="bg-base-dark min-h-screen flex flex-col justify-center py-8 md:py-10 rounded-xl sm:rounded-3xl  md:rounded-[40px]">
      <div className="container">
        <div className="overflow-hidden rounded-[30px] md:rounded-[60px] py-4 md:py-6 text-center">
          <MainTitle align="center" color="white" className="text-white" animated>
            {t('title')}
          </MainTitle>
          <Subtitle align="center" textColor="rgba(255, 255, 255)" className="mx-auto mt-2 md:mt-3 max-w-xl" animated animationDelay={0.1}>
            {t('subtitle')}
          </Subtitle>

          <div className="mt-4 md:mt-6 flex justify-center gap-2 md:gap-3 flex-wrap">
            {careers.map((career) => (
              <button
                key={career.id}
                onClick={() => setActiveTab(career.id)}
                className={`px-6 md:px-10 py-2 md:py-3 rounded-full text-sm md:text-lg font-semibold transition-all duration-300 border ${
                  activeTab === career.id ? 'bg-white text-black border-white' : 'bg-transparent text-white border-white/20 hover:bg-white/5'
                }`}
              >
                {career.label}
              </button>
            ))}
          </div>

          <div className="mt-4 md:mt-8 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className={`relative flex flex-col md:flex-row md:items-center overflow-hidden rounded-[24px] md:rounded-[48px] md:h-[447px] ${activeData.cardColor}`}
              >
                {/* Content */}
                <div className="relative z-20 flex-1 p-4 md:p-10 text-left lg:p-16">
                  {activeData.enrollmentCount > 0 && (
                    <div className="mb-4">
                      <EnrollmentBadge count={activeData.enrollmentCount} />
                    </div>
                  )}
                  <MainTitle className={`${activeData.textColor} whitespace-pre-line ${activeData.titleClassName}`}>
                    {activeData.title}
                  </MainTitle>
                  <MainButton
                    variant={activeData.buttonVariant}
                    size="lg"
                    icon={<ArrowRight className="h-4 w-4 md:h-6 md:w-6" />}
                    iconPosition="right"
                    className="group mt-6 md:mt-12"
                    href={`/professions/${activeData.id}`}
                  >
                    {tCommon('details')}
                  </MainButton>
                </div>

                {/* Image — full background */}
                <div className="relative w-full h-64 md:absolute md:inset-0 md:h-full z-0">
                  <Image
                    src={activeData.imageUrl}
                    alt={activeData.title}
                    fill sizes="100vw"
                    className="object-cover object-right"
                    priority
                    quality={90}
                  />
                  {/* Gradient overlay — text o'qilishi uchun */}
                  <div className={`absolute inset-0 ${activeData.textColor === 'text-white' ? 'bg-gradient-to-r from-[#111111] via-[#111111]/80 to-transparent' : 'bg-gradient-to-r from-gray-100 via-gray-100/80 to-transparent'}`} />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
