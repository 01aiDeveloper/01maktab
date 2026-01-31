'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';
import { GraduateCard } from '../cards/graduate-card';
import { getMediaUrl } from '@/lib/utils';
import { MainTitle } from '../ui/main-title';
import { Subtitle } from '../ui/subtitle';
import { CarouselNavigation } from '../ui/carousel-navigation';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://dev-api.01maktab.uz/api/v1';

interface Graduate {
  id: number;
  fullname: string;
  photo: string;
  company: string | null;
  position: string;
}

export function GraduatesSection() {
  const [graduates, setGraduates] = useState<Graduate[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
        const response = await axios.get(`${API_BASE_URL}/graduate/public`);
        if (response.data?.data?.data) {
          setGraduates(response.data.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch graduates:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGraduates();
  }, []);

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

  // Agar loading yoki ma'lumot bo'lmasa, hech narsa ko'rsatmaydi
  if (isLoading || graduates.length === 0) {
    return null;
  }

  // Split graduates into two rows
  const midpoint = Math.ceil(graduates.length / 2);
  const graduatesRow1 = graduates.slice(0, midpoint).map((grad) => ({
    name: grad.fullname,
    company: grad.company || 'Kompaniya',
    image: getMediaUrl(grad.photo),
  }));
  const graduatesRow2 = graduates.slice(midpoint).map((grad) => ({
    name: grad.fullname,
    company: grad.company || 'Kompaniya',
    image: getMediaUrl(grad.photo),
  }));

  return (
    <motion.section
      className="py-12"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="container">
        <MainTitle align="center" color="foreground" className="mb-4 md:mb-6 lg:mb-8" animated>
          Bizning Bitiruvchilarimiz
        </MainTitle>
        <Subtitle align="center" color="muted" className="mb-8 md:mb-10 lg:mb-12 max-w-72  mx-auto" animated animationDelay={0.1}>
          Xozirda ish topgan studentlarimiz bir nechasi va ularning hikoyalari.
        </Subtitle>
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
