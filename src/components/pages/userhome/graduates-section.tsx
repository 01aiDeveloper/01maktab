'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { GraduateCarouselCard } from '@/components/cards/graduate-carousel-card';
import api from '@/lib/api';
import { getMediaUrl } from '@/lib/utils';

type Graduate = {
  id: number;
  fullname: string;
  photo: string;
  company: string;
  position: string;
};

export function GraduatesSection() {
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
        const response = await api.get('/graduate/public', {
          params: { pageSize: 20 },
        });
        const data = response.data?.data?.data || response.data?.data || [];
        if (Array.isArray(data)) {
          setGraduates(data);
        }
      } catch (error) {
        console.error('Failed to fetch graduates:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchGraduates();
  }, []);

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

  if (loading) {
    return (
      <motion.section className="py-12" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-balance">Bizning Bitiruvchilarimiz</h2>
        <div className="flex items-center justify-center py-12">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-[#5d7bf5] rounded-full animate-spin" />
        </div>
      </motion.section>
    );
  }

  if (graduates.length === 0) return null;

  const midpoint = Math.ceil(graduates.length / 2);
  const graduatesRow1 = graduates.slice(0, midpoint);
  const graduatesRow2 = graduates.slice(midpoint);

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
          <div className="flex">
            {graduatesRow1.map((graduate) => (
              <div key={graduate.id} className="flex-[0_0_83.33%] min-w-0 sm:flex-[0_0_50%] md:flex-[0_0_33.333%] lg:flex-[0_0_25%] px-1.5 md:px-2">
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
        {graduatesRow2.length > 0 && (
          <div className="overflow-hidden" ref={emblaRef2}>
            <div className="flex">
              {graduatesRow2.map((graduate) => (
                <div key={graduate.id} className="flex-[0_0_83.33%] min-w-0 sm:flex-[0_0_50%] md:flex-[0_0_33.333%] lg:flex-[0_0_25%] px-1.5 md:px-2">
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
        )}
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
