"use client"

import useEmblaCarousel from "embla-carousel-react"
import { motion } from "framer-motion"
import { ProfessionCard } from "@/components/ui/profession-card"
import { CarouselNavigation } from "@/components/ui/carousel-navigation"
import { useCarouselNavigation } from "@/hooks/use-carousel-navigation"

const professions = [
  {
    id: 1,
    image: "/data-analytics-dashboard-dark-finance-chart-3d.jpg",
    title: "Data Analitik Kasbi",
    instructor: "Ustoz: Khikmatilla Pulatov",
    progress: "Dars: 3/10",
  },
  {
    id: 2,
    image: "/programmer-keyboard-dark-blue-coding-3d.jpg",
    title: "Data Analitik Kasbi",
    instructor: "Ustoz: Khikmatilla Pulatov",
    progress: "Dars: 3/10",
  },
  {
    id: 3,
    image: "/backend-developer-server-dark-3d.jpg",
    title: "Backend Developer",
    instructor: "Ustoz: Khikmatilla Pulatov",
    progress: "Dars: 4/12",
  },
]

export function MyProfessionsSection() {
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
      className="py-8 px-6 bg-[#1a1a1a] rounded-3xl"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Kasblarim</h2>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {professions.map((profession) => (
            <div key={profession.id} className="flex-none w-[280px] md:w-[320px]">
              <ProfessionCard {...profession} />
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
