"use client"

import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface JourneyCircleProps {
  icon: ReactNode
  title: string
  subtitle?: string
  bullets: string[]
  className?: string
}

export function JourneyCircle({
  icon,
  title,
  subtitle,
  bullets,
  className,
}: JourneyCircleProps) {
  return (
    <div
      className={cn(
        "relative w-[300px] h-[300px] lg:w-[380px] lg:h-[380px] rounded-full",
        "border-[3px] border-[#5d7bf5] bg-[#0a0a0a]",
        "flex items-center justify-center",
        "overflow-hidden",
        className
      )}
    >
      {/* Content wrapper with higher z-index */}
      <div className="relative z-10 text-center px-10 py-8 lg:px-12 lg:py-0 max-w-[260px] lg:max-w-[320px]">
        {/* Icon and Title */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="text-[#5d7bf5] w-5 h-5 lg:w-6 lg:h-6 shrink-0 flex-shrink-0">
            {icon}
          </span>
          <h3 className="text-white font-bold text-sm lg:text-base leading-tight font-medium">
            {title}
          </h3>
        </div>
        
        {/* Subtitle */}
        {subtitle && (
          <p className="text-white/70 text-xs lg:text-sm mb-4 leading-relaxed">{subtitle}</p>
        )}
        
        {/* Bullet points */}
        <ul className="text-left space-y-2 mt-4">
          {bullets.map((bullet, index) => (
            <li key={index} className="text-white/85 text-xs lg:text-sm flex items-start gap-2 leading-relaxed">
              <span className="text-white/60 w-1.5 h-1.5 rounded-full bg-current flex-shrink-0 mt-1.5" />
              <span className="text-white/85">{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
