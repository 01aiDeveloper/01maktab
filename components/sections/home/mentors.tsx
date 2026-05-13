"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { MainButton } from "@/components/ui/main-button";
import { MainTitle } from "@/components/ui/main-title";
import { MentorCard } from "@/components/shared/mentor-card";
import useEmblaCarousel from "embla-carousel-react";
import { CarouselNavigation } from "@/components/ui/carousel-navigation";
import { useCarouselNavigation } from "@/hooks/use-carousel-navigation";

const MENTOR_BASE = [
  {
    name: "Anvar Karimov",
    imageUrl: "/images/image.png",
    videoType: "youtube" as const,
    videoSrc: "https://youtube.com/shorts/e11wbC04l1o?si=YKV-M_9nv2OETGDH",
  },
  {
    name: "Nilufar Sadikova",
    imageUrl: "/images/image.png",
    videoType: "youtube" as const,
    videoSrc: "https://youtube.com/shorts/e11wbC04l1o?si=YKV-M_9nv2OETGDH",
  },
  {
    name: "Shaxzod Bek",
    imageUrl: "/images/image.png",
    videoType: "youtube" as const,
    videoSrc: "https://youtube.com/shorts/e11wbC04l1o?si=YKV-M_9nv2OETGDH",
  },
];

export function MentorsSection() {
  const t = useTranslations("mentors");
  const tCommon = useTranslations("common");
  const MENTORS = MENTOR_BASE.map((m) => ({ ...m, role: t("role") }));
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
            {t("title")}
          </MainTitle>
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
              className="group w-60 h-13.5 rounded-[10px] px-4 py-3.75 flex flex-row items-center"
            >
              {tCommon("startFree")}
              <ArrowRight className="h-6 w-6 inline ml-1" />
            </MainButton>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}


