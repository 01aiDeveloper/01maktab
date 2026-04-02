  "use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MainButton } from "@/components/ui/main-button";

const SLIDES = [
  {
    id: 1,
    title: "Data Analyst Kursi",
    description:
      "Noldan top-kompaniyada analitikgacha: karyerangiz shu yerdan boshlanadi",
    bgColor: "bg-[#e5e7eb]",
    image: "/images/hero11.webp",
    textColor: "text-white",
    isDark: true,
    partnerLogo: "/icons/tbc_bank_logo.svg",
    partnerName: "TBC Bank",
  },
  {
    id: 2,
    title: "ML Engineer Kursi",
    description:
      "Noldan top-kompaniyada analitikgacha: karyerangiz shu yerdan boshlanadi",
    bgColor: "bg-[#111111]",
    image: "/images/hero2.png",
    textColor: "text-white",
    isDark: true,
    partnerLogo: "/icons/alif_logo.png",
    partnerName: "Alif",
  },
  {
    id: 3,
    title: "AI Specialist",
    description:
      "Sun'iy intellekt olamiga chuqur sho'ng'ing va kelajak texnologiyalarini yarating",
    bgColor: "bg-[#2563eb]",
    image: "/images/hero3.webp",
    textColor: "text-white",
    isDark: true,
    partnerLogo: "/icons/tbc_bank_logo.svg",
    partnerName: "TBC Bank",
  },
];

export function Hero() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  const goToSlide = React.useCallback(
    (idx: number) => {
      if (isAnimating || idx === selectedIndex) return;
      setIsAnimating(true);
      setSelectedIndex(idx);
      setTimeout(() => setIsAnimating(false), 700);
    },
    [isAnimating, selectedIndex]
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
    <section id="nima-organasiz" className="relative h-screen min-h-116 sm:min-h-150 w-full">
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
                  fill
                  className="object-cover object-[85%] md:object-right"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-black/40" />
              </div>

              <div className="container relative z-10 h-full flex items-center px-4 md:px-6">
                <div className="max-w-4xl w-full">
                  <h2
                    className={`text-[36px] leading-[39px] tracking-[-0.05em] font-semibold md:text-6xl md:leading-[1.1] lg:text-[64px] lg:leading-[70px] text-balance ${
                      slide.isDark ? "text-white" : "text-foreground"
                    }`}
                  >
                    {slide.title}
                  </h2>

                  <p
                    className={`mt-4 md:mt-10 text-[16px] leading-[18px] tracking-[-0.05em] font-[450] md:text-xl md:leading-relaxed lg:text-2xl max-w-lg ${
                      slide.isDark ? "text-white/80" : "text-foreground/80"
                    }`}
                  >
                    {slide.description}
                  </p>

                  <div className="mt-6 md:mt-14 flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-4 md:gap-6">
                    <div
                      className={`backdrop-blur-2xl rounded-xl px-4 md:px-6 h-13 md:h-15 w-48.25 md:w-auto border flex items-center gap-3 md:gap-4 ${
                        slide.isDark
                          ? "bg-white/10 border-white/20"
                          : "bg-black/5 border-black/10"
                      }`}
                    >
                      <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-wider leading-tight text-white">
                        Hamkorlikda
                        <br />
                        yaratilgan:
                      </span>
                      <div className="flex items-center">
                        <Image
                          src={slide.partnerLogo}
                          alt={slide.partnerName}
                          width={120}
                          height={40}
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <Link href="/login">
                      <MainButton
                        variant="gradient"
                        size="xl"
                        className="group h-13 md:h-15 lg:h-15 w-50 rounded-xl flex flex-row items-center"
                      >
                        Bepul boshlash
                        <ArrowRight className="h-5 w-5 md:h-6 md:w-6 inline ml-1" />
                      </MainButton>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots — overflow-hidden tashqarisida */}
        <div className="absolute bottom-6 md:bottom-12 left-4 md:left-12 lg:left-24 z-20 flex items-center gap-1 md:gap-2">
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
    </section>
  );
}
