"use client"

import { ChevronLeft, ChevronRight, ArrowLeft, ArrowRight } from "lucide-react"
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
    sm: "h-10 w-10 p-2",
    md: "h-12 w-12 p-2",
    lg: "h-14 w-14 p-2",
  }

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  }

  const bgClass =
    variant === "dark"
      ? "bg-white/10 hover:bg-white/20 text-white disabled:bg-white/5 disabled:text-white/30"
      : variant === "gray"
      ? "text-gray-400 transition-all hover:bg-gray-200 disabled:cursor-not-allowed"
      : "bg-gray-200 hover:bg-gray-300 text-gray-700 disabled:bg-gray-100 disabled:text-gray-300"

  const PrevIcon = iconType === "arrow" ? ArrowLeft : ChevronLeft
  const NextIcon = iconType === "arrow" ? ArrowRight : ChevronRight

  return (
    <div className="flex items-center gap-4">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onPrevClick}
        disabled={!canScrollPrev}
        className={`flex items-center justify-center rounded-full transition-colors ${bgClass} ${sizeClasses[size]}`}
        style={
          variant === "gray"
            ? {
                backgroundColor: canScrollPrev ? "#DDDDDD" : "#DDDDDDA3",
              }
            : undefined
        }
      >
        <PrevIcon className={iconSizes[size]} />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onNextClick}
        disabled={!canScrollNext}
        className={`flex items-center justify-center rounded-full transition-colors ${bgClass} ${sizeClasses[size]}`}
        style={
          variant === "gray"
            ? {
                backgroundColor: canScrollNext ? "#DDDDDD" : "#DDDDDDA3",
              }
            : undefined
        }
      >
        <NextIcon className={iconSizes[size]} />
      </motion.button>
    </div>
  )
}
