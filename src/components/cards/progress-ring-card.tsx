"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { GraduationCap, Briefcase } from "lucide-react"

interface ProgressRingCardProps {
  variant: "blue" | "dark"
  percent: number
  label: string
  icon?: "graduation" | "briefcase"
  className?: string
}

export function ProgressRingCard({
  variant,
  percent,
  label,
  icon = "graduation",
  className,
}: ProgressRingCardProps) {
  const isBlue = variant === "blue"
  
  // SVG circle calculations
  const size = 280
  const strokeWidth = 16
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percent / 100) * circumference

  const IconComponent = icon === "graduation" ? GraduationCap : Briefcase

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        "rounded-3xl p-8 lg:p-12 flex items-center justify-center min-h-[400px]",
        isBlue 
          ? "bg-gradient-to-br from-[#5d7bf5] to-[#4c6ae4]" 
          : "bg-[#2a2a2d]",
        className
      )}
    >
      <div className="relative flex items-center justify-center">
        {/* SVG Progress Ring */}
        <svg
          width={size}
          height={size}
          className="transform -rotate-90"
        >
          {/* Background circle (track) */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={isBlue ? "rgba(255, 255, 255, 0.2)" : "rgba(93, 123, 245, 0.15)"}
            strokeWidth={strokeWidth}
            fill="none"
          />
          
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={isBlue ? "#ffffff" : "rgba(147, 167, 255, 0.7)"}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Content inside ring */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
          {/* Label with icon */}
          <div className="flex items-center gap-2 mb-4">
            <IconComponent className={cn(
              "w-5 h-5",
              isBlue ? "text-white" : "text-[#93a7ff]"
            )} />
            <span className={cn(
              "text-sm font-medium",
              isBlue ? "text-white" : "text-white/80"
            )}>
              {label}
            </span>
          </div>

          {/* Percentage */}
          <div className={cn(
            "text-6xl lg:text-7xl font-bold",
            isBlue ? "text-white" : "text-white"
          )}>
            {percent}%
          </div>
        </div>
      </div>
    </motion.div>
  )
}
