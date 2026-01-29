"use client"

import { useState, useEffect } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { motion } from "framer-motion"
import { SkillCard } from "@/components/cards/skill-card"
import { CarouselNavigation } from "@/components/ui/carousel-navigation"
import { useCarouselNavigation } from "@/hooks/use-carousel-navigation"
import { NoData } from "@/components/shared/no-data"
import { getMediaUrl } from "@/lib/utils"
import api from "@/lib/api"

interface Skill {
  id: number
  format: string
  name: string
  title: string
  description: string
  photo: string
  icon: string
}

export function MySkillsSection() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    slidesToScroll: 2,
  })

  const { canScrollPrev, canScrollNext, scrollPrev, scrollNext } = useCarouselNavigation(emblaApi)

  useEffect(() => {
    const fetchMySkills = async () => {
      try {
        const response = await api.get("/course/my/skills")
        if (response.data?.data) {
          setSkills(response.data.data)
        }
      } catch (error) {
        console.error("Failed to fetch my skills:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMySkills()
  }, [])

  if (isLoading) {
    return (
      <section className="py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      </section>
    )
  }

  if (skills.length === 0) {
    return (
      <section className="py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Skillarim</h2>
        </div>
        <NoData
          message="Hali skillga yozilmagansiz"
          description="Yangi skilllarni o'rganishni boshlash uchun barcha skilllar bo'limiga o'ting"
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
        <h2 className="text-2xl font-bold text-foreground">Skillarim</h2>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-3">
          {skills.map((skill) => (
            <div key={skill.id} className="flex-[0_0_calc(25%-12px)] min-w-0">
              <SkillCard
                id={skill.id}
                image={getMediaUrl(skill.photo)}
                title={skill.title}
                icon="plus"
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
