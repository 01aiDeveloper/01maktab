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
      href="/professions/ml-engineer-kasbi"
      onClick={onNavigate}
      className={`group relative block w-full aspect-[4/3] overflow-hidden rounded-[23px] bg-[#F4F4F6] ${className}`}
    >
      <Image
        quality={90}
        src="/images/Frame%201948754886.jpg"
        alt="ML Engineer Kasbi"
        fill
        sizes="(max-width: 768px) 90vw, 280px"
        className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
      />
    </Link>
  )
}
