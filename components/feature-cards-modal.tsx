'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { X, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

// ─── Slide types ──────────────────────────────────────────────────────────────

interface SlideImage {
  type: 'image';
  bg: string;
  title: string;
  description: string;
  image: string;
  imagePosition?: string;
  button?: { label: string; href: string };
}

interface SlideList {
  type: 'list';
  bg: string;
  title: string;
  items: { icon: string; color: string; label: string; description: string }[];
}

type Slide = SlideImage | SlideList;

export interface StoryData {
  id: number;
  slides: Slide[];
}

// Static story IDs — used by FeatureCards to identify which story to open
export const STORY_IDS = [1, 2, 3, 4] as const;
// Lightweight shape used as a key by the parent component
export const STORIES: { id: number }[] = STORY_IDS.map((id) => ({ id }));

// ─── Modal ────────────────────────────────────────────────────────────────────

interface StoryModalProps {
  story: { id: number };
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

const SLIDE_DURATION = 5000; // ms

function useStoryData(id: number): StoryData {
  const t = useTranslations('stories');
  return useMemo<StoryData>(() => {
    if (id === 1) {
      return {
        id,
        slides: [
          {
            type: 'image',
            bg: 'bg-[#ff6b35]',
            title: t('school.title'),
            description: t('school.description'),
            image: '/images/hero-info-image1.png',
            imagePosition: 'object-right-bottom',
          },
        ],
      };
    }
    if (id === 2) {
      return {
        id,
        slides: [
          {
            type: 'image',
            bg: 'bg-[#3b82f6]',
            title: t('community.title'),
            description: t('community.description'),
            image: '/images/hero-info-image2.png',
            imagePosition: 'object-right-top',
          },
          {
            type: 'list',
            bg: 'bg-white',
            title: t('community.advantagesTitle'),
            items: [
              { icon: '📖', color: '#ff6b35', label: t('community.adv1Label'), description: t('community.adv1Description') },
              { icon: '🏢', color: '#3b82f6', label: t('community.adv2Label'), description: t('community.adv2Description') },
              { icon: '🎓', color: '#a855f7', label: t('community.adv3Label'), description: t('community.adv3Description') },
              { icon: '⏰', color: '#22c55e', label: t('community.adv4Label'), description: t('community.adv4Description') },
              { icon: '✅', color: '#eab308', label: t('community.adv5Label'), description: t('community.adv5Description') },
            ],
          },
        ],
      };
    }
    if (id === 3) {
      return {
        id,
        slides: [
          {
            type: 'image',
            bg: 'bg-[#84cc16]',
            title: t('profession.title'),
            description: t('profession.description'),
            image: '/images/hero-info-image3.png',
            imagePosition: 'object-right-bottom',
            button: { label: t('profession.button'), href: '/catalog?tab=professions' },
          },
        ],
      };
    }
    return {
      id,
      slides: [
        {
          type: 'image',
          bg: 'bg-[#a855f7]',
          title: t('skills.title'),
          description: t('skills.description'),
          image: '/images/hero-info-image4.png',
          imagePosition: 'object-right-bottom',
          button: { label: t('skills.button'), href: '/skills' },
        },
      ],
    };
  }, [id, t]);
}

export function StoryModal({ story, onClose, onPrev, onNext, hasPrev, hasNext }: StoryModalProps) {
  const data = useStoryData(story.id);
  const [slideIndex, setSlideIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const pausedRef = useRef(false);
  const startTimeRef = useRef<number>(Date.now());
  const elapsedRef = useRef<number>(0);
  const rafRef = useRef<number>(0);

  const slides = data.slides;
  const slide = slides[slideIndex];

  const setPaused = (val: boolean) => {
    if (val && !pausedRef.current) {
      elapsedRef.current = Date.now() - startTimeRef.current;
    } else if (!val && pausedRef.current) {
      startTimeRef.current = Date.now() - elapsedRef.current;
    }
    pausedRef.current = val;
  };

  useEffect(() => {
    setProgress(0);
    elapsedRef.current = 0;
    startTimeRef.current = Date.now();

    const tick = () => {
      if (!pausedRef.current) {
        const elapsed = Date.now() - startTimeRef.current;
        const pct = Math.min(elapsed / SLIDE_DURATION, 1);
        setProgress(pct);
        if (pct >= 1) {
          if (slideIndex < slides.length - 1) {
            setSlideIndex((i) => i + 1);
          } else if (hasNext) {
            onNext?.();
          } else {
            onClose();
          }
          return;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slideIndex]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const prev = () => {
    if (slideIndex > 0) setSlideIndex((i) => i - 1);
    else onPrev?.();
  };
  const next = () => {
    if (slideIndex < slides.length - 1) setSlideIndex((i) => i + 1);
    else if (hasNext) onNext?.();
    else onClose();
  };

  const isLight = slide.bg === 'bg-white' || slide.bg.includes('white');
  const textColor = isLight ? 'text-gray-900' : 'text-white';
  const subColor  = isLight ? 'text-gray-600' : 'text-white/85';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <button
        onClick={(e) => { e.stopPropagation(); onPrev?.(); }}
        disabled={!hasPrev}
        className="hidden md:flex w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 items-center justify-center mr-4 transition-colors disabled:opacity-0 shrink-0"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12 15l-5-5 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>

      <div
        onClick={(e) => e.stopPropagation()}
        onPointerDown={() => setPaused(true)}
        onPointerUp={() => setPaused(false)}
        onPointerLeave={() => setPaused(false)}
        className={`relative w-full max-w-[760px] rounded-3xl overflow-hidden shadow-2xl ${slide.bg} select-none`}
        style={{ minHeight: 380 }}
      >
        <div className="absolute top-4 left-4 right-4 flex gap-1.5 z-20">
          {slides.map((_, i) => (
            <div
              key={i}
              className="flex-1 h-[3px] rounded-full overflow-hidden"
              style={{ background: isLight ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.3)' }}
            >
              <div
                className="h-full rounded-full transition-none"
                style={{
                  width: i < slideIndex ? '100%' : i === slideIndex ? `${progress * 100}%` : '0%',
                  background: isLight ? '#111' : '#fff',
                }}
              />
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="absolute top-8 right-4 z-20 w-8 h-8 rounded-full bg-black/20 hover:bg-black/30 flex items-center justify-center transition-colors"
        >
          <X className={`w-4 h-4 ${isLight ? 'text-gray-700' : 'text-white'}`} />
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            key={slideIndex}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.2 }}
            className="h-full w-full"
          >
            {slide.type === 'image' ? (
              <div className="relative flex flex-col justify-end p-7 pt-14" style={{ minHeight: 380 }}>
                <div className="absolute right-0 top-0 bottom-0 w-[52%] pointer-events-none">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    quality={100}
                    className={`object-contain ${slide.imagePosition ?? 'object-right-bottom'}`}
                    priority
                  />
                </div>

                <div className="relative z-10 max-w-[55%]">
                  <h2 className={`text-3xl font-bold mb-3 leading-tight ${textColor}`}>
                    {slide.title}
                  </h2>
                  <p className={`text-sm leading-relaxed ${subColor}`}>
                    {slide.description}
                  </p>
                  {slide.button && (
                    <Link
                      href={slide.button.href}
                      onClick={onClose}
                      className="relative z-20 inline-flex items-center gap-2 mt-5 px-5 py-2.5 rounded-xl bg-black text-white text-sm font-medium hover:bg-gray-900 transition-colors"
                    >
                      {slide.button.label}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-7 pt-14 pb-8" style={{ minHeight: 380 }}>
                <h2 className={`text-2xl font-bold mb-5 ${textColor}`}>{slide.title}</h2>
                <div className="space-y-4">
                  {slide.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div
                        className="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center text-sm"
                        style={{ backgroundColor: item.color + '22' }}
                      >
                        <span style={{ filter: 'none' }}>{item.icon}</span>
                      </div>
                      <div>
                        <p className={`text-sm font-semibold leading-tight ${textColor}`}>{item.label}</p>
                        <p className={`text-xs mt-0.5 leading-relaxed ${subColor}`}>{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <button
          onClick={prev}
          onPointerDown={(e) => e.stopPropagation()}
          onPointerUp={(e) => e.stopPropagation()}
          className="absolute left-0 top-0 h-full w-1/3 z-[5]"
        />
        <button
          onClick={next}
          onPointerDown={(e) => e.stopPropagation()}
          onPointerUp={(e) => e.stopPropagation()}
          className="absolute right-0 top-0 h-full w-1/3 z-[5]"
        />
      </div>

      <button
        onClick={(e) => { e.stopPropagation(); onNext?.(); }}
        disabled={!hasNext}
        className="hidden md:flex w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 items-center justify-center ml-4 transition-colors disabled:opacity-0 shrink-0"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M8 5l5 5-5 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
    </div>
  );
}
