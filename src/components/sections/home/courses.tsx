"use client"

import { useEffect } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { CourseCard } from "@/components/shared/course-card"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { MainTitle } from "@/components/ui/main-title"
import { Subtitle } from "@/components/ui/subtitle"
import { useCatalog } from "@/hooks/queries/use-catalog"
import { getMediaUrl } from "@/lib/utils"
import { NoData } from "@/components/shared/no-data"
import { useAuth } from "@/hooks/common/use-auth"
import { CarouselNavigation } from "@/components/ui/carousel-navigation"
import { useCarouselNavigation } from "@/hooks/common/use-carousel-navigation"

export function CoursesSection() {
  const t = useTranslations("courses")
  const { user } = useAuth()
  const { data: response, isLoading: loading, error } = useCatalog("course", Boolean(user), 100)
  const courses = response?.data ?? []

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    slidesToScroll: 1,
    containScroll: "trimSnaps",
  })

  const { canScrollPrev, canScrollNext, scrollPrev, scrollNext } =
    useCarouselNavigation(emblaApi)

  useEffect(() => {
    emblaApi?.reInit()
  }, [emblaApi, courses.length])

  const displayCourses = courses.map((course: any) => ({
    id: course.id,
    title: course.name || course.title,
    description: course.description?.replace(/<[^>]*>/g, "") || "",
    imageUrl: getMediaUrl(course.photo || course.cardImage) || "/images/courses/1.webp",
    difficulty: course.difficulty,
    duration: course.duration,
    price: course.price,
    pricingType: course.pricingType,
    enrollmentCount: course.enrollmentCount,
    waitlistCount: course.waitlistCount,
    hasPurchased: course.hasPurchased,
    presalesEnabled: course.presalesEnabled,
    waitlistEnabled: course.waitlistEnabled,
  }))

  const showNav = displayCourses.length > 1

  return (
    <motion.section
      id="kurslar"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col justify-center py-16 md:py-24"
    >
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8 lg:px-12">
        <div className="text-center">
          <MainTitle
            align="center"
            color="text-dark"
            animated
          >
            {t("title")}
          </MainTitle>
          <Subtitle
            align="center"
            color="muted"
            className="mx-auto mt-4 md:mt-6 max-w-2xl"
            animated
            animationDelay={0.1}
          >
            {t("subtitle")}
          </Subtitle>
        </div>
      </div>

      <div className="mt-10 md:mt-14 w-full max-w-7xl mx-auto px-4 md:px-8">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-500">{error.message}</p>
          </div>
        ) : courses.length === 0 ? (
          <NoData message={t("noDataMessage")} description={t("noDataDescription")} />
        ) : (
          <>
            <div className="overflow-hidden pt-6 pb-8 -my-3" ref={emblaRef}>
              <div className="flex gap-4 md:gap-5">
                {displayCourses.map((course: any, index: number) => (
                  <div
                    key={course.id || index}
                    className="min-w-0 flex-[0_0_88%] sm:flex-[0_0_70%] md:flex-[0_0_calc(50%-10px)]"
                  >
                    <CourseCard {...course} index={index} hideQueueStatus />
                  </div>
                ))}
              </div>
            </div>

            {showNav ? (
              <div className="flex justify-center mt-6 md:mt-8">
                <CarouselNavigation
                  onPrevClick={scrollPrev}
                  onNextClick={scrollNext}
                  canScrollPrev={canScrollPrev}
                  canScrollNext={canScrollNext}
                  variant="light"
                />
              </div>
            ) : null}
          </>
        )}
      </div>
    </motion.section>
  )
}
