"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

interface EventCardProps {
  title: string;
  imageUrl: string;
  locked?: boolean;
  category?: string;
  date?: string;
  subtitle?: string;
}

export function EventCard({
  title,
  imageUrl,
  locked,
  category,
  date,
  subtitle,
}: EventCardProps) {
  const reduceMotion = useReducedMotion();
  if (locked) {
    return (
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.97 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.18 }}
        whileHover={reduceMotion ? undefined : { y: -7, scale: 1.015 }}
        whileTap={reduceMotion ? undefined : { scale: 0.985 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="group relative aspect-[372/508] w-full overflow-hidden rounded-[40px] bg-gray-100 shadow-[0_10px_24px_rgba(24,38,86,0.08)]"
      >
        <Image
          quality={90} src={imageUrl || "/placeholder.svg"}
          alt={title}
          fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover blur-[6px] scale-110 transition-transform duration-700 ease-out group-hover:scale-[1.16]"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30 transition-colors duration-500 group-hover:bg-black/20" />

        {/* Lock icon + text centered */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.7 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
            transition={{ delay: 0.12, duration: 0.35, ease: "easeOut" }}
            className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-white/20 backdrop-blur-[5.64px]"
          >
            <Image
              quality={90} src="/icons/lock.svg"
              alt="lock"
              width={24}
              height={24}
              unoptimized
            />
          </motion.div>
          <motion.h3
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
            className="text-white font-semibold text-[54px] leading-[77px] tracking-[-0.05em] capitalize text-center px-4"
          >
            {title}
          </motion.h3>
          {subtitle && (
            <p className="text-white/70 font-semibold text-sm md:text-base leading-snug text-center px-6">
              {subtitle}
            </p>
          )}
        </div>
      </motion.div>
    );
  }

  // Original unlocked card
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.97 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.18 }}
      whileHover={reduceMotion ? undefined : { y: -7, scale: 1.015 }}
      whileTap={reduceMotion ? undefined : { scale: 0.985 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="group relative aspect-[372/508] w-full overflow-hidden rounded-[40px] bg-gray-100 shadow-[0_10px_24px_rgba(24,38,86,0.08)]"
    >
      <Image
        quality={90} src={imageUrl || "/placeholder.svg"}
        alt={title}
        fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Top - Category and Date */}
      <div className="absolute left-5 top-6 z-10 flex items-center gap-[31px]">
        <div className="flex flex-col gap-[12.46px]">
          <h4 className="text-white font-semibold text-[30px] leading-[31px] tracking-[-0.05em] capitalize">
            {category}
          </h4>
          <span className="text-white font-[450] text-[20px] leading-[31px] tracking-[-0.05em] capitalize">
            {date}
          </span>
        </div>
      </div>

      {/* Top Right - Arrow Button */}
      <div className="absolute top-6 right-5 z-10">
        <div className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-white/20 backdrop-blur-[5.64px]">
          <Image
            quality={90} src="/icons/main-arrow.svg"
            alt="arrow"
            width={22.38}
            height={22.38}
            unoptimized
          />
        </div>
      </div>

      {/* Center - Large Title */}
      <div className="absolute top-[245px] left-9 z-10 w-[320px] h-11.5">
        <h3 className="text-white font-semibold text-[54px] leading-[77px] tracking-[-0.05em] capitalize text-center">
          {title}
        </h3>
      </div>
    </motion.div>
  );
}
