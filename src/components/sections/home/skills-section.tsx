"use client"

import { motion } from "framer-motion"
import { useTranslations } from "next-intl"

import { SkillCard } from "@/components/cards/skill-card"
import { MainTitle } from "@/components/ui/main-title"
import { Subtitle } from "@/components/ui/subtitle"
import { NoData } from "@/components/shared/no-data"
import { getMediaUrl } from "@/lib/utils"
import type { Skill } from "@/types/common"
import { PaginatedGrid } from '@/components/ui/paginated-grid'

interface SkillsSectionProps {
  skills: Skill[]
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  const t = useTranslations("skills")
  if (skills.length === 0) {
    return (
      <section id="skillar" className="py-8 container">
        <MainTitle align="center" className="mt-4 md:mt-6 lg:mt-8" animated>
          {t("title")}
        </MainTitle>
        <NoData
          message={t("noDataMessage")}
          description={t("noDataDescription")}
        />
      </section>
    )
  }

  return (
    <motion.section
      id="skillar"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="py-10 md:py-14 container"
    >
      <MainTitle align="center" className="mt-4 md:mt-6 lg:mt-8" animated>
        {t("title")}
      </MainTitle>
      <Subtitle
        align="center"
        color="secondary"
        className="mb-8 md:mb-10 lg:mb-12 mt-4 md:mt-6 lg:mt-8 max-w-xl mx-auto"
        animated
        animationDelay={0.1}
      >
        {t("subtitle")}
      </Subtitle>

      <PaginatedGrid items={skills} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 py-3 -my-3 items-stretch">
        {(skill, index) => (
          <div key={skill.id || index} className="min-w-0 w-full">
            <SkillCard
              id={skill.id}
              image={getMediaUrl(skill.cardImage || skill.photo)}
              title={skill.title}
              iconUrl={skill.icon}
              enrollmentCount={skill.enrollmentCount}
              waitlistCount={skill.waitlistCount}
              price={skill.price}
              pricingType={skill.pricingType}
              presalesEnabled={skill.presalesEnabled}
              waitlistEnabled={skill.waitlistEnabled}
              hasPurchased={skill.hasPurchased}
              hideQueueStatus
              index={index}
            />
          </div>
        )}
      </PaginatedGrid>
    </motion.section>
  )
}
