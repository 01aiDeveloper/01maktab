"use client"

import { motion } from "framer-motion"
import { JourneyCircle } from "@/components/ui/journey-circle"
import { BookOpen, Briefcase, Sparkles } from "lucide-react"

const journeyData = [
  {
    id: 1,
    icon: <BookOpen className="w-full h-full" />,
    title: "1-2 oy: Intensiv bosqich",
    subtitle: "Asoslar va amaliy ko'nikmalar",
    bullets: [
      "Haftada 3 marta jonli darslar",
      "Python, SQL, Data Analysis asoslari",
      "Birinchi loyihalar",
    ],
  },
  {
    id: 2,
    icon: <Briefcase className="w-full h-full" />,
    title: "3-5 oy: Chuqur o'rganish",
    subtitle: "Professional daraja",
    bullets: [
      "Haftada 2 marta jonli darslar",
      "Har hafta Support hours",
      "Hamkorlar ofislarida master-klasslar",
      "Real loyihalar ustida ishlash",
      "Portfolio yaratish",
    ],
  },
  {
    id: 3,
    icon: <Sparkles className="w-full h-full" />,
    title: "Qo'shimcha imkoniyatlar",
    subtitle: "",
    bullets: [
      "Support teacher yordami",
      "Barcha darslar yozuvlari",
      "MLC tadbirlari",
    ],
  },
]

export function JourneySection() {
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
              5 oylik sayohat
            </h2>
            <p className="text-gray-400 text-sm lg:text-base max-w-2xl mx-auto leading-relaxed">
              5 oylik intensiv dastur: jonli darslar, stajirovka, xalqaro
              sertifikatlar va kafolatlangan natija. Professional karyerangizni bugun boshlang.
            </p>
          </div>

          {/* Desktop Venn Diagram Layout */}
          <div className="hidden lg:block relative mx-auto" style={{ width: '800px', height: '650px' }}>
            {/* Top Left Circle */}
            <div className="absolute" style={{ left: '60px', top: '0' }}>
              <JourneyCircle
                icon={journeyData[0].icon}
                title={journeyData[0].title}
                subtitle={journeyData[0].subtitle}
                bullets={journeyData[0].bullets}
              />
            </div>
            
            {/* Top Right Circle */}
            <div className="absolute" style={{ right: '60px', top: '0' }}>
              <JourneyCircle
                icon={journeyData[1].icon}
                title={journeyData[1].title}
                subtitle={journeyData[1].subtitle}
                bullets={journeyData[1].bullets}
              />
            </div>
            
            {/* Bottom Center Circle */}
            <div className="absolute left-1/2 -translate-x-1/2" style={{ top: '270px' }}>
              <JourneyCircle
                icon={journeyData[2].icon}
                title={journeyData[2].title}
                subtitle={journeyData[2].subtitle}
                bullets={journeyData[2].bullets}
              />
            </div>
          </div>

          {/* Mobile Stacked Layout with Vertical Overlap */}
          <div className="lg:hidden flex flex-col items-center pb-8">
            {/* Circle 1 */}
            <div className="relative z-30">
              <JourneyCircle
                icon={journeyData[0].icon}
                title={journeyData[0].title}
                subtitle={journeyData[0].subtitle}
                bullets={journeyData[0].bullets}
              />
            </div>
            
            {/* Circle 2 - overlaps circle 1 */}
            <div className="relative z-20 -mt-14">
              <JourneyCircle
                icon={journeyData[1].icon}
                title={journeyData[1].title}
                subtitle={journeyData[1].subtitle}
                bullets={journeyData[1].bullets}
              />
            </div>
            
            {/* Circle 3 - overlaps circle 2 */}
            <div className="relative z-10 -mt-14">
              <JourneyCircle
                icon={journeyData[2].icon}
                title={journeyData[2].title}
                subtitle={journeyData[2].subtitle}
                bullets={journeyData[2].bullets}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
