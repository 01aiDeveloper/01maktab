'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { useTranslations } from 'next-intl';
import { StoryModal, STORIES } from './feature-cards-modal';
import { CarouselNavigation } from './ui/carousel-navigation';

const FEATURE_CARD_META = [
  {
    id: 1,
    titleKey: 'card1' as const,
    borderColor: '#ff8c5a',
    gradient: 'linear-gradient(104.46deg, #F96415 -0.24%, #FFA469 101.27%)',
    image: '/images/hero-info-image1.png',
    imagePosition: 'object-right-bottom',
  },
  {
    id: 2,
    titleKey: 'card2' as const,
    borderColor: '#60a5fa',
    gradient: 'linear-gradient(104.46deg, #2563eb -0.24%, #60a5fa 101.27%)',
    image: '/images/hero-info-image2.png',
    imagePosition: 'object-right-top',
  },
  {
    id: 3,
    titleKey: 'card3' as const,
    borderColor: '#a3e635',
    gradient: 'linear-gradient(104.46deg, #65a30d -0.24%, #a3e635 101.27%)',
    image: '/images/hero-info-image3.png',
    imagePosition: 'object-right-bottom',
  },
  {
    id: 4,
    titleKey: 'card4' as const,
    borderColor: '#c084fc',
    gradient: 'linear-gradient(104.46deg, #9333ea -0.24%, #c084fc 101.27%)',
    image: '/images/hero-info-image4.png',
    imagePosition: 'object-right-bottom',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export function FeatureCards() {
  const t = useTranslations('featureCards');
  const featureCards = FEATURE_CARD_META.map((c) => ({ ...c, title: t(c.titleKey) }));
  const [activeStoryId, setActiveStoryId] = useState<number | null>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    breakpoints: {
      '(min-width: 1024px)': { active: false },
    },
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  const activeStory = activeStoryId !== null ? (STORIES.find((s) => s.id === activeStoryId) ?? null) : null;

  return (
    <>
      <section className="w-full py-4">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="container">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4 lg:grid lg:grid-cols-4 py-4">
              {featureCards.map((card) => (
                <motion.div key={card.id} variants={cardVariants} className="flex-[0_0_80%] min-w-0 sm:flex-[0_0_calc(50%-8px)] lg:flex-none">
                  <motion.button
                    onClick={() => setActiveStoryId(card.id)}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="w-full text-left cursor-pointer"
                    style={{
                      borderRadius: '29px',
                      border: `4px solid ${card.borderColor}`,
                      padding: '4px',
                      height: '178px',
                    }}
                  >
                    {/* Inner gradient container */}
                    <div
                      className="relative w-full h-full overflow-hidden"
                      style={{
                        borderRadius: '24px',
                        background: card.gradient,
                      }}
                    >
                      {/* Title */}
                      <h3
                        className="absolute text-white z-10"
                        style={{
                          left: '24px',
                          top: '41px',
                          width: '160px',
                          fontWeight: 600,
                          fontSize: '30px',
                          lineHeight: '29px',
                          letterSpacing: '-0.05em',
                        }}
                      >
                        {card.title}
                      </h3>
                      {/* Image */}
                      <div
                        className="absolute"
                        style={{
                          width: '164px',
                          height: '204px',
                          right: '-6px',
                          top: '-20px',
                          transform: 'rotate(3.09deg)',
                        }}
                      >
                        <Image quality={100} src={card.image} alt={card.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" className={`object-contain ${card.imagePosition}`} />
                      </div>
                    </div>
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Navigation - only on mobile/tablet */}
          <div className="flex items-center justify-center mt-4 ">
            <CarouselNavigation
              onPrevClick={() => emblaApi?.scrollPrev()}
              onNextClick={() => emblaApi?.scrollNext()}
              canScrollPrev={canScrollPrev}
              canScrollNext={canScrollNext}
              variant="gray"
              size="md"
            />
          </div>
        </motion.div>
      </section>

      <AnimatePresence>
        {activeStory && (
          <StoryModal
            key={activeStory.id}
            story={activeStory}
            onClose={() => setActiveStoryId(null)}
            onPrev={() => {
              const idx = STORIES.findIndex((s) => s.id === activeStoryId);
              if (idx > 0) setActiveStoryId(STORIES[idx - 1].id);
            }}
            onNext={() => {
              const idx = STORIES.findIndex((s) => s.id === activeStoryId);
              if (idx < STORIES.length - 1) setActiveStoryId(STORIES[idx + 1].id);
            }}
            hasPrev={STORIES.findIndex((s) => s.id === activeStoryId) > 0}
            hasNext={STORIES.findIndex((s) => s.id === activeStoryId) < STORIES.length - 1}
          />
        )}
      </AnimatePresence>
    </>
  );
}
