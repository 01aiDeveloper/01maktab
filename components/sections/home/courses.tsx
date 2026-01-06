"use client"

import { CourseCard } from "@/components/shared/course-card"
import useEmblaCarousel from "embla-carousel-react"
import { MainTitle } from "@/components/ui/main-title"
import { Subtitle } from "@/components/ui/subtitle"
import { CarouselNavigation } from "@/components/ui/carousel-navigation"
import { useCarouselNavigation } from "@/hooks/use-carousel-navigation"

const COURSES = [
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
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4 md:gap-6 lg:gap-8">
            {COURSES.map((course, index) => (
              <div 
                key={index} 
                className="flex-[0_0_62.5%] min-w-0 sm:flex-[0_0_62.5%] md:flex-[0_0_50%] lg:flex-[0_0_60%]"
              >
                <CourseCard {...course} />
              </div>
            ))}
          </div>
        </div>

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
      </div>
    </section>
  )
}
