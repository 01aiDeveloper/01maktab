"use client"

import { FlipNumber } from "./flip-number"

interface CountdownTileProps {
  value: number
  prevValue: number
  label: string
}

export function CountdownTile({ value, prevValue, label }: CountdownTileProps) {
  return (
    <div className="flex flex-row items-center gap-[10px]">
      {/* Outer frame: 260x278, border-radius 63px, border on right/bottom/left 1px, padding 8px */}
      <div
        className="relative w-[140px] h-[150px] lg:w-[260px] lg:h-[278px] p-[4px] lg:p-[8px]"
        style={{
          borderRadius: "34px",
          borderRight: "1px solid rgba(255,255,255,0.1)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          borderLeft: "1px solid rgba(255,255,255,0.1)",
          background: "linear-gradient(180deg, #2c2c30 0%, #1a1a1e 100%)",
        }}
      >
        {/* Inner tile */}
        <div
          className="relative w-full h-full overflow-hidden"
          style={{ borderRadius: "28px" }}
        >
          {/* Background gradient: top lighter, bottom darker */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(180deg, #2e2e33 0%, #232327 46%, #1d1d21 54%, #161618 100%)",
            }}
          />
          {/* Horizontal divider line at center */}
          <div
            className="absolute inset-x-0 top-1/2 -translate-y-[1px] z-20 h-[2px]"
            style={{
              background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.07) 20%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.07) 80%, transparent 100%)",
            }}
          />
          <div className="absolute inset-x-0 top-1/2 z-20 h-[1px] bg-black/60" />
          {/* Number */}
          <div className="relative z-10 w-full h-full">
            <FlipNumber value={value} prevValue={prevValue} />
          </div>
        </div>
      </div>
      <span className="text-white font-suisse font-semibold text-[32px] lg:text-[64px] leading-[75px] tracking-[-0.05em] ml-4">
        {label}
      </span>
    </div>
  )
}
