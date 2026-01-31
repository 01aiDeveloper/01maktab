"use client"

import { useState, useEffect } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { motion } from "framer-motion"
import axios from "axios"
import { ProfessionCard } from "@/components/cards/profession-card"
import { CarouselNavigation } from "@/components/ui/carousel-navigation"
import { useCarouselNavigation } from "@/hooks/use-carousel-navigation"
import { getMediaUrl } from "@/lib/utils"

interface Profession {
  id: number
  format: string
  name: string
  title: string
  description: string
  photo: string
  icon: string | null
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://dev-api.01maktab.uz/api/v1"

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
    const fetchProfessions = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/course/public?format=PROFESSION`)
        if (response.data?.data?.data && response.data.data.data.length > 0) {
          const apiProfessions = response.data.data.data.map((prof: Profession) => ({
            id: prof.id,
            image: getMediaUrl(prof.photo),
            title: prof.title || prof.name,
            instructor: "Ustoz: Khikmatilla Pulatov", // Default value
            progress: "Dars: 0/10", // Default value
          }))
          setProfessions(apiProfessions)
        }
      } catch (error) {
        console.error("Failed to fetch professions:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfessions()
  }, [])

  // Agar loading yoki ma'lumot bo'lmasa, hech narsa ko'rsatmaydi
  if (isLoading || professions.length === 0) {
    return null
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
        <div className="flex gap-3 md:gap-4">
          {professions.map((profession) => (
            <div
              key={profession.id}
              className="flex-[0_0_83.33%] min-w-0 sm:flex-[0_0_280px] md:flex-[0_0_320px]"
            >
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
