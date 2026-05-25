"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { MainTitle } from "@/components/ui/main-title";
import { Subtitle } from "@/components/ui/subtitle";
import { getMediaUrl } from "@/lib/utils";
import type { Partner } from "@/types/api.types";
import { useEffect, useState } from "react";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://app-dev.01ai.uz/api/v1";

interface PartnersSectionProps {
  partners?: Partner[];
  useMediaUrl?: boolean;
  variant?: "light" | "dark";
  showSubtitle?: boolean;
}

export function PartnersSection({
  partners: partnersProp,
  useMediaUrl = true,
  variant = "light",
  showSubtitle = true,
}: PartnersSectionProps) {
  const t = useTranslations("partners");
  const [partners, setPartners] = useState<Partner[]>(partnersProp ?? []);
  const [loading, setLoading] = useState(!partnersProp);

  const isDark = variant === "dark";
  const sectionBg = isDark ? "bg-[#101010]" : "bg-[#FFFFFF]";
  const cardBg = isDark ? "bg-[#282828]" : "bg-[#F4F4F6]";
  const cardHoverBg = isDark ? "hover:bg-[#F4F4F6]" : "hover:bg-white";
  const cardBorderColor = isDark ? "border-[#282828]" : "border-[#F4F4F6]";
  const titleColor = isDark ? "#FFFFFF" : "#18181A";
  const borderColor = isDark ? "border-gray-800" : "border-gray-100";

  useEffect(() => {
    if (partnersProp) {
      setPartners(partnersProp);
      setLoading(false);
      return;
    }

    async function fetchPartners() {
      try {
        const response = await fetch(
          `${API_BASE_URL}/partner/public?pageSize=20`,
        );
        const data = await response.json();
        setPartners(data?.data?.data || []);
      } catch (error) {
        console.error("Failed to fetch partners:", error);
        setPartners([]);
      } finally {
        setLoading(false);
      }
    }

    fetchPartners();
  }, [partnersProp]);

  const cardWidth = 412 + 24; // card + gap
  const totalWidth = partners.length * cardWidth;
  const [isPaused, setIsPaused] = useState(false);

  // Agar yuklanayotgan bo'lsa yoki ma'lumot bo'lmasa, hech narsa ko'rsatmaydi
  if (loading || !partners || partners.length === 0) {
    return null;
  }

  return (
    <section
      className={`${sectionBg} pb-20 mx-auto w-full rounded-[28px] md:rounded-[40px] py-24 text-center border ${borderColor} ${isDark ? "" : "shadow-sm"} overflow-hidden`}
    >
      <div className="container">
        <div className="px-4">
          <MainTitle align="center" textColor={titleColor} animated>
            {t("title")}
          </MainTitle>
          {showSubtitle && (
            <Subtitle
              align="center"
              textColor={isDark ? "rgb(156, 163, 175)" : ""}
              className="mx-auto mt-4 md:mt-6 max-w-2xl "
              animated
              animationDelay={0.1}
            >
              {t("subtitle")}
            </Subtitle>
          )}
        </div>
      </div>

      <div className="mt-20 w-full overflow-hidden space-y-6">
        {/* Row 1: scrolls left */}
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-6 px-6"
            animate={isPaused ? undefined : { x: ["0px", `${-totalWidth}px`] }}
            transition={{
              x: {
                repeat: Infinity,
                duration: partners.length * 6,
                ease: "linear",
              },
            }}
            style={{ width: "max-content" }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {[...partners, ...partners, ...partners].map((partner, index) => {
              const isLocalLogo = partner.logo.startsWith("/");
              const logoSrc = isLocalLogo
                ? partner.logo
                : useMediaUrl
                  ? getMediaUrl(partner.logo)
                  : partner.logo;
              const cardClass = `group relative flex h-[203px] w-[412px] shrink-0 items-center justify-center rounded-[16px] border-[3px] ${cardBorderColor} ${cardBg} ${cardHoverBg} p-10 transition-all ${isDark ? "" : "hover:shadow-xl hover:shadow-gray-200/50"}`;
              return (
                <Link
                  key={`row1-${partner.id}-${index}`}
                  href={`/partners/${partner.id}`}
                  className={cardClass}
                >
                  <Image
                    quality={95} src={logoSrc}
                    alt={partner.name}
                    width={180}
                    height={80}
                    className={`object-contain transition-all duration-300 ${
                      isDark
                        ? "brightness-0 invert group-hover:brightness-100 group-hover:invert-0"
                        : "brightness-50 group-hover:brightness-100"
                    }`}
                  />
                </Link>
              );
            })}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
