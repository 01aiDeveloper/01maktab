"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Check, ArrowDown } from "lucide-react"

export function RefundSection() {
  return (
    <section className="w-full py-12 lg:py-16 bg-black">
      <div className="container mx-auto px-4">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-suisse text-3xl lg:text-4xl font-bold text-white text-center mb-8 lg:mb-10"
        >
          Ваши инвестиции вернутся на 100%
        </motion.h2>

        {/* Mobile Layout */}
        <div className="lg:hidden space-y-4">
          {/* Blue Image Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-[#5d7bf5] to-[#4c6ae4] rounded-3xl aspect-[4/3] relative overflow-hidden"
          >
            <div className="absolute inset-0 flex items-center justify-center p-12">
              <div className="relative w-full h-full">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/01Maktab__online_education___Copy_-Y0gD9A5EExiLMI3U3loR8SaP5ubQGE.png"
                  alt="Investment return"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </motion.div>

          {/* How it works Card - FIXED FOR MOBILE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-[#1a1a1d] rounded-3xl p-6"
          >
            <h3 className="text-white font-semibold text-lg mb-4">
              Как это работает:
            </h3>
            
            {/* Centered Flow */}
            <div className="flex flex-col items-center text-center gap-3">
              <p className="text-white text-sm">
                Завершите программу
              </p>
              
              <ArrowDown className="w-5 h-5 text-white/60" />
              
              <div className="inline-flex items-center bg-white rounded-full px-4 py-2">
                <span className="text-black text-sm font-medium whitespace-nowrap">
                  Получите до 100% возврат
                </span>
              </div>
            </div>
          </motion.div>

          {/* Description Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-[#1a1a1d] rounded-3xl p-6"
          >
            <p className="text-white/80 text-sm leading-relaxed">
              После успешного завершения программы вы получите возможность пройти стажировку в одной из компаний-партнеров. Вы будете работать над реальными проектами и набираться профессионального опыта.
            </p>
          </motion.div>

          {/* Conditions Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-3xl p-5"
          >
            <div className="flex flex-col gap-3">
              <h4 className="text-black font-semibold text-base">
                Условия:
              </h4>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600 shrink-0" />
                  <span className="text-gray-900 text-sm">
                    Завершить все занятия
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600 shrink-0" />
                  <span className="text-gray-900 text-sm">
                    Сдать все проекты
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:block">
          {/* Grid: Blue Image + Content Cards */}
          <div className="grid grid-cols-[280px_1fr] gap-6 mb-6">
            {/* Left: Blue Image Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-[#5d7bf5] to-[#4c6ae4] rounded-3xl aspect-square relative overflow-hidden"
            >
              <div className="absolute inset-0 flex items-center justify-center p-12">
                <div className="relative w-full h-full">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/01Maktab__online_education___Copy_-Y0gD9A5EExiLMI3U3loR8SaP5ubQGE.png"
                    alt="Investment return"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </motion.div>

            {/* Right: Content Cards */}
            <div className="space-y-6">
              {/* How it works Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-[#1a1a1d] rounded-3xl p-8"
              >
                <h3 className="text-white font-semibold text-xl mb-6">
                  Как это работает:
                </h3>
                
                <div className="flex items-center gap-4">
                  <span className="text-white text-base">
                    Завершите программу
                  </span>
                  
                  <ArrowDown className="w-5 h-5 text-white/60 rotate-[-90deg]" />
                  
                  <div className="inline-flex items-center bg-white rounded-full px-5 py-2.5">
                    <span className="text-black text-base font-medium whitespace-nowrap">
                      Получите до 100% возврат
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Description Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-[#1a1a1d] rounded-3xl p-8"
              >
                <p className="text-white/80 text-base leading-relaxed">
                  После успешного завершения программы вы получите возможность пройти стажировку в одной из компаний-партнеров. Вы будете работать над реальными проектами и набираться профессионального опыта.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Full-width Conditions Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-3xl p-6 w-full"
          >
            <div className="flex items-center gap-8">
              <h4 className="text-black font-semibold text-lg">
                Условия:
              </h4>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="text-gray-900 text-base">
                    Завершить все занятия
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="text-gray-900 text-base">
                    Сдать все проекты
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
