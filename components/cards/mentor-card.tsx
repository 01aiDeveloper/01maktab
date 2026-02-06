"use client"

import Image from "next/image"
import { motion } from "framer-motion"
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
        "flex flex-col lg:flex-row gap-4 items-center lg:items-stretch",
        className
      )}
    >
      {/* Left Block - Avatar Container */}
      <div className={cn(
        "w-full lg:w-56 aspect-square rounded-3xl overflow-hidden shrink-0 flex items-center justify-center",
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
          <div className={cn(
            "absolute inset-0 flex items-center justify-center text-6xl font-bold",
            isDark ? "text-white/20" : "text-gray-300"
          )}>
            {getInitials(name)}
          </div>
        </div>
      </div>

      {/* Right Block - Info Card */}
      <div className={cn(
        "flex-1 rounded-3xl p-8 lg:p-10 flex flex-col lg:flex-row gap-6 items-start justify-between",
        isDark ? "bg-[#18181a]" : "bg-white"
      )}>
        {/* Text Content */}
        <div className="flex-1 min-w-0">
          <h3 className={cn(
            "font-suisse text-2xl lg:text-3xl font-bold leading-tight",
            isDark ? "text-white" : "text-gray-900"
          )}>
            {name}
          </h3>
          <p className={cn(
            "mt-2 text-sm lg:text-base",
            isDark ? "text-gray-400" : "text-gray-500"
          )}>
            {role} s {company}
          </p>
          <div className={cn(
            "mt-4 space-y-1 text-sm lg:text-base leading-relaxed",
            isDark ? "text-gray-300" : "text-gray-600"
          )}>
            <p>{experience}</p>
            <p>{technologies}</p>
          </div>
        </div>

        {/* Decorative Illustration - Inside the card on the far right */}
        <div className="hidden lg:block w-32 h-32 relative shrink-0">
          <Image
            src={decorationUrl}
            alt="Decoration"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </motion.div>
  )
}
