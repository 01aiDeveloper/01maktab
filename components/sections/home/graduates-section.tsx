'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import { GraduateCard } from '@/components/cards/graduate-card';
import { MainTitle } from '@/components/ui/main-title';
import { Subtitle } from '@/components/ui/subtitle';
import { CarouselNavigation } from '@/components/ui/carousel-navigation';

const graduatesRow1 = [
  { name: 'Aziz Gafurov', company: 'TBC Bank', image: '/images/graduates/1.png' },
  {
    name: 'Madina Latipova',
    company: 'Uzum Technologies',
    image: '/images/graduates/2.png',
  },
  { name: 'Lola Sharipova', company: 'TBC Bank', image: '/images/graduates/3.png' },
  { name: 'Aziz Gafurov', company: 'TBC Bank', image: '/images/graduates/4.png' },
  { name: 'Nilufar Karimova', company: 'Click', image: '/images/graduates/5.png' },
  { name: 'Sardor Alimov', company: 'Humans', image: '/images/graduates/1.png' },
  { name: 'Dilnoza Rahimova', company: 'EPAM', image: '/images/graduates/2.png' },
];

const graduatesRow2 = [
  { name: 'Aziz Gafurov', company: 'TBC Bank', image: '/images/graduates/5.png' },
  { name: 'Jasur Umarov', company: 'Uzum Technologies', image: '/images/graduates/4.png' },
  { name: 'Lola Sharipova', company: 'TBC Bank', image: '/images/graduates/2.png' },
  { name: 'Aziz Gafurov', company: 'TBC Bank', image: '/images/graduates/3.png' },
  { name: 'Zarina Usmonova', company: 'Beeline', image: '/images/graduates/1.png' },
  { name: 'Farrux Sodiqov', company: 'Ucell', image: '/images/graduates/4.png' },
  { name: 'Laylo Norova', company: 'Kapitalbank', image: '/images/graduates/2.png' },
];

type GraduatesSectionProps = {
  rows?: 1 | 2;
};

export function GraduatesSection({ rows = 2 }: GraduatesSectionProps) {
  const [emblaRef1, emblaApi1] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 4,
  });
  const [emblaRef2, emblaApi2] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 4,
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  // Sync both carousels
  const scrollPrev = useCallback(() => {
    emblaApi1?.scrollPrev();
    if (rows === 2) {
      emblaApi2?.scrollPrev();
    }
  }, [emblaApi1, emblaApi2, rows]);

  const scrollNext = useCallback(() => {
    emblaApi1?.scrollNext();
    if (rows === 2) {
      emblaApi2?.scrollNext();
    }
  }, [emblaApi1, emblaApi2, rows]);

  const onSelect = useCallback(() => {
    if (!emblaApi1) return;
    setCanScrollPrev(emblaApi1.canScrollPrev());
    setCanScrollNext(emblaApi1.canScrollNext());
  }, [emblaApi1]);

  useEffect(() => {
    if (!emblaApi1) return;
    onSelect();
    emblaApi1.on('select', onSelect);
    emblaApi1.on('reInit', onSelect);
  }, [emblaApi1, onSelect]);

  return (
    <motion.section
      className="py-12"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="container">
        <MainTitle 
          align="center" 
          color="foreground"
          className="mb-4 md:mb-6 lg:mb-8"
          animated
        >
          Bizning Bitiruvchilarimiz
        </MainTitle>
        <Subtitle
          align="center"
          color="muted"
          className="mb-8 md:mb-10 lg:mb-12 max-w-72  mx-auto"
          animated
          animationDelay={0.1}
        >
          Xozirda ish topgan studentlarimiz bir nechasi va ularning hikoyalari.
        </Subtitle>

        <div className="space-y-4">
        {/* Row 1 */}
        <div className="overflow-hidden" ref={emblaRef1}>
          <div className="flex gap-3 md:gap-4">
            {graduatesRow1.map((graduate, index) => (
              <div 
                key={index} 
                className="flex-[0_0_83.33%] min-w-0 sm:flex-[0_0_calc(50%-6px)] md:flex-[0_0_calc(33.333%-8px)] lg:flex-[0_0_calc(25%-9px)]"
              >
                <GraduateCard name={graduate.name} company={graduate.company} image={graduate.image} />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 */}
        {rows === 2 ? (
          <div className="overflow-hidden" ref={emblaRef2}>
            <div className="flex gap-3 md:gap-4">
              {graduatesRow2.map((graduate, index) => (
                <div 
                  key={index} 
                  className="flex-[0_0_83.33%] min-w-0 sm:flex-[0_0_calc(50%-6px)] md:flex-[0_0_calc(33.333%-8px)] lg:flex-[0_0_calc(25%-9px)]"
                >
                  <GraduateCard name={graduate.name} company={graduate.company} image={graduate.image} />
                </div>
              ))}
            </div>
          </div>
        ) : null}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center mt-8">
          <CarouselNavigation
            onPrevClick={scrollPrev}
            onNextClick={scrollNext}
            canScrollPrev={canScrollPrev}
            canScrollNext={canScrollNext}
            variant="gray"
            iconType="arrow"
            size="md"
          />
        </div>
      </div>
    </motion.section>
  );
}
