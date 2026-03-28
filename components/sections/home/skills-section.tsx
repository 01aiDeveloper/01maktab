"use client"

import useEmblaCarousel from "embla-carousel-react"
import { motion } from "framer-motion"

import { SkillCard } from "@/components/cards/skill-card"
import { CarouselNavigation } from "@/components/ui/carousel-navigation"
import { MainTitle } from "@/components/ui/main-title"
import { useCarouselNavigation } from "@/hooks/use-carousel-navigation"
import { Subtitle } from "@/components/ui/subtitle"
import { NoData } from "@/components/shared/no-data"
import { getMediaUrl } from "@/lib/utils"
import type { Skill } from "@/types/api.types"

interface SkillsSectionProps {
  skills: Skill[]
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    slidesToScroll: 1,
  })

  const { canScrollPrev, canScrollNext, scrollPrev, scrollNext } =
    useCarouselNavigation(emblaApi)

  if (skills.length === 0) {
    return (
      <section id="skillar" className="py-8 container">
        <MainTitle align="center" className="mt-4 md:mt-6 lg:mt-8" animated>
          Skillar
        </MainTitle>
        <NoData
          message="Skilllar topilmadi"
          description="Hozircha hech qanday skill mavjud emas"
        />
      </section>
    )
  }

  return (
    <motion.section
      id="skillar"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="py-8! container"
    >
      <MainTitle align="center" className="mt-4 md:mt-6 lg:mt-8" animated>
        Skillar
      </MainTitle>
      <Subtitle
        align="center"
        color="secondary"
        className="mb-8 md:mb-10 lg:mb-12 mt-4 md:mt-6 lg:mt-8 max-w-xl mx-auto"
        animated
        animationDelay={0.1}
      >
        Bilimingizdagi bo'shliqlarni to'ldiring. Tez va amaliy mini-kurslar
        orqali Python, SQL, Prompt yozish kabi ko'nikmalarni o'rganing.
      </Subtitle>

      <div className="overflow-hidden " ref={emblaRef}>
        <div className="flex gap-3">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="flex-[0_0_83.33%] min-w-0 sm:flex-[0_0_calc(50%-6px)] md:flex-[0_0_calc(33.333%-8px)] lg:flex-[0_0_calc(25%-9px)]"
            >
              <SkillCard
                id={skill.id}
                image={getMediaUrl(skill.photo)}
                title={skill.title}
                iconUrl={skill.icon}
                enrollmentCount={skill.enrollmentCount}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <CarouselNavigation
          onPrevClick={scrollPrev}
          onNextClick={scrollNext}
          canScrollPrev={canScrollPrev}
          canScrollNext={canScrollNext}
          variant="gray"
          size="md"
        />
      </div>
    </motion.section>
  )
}
