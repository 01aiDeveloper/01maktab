"use client"

import Image from "next/image"
import Link from "next/link"

interface MenuFeaturedCardProps {
  className?: string
  onNavigate?: () => void
}

export function MenuFeaturedCard({ className = "", onNavigate }: MenuFeaturedCardProps) {
  return (
    <Link
      href="/catalog"
      onClick={onNavigate}
      className={`group relative block aspect-video overflow-hidden rounded-[23px] bg-[#C9C2FF] ${className}`}
    >
      <Image
        quality={90}
        src="/images/bannerUcell.png"
        alt="01AI × Ucell"
        fill
        sizes="(max-width: 768px) 90vw, 320px"
        className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
      />
    </Link>
  )
}
