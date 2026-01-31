"use client"

import { useState, useEffect } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { motion } from "framer-motion"
import { ProfessionCard } from "@/components/cards/profession-card"
import { CarouselNavigation } from "@/components/ui/carousel-navigation"
import { useCarouselNavigation } from "@/hooks/use-carousel-navigation"
import { NoData } from "@/components/shared/no-data"
import { getMediaUrl } from "@/lib/utils"
import api from "@/lib/api"

export function MyProfessionsSection() {
  const [professions, setProfessions] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    slidesToScroll: 1,
  })

  const { canScrollPrev, canScrollNext, scrollPrev, scrollNext } = useCarouselNavigation(emblaApi)

  useEffect(() => {
    const fetchMyProfessions = async () => {
      try {
        const response = await api.get("/course/my/professions")
        if (response.data?.data && response.data.data.length > 0) {
          const apiProfessions = response.data.data.map((prof: any) => ({
            id: prof.id,
            image: getMediaUrl(prof.photo),
            title: prof.title || prof.name,
            instructor: prof.mentor?.fullname ? `Ustoz: ${prof.mentor.fullname}` : "Ustoz: Noma'lum",
            progress: `Dars: ${prof.completedLessons || 0}/${prof.totalLessons || 0}`,
          }))
          setProfessions(apiProfessions)
        }
      } catch (error) {
        console.error("Failed to fetch my professions:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMyProfessions()
  }, [])

  if (isLoading) {
    return null
  }

  if (professions.length === 0) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold ">Kasblarim</h2>
        </div>
        <NoData
          message="Bu yer hozircha bo'sh, kasblar qo'shishni boshlang"
          description="Pastdagi ma'lumotlarni to'ldiring"
          buttonText="Kasblarni ko'rish"
          buttonLink="/kasblar"
          isDark={false}
        />
      </div>
    )
  }

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
