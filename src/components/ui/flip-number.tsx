"use client"

import { useEffect, useState } from "react"
import styles from "./flip-clock.module.css"

interface FlipNumberProps {
  value: number
  prevValue: number
}

const numberStyle: React.CSSProperties = {
  fontFamily: "'Suisse Intl', sans-serif",
  fontWeight: 600,
  letterSpacing: "0px",
  lineHeight: "140%",
  textAlign: "center",
  verticalAlign: "middle",
}

export function FlipNumber({ value, prevValue }: FlipNumberProps) {
  const [isFlipping, setIsFlipping] = useState(false)
  const displayValue = value.toString().padStart(2, "0")
  const prevDisplayValue = prevValue.toString().padStart(2, "0")

  useEffect(() => {
    if (value !== prevValue) {
      setIsFlipping(true)
      const timer = setTimeout(() => setIsFlipping(false), 600)
      return () => clearTimeout(timer)
    }
  }, [value, prevValue])

  return (
    <div className="relative w-full h-full" style={{ perspective: "400px" }}>
      {/* Static top half - current value */}
      <div className="absolute inset-0 flex items-end justify-center overflow-hidden pb-0.5">
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ clipPath: "inset(0 0 50% 0)" }}
        >
          <span
            className="text-[80px] lg:text-[184px] text-[#4355DB]"
            style={numberStyle}
          >
            {displayValue}
          </span>
        </div>
      </div>

      {/* Static bottom half - current value */}
      <div className="absolute inset-0 flex items-start justify-center overflow-hidden pt-0.5">
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ clipPath: "inset(50% 0 0 0)" }}
        >
          <span
            className="text-[80px] lg:text-[184px] text-[#4355DB]"
            style={numberStyle}
          >
            {displayValue}
          </span>
        </div>
      </div>

      {/* Animated flipping top half - old value */}
      {isFlipping && (
        <div
          className={`absolute inset-0 flex items-end justify-center overflow-hidden pb-0.5 ${styles.flipTop}`}
          style={{
            transformOrigin: "bottom",
            backfaceVisibility: "hidden",
          }}
        >
          <div
            className="absolute inset-0 flex items-center justify-center bg-[#2e2e33]"
            style={{ clipPath: "inset(0 0 50% 0)" }}
          >
            <span
              className="text-[80px] lg:text-[184px] text-[#4355DB]"
              style={numberStyle}
            >
              {prevDisplayValue}
            </span>
          </div>
        </div>
      )}

      {/* Animated flipping bottom half - new value */}
      {isFlipping && (
        <div
          className={`absolute inset-0 flex items-start justify-center overflow-hidden pt-0.5 ${styles.flipBottom}`}
          style={{
            transformOrigin: "top",
            backfaceVisibility: "hidden",
          }}
        >
          <div
            className="absolute inset-0 flex items-center justify-center bg-[#161618]"
            style={{ clipPath: "inset(50% 0 0 0)" }}
          >
            <span
              className="text-[80px] lg:text-[184px] text-[#4355DB]"
              style={numberStyle}
            >
              {displayValue}
            </span>
          </div>
        </div>
      )}

      {/* Middle divider line */}
      <div className="absolute inset-x-0 top-1/2 h-[1px] bg-black/30 -translate-y-1/2 z-10" />
    </div>
  )
}
