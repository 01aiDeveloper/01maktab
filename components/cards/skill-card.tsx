"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Code2, Grid2X2, Database, ArrowUpRight } from "lucide-react";
import { getMediaUrl } from "@/lib/utils";

interface SkillCardProps {
  id?: number;
  slug?: string;
  image: string;
  title: string;
  icon?: "code" | "grid" | "database";
  badge?: string;
  href?: string;
}

export function SkillCard({ id, slug, image, title, icon = "code", badge, href }: SkillCardProps) {
  const IconComponent =
    icon === "code" ? Code2 : icon === "grid" ? Grid2X2 : Database;

  const cardSlug = slug || id?.toString() || "skill";
  const linkHref = href || `/skills/${cardSlug}`;

  return (
    <Link href={linkHref}>
      <motion.div
        whileHover={{ scale: 1.01, y: -1 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="relative overflow-hidden rounded-3xl aspect-3/4 min-w-[160px] cursor-pointer group"
      >
      <Image
        src={getMediaUrl(image) || "/placeholder.svg"}
        alt={title}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />

      {badge ? (
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-emerald-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold">
          <Image src={"/images/skills/icon.png"} alt="" width={14} height={14} className="w-3.5 h-3.5" />
          {badge}
        </div>
      ) : (
        <div className="absolute top-3 left-3 bg-white/40 backdrop-blur-xl p-2.5 rounded-xl">
          <Image
            src={"/images/skills/icon.png"}
            alt={title}
            width={16}
            height={16}
            className="w-4 h-4 text-gray-700"
          />
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col justify-center  min-h-24 from-white/50 via-white/30 to-transparent backdrop-blur-sm">
        <h3 className="text-white text-2xl lg:text-3xl font-semibold leading-tight">
          {title}
        </h3>
        <div className="absolute top-3 right-3">
          <ArrowUpRight className="w-6 h-6 text-white" />
        </div>
      </div>
    </motion.div>
    </Link>
  );
}
