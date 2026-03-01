'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import { GraduateCarouselCard } from '@/components/cards/graduate-carousel-card';
import { MainTitle } from '@/components/ui/main-title';
import { Subtitle } from '@/components/ui/subtitle';
import { CarouselNavigation } from '@/components/ui/carousel-navigation';
import api from '@/lib/api';
import { getMediaUrl } from '@/lib/utils';

type Graduate = {
  id: number;
  fullname: string;
  photo: string;
  company: string;
  position: string;
};

type GraduatesSectionProps = {
  rows?: 1 | 2;
};

export function HomeGraduatesSection({ rows = 2 }: GraduatesSectionProps) {
  const [graduates, setGraduates] = useState<Graduate[]>([]);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    const fetchGraduates = async () => {
      try {
        setLoading(true);
        const response = await api.get('/graduate/public', {
          params: { pageSize: 20 }
        });

        // API returns nested data: response.data.data.data
        const graduatesData = response.data?.data?.data || response.data?.data || [];

        if (Array.isArray(graduatesData)) {
          setGraduates(graduatesData);
        } else {
          console.error('Graduates data is not an array:', graduatesData);
          setGraduates([]);
        }
      } catch (error) {
        console.error('Failed to fetch graduates:', error);
        setGraduates([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGraduates();
  }, []);

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

  // Split graduates into two rows (row1 gets all if rows=1)
  const midpoint = Math.ceil(graduates.length / 2);
  const graduatesRow1 = rows === 1 ? graduates : graduates.slice(0, midpoint);
  const graduatesRow2 = rows === 1 ? [] : graduates.slice(midpoint);

  if (loading) {
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
          <div className="flex items-center justify-center py-12">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-[#5d7bf5] rounded-full animate-spin"></div>
          </div>
        </div>
      </motion.section>
    );
  }

  if (graduates.length === 0) {
    return null;
  }

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
            {graduatesRow1.map((graduate) => (
              <div
                key={graduate.id}
                className="flex-[0_0_83.33%] min-w-0 sm:flex-[0_0_calc(50%-6px)] md:flex-[0_0_calc(33.333%-8px)] lg:flex-[0_0_calc(25%-9px)]"
              >
                <Link href={`/graduates/${graduate.id}`}>
                  <GraduateCarouselCard
                    name={graduate.fullname}
                    company={graduate.company}
                    position={graduate.position}
                    image={getMediaUrl(graduate.photo)}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 */}
        {rows === 2 && graduatesRow2.length > 0 ? (
          <div className="overflow-hidden" ref={emblaRef2}>
            <div className="flex gap-3 md:gap-4">
              {graduatesRow2.map((graduate) => (
                <div
                  key={graduate.id}
                  className="flex-[0_0_83.33%] min-w-0 sm:flex-[0_0_calc(50%-6px)] md:flex-[0_0_calc(33.333%-8px)] lg:flex-[0_0_calc(25%-9px)]"
                >
                  <Link href={`/graduates/${graduate.id}`}>
                    <GraduateCarouselCard
                      name={graduate.fullname}
                      company={graduate.company}
                      position={graduate.position}
                      image={getMediaUrl(graduate.photo)}
                    />
                  </Link>
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
            iconType="chevron"
            size="md"
          />
        </div>
      </div>
    </motion.section>
  );
}
