"use client"

import useEmblaCarousel from "embla-carousel-react"
import { motion } from "framer-motion"
import { CarouselNavigation } from "@/components/ui/carousel-navigation"
import { useCarouselNavigation } from "@/hooks/use-carousel-navigation"
import { MyCourseCard } from "@/components/cards/my-course-card"
import { NoData } from "@/components/shared/no-data"
import { PageLoader } from "@/components/ui/page-loader"
import { useMyCourses } from "@/hooks/use-my-courses"

export function MyCoursesSection() {
  const { data: courses, isLoading } = useMyCourses()

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    slidesToScroll: 1,
  })

  // const { canScrollPrev, canScrollNext, scrollPrev, scrollNext } = useCarouselNavigation(emblaApi)

  if (isLoading) {
    return (
      <section className="py-8">
        <PageLoader />
      </section>
    )
  }

  if (!courses || courses.length === 0) {
    return (
      <section className="py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Kurslarim</h2>
        </div>
        <NoData
          message="Bu yer hozircha bo'sh, kurslar qo'shishni boshlang"
          description="Kurslar ro'yxatiga o'ting"
          buttonText="Kurslarni ko'rish"
          buttonLink="/catalog?tab=courses"
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
      className="py-8"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">Kurslarim</h2>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {courses.map((course) => (
            <div key={course.id} className="flex-[0_0_85%] sm:flex-[0_0_calc(50%-8px)] lg:flex-[0_0_calc(33.333%-12px)] min-w-0">
              <MyCourseCard item={course} href={`/courses/${course.id}`} />
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
          variant="light"
        />
      </div> */}
    </motion.section>
  )
}
