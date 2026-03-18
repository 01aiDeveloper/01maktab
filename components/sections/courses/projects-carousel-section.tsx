'use client';

import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import { MainButton } from '@/components/ui/main-button';

export interface Project {
  id: string;
  number: string;
  title: string;
  description: string;
  image: string;
}

interface ProjectsCarouselSectionProps {
  projects: Project[];
  title?: string;
}

export function ProjectsCarouselSection({ projects, title = '5 ta real loyiha' }: ProjectsCarouselSectionProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

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

  return (
    <section className="w-full py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-suisse text-2xl lg:text-3xl font-bold text-gray-900 mb-6">{title}</h2>

          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {projects.map((project) => (
                <div key={project.id} className="flex-[0_0_100%] min-w-0">
                  <div className="grid lg:grid-cols-2 gap-6">
                    {/* Left - Project Image with rounded corners */}
                    <div className="bg-gradient-to-br from-[#22c55e] via-[#16a34a] to-[#15803d] rounded-3xl p-8 lg:p-12 flex items-center justify-center relative min-h-[400px] lg:min-h-[500px]">
                      <div className="relative w-full max-w-md aspect-[4/3]">
                        <Image src={project.image} alt={project.title} fill className="object-contain" />
                      </div>
                      {/* Decorative spheres */}
                      <div className="absolute bottom-8 left-8 w-24 h-24 bg-white/10 backdrop-blur-sm rounded-full" />
                      <div className="absolute top-12 right-12 w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full" />
                    </div>

                    {/* Right - Project Description with rounded corners */}
                    <div className="bg-white rounded-3xl p-8 lg:p-12 flex flex-col justify-center">
                      <span className="text-gray-400 text-sm font-medium mb-4">{project.number}</span>
                      <h3 className="font-suisse text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight">{project.title}</h3>
                      <p className="text-gray-600 text-sm lg:text-base leading-relaxed mb-8">{project.description}</p>

                      {/* Navigation arrows */}
                      <div className="flex gap-3">
                        <MainButton
                          variant="white"
                          size="icon"
                          onClick={scrollPrev}
                          disabled={!canScrollPrev}
                          className="w-14 h-14 rounded-full bg-gray-100 hover:bg-gray-200 border-0 disabled:opacity-40 hover:scale-100"
                        >
                          <ArrowLeft className="w-6 h-6 text-gray-700" />
                        </MainButton>
                        <MainButton
                          variant="white"
                          size="icon"
                          onClick={scrollNext}
                          disabled={!canScrollNext}
                          className="w-14 h-14 rounded-full bg-gray-100 hover:bg-gray-200 border-0 disabled:opacity-40 hover:scale-100"
                        >
                          <ArrowRight className="w-6 h-6 text-gray-700" />
                        </MainButton>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
