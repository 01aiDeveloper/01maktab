"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { MainButton } from "@/components/ui/main-button";
import { useAuth } from "@/hooks/common/use-auth";

type SlideMeta = {
  id: number;
  key: "aiCreator" | "aiStartup";
  bgColor: string;
  image: string;
  textColor: string;
  isDark: boolean;
  partnerLogo?: string;
  partnerName?: string;
  partnerLogoWidth?: number;
  partnerLogoHeight?: number;
};

const SLIDE_META: SlideMeta[] = [
  {
    id: 1,
    key: "aiCreator",
    bgColor: "bg-[#111111]",
    image: "/images/AIIjodkor.jpg",
    textColor: "text-white",
    isDark: true,
  },
  {
    id: 2,
    key: "aiStartup",
    bgColor: "bg-[#111111]",
    image: "/images/AIStartUp.jpg",
    textColor: "text-white",
    isDark: true,
  },
];

export function Hero() {
  const t = useTranslations("hero");
  const SLIDES = SLIDE_META.map((s) => ({
    ...s,
    title: t(`slides.${s.key}.title`),
    description: t(`slides.${s.key}.description`),
  }));
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null);
  const isAuthenticated = useAuth((s) => s.isAuthenticated);
  const accessToken = useAuth((s) => s.accessToken);
  const [hydrated, setHydrated] = React.useState(false);
  React.useEffect(() => {
    setHydrated(true);
  }, []);
  const isLoggedIn = hydrated && (isAuthenticated || !!accessToken);
  const ctaHref = isLoggedIn ? '/catalog' : '/login';
  const ctaLabel = isLoggedIn ? t('ctaLoggedIn') : t('ctaGuest');

  const goToSlide = React.useCallback(
    (idx: number) => {
      if (isAnimating || idx === selectedIndex) return;
      setIsAnimating(true);
      setSelectedIndex(idx);
      setTimeout(() => setIsAnimating(false), 700);
    },
    [isAnimating, selectedIndex],
  );

  const startAutoplay = React.useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setSelectedIndex((prev) => {
        const next = (prev + 1) % SLIDES.length;
        return next;
      });
    }, 8000);
  }, []);

  React.useEffect(() => {
    startAutoplay();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startAutoplay]);

  return (
    <section
      id="nima-organasiz"
      className="relative h-screen min-h-116 sm:min-h-150 w-full"
    >
      <div className="relative h-full w-full bg-base-dark">
        <div className="relative h-full w-full overflow-hidden rounded-b-[48px] md:rounded-b-[55px] rounded-t-none">
          {/* Fade Slides */}
          {SLIDES.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                selectedIndex === index ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <div className={`absolute inset-0 ${slide.bgColor}`}>
                <Image
                  src={slide.image || "/placeholder.svg"}
                  alt={slide.title}
                  fill sizes="100vw"
                  className="object-cover object-[85%] md:object-right"
                  priority={index === 0}
                  quality={90}
                />
              </div>

              <div className="container relative z-10 h-full flex items-center px-4 md:px-6">
                <div className="max-w-4xl w-full">
                  <h2
                    className={`text-[36px] leading-[39px] tracking-[-0.05em] font-semibold md:text-6xl md:leading-[1.1] lg:text-[64px] lg:leading-[70px] text-balance ${
                      slide.isDark ? "text-white" : "text-foreground"
                    }`}
                    style={{
                      textShadow: slide.isDark
                        ? "0 2px 20px rgba(0,0,0,0.55), 0 0 1px rgba(0,0,0,0.4)"
                        : "0 2px 20px rgba(255,255,255,0.9), 0 0 1px rgba(255,255,255,0.6)",
                    }}
                  >
                    {slide.title}
                  </h2>

                  <p
                    className={`mt-4 md:mt-10 text-[16px] leading-[18px] tracking-[-0.05em] font-[450] md:text-xl md:leading-relaxed lg:text-2xl max-w-lg ${
                      slide.isDark ? "text-white/90" : "text-foreground/90"
                    }`}
                    style={{
                      textShadow: slide.isDark
                        ? "0 2px 16px rgba(0,0,0,0.5)"
                        : "0 2px 16px rgba(255,255,255,0.85)",
                    }}
                  >
                    {slide.description}
                  </p>

                  <div className="mt-6 md:mt-14 flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-4 md:gap-6">
                    {slide.partnerLogo && (
                      <div
                        className="backdrop-blur-md rounded-xl px-4 md:px-6 h-13 md:h-15 w-48.25 md:w-auto border border-white/50 bg-white/70 flex items-center gap-3 md:gap-4 shadow-[0_2px_16px_rgba(0,0,0,0.12)]"
                      >
                        <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-wider leading-tight whitespace-pre-line text-foreground">
                          {t('createdWith')}
                        </span>
                        <div className="flex items-center">
                          <Image
                            quality={90} src={slide.partnerLogo}
                            alt={slide.partnerName ?? ''}
                            width={slide.partnerLogoWidth ?? 120}
                            height={slide.partnerLogoHeight ?? 40}
                            className="object-contain"
                          />
                        </div>
                      </div>
                    )}
                    <Link href={ctaHref}>
                      <MainButton
                        variant="gradient"
                        size="lg"
                        className="group h-[54px] md:h-15 lg:h-15 w-[193px] md:w-auto md:min-w-50 px-4 md:px-6 rounded-[10px] flex flex-row items-center justify-between md:justify-center"
                      >
                        {ctaLabel}
                        <ArrowRight className="h-5 w-5 md:h-6 md:w-6 inline ml-1" />
                      </MainButton>
                    </Link>
                  </div>

                  {/* Dots — Figma: button bilan masofa 53px */}
                  <div className="mt-[53px] flex items-center gap-1 md:gap-2">
                    {SLIDES.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          goToSlide(idx);
                          startAutoplay();
                        }}
                        className={`h-1.5 md:h-2 rounded-full transition-all duration-500 ${
                          selectedIndex === idx
                            ? "w-12 md:w-20 bg-white"
                            : "w-6 md:w-8 bg-white/30 hover:bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
