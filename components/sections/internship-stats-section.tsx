"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ProgressRingCard } from "@/components/cards/progress-ring-card"

export function InternshipStatsSection() {
  return (
    <section className="w-full py-8">
      <div className="container mx-auto px-4">
        <div className="space-y-4">
          {/* Top Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-[#2a2a2d] rounded-3xl p-8 lg:p-10"
          >
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
              {/* Left Icon/Illustration */}
              <div className="w-24 h-24 lg:w-28 lg:h-28 flex-shrink-0 relative">
                <div className="w-full h-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-2xl flex items-center justify-center">
                  <svg
                    viewBox="0 0 80 80"
                    fill="none"
                    className="w-16 h-16"
                  >
                    {/* Briefcase icon illustration */}
                    <rect
                      x="20"
                      y="30"
                      width="40"
                      height="28"
                      rx="4"
                      stroke="#93a7ff"
                      strokeWidth="2.5"
                      fill="none"
                    />
                    <path
                      d="M30 30V26C30 24 32 22 34 22H46C48 22 50 24 50 26V30"
                      stroke="#93a7ff"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="32"
                      cy="44"
                      r="3"
                      fill="#a3ff6c"
                    />
                    <rect
                      x="35"
                      y="38"
                      width="8"
                      height="3"
                      rx="1.5"
                      fill="#5d7bf5"
                    />
                  </svg>
                </div>
              </div>

              {/* Right Text Block */}
              <div className="flex-1">
                <h2 className="font-suisse text-2xl lg:text-3xl font-bold text-white mb-3">
                  Возможность стажировки:
                </h2>
                <p className="text-white/70 text-sm lg:text-base leading-relaxed max-w-2xl">
                  После успешного завершения программы вы получите возможность пройти стажировку в одной из компаний-партнеров. Вы будете работать над реальными проектами и набираться профессионального опыта.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Bottom Statistics Cards Grid */}
          <div className="grid lg:grid-cols-2 gap-4">
            {/* Card 1 - Blue 85% */}
            <ProgressRingCard
              variant="blue"
              percent={85}
              label="Выпускников направлены на стажировку"
              icon="graduation"
            />

            {/* Card 2 - Dark 60% */}
            <ProgressRingCard
              variant="dark"
              percent={60}
              label="Трудоустроены после стажировки"
              icon="briefcase"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
