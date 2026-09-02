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
        "relative w-[305px] h-[305px] md:w-[400px] md:h-[400px] lg:w-[520px] lg:h-[520px] xl:w-[589px] xl:h-[589px] rounded-full",
        "border-[7px] lg:border-[10px] xl:border-[13px] border-[#4a6cf7]",
        "bg-[#18181a]/80",
        "flex items-center justify-center",
        className
      )}
    >
      <div className="relative z-10 text-left px-10 md:px-14 lg:px-16 xl:px-20 max-w-[240px] md:max-w-[310px] lg:max-w-[400px] xl:max-w-[450px]">
        {/* Icon and Title */}
        <div className="flex items-start gap-2 mb-2">
          <span className="text-[#5d7bf5] w-5 h-5 lg:w-7 lg:h-7 flex-shrink-0 mt-0.5">
            {icon}
          </span>
          <h3 className="text-white font-bold text-sm md:text-base lg:text-lg xl:text-xl leading-tight">
            {title}
          </h3>
        </div>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-white/60 text-xs lg:text-sm xl:text-base mb-3 leading-relaxed pl-7">{subtitle}</p>
        )}

        {/* Bullet points */}
        <ul className="space-y-1.5 pl-3">
          {bullets.map((bullet, index) => (
            <li key={index} className="text-white/80 text-xs lg:text-sm xl:text-base flex items-start gap-2 leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-white/50 flex-shrink-0 mt-1.5" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
