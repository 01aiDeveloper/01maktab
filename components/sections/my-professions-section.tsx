"use client"

import useEmblaCarousel from "embla-carousel-react"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { MyCourseCard } from "@/components/cards/my-course-card"
import { CarouselNavigation } from "@/components/ui/carousel-navigation"
import { useCarouselNavigation } from "@/hooks/use-carousel-navigation"
import { NoData } from "@/components/shared/no-data"
import { PageLoader } from "@/components/ui/page-loader"
import { useMyProfessions } from "@/hooks/use-my-courses"

export function MyProfessionsSection() {
  const t = useTranslations("userHome")
  const { data: professions, isLoading } = useMyProfessions()

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    slidesToScroll: 1,
  })

  const { canScrollPrev, canScrollNext, scrollPrev, scrollNext } = useCarouselNavigation(emblaApi)

  if (isLoading) {
    return (
      <section className="py-8">
        <PageLoader />
      </section>
    )
  }

  if (!professions || professions.length === 0) {
    return (
      <section className="py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">{t("myProfessions")}</h2>
        </div>
        <NoData
          message={t("noProfessionsMessage")}
          description={t("noCoursesDescription")}
          buttonText={t("noProfessionsButton")}
          buttonLink="/catalog?tab=professions"
        />
      </section>
    )
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="py-8 "
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">{t("myProfessions")}</h2>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {professions.map((profession) => (
            <div key={profession.id} className="flex-[0_0_85%] sm:flex-[0_0_calc(50%-8px)] lg:flex-[0_0_calc(33.333%-12px)] min-w-0">
              <MyCourseCard item={profession} href={`/professions/${profession.id}`} dark />
            </div>
          ))}
        </div>
      </div>

      {/* <div className="flex justify-center mt-6"> 
        <CarouselNavigation
          onPrevClick={scrollPrev}
          onNextClick={scrollNext}
          canScrollPrev={canScrollPrev}
          canScrollNext={canScrollNext}
          variant="dark"
        />
      </div> */}
    </motion.section>
  )
}
