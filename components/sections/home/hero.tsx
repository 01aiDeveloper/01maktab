"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { MainButton } from "@/components/ui/main-button";

const SLIDES = [
  {
    id: 1,
    title: "Data Analyst Kursi",
    description:
      "С нуля до аналитика в топ-компании: твоя карьера начинается здесь",
    bgColor: "bg-[#e5e7eb]",
    image: "/images/hero1.webp",
    textColor: "text-white",
    isDark: true,
  },
  {
    id: 2,
    title: "ML Engineer Kursi",
    description:
      "С нуля до аналитика в топ-компании: твоя карьера начинается здесь",
    bgColor: "bg-[#111111]",
    image: "/images/hero2.png",
    textColor: "text-white",
    isDark: true,
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
  },
];

export function Hero() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 8000, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="relative">
      <div className="relative h-screen min-h-[600px] md:min-h-[800px] w-full bg-base-dark pb-4!">
        <div
          className="relative h-full w-full overflow-hidden  sm:rounded-b-[55px] rounded-b-[48px] rounded-t-none"
          ref={emblaRef}
        >
          <div className="flex h-full">
            {SLIDES.map((slide, index) => (
              <div
                key={slide.id}
                className="relative flex-[0_0_100%] min-w-0 h-full"
              >
                <div className={`absolute inset-0 z-0 ${slide.bgColor}`}>
                  <Image
                    src={slide.image || "/placeholder.svg"}
                    alt={slide.title}
                    fill
                    className="object-cover object-center md:object-right"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-black/40" />
                </div>

                <div className="container relative z-10 h-full flex items-center px-4 md:px-6">
                  <div className="max-w-4xl w-full">
                    <AnimatePresence mode="wait">
                      {selectedIndex === index && (
                        <motion.div
                          key={`slide-content-${index}`}
                          initial={{ x: -60, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          exit={{ x: 60, opacity: 0 }}
                          transition={{
                            duration: 0.7,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                        >
                          <h2
                            className={`text-4xl sm:text-5xl md:text-6xl lg:text-[120px] font-black leading-[0.9] md:leading-[0.85] tracking-tighter text-balance ${
                              slide.isDark ? "text-white" : "text-foreground"
                            }`}
                          >
                            {slide.title}
                          </h2>

                          <p
                            className={`mt-4 md:mt-10 text-base sm:text-lg md:text-xl lg:text-2xl font-medium max-w-lg leading-relaxed ${
                              slide.isDark
                                ? "text-white/80"
                                : "text-foreground/80"
                            }`}
                          >
                            {slide.description}
                          </p>

                          <div className="mt-6 md:mt-14 flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-4 md:gap-6">
                            <div
                              className={`backdrop-blur-2xl rounded-[10px] px-4 md:px-6 py-3 md:py-4 border flex items-center gap-3 md:gap-4 ${
                                slide.isDark
                                  ? "bg-white/10 border-white/20"
                                  : "bg-black/5 border-black/10"
                              }`}
                            >
                              <span
                                className={`text-[10px] md:text-[11px] font-bold uppercase tracking-wider leading-tight text-white`}
                              >
                                Hamkorlikda
                                <br />
                                yaratilgan:
                              </span>
                              <div className="flex items-center gap-2 md:gap-3">
                                <div className="w-8 h-8 md:w-10 md:h-10 bg-[#0052ff] rounded-xl flex items-center justify-center p-2 md:p-2.5">
                                  <div className="w-full h-full border-2 border-white rounded-sm transform rotate-45" />
                                </div>
                                <span
                                  className={`font-black tracking-tighter text-lg md:text-2xl uppercase text-white`}
                                >
                                  TBC BANK
                                </span>
                              </div>
                            </div>

                            <MainButton
                              variant="gradient"
                              size="lg"
                              icon={<ArrowRight className="h-5 w-5 md:h-6 md:w-6" />}
                              iconPosition="right"
                              className="group w-full sm:w-auto"
                            >
                              Batafsil
                            </MainButton>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="absolute bottom-6 md:bottom-12 left-4 md:left-12 lg:left-24 z-20 flex items-center gap-2 md:gap-4">
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => emblaApi?.scrollTo(idx)}
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
    </section>
  );
}
