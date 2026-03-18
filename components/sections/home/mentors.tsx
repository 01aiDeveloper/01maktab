"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MainButton } from "@/components/ui/main-button";
import { MainTitle } from "@/components/ui/main-title";
import { MentorCard } from "@/components/shared/mentor-card";
import useEmblaCarousel from "embla-carousel-react";
import { CarouselNavigation } from "@/components/ui/carousel-navigation";
import { useCarouselNavigation } from "@/hooks/use-carousel-navigation";

const MENTORS = [
  {
    name: "Anvar Karimov",
    role: "Mentor",
    imageUrl: "/images/image.png",
    videoType: "youtube" as const,
    videoSrc: "https://youtube.com/shorts/e11wbC04l1o?si=YKV-M_9nv2OETGDH",
  },
  {
    name: "Nilufar Sadikova",
    role: "Mentor",
    imageUrl: "/images/image.png",
    videoType: "youtube" as const,
    videoSrc: "https://youtube.com/shorts/e11wbC04l1o?si=YKV-M_9nv2OETGDH",
  },
  {
    name: "Shaxzod Bek",
    role: "Mentor",
    imageUrl: "/images/image.png",
    videoType: "youtube" as const,
    videoSrc: "https://youtube.com/shorts/e11wbC04l1o?si=YKV-M_9nv2OETGDH",
  },
];

export function MentorsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { canScrollPrev, canScrollNext, scrollPrev, scrollNext } =
    useCarouselNavigation(emblaApi as any);

  return (
    <section className="relative w-full bg-base-dark overflow-hidden rounded-b-[70px] sm:rounded-b-[160px] md:rounded-b-[328px] min-h-screen flex flex-col justify-center py-10 sm:py-18">
      <div className="container">
        <div className="mx-auto max-w-[1296px] text-center">
          <MainTitle align="center" color="white" animated>
            Sun'iy Intellekt Yangi Davr Texnologiyasi Birinchilardan Bo'ling!
          </MainTitle>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mx-auto max-w-3xl text-sm leading-snug font-medium text-white/50 md:text-xl md:leading-relaxed"
          >
            Blogerlar Texnoplov va Teacher Azam hamda HR sohasining yirik
            mutaxassisi Temirxon Xolmirzayev karyera yo'lingizni qanday boshlash
            haqida so'zlab berishadi: ish izlashdan tortib, karyerada tez
            ko'tarilishga yordam beradigan moslashuvchan ko'nikmalarni
            rivojlantirishgacha
          </motion.p>
        </div>

        <div className="mt-10">
          <div className="md:hidden">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-4">
                {MENTORS.map((mentor, index) => (
                  <div
                    key={index}
                    className="flex-none"
                    style={{ width: "310px" }}
                  >
                    <MentorCard {...mentor} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="hidden md:flex justify-evenly gap-6">
            {MENTORS.map((mentor, index) => (
              <div key={index} style={{ width: "310px" }}>
                <MentorCard {...mentor} />
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-10 flex justify-center"
        >
          <Link href="/login">
            <MainButton
              variant="gradient"
              size="default"
              icon={<ArrowRight className="h-6 w-6" />}
              iconPosition="right"
              className="group w-60 h-13.5 rounded-[10px] px-4 py-3.75"
            >
              Bepul Boshlash
            </MainButton>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
