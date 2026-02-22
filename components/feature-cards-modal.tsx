'use client';

import { useEffect, useRef, useState } from 'react';
import { X, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Slide types ──────────────────────────────────────────────────────────────

interface SlideImage {
  type: 'image';
  bg: string;          // tailwind bg class
  title: string;
  description: string;
  image: string;
  imagePosition?: string; // e.g. 'object-right-bottom', 'object-right-top'
  button?: { label: string; href: string };
}

interface SlideList {
  type: 'list';
  bg: string;
  title: string;
  items: { icon: string; color: string; label: string; description: string }[];
}

type Slide = SlideImage | SlideList;

// ─── Story data ───────────────────────────────────────────────────────────────

export interface StoryData {
  id: number;
  slides: Slide[];
}

export const STORIES: StoryData[] = [
  {
    id: 1,
    slides: [
      {
        type: 'image',
        bg: 'bg-[#ff6b35]',
        title: "No'l bir maktab",
        description:
          "Bu O'zbekistonda karyerani boshlash va rivojlantirish onlayn platformasi. Biz yang kasblarni o'rgatamiz: raqamli ko'nikmalarni rivojlantiramsiz, yo'lingizni tanlashga va zamonaviy karyeraga qurishga yordam beramiz.",
        image: '/images/hero-info-image1.png',
        imagePosition: 'object-right-bottom',
      },
    ],
  },
  {
    id: 2,
    slides: [
      {
        type: 'image',
        bg: 'bg-[#3b82f6]',
        title: "Hamjamiyatga qanday a'zo bo'laman",
        description:
          "Platformaga ro'yxatdan o'ting va minglab o'quvchilar bilan birga o'rganing. Hamjamiyatimizda mentor yordami, loyiha muhokamasi va karyera imkoniyatlari mavjud.",
        image: '/images/hero-info-image2.png',
        imagePosition: 'object-right-top',
      },
      {
        type: 'list',
        bg: 'bg-white',
        title: 'Bizning afzalliklarimiz',
        items: [
          { icon: '📖', color: '#ff6b35', label: 'Kurs va yangilanishlarga cheksiz kirish', description: "Darslarga istalgan vaqtda qaytib, bilimlaringizni yangilashingiz mumkin" },
          { icon: '🏢', color: '#3b82f6', label: 'Mutaxassislar', description: "Kurslar ustida vetakchi mahalliy va xalgaro kompaniyalardan tajribali mutaxassislar ishlaydi." },
          { icon: '🎓', color: '#a855f7', label: 'Sertifikat', description: "Kursni tamomlaganingizdan so'ng, bilim va malakangizni tasdiqluvchi sertifikat olasiz." },
          { icon: '⏰', color: '#22c55e', label: "Erkin jadval, hech qanday deadline yo'q.", description: "O'rganishni ish va shaxsiy hayot bilan oson uyg'unlashtirish mumkin - kuniga atigi 15 daqiqa yetarli." },
          { icon: '✅', color: '#eab308', label: 'Amaliy topshiriqlar', description: "Amaliy topshiriqlarni bajaring, bilimlaringizni mustahkamlash va ko'nikmalarni rivojlantirish uchun." },
        ],
      },
    ],
  },
  {
    id: 3,
    slides: [
      {
        type: 'image',
        bg: 'bg-[#84cc16]',
        title: 'Kasb bu nima?',
        description:
          "Talab yuqori bo'lgan IT-kasbni egallang va bozorga ishonch bilan kiring. Amaliyot, real loyihalar va zamonaviy texnologiyalar.",
        image: '/images/hero-info-image3.png',
        imagePosition: 'object-right-bottom',
        button: { label: 'Batafsil', href: '/catalog?tab=professions' },
      },
    ],
  },
  {
    id: 4,
    slides: [
      {
        type: 'image',
        bg: 'bg-[#a855f7]',
        title: 'Skillar nima uchun kerak?',
        description:
          "Skilllar - bu siz egallagan aniq ko'nikmalar. Ish beruvchilar ko'nikmalaringizni ko'rib, sizni tanlaydi. Skilllarni rivojlantiring va karyerangizni tezlashtiring.",
        image: '/images/hero-info-image4.png',
        imagePosition: 'object-right-bottom',
        button: { label: 'Skilllarni ko\'rish', href: '/skills' },
      },
    ],
  },
];

// ─── Modal ────────────────────────────────────────────────────────────────────

interface StoryModalProps {
  story: StoryData;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

const SLIDE_DURATION = 5000; // ms

export function StoryModal({ story, onClose, onPrev, onNext, hasPrev, hasNext }: StoryModalProps) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const pausedRef = useRef(false);
  const startTimeRef = useRef<number>(Date.now());
  const elapsedRef = useRef<number>(0); // saved elapsed when paused
  const rafRef = useRef<number>(0);

  const slides = story.slides;
  const slide = slides[slideIndex];

  const setPaused = (val: boolean) => {
    if (val && !pausedRef.current) {
      // save elapsed so far
      elapsedRef.current = Date.now() - startTimeRef.current;
    } else if (!val && pausedRef.current) {
      // resume: shift startTime forward
      startTimeRef.current = Date.now() - elapsedRef.current;
    }
    pausedRef.current = val;
  };

  // Progress bar animation — only depends on slideIndex
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

  // Close on Escape
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
      {/* Prev story arrow */}
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
        {/* Progress bars */}
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

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-8 right-4 z-20 w-8 h-8 rounded-full bg-black/20 hover:bg-black/30 flex items-center justify-center transition-colors"
        >
          <X className={`w-4 h-4 ${isLight ? 'text-gray-700' : 'text-white'}`} />
        </button>

        {/* Slide content */}
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
              /* Image slide — matn chap pastda, rasm o'ng tomonda absolute */
              <div className="relative flex flex-col justify-end p-7 pt-14" style={{ minHeight: 380 }}>
                {/* Image — o'ng tomonda vertikal to'liq */}
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

                {/* Text — chap pastki, max-w-[55%] */}
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
              /* List slide — oq bg, icon + label + description */
              <div className="p-7 pt-14 pb-8" style={{ minHeight: 380 }}>
                <h2 className={`text-2xl font-bold mb-5 ${textColor}`}>{slide.title}</h2>
                <div className="space-y-4">
                  {slide.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      {/* Colored rounded square icon */}
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

        {/* Tap zones — left/right */}
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

      {/* Next story arrow */}
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
