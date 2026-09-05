"use client"

import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { MyCourseCard } from "@/components/cards/my-course-card"
import { NoData } from "@/components/shared/no-data"
import { PageLoader } from "@/components/ui/page-loader"
import { useMySkills } from "@/hooks/queries/use-my-courses"
import { PaginatedGrid } from '@/components/ui/paginated-grid'

export function MySkillsSection() {
  const t = useTranslations("userHome")
  const { data: skills, isLoading } = useMySkills()

  if (isLoading) {
    return (
      <section className="py-8">
        <PageLoader />
      </section>
    )
  }

  if (!skills || skills.length === 0) {
    return (
      <section className="py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">{t("mySkills")}</h2>
        </div>
        <NoData
          message={t("noSkillsMessage")}
          description={t("noCoursesDescription")}
          buttonText={t("noSkillsButton")}
          buttonLink="/catalog?tab=skills"
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
        <h2 className="text-2xl font-bold text-foreground">{t("mySkills")}</h2>
      </div>

      <PaginatedGrid items={skills} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {(skill) => (
            <div key={skill.id} className="min-w-0">
              <MyCourseCard item={skill} href={`/skills/${skill.id}`} />
            </div>
          )}
      </PaginatedGrid>
    </motion.section>
  )
}
