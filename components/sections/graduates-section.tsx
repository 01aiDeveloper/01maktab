'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { GraduateCard } from '@/components/ui/graduate-card';

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

export function GraduatesSection() {
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
    emblaApi2?.scrollPrev();
  }, [emblaApi1, emblaApi2]);

  const scrollNext = useCallback(() => {
    emblaApi1?.scrollNext();
    emblaApi2?.scrollNext();
  }, [emblaApi1, emblaApi2]);

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
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-balance">Bizning Bitiruvchilarimiz</h2>

      <div className="space-y-4">
        {/* Row 1 */}
        <div className="overflow-hidden" ref={emblaRef1}>
          <div className="flex gap-4">
            {graduatesRow1.map((graduate, index) => (
              <div key={index} className="flex-[0_0_calc(25%-12px)] min-w-0">
                <GraduateCard name={graduate.name} company={graduate.company} image={graduate.image} />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 */}
        <div className="overflow-hidden" ref={emblaRef2}>
          <div className="flex gap-4">
            {graduatesRow2.map((graduate, index) => (
              <div key={index} className="flex-[0_0_calc(25%-12px)] min-w-0">
                <GraduateCard name={graduate.name} company={graduate.company} image={graduate.image} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-2 mt-8">
        <motion.button
          onClick={scrollPrev}
          className="w-10 h-10 rounded-full border border-border bg-background flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors disabled:opacity-50"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft className="w-5 h-5" />
        </motion.button>
        <motion.button
          onClick={scrollNext}
          className="w-10 h-10 rounded-full border border-border bg-background flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors disabled:opacity-50"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.section>
  );
}
