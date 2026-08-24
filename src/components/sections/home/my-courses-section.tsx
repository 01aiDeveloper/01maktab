"use client"
import useEmblaCarousel from "embla-carousel-react"
import { motion } from "framer-motion"
import { CourseCard } from "@/components/ui/course-card"
import { CarouselNavigation } from "@/components/ui/carousel-navigation"
import { useCarouselNavigation } from "@/hooks/use-carousel-navigation"

const courses = [
  {
    id: 1,
    image: "/images/course1.png",
    title: "Data Science",
    instructor: "Ustoz: Khikmatilla Pulatov",
    progress: "Dars: 3/10",
  },
  {
    id: 2,
    image: "/python-programming-dark-blue-laptop-keyboard-3d.jpg",
    title: "Python Dasturlash Tili",
    instructor: "Ustoz: Khikmatilla Pulatov",
    progress: "Dars: 3/10",
  },
  {
    id: 3,
    image: "/web-development-blue-gradient-code-3d.jpg",
    title: "Web Development",
    instructor: "Ustoz: Khikmatilla Pulatov",
    progress: "Dars: 5/12",
  },
  {
    id: 4,
    image: "/machine-learning-neural-network-blue-3d.jpg",
    title: "Machine Learning",
    instructor: "Ustoz: Khikmatilla Pulatov",
    progress: "Dars: 2/8",
  },
]

export function MyCoursesSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    slidesToScroll: 1,
  })

  const { canScrollPrev, canScrollNext, scrollPrev, scrollNext } = useCarouselNavigation(emblaApi)

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
        <div className="flex gap-3 md:gap-4">
          {courses.map((course) => (
            <div 
              key={course.id} 
              className="flex-[0_0_83.33%] min-w-0 sm:flex-[0_0_calc(50%-6px)] md:flex-[0_0_calc(33.333%-8px)] lg:flex-[0_0_calc(25%-9px)]"
            >
              <CourseCard {...course} />
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
          variant="light"
        />
      </div>
    </motion.section>
  )
}
