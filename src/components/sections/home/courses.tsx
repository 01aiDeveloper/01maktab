"use client"

import { CourseCard } from "@/components/shared/course-card"
import useEmblaCarousel from "embla-carousel-react"
import { useTranslations } from "next-intl"
import { MainTitle } from "@/components/ui/main-title"
import { Subtitle } from "@/components/ui/subtitle"
import { CarouselNavigation } from "@/components/ui/carousel-navigation"
import { useCarouselNavigation } from "@/hooks/common/use-carousel-navigation"
import { useCatalog } from "@/hooks/queries/use-catalog"
import { getMediaUrl } from "@/lib/utils"
import { NoData } from "@/components/shared/no-data"
import { useAuth } from "@/hooks/common/use-auth"

export function CoursesSection() {
  const t = useTranslations("courses")
  const { user } = useAuth()
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    skipSnaps: true,
  })

  const { canScrollPrev, canScrollNext, scrollPrev, scrollNext } =
    useCarouselNavigation(emblaApi)

  // Fetch courses from API
  const { data: courses = [], isLoading: loading, error } = useCatalog("course", Boolean(user), 10)

  // Transform API data to component format
  const displayCourses = courses.map((course: any) => ({
    id: course.id,
    title: course.name || course.title,
    description: course.description?.replace(/<[^>]*>/g, "") || "", // Strip HTML tags
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

  return (
    <section id="kurslar" className="min-h-screen flex flex-col justify-center py-8 md:py-10 overflow-hidden">
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
            className="mx-auto mt-4 md:mt-6 max-w-2xl "
            animated
            animationDelay={0.1}
          >
            {t("subtitle")}
          </Subtitle>
        </div>
      </div>

      <div className="mt-6 md:mt-10 w-full max-w-360 mx-auto px-4 md:px-8">
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
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-4 md:gap-6 lg:gap-8">
                {displayCourses.map((course: any, index: number) => (
                  <div
                    key={course.id || index}
                    className="flex-[0_0_80%] min-w-0 sm:flex-[0_0_calc(50%-8px)] md:flex-[0_0_calc(33.333%-16px)] lg:flex-[0_0_calc(25%-24px)]"
                  >
                    <CourseCard {...course} hideQueueStatus />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {!loading && !error && (
          <div className="mt-8 md:mt-10 flex justify-center">
            <CarouselNavigation
              onPrevClick={scrollPrev}
              onNextClick={scrollNext}
              canScrollPrev={canScrollPrev}
              canScrollNext={canScrollNext}
              variant="gray"
              size="lg"
            />
          </div>
        )}
      </div>
    </section>
  )
}
