"use client"

import { useState, useEffect } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { motion } from "framer-motion"
import axios from "axios"

import { SkillCard } from "@/components/cards/skill-card"
import { CarouselNavigation } from "@/components/ui/carousel-navigation"
import { MainTitle } from "@/components/ui/main-title"
import { useCarouselNavigation } from "@/hooks/use-carousel-navigation"
import { Subtitle } from "@/components/ui/subtitle"
import { NoData } from "@/components/shared/no-data"
import { getMediaUrl } from "@/lib/utils"

interface Skill {
  id: number
  format: string
  name: string
  title: string
  description: string
  photo: string
  icon: string
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://dev-api.01maktab.uz/api/v1"

export function MySkillsSection() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    slidesToScroll: 2,
  })

  const { canScrollPrev, canScrollNext, scrollPrev, scrollNext } =
    useCarouselNavigation(emblaApi)

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/course/public?format=SKILL`)
        console.log("Skills API Response:", response.data)
        if (response.data?.data?.data) {
          const skillsData = response.data.data.data
          console.log("Skills data:", skillsData)
          console.log("First skill photo:", skillsData[0]?.photo)
          console.log("Media URL for first skill:", getMediaUrl(skillsData[0]?.photo))
          setSkills(skillsData)
        }
      } catch (error) {
        console.error("Failed to fetch skills:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSkills()
  }, [])

  if (isLoading) {
    return (
      <section className="py-8 container">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      </section>
    )
  }

  if (skills.length === 0) {
    return (
      <section className="py-8 container">
        <MainTitle align="center" className="mt-4 md:mt-6 lg:mt-8" animated>
          Skillarim
        </MainTitle>
        <NoData
          message="Skilllar topilmadi"
          description="Hozircha hech qanday skill mavjud emas"
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
      className="py-8! container"
    >
      <MainTitle align="center" className="mt-4 md:mt-6 lg:mt-8" animated>
        Skillarim
      </MainTitle>
      <Subtitle
        align="center"
        className="mb-8 md:mb-10 lg:mb-12 mt-4 md:mt-6 lg:mt-8 max-w-2xl mx-auto"
        animated
        animationDelay={0.1}
      >
        Bilimingizdagi bo'shliqlarni to'ldiring. Tez va amaliy mini-kurslar
        orqali Python, SQL, Prompt yozish kabi ko'nikmalarni o'rganing.
      </Subtitle>

      <div className="overflow-hidden " ref={emblaRef}>
        <div className="flex gap-3">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="flex-[0_0_83.33%] min-w-0 sm:flex-[0_0_calc(50%-6px)] md:flex-[0_0_calc(33.333%-8px)] lg:flex-[0_0_calc(25%-9px)]"
            >
              <SkillCard
                id={skill.id}
                image={getMediaUrl(skill.photo)}
                title={skill.title}
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
          variant="gray"
          iconType="arrow"
          size="md"
        />
      </div>
    </motion.section>
  )
}
