'use client';

import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { Button } from '@/components/ui/button';
import { StoryBlocksRenderer } from '@/components/story/story-blocks-renderer';
import { GraduateCarouselCard } from '@/components/cards/graduate-carousel-card';
import { CarouselNavigation } from '@/components/ui/carousel-navigation';
import { GraduateStory, GraduateStoryCard } from '@/types/story';
import { getMediaUrl } from '@/lib/utils';
import api from '@/lib/api';
import { PageLoader } from '@/components/ui/page-loader';
import { PageError } from '@/components/ui/page-error';

export default function GraduateStoryPage() {
  const params = useParams();
  const [story, setStory] = useState<GraduateStory | null>(null);
  const [otherStories, setOtherStories] = useState<GraduateStoryCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'start',
    slidesToScroll: 1,
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        setLoading(true);
        setError(false);

        // Fetch current story
        const response = await api.get(`/graduate/public/${params.id}`);
        if (response.data?.data) {
          setStory(response.data.data);
        } else {
          setError(true);
        }

        // Fetch other stories
        const othersResponse = await api.get('/graduate/public', {
          params: { pageSize: 8 },
        });

        if (othersResponse.data?.data) {
          const allStories = othersResponse.data?.data?.data || othersResponse.data?.data || [];
          // Filter out current story
          const filteredStories = allStories.filter((s: GraduateStoryCard) => s.id !== Number(params.id));
          setOtherStories(filteredStories);
        }
      } catch (err) {
        console.error('Failed to fetch graduate story:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchStory();
    }
  }, [params.id]);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

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

  if (loading) {
    return (
      <>
        <SiteHeader variant="light" />
        <PageLoader fullPage />
        <SiteFooter />
      </>
    );
  }

  if (error || !story) {
    return (
      <>
        <SiteHeader variant="light" />
        <PageError
          title="Hikoya topilmadi"
          description="Kechirasiz, bu hikoya mavjud emas yoki o'chirilgan."
          showBack={false}
        />
        <SiteFooter />
      </>
    );
  }

  return (
    <>
      <SiteHeader variant="light" />

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="w-full py-8 lg:py-12 bg-[#F4F4F6]">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-[1fr_400px] gap-6 lg:gap-8">
              {/* Left: Content Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-3xl p-6 lg:p-8 flex flex-col justify-start"
              >
                {/* Back Link */}
                <Link
                  href="/graduates"
                  className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors w-fit"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="text-sm font-medium">Orqaga</span>
                </Link>

                {/* Title */}
                <h1 className="font-bold text-2xl lg:text-3xl xl:text-4xl text-gray-900 mb-4 leading-tight">{story.title}</h1>

                {/* Subtitle */}
                {story.subtitle && <p className="text-gray-600 text-base lg:text-lg mb-6 leading-relaxed">{story.subtitle}</p>}

                {/* Graduate Info */}
                <div className="mb-6">
                  <p className="text-gray-900 font-semibold text-lg">{story.fullname}</p>
                  <p className="text-gray-600">
                    {story.position} • {story.company}
                  </p>
                </div>

                {/* CTA Button */}
                <Button className="bg-[#5d7bf5] hover:bg-[#4c6ae4] text-white rounded-xl px-8 py-3 h-auto w-fit">
                  Hozir boshlash
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>

              {/* Right: Graduate Photo */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="relative aspect-3/4 rounded-3xl overflow-hidden lg:order-last"
              >
                <Image src={getMediaUrl(story.photo)} alt={story.fullname} fill className="object-cover" priority />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Story Content Blocks */}
        <section className="w-full py-8 lg:py-16 bg-[#F4F4F6]">
          <div className="container mx-auto px-4 max-w-4xl">
            <StoryBlocksRenderer blocks={story.blocks} />
          </div>
        </section>

        {/* Other Stories Section */}
        {otherStories.length > 0 && (
          <section className="w-full py-16 lg:py-24 bg-gray-50">
            <div className="container mx-auto px-4">
              <h2 className="font-bold text-3xl lg:text-4xl text-gray-900 mb-8 lg:mb-12">Boshqa hikoyalar</h2>

              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex gap-4">
                  {otherStories.map((otherStory) => (
                    <div
                      key={otherStory.id}
                      className="flex-[0_0_83.33%] min-w-0 sm:flex-[0_0_calc(50%-8px)] md:flex-[0_0_calc(33.333%-11px)] lg:flex-[0_0_calc(25%-12px)]"
                    >
                      <Link href={`/graduates/${otherStory.id}`}>
                        <GraduateCarouselCard
                          name={otherStory.fullname}
                          company={otherStory.company}
                          position={otherStory.position}
                          image={getMediaUrl(otherStory.photo)}
                        />
                      </Link>
                    </div>
                  ))}
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
          </section>
        )}
      </main>

      <SiteFooter />
    </>
  );
}
