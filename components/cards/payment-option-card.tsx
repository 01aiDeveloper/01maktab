"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"

interface PaymentOptionCardProps {
  icon: React.ReactNode
  title: string
  tag: string
  bullets: string[]
  delay?: number
}

export function PaymentOptionCard({
  icon,
  title,
  tag,
  bullets,
  delay = 0,
}: PaymentOptionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-[#1a1a1d] rounded-3xl p-6 lg:p-8 flex flex-col h-full"
    >
      {/* Header: Icon + Title */}
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-[#5d7bf5] rounded-2xl p-3 flex items-center justify-center shrink-0">
          {icon}
        </div>
        <h3 className="text-white font-bold text-xl lg:text-2xl">
          {title}
        </h3>
      </div>

      {/* Tag */}
      <div className="mb-6">
        <span className="inline-block bg-white text-black text-sm font-medium px-4 py-2 rounded-full">
          {tag}
        </span>
      </div>

      {/* Bullets */}
      <ul className="space-y-3 flex-1">
        {bullets.map((bullet, index) => (
          <li key={index} className="flex items-start gap-3">
            <div className="shrink-0 mt-0.5">
              <div className="w-5 h-5 rounded-full bg-[#5d7bf5] flex items-center justify-center">
                <Check className="w-3 h-3 text-white" strokeWidth={3} />
              </div>
            </div>
            <span className="text-white/85 text-base leading-relaxed">
              {bullet}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}
