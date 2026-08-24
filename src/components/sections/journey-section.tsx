"use client"

import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { JourneyCircle } from "@/components/ui/journey-circle"
import { BookOpen, Briefcase, Sparkles } from "lucide-react"

export function JourneySection() {
  const t = useTranslations("journey")
  const journeyData = [
    {
      id: 1,
      icon: <BookOpen className="w-full h-full" />,
      title: t("phase1Title"),
      subtitle: t("phase1Subtitle"),
      bullets: [t("phase1Bullet1"), t("phase1Bullet2"), t("phase1Bullet3")],
    },
    {
      id: 2,
      icon: <Briefcase className="w-full h-full" />,
      title: t("phase2Title"),
      subtitle: t("phase2Subtitle"),
      bullets: [t("phase2Bullet1"), t("phase2Bullet2"), t("phase2Bullet3"), t("phase2Bullet4"), t("phase2Bullet5")],
    },
    {
      id: 3,
      icon: <Sparkles className="w-full h-full" />,
      title: t("phase3Title"),
      subtitle: "",
      bullets: [t("phase3Bullet1"), t("phase3Bullet2"), t("phase3Bullet3")],
    },
  ]
  return (
    <section className="w-full py-12 lg:py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-[#18181a] rounded-3xl py-12 lg:py-16 px-6 lg:px-12 overflow-hidden"
        >
          {/* Header */}
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="font-suisse text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4">
              {t("title")}
            </h2>
            <p className="text-gray-400 text-sm lg:text-base max-w-2xl mx-auto leading-relaxed">
              {t("subtitle")}
            </p>
          </div>

          {/* Tablet & Desktop: Venn Diagram — 2 top circles + 1 bottom center */}
          <div className="hidden md:flex flex-col items-center">
            {/* Top row: two circles overlapping horizontally */}
            <div className="flex justify-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative z-10 -mr-10 lg:-mr-16 xl:-mr-20"
              >
                <JourneyCircle
                  icon={journeyData[0].icon}
                  title={journeyData[0].title}
                  subtitle={journeyData[0].subtitle}
                  bullets={journeyData[0].bullets}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="relative z-10 -ml-10 lg:-ml-16 xl:-ml-20"
              >
                <JourneyCircle
                  icon={journeyData[1].icon}
                  title={journeyData[1].title}
                  subtitle={journeyData[1].subtitle}
                  bullets={journeyData[1].bullets}
                />
              </motion.div>
            </div>

            {/* Bottom center circle overlapping both top circles */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative z-20 -mt-16 lg:-mt-28 xl:-mt-32"
            >
              <JourneyCircle
                icon={journeyData[2].icon}
                title={journeyData[2].title}
                subtitle={journeyData[2].subtitle}
                bullets={journeyData[2].bullets}
              />
            </motion.div>
          </div>

          {/* Mobile: Stacked with vertical overlap */}
          <div className="md:hidden flex flex-col items-center pb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative z-30"
            >
              <JourneyCircle
                icon={journeyData[0].icon}
                title={journeyData[0].title}
                subtitle={journeyData[0].subtitle}
                bullets={journeyData[0].bullets}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="relative z-20 -mt-5"
            >
              <JourneyCircle
                icon={journeyData[1].icon}
                title={journeyData[1].title}
                subtitle={journeyData[1].subtitle}
                bullets={journeyData[1].bullets}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative z-10 -mt-5"
            >
              <JourneyCircle
                icon={journeyData[2].icon}
                title={journeyData[2].title}
                subtitle={journeyData[2].subtitle}
                bullets={journeyData[2].bullets}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
