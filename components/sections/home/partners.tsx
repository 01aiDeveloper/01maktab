"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { MainTitle } from "@/components/ui/main-title"
import { Subtitle } from "@/components/ui/subtitle"
import { CarouselNavigation } from "@/components/ui/carousel-navigation"
import { getMediaUrl } from "@/lib/utils"
import type { Partner } from "@/types/api.types"
import { useEffect, useState } from "react"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://dev-api.01maktab.uz/api/v1"

interface PartnersSectionProps {
  partners?: Partner[]
  useMediaUrl?: boolean
  variant?: 'light' | 'dark'
  showSubtitle?: boolean
}

export function PartnersSection({
  partners: partnersProp,
  useMediaUrl = true,
  variant = 'light',
  showSubtitle = true
}: PartnersSectionProps) {
  const [partners, setPartners] = useState<Partner[]>(partnersProp || [])
  const [loading, setLoading] = useState(!partnersProp)

  const isDark = variant === 'dark'
  const sectionBg = isDark ? 'bg-[#101010]' : 'bg-[#FFFFFF]'
  const cardBg = isDark ? 'bg-[#282828]' : 'bg-[#F4F4F6]'
  const cardHoverBg = isDark ? 'hover:bg-[#F4F4F6]' : 'hover:bg-white'
  const titleColor = isDark ? '#FFFFFF' : '#18181A'
  const borderColor = isDark ? 'border-gray-800' : 'border-gray-100'

  useEffect(() => {
    // Agar props orqali partners berilgan bo'lsa, fetch qilmaymiz
    if (partnersProp) {
      setPartners(partnersProp)
      setLoading(false)
      return
    }

    // Props orqali berilmagan bo'lsa, API dan fetch qilamiz
    async function fetchPartners() {
      try {
        const response = await fetch(`${API_BASE_URL}/partner/public?pageSize=20`)
        const data = await response.json()
        setPartners(data?.data?.data || [])
      } catch (error) {
        console.error("Failed to fetch partners:", error)
        setPartners([])
      } finally {
        setLoading(false)
      }
    }

    fetchPartners()
  }, [partnersProp])

  // Agar yuklanayotgan bo'lsa yoki ma'lumot bo'lmasa, hech narsa ko'rsatmaydi
  if (loading || !partners || partners.length === 0) {
    return null
  }

  return (
    <section className={`${sectionBg} px-4 pb-20 mx-auto w-full overflow-hidden rounded-[80px] py-24 text-center border ${borderColor} ${isDark ? '' : 'shadow-sm'}`}>
      <div className="container">
        <div className="px-4">
          <MainTitle
            align="center"
            textColor={titleColor}
            animated
          >
            Bizning Hamkorlar
          </MainTitle>
          {showSubtitle && (
            <Subtitle
              align="center"
              textColor={isDark ? 'rgb(156, 163, 175)' : 'rgb(156, 163, 175)'}
              className="mx-auto mt-4 md:mt-6 max-w-2xl text-gray-400"
              animated
              animationDelay={0.1}
            >
              Hamkorlarimiz sizga stajerovka, o'qish jarayonida ularning ofisida ekspertlar bilan master-klasslar, birga
              yaratilgan o'qish dasturlari va boshqa imkoniyatni beradilar.
            </Subtitle>
          )}
        </div>

        <div className="mt-20 overflow-hidden">
          <div className="flex gap-6  py-6 whitespace-nowrap">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 30,
                ease: "linear"
              }}
              className="flex gap-6 pr-6"
            >
              {[...partners, ...partners].map((partner, index) => (
                <div
                  key={`${partner.id}-${index}`}
                  className={`group relative flex h-[160px] w-[280px] shrink-0 items-center justify-center rounded-[32px] ${cardBg} ${cardHoverBg} p-10 transition-all ${isDark ? '' : 'hover:shadow-xl hover:shadow-gray-200/50'}`}
                >
                  <Image
                    src={useMediaUrl ? getMediaUrl(partner.logo) : partner.logo}
                    alt={partner.name}
                    width={180}
                    height={80}
                    className={`object-contain transition-all duration-300 brightness-50 group-hover:brightness-100`}
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Navigation Buttons */}
        {/* <div className="mt-12 flex justify-center">
          <CarouselNavigation
            onPrevClick={() => {}}
            onNextClick={() => {}}
            canScrollPrev={false}
            canScrollNext={false}
            variant="gray"
            iconType="arrow"
            size="md"
          />
        </div> */}
      </div>
    </section>
  )
}
