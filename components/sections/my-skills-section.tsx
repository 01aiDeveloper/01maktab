"use client"

import useEmblaCarousel from "embla-carousel-react"
import { motion } from "framer-motion"
import { SkillCard } from "@/components/cards/skill-card"

import { CarouselNavigation } from "@/components/ui/carousel-navigation"
import { useCarouselNavigation } from "@/hooks/use-carousel-navigation"

const skills = [
  {
    id: 1,
    image: "/python-programming-robot-3d-metallic-blue.jpg",
    title: "Python Dasturlash Tili",
    icon: "plus" as const,
  },
  {
    id: 2,
    image: "/data-science-abstract-pink-paper-fold-3d.jpg",
    title: "Data Science",
    icon: "layers" as const,
  },
  {
    id: 3,
    image: "/sql-database-server-gray-minimal-3d.jpg",
    title: "SQL va Ma'lumotlar Bazasi",
    icon: "grid" as const,
  },
  {
    id: 4,
    image: "/python-coding-robot-mechanical-blue-3d.jpg",
    title: "Python Dasturlash Tili",
    icon: "plus" as const,
  },
  {
    id: 5,
    image: "/machine-learning-ai-neural-3d.jpg",
    title: "Machine Learning",
    icon: "layers" as const,
  },
]

export function MySkillsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    slidesToScroll: 2,
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
        <h2 className="text-2xl font-bold text-foreground">Skillarim</h2>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-3">
          {skills.map((skill) => (
             <div key={skill.id} className="flex-[0_0_calc(25%-12px)] min-w-0">
              <SkillCard {...skill} />
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
