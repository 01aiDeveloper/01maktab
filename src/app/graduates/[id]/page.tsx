'use client';

import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import useEmblaCarousel from 'embla-carousel-react';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { StoryBlocksRenderer } from '@/components/story/story-blocks-renderer';
import { GraduateCarouselCard } from '@/components/cards/graduate-carousel-card';
import { CarouselNavigation } from '@/components/ui/carousel-navigation';
import { GraduateStory, GraduateStoryCard } from '@/types/story';
import { getMediaUrl } from '@/lib/utils';
import { graduateApi } from '@/services/react-query/graduate';
import { PageLoader } from '@/components/ui/page-loader';
import { PageError } from '@/components/ui/page-error';
import { useSmartBack } from '@/hooks/common/use-smart-back';

export default function GraduateStoryPage() {
  const t = useTranslations('graduatePage');
  const params = useParams();
  const goBack = useSmartBack('/');
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

        const storyData = await graduateApi.getOne(String(params.id));
        if (storyData) {
          setStory(storyData);
        } else {
          setError(true);
        }

        const allStories = (await graduateApi.getList(8)).data;
        if (allStories) {
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
          title={t('notFoundTitle')}
          description={t('notFoundDesc')}
          showBack={false}
        />
        <SiteFooter />
      </>
    );
  }

  return (
    <>
      <SiteHeader variant="light" />

      <main className="min-h-screen bg-[#F4F4F6]">
        <div className="container mx-auto px-4 pt-8 lg:pt-12 space-y-6">
          {/* Hero Section */}
          <section className="flex flex-col lg:flex-row lg:items-stretch gap-6 lg:gap-8">
            {/* Left: Content Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-[29px] lg:rounded-[40px] p-6 lg:p-10 flex flex-col justify-center order-last lg:order-first lg:flex-1"
            >
              {/* Back Link — desktop only */}
              <button
                type="button"
                onClick={goBack}
                className="hidden lg:inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-8 transition-colors w-fit cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-medium">{t('back')}</span>
              </button>
              {/* Title */}
              <h1 className="font-suisse font-bold text-3xl md:text-4xl lg:text-[48px] lg:leading-[1.1] text-[#18181A] mb-6 tracking-[-0.02em]">
                {story.title}
              </h1>

              {/* Subtitle / Student Info */}
              {story.subtitle && (
                <p className="text-gray-500 text-base lg:text-lg mb-2 leading-relaxed">
                  {story.subtitle}
                </p>
              )}

              <p className="text-gray-500 text-base mb-8">
                {story.fullname} — {story.position}, {story.company}
              </p>

              {/* CTA Button */}
              <Link href="/login" className="inline-flex items-center gap-2 bg-[#3b66f5] hover:bg-[#2d52d1] text-white rounded-full px-8 py-3 h-12 w-fit text-base font-medium transition-colors">
                {t('startNow')}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>

            {/* Right on desktop, Top on mobile: Graduate Photo */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative w-full h-[420px] lg:w-[464px] lg:shrink-0 lg:h-[453px] rounded-[29px] lg:rounded-[40px] overflow-hidden order-first lg:order-last"
            >
              <button
                type="button"
                onClick={goBack}
                className="lg:hidden absolute top-4 left-4 z-10 inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors w-fit cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-medium">{t('back')}</span>
              </button>
              <Image
                quality={90} src={getMediaUrl(story.photo)}
                alt={story.fullname}
                fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                className="object-cover"
                priority
              />
            </motion.div>
          </section>

          {/* Story Content Card */}
          <section className="bg-white rounded-[29px] lg:rounded-[40px] p-6 lg:p-10">
            <div className="max-w-4xl">
              <StoryBlocksRenderer blocks={story.blocks} />
            </div>
          </section>
        </div>

        {/* Other Stories Section */}
        {otherStories.length > 0 && (
          <section className="w-full py-16 lg:py-24">
            <div className="container mx-auto px-4">
              <h2 className="font-suisse font-bold text-3xl lg:text-[48px] lg:leading-[1.1] text-[#18181A] tracking-[-0.02em] mb-8 lg:mb-12">
                {t('otherStories')}
              </h2>

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
