"use client"

import useEmblaCarousel from "embla-carousel-react"
import { motion } from "framer-motion"
import { CarouselNavigation } from "@/components/ui/carousel-navigation"
import { useCarouselNavigation } from "@/hooks/use-carousel-navigation"
import { MyEnrolledCard } from "@/components/cards/my-enrolled-card"

const professions = [
  {
    id: 1,
    image: "/data-analytics-dashboard-dark-finance-chart-3d.jpg",
    title: "Data Analitik Kasbi",
    instructor: "Khikmatilla Pulatov",
    moduleLabel: "Modul-1",
    lessonLabel: "Dars: 3/10",
    href: "/professions/data-analitik-kasbi",
  },
  {
    id: 2,
    image: "/programmer-keyboard-dark-blue-coding-3d.jpg",
    title: "ML Engineer Kasbi",
    instructor: "Khikmatilla Pulatov",
    moduleLabel: "Modul-1",
    lessonLabel: "Dars: 3/10",
    href: "/professions/ml-engineer-kasbi",
  },
  {
    id: 3,
    image: "/backend-developer-server-dark-3d.jpg",
    title: "Backend Developer",
    instructor: "Khikmatilla Pulatov",
    moduleLabel: "Modul-2",
    lessonLabel: "Dars: 4/12",
    href: "/professions/backend-developer",
  },
]

export function MyProfessionsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
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
      className="py-8 px-6 bg-[#1a1a1a] rounded-3xl"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Kasblarim</h2>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {professions.map((profession) => (
            <div key={profession.id} className="flex-none w-[280px] md:w-[320px]">
              <MyEnrolledCard
                image={profession.image}
                title={profession.title}
                mentorName={profession.instructor}
                moduleLabel={profession.moduleLabel}
                lessonLabel={profession.lessonLabel}
                href={profession.href}
                variant="dark"
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
          variant="dark"
        />
      </div>
    </motion.section>
  )
}
