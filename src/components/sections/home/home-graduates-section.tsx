'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { GraduateCarouselCard } from '@/components/cards/graduate-carousel-card';
import { MainTitle } from '@/components/ui/main-title';
import { Subtitle } from '@/components/ui/subtitle';
import { graduateApi } from '@/services/react-query/graduate';
import { getMediaUrl } from '@/lib/utils';
import { PaginatedGrid } from '@/components/ui/paginated-grid';

type Graduate = {
  id: number;
  fullname: string;
  photo: string;
  company: string;
  position: string;
};

type GraduatesSectionProps = { rows?: 1 | 2 };

export function HomeGraduatesSection({ rows: _rows = 2 }: GraduatesSectionProps) {
  const t = useTranslations('graduates');
  const [graduates, setGraduates] = useState<Graduate[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchGraduates = async () => {
      try {
        setLoading(true);
        const response = await graduateApi.getList(100, 1);
        setGraduates(response.data as Graduate[]);
      } catch (error) {
        console.error('Failed to fetch graduates:', error);
        setGraduates([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGraduates();
  }, []);

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
            className="mb-4 md:mb-6 lg:mb-8"
            animated
          >
            {t('title')}
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
          className="mb-4 md:mb-6 "
          animated
        >
          {t('title')}
        </MainTitle>
        <Subtitle
          align="center"
          className="mb-6 md:mb-8 lg:mb-10 max-w-72  mx-auto"
          animated
          animationDelay={0.1}
        >
          {t('subtitle')}
        </Subtitle>

        <PaginatedGrid items={graduates} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {(graduate) => (
            <Link key={graduate.id} href={`/graduates/${graduate.id}`}>
              <GraduateCarouselCard name={graduate.fullname} company={graduate.company} position={graduate.position} image={getMediaUrl(graduate.photo)} />
            </Link>
          )}
        </PaginatedGrid>
      </div>
    </motion.section>
  );
}
