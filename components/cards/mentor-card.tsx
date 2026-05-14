"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { cn } from "@/lib/utils"

interface MentorCardProps {
  name: string
  role: string
  company: string
  experience: string
  technologies: string
  image: string
  decorationUrl?: string
  variant?: "dark" | "light"
  className?: string
}

export function MentorCard({
  name,
  role,
  company,
  experience,
  technologies,
  image,
  decorationUrl = "/images/mentors/bg.png",
  variant = "light",
  className,
}: MentorCardProps) {
  const t = useTranslations("cards")
  const isDark = variant === "dark"
  
  // Get initials for fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        "flex flex-col sm:flex-row gap-4 items-center sm:items-stretch",
        className
      )}
    >
      {/* Left Block - Avatar Container */}
      <div className={cn(
        "w-full h-68 sm:w-56 sm:h-56 rounded-3xl overflow-hidden shrink-0 flex items-center justify-center",
        isDark ? "bg-[#2a2a2d]" : "bg-[#f5f5f5]"
      )}>
        <div className="relative w-full h-full">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
            onError={(e) => {
              // Fallback to initials if image fails
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
            }}
          />
          {/* Fallback initials */}
          {/* <div className={cn(
            "absolute inset-0 flex items-center justify-center text-6xl font-bold",
            isDark ? "text-white/20" : "text-gray-300"
          )}>
            {getInitials(name)}
          </div> */}
        </div>
      </div>

      {/* Right Block - Info Card */}
      <div className={cn(
        "flex-1 rounded-3xl w-full p-6 sm:p-10 flex flex-col sm:flex-row gap-6 items-start justify-between relative overflow-hidden",
        isDark ? "bg-[#18181a]" : "bg-white"
      )}>
        {/* Decorative Illustration - Bottom right corner (matn orqasida) */}
        <div className="absolute -bottom-4 sm:-bottom-6 right-0 w-24 h-24 sm:w-40 sm:h-40 opacity-90 pointer-events-none z-0">
          <Image
            src={decorationUrl}
            alt="Decoration"
            fill
            className="object-contain"
          />
        </div>

        {/* Text Content */}
        <div className="relative z-10 flex-1 min-w-0 pr-16 sm:pr-0">
          <h3 className={cn(
            "font-suisse text-2xl sm:text-3xl font-bold leading-tight",
            isDark ? "text-white" : "text-gray-900"
          )}>
            {name}
          </h3>
          <p className={cn(
            "mt-2 text-sm sm:text-base",
            isDark ? "text-gray-400" : "text-gray-500"
          )}>
            {t("roleAtCompany", { role, company })}
          </p>
          <div className={cn(
            "mt-4 space-y-1 text-sm sm:text-base leading-relaxed",
            isDark ? "text-gray-300" : "text-gray-600"
          )}>
            <p>{experience}</p>
            <p>{technologies}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
