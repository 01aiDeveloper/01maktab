"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { MainTitle } from "@/components/ui/main-title"
import { Subtitle } from "@/components/ui/subtitle"
import { CarouselNavigation } from "@/components/ui/carousel-navigation"

const PARTNERS = [
  {
    name: "ipak yuli bank",
    logo: "/images/partnors/ipak-yoli.png",
    // activeLogo: "/images/partnors/ipak-yoli.png", // Faqat bitta active image
  },
  ...Array(5).fill({
    name: "ipak yuli bank",
    logo: "/images/partnors/ipak-yoli.png",
    // activeLogo yo'q - faqat logo
  }),
]

export function PartnersSection() {

  return (
    <section className="bg-white px-4 pb-20 mx-auto w-full  overflow-hidden rounded-[80px]  py-24 text-center border border-gray-100 shadow-sm">
      <div className="container">
        <div className="px-4">
          <MainTitle 
            align="center" 
            color="text-dark"
            animated
          >
            Bizning Hamkorlar
          </MainTitle>
          <Subtitle
            align="center"
            textColor="rgb(156, 163, 175)"
            className="mx-auto mt-4 md:mt-6 max-w-2xl text-gray-400"
            animated
            animationDelay={0.1}
          >
            Hamkorlarimiz sizga stajerovka, o'qish jarayonida ularning ofisida ekspertlar bilan master-klasslar, birga
            yaratilgan o'qish dasturlari va boshqa imkoniyatni beradilar.
          </Subtitle>
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
              {[...PARTNERS, ...PARTNERS].map((partner, index) => (
                <div
                  key={index}
                  className="group relative flex h-[160px] w-[280px] shrink-0 items-center justify-center rounded-[32px] bg-[#F8F9FB] p-10 transition-all hover:bg-white hover:shadow-xl hover:shadow-gray-200/50"
                >
                  <Image
                    src={partner.logo || "/placeholder.svg"}
                    alt={partner.name}
                    width={180}
                    height={80}
                    className={`object-contain transition-all duration-300 ${
                      partner.activeLogo 
                        ? 'group-hover:opacity-0' 
                        : 'brightness-0 group-hover:brightness-100'
                    }`}
                  />
                  {partner.activeLogo && (
                    <Image
                      src={partner.activeLogo}
                      alt={partner.name}
                      width={180}
                      height={80}
                      className="absolute object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />
                  )}
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-12 flex justify-center">
          <CarouselNavigation
            onPrevClick={() => {}}
            onNextClick={() => {}}
            canScrollPrev={false}
            canScrollNext={false}
            variant="gray"
            iconType="arrow"
            size="md"
          />
        </div>
      </div>
    </section>
  )
}
