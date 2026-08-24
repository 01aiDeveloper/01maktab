'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
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
  const t = useTranslations('graduatesSection');
  const [graduates, setGraduates] = useState<Graduate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGraduates = async () => {
      try {
        const response = await api.get('/graduate/public', {
          params: { pageSize: 20 },
        });
        const all: Graduate[] = response.data?.data?.data || response.data?.data || [];
        // Take last 2 graduates
        setGraduates(all.slice(-2));
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
      <section className="w-full bg-black py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-white font-bold text-3xl lg:text-4xl mb-12 lg:mb-16">{t('title')}</h2>
          <div className="flex items-center justify-center py-12">
            <div className="w-12 h-12 border-4 border-gray-700 border-t-[#5d7bf5] rounded-full animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  if (graduates.length === 0) return null;

  return (
    <section className="w-full bg-black py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-white font-bold text-3xl lg:text-4xl mb-12 lg:mb-16">Bizning bitiruvchilar</h2>

        <div className="space-y-8 lg:space-y-12">
          {graduates.map((graduate) => (
            <motion.div
              key={graduate.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {/* Desktop Layout */}
              <div className="hidden lg:grid lg:grid-cols-[280px_1fr] gap-6">
                <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-gray-800">
                  <Image
                    quality={90} src={getMediaUrl(graduate.photo)}
                    alt={graduate.fullname}
                    fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="bg-[#1a1a1d] rounded-3xl p-8 flex flex-col">
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-2xl mb-2">{graduate.fullname}</h3>
                    <p className="text-white/60 text-sm mb-4">{graduate.position}</p>
                    <p className="text-white text-base mb-6">{graduate.company}</p>
                  </div>
                  <div className="mt-6">
                    <Link href={`/graduates/${graduate.id}`}>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="bg-white hover:bg-gray-100 text-black font-medium rounded-full flex items-center gap-2 h-10 px-5"
                      >
                        {t('details')}
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Mobile Layout */}
              <div className="lg:hidden bg-[#1a1a1d] rounded-3xl overflow-hidden">
                <div className="relative aspect-[3/4] w-full">
                  <Image
                    quality={90} src={getMediaUrl(graduate.photo)}
                    alt={graduate.fullname}
                    fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-white font-bold text-xl mb-2">{graduate.fullname}</h3>
                  <p className="text-white/60 text-sm mb-3">{graduate.position}</p>
                  <p className="text-white text-sm mb-5">{graduate.company}</p>
                  <Link href={`/graduates/${graduate.id}`}>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="bg-white hover:bg-gray-100 text-black font-medium rounded-full flex items-center gap-2 h-10 px-5"
                    >
                      Batafsil
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
