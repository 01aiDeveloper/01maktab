"use client"

import { CourseCard } from "@/components/shared/course-card"
import useEmblaCarousel from "embla-carousel-react"
import { MainTitle } from "@/components/ui/main-title"
import { Subtitle } from "@/components/ui/subtitle"
import { CarouselNavigation } from "@/components/ui/carousel-navigation"
import { useCarouselNavigation } from "@/hooks/use-carousel-navigation"
import { courseService } from "@/services/course.service"
import { useApi } from "@/hooks/use-api"

// Fallback data if API fails
const FALLBACK_COURSES = [
  {
    title: "Data Analyst Kursi",
    description:
      "Python boasts a vast standard library and a rich ecosystem of third-party libraries and frameworks, which significantly accelerate development.",
    imageUrl: "/images/courses/1.webp",
  },
  {
    title: "ML Engineer Kursi",
    description:
      "Python boasts a vast standard library and a rich ecosystem of third-party libraries and frameworks, which significantly accelerate development.",
    imageUrl: "/images/courses/2.gif",
  },
  {
    title: "Python Dasturlash Tili",
    description: "Python boasts a vast standard library and a rich ecosystem of third-party libraries and frameworks.",
    imageUrl: "/images/courses/1.webp",
  },
]

export function CoursesSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    skipSnaps: true,
  })

  const { canScrollPrev, canScrollNext, scrollPrev, scrollNext } =
    useCarouselNavigation(emblaApi)

  // Fetch courses from API
  const { data: coursesData, loading, error } = useApi(
    () => courseService.getCourses({ format: "COURSE", pageSize: 10 }),
    { autoFetch: true }
  )

  // Use API data or fallback
  const courses = coursesData?.data?.data || FALLBACK_COURSES

  // Transform API data to component format
  const displayCourses = courses.map((course: any) => ({
    id: course.id,
    title: course.name || course.title,
    description: course.description?.replace(/<[^>]*>/g, "") || "", // Strip HTML tags
    imageUrl: course.photo ? `https://dev-api.01maktab.uz/uploads/${course.photo}` : "/images/courses/1.webp",
    difficulty: course.difficulty,
    duration: course.duration,
    price: course.price,
    pricingType: course.pricingType,
  }))

  return (
    <section className=" py-24 md:py-32 overflow-hidden">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8 lg:px-12">
        <div className="text-center">
          <MainTitle 
            align="center" 
            color="text-dark"
            animated
          >
            Kurslar
          </MainTitle>
          <Subtitle
            align="center"
            color="muted"
            className="mx-auto mt-4 md:mt-6 lg:mt-8 max-w-2xl text-gray-500"
            animated
            animationDelay={0.1}
          >
            Mutaxassislar tayyorlagan to'liq video-kurslar orqali o'zingizga kerak yo'nalishda chuqur bilim oling — Data
            Analytics, Machine Learning va boshqalar.
          </Subtitle>
        </div>
      </div>

      <div className="mt-20 w-full max-w-[1440px] mx-auto px-4 md:px-8">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <>
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-4 md:gap-6 lg:gap-8">
                {displayCourses.map((course: any, index: number) => (
                  <div
                    key={course.id || index}
                    className="flex-[0_0_62.5%] min-w-0 sm:flex-[0_0_62.5%] md:flex-[0_0_50%] lg:flex-[0_0_60%]"
                  >
                    <CourseCard {...course} />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {!loading && !error && (
          <div className="mt-16 flex justify-center">
            <CarouselNavigation
              onPrevClick={scrollPrev}
              onNextClick={scrollNext}
              canScrollPrev={canScrollPrev}
              canScrollNext={canScrollNext}
              variant="gray"
              iconType="arrow"
              size="lg"
            />
          </div>
        )}
      </div>
    </section>
  )
}
