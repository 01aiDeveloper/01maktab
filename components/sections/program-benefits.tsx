"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { BenefitCard } from "@/components/cards/benefit-card"
import Image from "next/image"

interface Benefit {
  id: number
  title: string
  bullets: string[]
  icon: React.ReactNode
  isDefaultActive?: boolean
}

interface ProgramBenefitsProps {
  benefits: Benefit[]
}

export function ProgramBenefits({ benefits }: ProgramBenefitsProps) {
  const t = useTranslations("programBenefits")
  const [activeIndex, setActiveIndex] = useState(
    benefits.findIndex((b) => b.isDefaultActive) ?? 0
  )

  return (
    <section className="w-full py-16 bg-[#0a0a0a]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-suisse text-3xl lg:text-4xl font-bold text-white mb-12 text-center">
            {t("title")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map((benefit, index) => (
              <BenefitCard
                key={benefit.id}
                icon={benefit.icon}
                title={benefit.title}
                bullets={benefit.bullets}
                isActive={activeIndex === index}
                onHover={() => setActiveIndex(index)}
                onLeave={() => setActiveIndex(benefits.findIndex((b) => b.isDefaultActive) ?? 0)}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
