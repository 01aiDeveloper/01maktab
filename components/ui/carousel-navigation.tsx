"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

interface CarouselNavigationProps {
  onPrevClick: () => void
  onNextClick: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
  variant?: "light" | "dark"
}

export function CarouselNavigation({
  onPrevClick,
  onNextClick,
  canScrollPrev,
  canScrollNext,
  variant = "light",
}: CarouselNavigationProps) {
  const bgClass =
    variant === "dark"
      ? "bg-white/10 hover:bg-white/20 text-white disabled:bg-white/5 disabled:text-white/30"
      : "bg-gray-200 hover:bg-gray-300 text-gray-700 disabled:bg-gray-100 disabled:text-gray-300"

  return (
    <div className="flex items-center gap-2">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onPrevClick}
        disabled={!canScrollPrev}
        className={`p-2 rounded-full transition-colors ${bgClass} disabled:cursor-not-allowed`}
      >
        <ChevronLeft className="w-4 h-4" />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onNextClick}
        disabled={!canScrollNext}
        className={`p-2 rounded-full transition-colors ${bgClass} disabled:cursor-not-allowed`}
      >
        <ChevronRight className="w-4 h-4" />
      </motion.button>
    </div>
  )
}
