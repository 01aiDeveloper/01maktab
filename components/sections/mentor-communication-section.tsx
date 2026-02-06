"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export function MentorCommunicationSection() {
  return (
    <section className="w-full py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid lg:grid-cols-2 gap-4"
        >
          {/* Left Media Card */}
          <div className="relative rounded-3xl overflow-hidden min-h-[300px] lg:min-h-[400px] bg-gradient-to-br from-blue-600 to-blue-800">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-vrjRNWNb492zL3W3jg57jS9GqwIn0u.png"
              alt="Live mentoring"
              fill
              className="object-cover opacity-80"
            />
            {/* Phone mockup overlay would go here if separate image */}
          </div>

          {/* Right Content Card */}
          <div className="bg-[#2a2a2d] rounded-3xl p-8 lg:p-10 flex flex-col justify-center">
            <h2 className="font-suisse text-2xl lg:text-3xl font-bold text-white mb-6">
              Живое общение с менторами
            </h2>
            
            <ul className="space-y-3 text-white/85">
              {[
                "Живые видео-занятия через Telegram",
                "Мгновенные ответы на ваши вопросы",
                "Обучение в группе",
                "Еженедельные support hours",
                "Мастер-классы в офисах партнеров"
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-sm lg:text-base">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/60 flex-shrink-0 mt-2" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
