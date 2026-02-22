"use client"
import useEmblaCarousel from "embla-carousel-react"
import { motion } from "framer-motion"
import { CarouselNavigation } from "@/components/ui/carousel-navigation"
import { useCarouselNavigation } from "@/hooks/use-carousel-navigation"
import { MyEnrolledCard } from "@/components/cards/my-enrolled-card"

const courses = [
  {
    id: 1,
    image: "/images/course1.png",
    title: "Data Science",
    instructor: "Khikmatilla Pulatov",
    moduleLabel: "Модуль-1",
    lessonLabel: "Дарс: 3/10",
    href: "/courses/data-science",
  },
  {
    id: 2,
    image: "/python-programming-dark-blue-laptop-keyboard-3d.jpg",
    title: "Python Dasturlash Tili",
    instructor: "Khikmatilla Pulatov",
    moduleLabel: "Модуль-1",
    lessonLabel: "Дарс: 3/10",
    href: "/courses/python",
  },
  {
    id: 3,
    image: "/web-development-blue-gradient-code-3d.jpg",
    title: "Web Development",
    instructor: "Khikmatilla Pulatov",
    moduleLabel: "Модуль-2",
    lessonLabel: "Дарс: 5/12",
    href: "/courses/web-development",
  },
  {
    id: 4,
    image: "/machine-learning-neural-network-blue-3d.jpg",
    title: "Machine Learning",
    instructor: "Khikmatilla Pulatov",
    moduleLabel: "Модуль-1",
    lessonLabel: "Дарс: 2/8",
    href: "/courses/machine-learning",
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
        <div className="flex gap-4">
          {courses.map((course) => (
            <div key={course.id} className="flex-[0_0_calc(25%-12px)] min-w-0">
              <MyEnrolledCard
                image={course.image}
                title={course.title}
                mentorName={course.instructor}
                moduleLabel={course.moduleLabel}
                lessonLabel={course.lessonLabel}
                href={course.href}
                variant="light"
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
          variant="light"
        />
      </div>
    </motion.section>
  )
}
