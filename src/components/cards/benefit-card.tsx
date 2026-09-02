"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface BenefitCardProps {
  icon: React.ReactNode
  title: string
  bullets: string[]
  isActive: boolean
  onHover: () => void
  onLeave: () => void
}

export function BenefitCard({
  icon,
  title,
  bullets,
  isActive,
  onHover,
  onLeave,
}: BenefitCardProps) {
  return (
    <motion.div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ 
        type: "spring", 
        stiffness: 200, 
        damping: 20,
        mass: 0.8
      }}
      className={cn(
        "rounded-3xl p-8 min-h-[280px] flex flex-col transition-all duration-500 ease-out cursor-pointer",
        isActive
          ? "bg-gradient-to-br from-[#5d7bf5] to-[#4c6ae4] text-white shadow-xl shadow-blue-500/20"
          : "bg-white text-gray-900 hover:shadow-2xl"
      )}
    >
      {/* Icon */}
      <div className="mb-6 w-20 h-20 flex items-center justify-start">
        {icon}
      </div>

      {/* Title */}
      <h3 className={cn(
        "font-suisse text-xl lg:text-2xl font-bold mb-4 leading-tight",
        isActive ? "text-white" : "text-gray-900"
      )}>
        {title}
      </h3>

      {/* Bullets */}
      <ul className="space-y-2">
        {bullets.map((bullet, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className={cn(
              "mt-1.5 h-1.5 w-1.5 rounded-full shrink-0",
              isActive ? "bg-white/80" : "bg-gray-400"
            )} />
            <span className={cn(
              "text-sm lg:text-base leading-relaxed",
              isActive ? "text-white/90" : "text-gray-600"
            )}>
              {bullet}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}
