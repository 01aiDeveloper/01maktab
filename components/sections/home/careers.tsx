'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { MainTitle } from '@/components/ui/main-title';
import { Subtitle } from '@/components/ui/subtitle';
import { MainButton } from '@/components/ui/main-button';
import { getMediaUrl } from '@/lib/utils';
import type { Career } from '@/types/api.types';


interface CareersSectionProps {
  careers: Career[];
}

export function CareersSection({ careers: apiCareers }: CareersSectionProps) {
  // Transform API careers to display format
  const careers = useMemo(() => {
    return apiCareers.map((career: Career, index: number) => ({
      id: career.id.toString(),
      label: career.name,
      title: career.name,
      description: career.description || 'Build advanced machine learning models and deploy them to production.',
      cardColor: index % 2 === 0 ? 'bg-[#3361FF]' : 'bg-gray-100',
      textColor: index % 2 === 0 ? 'text-white' : 'text-black',
      buttonVariant: (index % 2 === 0 ? 'white' : 'black') as const,
      imageUrl: getMediaUrl(career.decorImage),
      slug: career.slug || career.name.toLowerCase().replace(/\s+/g, '-'),
    }));
  }, [apiCareers]);

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
            Kasblar
          </MainTitle>
          <Subtitle align="center" textColor="rgba(255, 255, 255)" className="mx-auto mt-2 md:mt-3 max-w-xl" animated animationDelay={0.1}>
            Stajerovka, live darslar, mentorlar, student support, kompaniyalardagi real loyihalar va xalqaro sertifikat o’z ichiga oladigan
            to’liq ta’lim dasturi.
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
          </div>` `

          <div className="mt-4 md:mt-8 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className={`relative flex flex-col md:flex-row md:items-center overflow-hidden rounded-[24px] md:rounded-[48px] ${activeData.cardColor}`}
              >
                {/* Content */}
                <div className="relative z-20 flex-1 p-4 md:p-10 text-left lg:p-16">
                  <MainTitle className={activeData.textColor}>
                    {activeData.title}
                  </MainTitle>
                  <div
                    className={`mt-4 md:mt-6 max-w-lg ml-0 text-sm md:text-base lg:text-lg leading-relaxed line-clamp-3 md:line-clamp-4 ${activeData.textColor === 'text-white' ? 'text-white/90' : 'text-black/90'}`}
                    dangerouslySetInnerHTML={{ __html: activeData.description }}
                  />

                  <MainButton
                    variant={activeData.buttonVariant}
                    size="lg"
                    icon={<ArrowRight className="h-4 w-4 md:h-6 md:w-6" />}
                    iconPosition="right"
                    className="group mt-6 md:mt-12"
                    href={`/professions/${activeData.id}`}
                  >
                    Batafsil
                  </MainButton>
                </div>

                {/* Image — mobile: pastda, desktop: o'ng tomonda absolute */}
                <div className="relative w-full h-64 md:absolute md:bottom-0 md:right-0 md:w-1/2 md:h-full z-0">
                  {activeData.cardColor === 'bg-[#3361FF]' && (
                    <div className="absolute inset-0 bg-linear-to-l from-blue-600/20 to-transparent pointer-events-none z-10" />
                  )}
                  <Image
                    src={activeData.imageUrl || '/placeholder.svg'}
                    alt={activeData.title}
                    fill
                    className="object-contain object-right-bottom"
                    priority
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
