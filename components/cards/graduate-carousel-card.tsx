"use client";

import Image from "next/image";

interface GraduateCarouselCardProps {
  name: string;
  company: string;
  position: string;
  image: string;
}

export function GraduateCarouselCard({
  name,
  company,
  image,
}: GraduateCarouselCardProps) {
  return (
    <div className="relative group cursor-pointer rounded-3xl overflow-hidden min-h-100 h-full">
      {/* Background Image */}
      <Image
        src={image}
        alt={name}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/70" />

      {/* Content at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="font-semibold text-lg text-white mb-1 line-clamp-1">
          {name}
        </h3>
        <p className="text-sm text-white/80 line-clamp-1">
          {company}
        </p>
      </div>
    </div>
  );
}
