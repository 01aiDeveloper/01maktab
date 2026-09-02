"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

interface CarouselNavigationProps {
  onPrevClick: () => void
  onNextClick: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
  variant?: "light" | "dark" | "gray"
  iconType?: "chevron" | "arrow"
  size?: "sm" | "md" | "lg"
}

const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.833 14h16.334M14.583 7.583L21 14l-6.417 6.417" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const ArrowLeftIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.167 14H5.833M13.417 7.583L7 14l6.417 6.417" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export function CarouselNavigation({
  onPrevClick,
  onNextClick,
  canScrollPrev,
  canScrollNext,
  variant = "light",
  iconType = "chevron",
  size = "md",
}: CarouselNavigationProps) {
  const sizeClasses = {
    sm: "h-10 w-10",
    md: "h-14 w-14",
    lg: "h-14 w-14",
  }

  const iconSizes = {
    sm: "w-5 h-5",
    md: "w-7 h-7",
    lg: "w-7 h-7",
  }

  const PrevIcon = iconType === "arrow" ? ArrowLeftIcon : ChevronLeft
  const NextIcon = iconType === "arrow" ? ArrowRightIcon : ChevronRight

  const getButtonClass = (canScroll: boolean) => {
    if (variant === "dark") {
      return canScroll
        ? "bg-white/10 hover:bg-white/20 text-white"
        : "bg-white/5 text-white/30 cursor-not-allowed"
    }
    if (variant === "gray") {
      return canScroll
        ? "text-[#292D32] cursor-pointer"
        : "text-[#292D32]/40 cursor-not-allowed"
    }
    return canScroll
      ? "bg-gray-200 hover:bg-gray-300 text-gray-700"
      : "bg-gray-100 text-gray-300 cursor-not-allowed"
  }

  const getButtonStyle = (canScroll: boolean) => {
    if (variant === "gray") {
      return { backgroundColor: canScroll ? "#DDDDDD" : "#DDDDDDA3" }
    }
    return undefined
  }

  return (
    <div className="flex items-center gap-[18px]">
      <motion.button
        whileHover={canScrollPrev ? { scale: 1.05 } : {}}
        whileTap={canScrollPrev ? { scale: 0.95 } : {}}
        onClick={onPrevClick}
        disabled={!canScrollPrev}
        className={`flex items-center justify-center rounded-full transition-colors ${sizeClasses[size]} ${getButtonClass(canScrollPrev)}`}
        style={getButtonStyle(canScrollPrev)}
      >
        <PrevIcon className={iconSizes[size]} />
      </motion.button>
      <motion.button
        whileHover={canScrollNext ? { scale: 1.05 } : {}}
        whileTap={canScrollNext ? { scale: 0.95 } : {}}
        onClick={onNextClick}
        disabled={!canScrollNext}
        className={`flex items-center justify-center rounded-full transition-colors ${sizeClasses[size]} ${getButtonClass(canScrollNext)}`}
        style={getButtonStyle(canScrollNext)}
      >
        <NextIcon className={iconSizes[size]} />
      </motion.button>
    </div>
  )
}
