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
    <div className="relative group cursor-pointer rounded-[25px] overflow-hidden min-h-100 h-full">
      {/* Background Image */}
      <Image
        quality={90} src={image}
        alt={name}
        fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />

      {/* Info Container */}
      <div className="absolute left-0 right-0 bottom-0 h-[110px] bg-white/20 backdrop-blur-[51px] rounded-[25px]">
        {/* Arrow icon */}
        <div className="absolute w-10 h-10 right-[10px] top-[7px] flex items-center justify-center">
          <Image quality={90} src="/icons/main-arrow.svg" alt="arrow" width={20} height={20} unoptimized />
        </div>

        {/* Text */}
        <div className="absolute left-6 top-8 flex flex-col gap-[10px]">
          <h3 className="text-white text-2xl font-semibold leading-[25px] tracking-[-0.05em] line-clamp-1">
            {name}
          </h3>
          <p className="text-white text-base leading-[25px] tracking-[-0.05em] line-clamp-1" style={{ fontWeight: 450 }}>
            {company}
          </p>
        </div>
      </div>
    </div>
  );
}
