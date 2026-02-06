"use client"

import { FlipNumber } from "./flip-number"

interface CountdownTileProps {
  value: number
  prevValue: number
  label: string
}

export function CountdownTile({ value, prevValue, label }: CountdownTileProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative bg-[#1a1a1d] rounded-2xl w-[100px] h-[100px] lg:w-[120px] lg:h-[120px] flex items-center justify-center shadow-[inset_0_2px_8px_rgba(0,0,0,0.3)] overflow-hidden">
        <FlipNumber value={value} prevValue={prevValue} />
      </div>
      <span className="text-white text-sm lg:text-base font-medium">
        {label}
      </span>
    </div>
  )
}
