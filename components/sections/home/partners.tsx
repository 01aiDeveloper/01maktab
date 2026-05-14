"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { MainTitle } from "@/components/ui/main-title";
import { Subtitle } from "@/components/ui/subtitle";
import { getMediaUrl } from "@/lib/utils";
import type { Partner } from "@/types/api.types";
import { useEffect, useRef, useState } from "react";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://app-dev.01ai.uz/api/v1";

const UCELL_PARTNER: Partner = {
  id: 0,
  name: "Ucell",
  logo: "/images/partners/Ucell.png",
  description: "",
  website: "https://ucell.uz",
};

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
  const [partners, setPartners] = useState<Partner[]>(
    partnersProp ? [UCELL_PARTNER, ...partnersProp] : [UCELL_PARTNER],
  );
  const [loading, setLoading] = useState(!partnersProp);

  const isDark = variant === "dark";
  const sectionBg = isDark ? "bg-[#101010]" : "bg-[#FFFFFF]";
  const cardBg = isDark ? "bg-[#282828]" : "bg-[#F4F4F6]";
  const cardHoverBg = isDark ? "hover:bg-[#F4F4F6]" : "hover:bg-white";
  const cardBorderColor = isDark ? "border-[#282828]" : "border-[#F4F4F6]";
  const titleColor = isDark ? "#FFFFFF" : "#18181A";
  const borderColor = isDark ? "border-gray-800" : "border-gray-100";

  useEffect(() => {
    // Agar props orqali partners berilgan bo'lsa, fetch qilmaymiz
    if (partnersProp) {
      setPartners([UCELL_PARTNER, ...partnersProp]);
      setLoading(false);
      return;
    }

    // Props orqali berilmagan bo'lsa, API dan fetch qilamiz
    async function fetchPartners() {
      try {
        const response = await fetch(
          `${API_BASE_URL}/partner/public?pageSize=20`,
        );
        const data = await response.json();
        setPartners([UCELL_PARTNER, ...(data?.data?.data || [])]);
      } catch (error) {
        console.error("Failed to fetch partners:", error);
        setPartners([UCELL_PARTNER]);
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
              const isExternal = partner.id === 0;
              const cardClass = `group relative flex h-[203px] w-[412px] shrink-0 items-center justify-center rounded-[16px] border-[3px] ${cardBorderColor} ${cardBg} ${cardHoverBg} p-10 transition-all ${isDark ? "" : "hover:shadow-xl hover:shadow-gray-200/50"}`;
              // Ucell PNG oq matn ekan — CSS mask orqali rangga bo'yaymiz.
              // Default: kulrang, hover: Ucell brend binafsha (#6E2DAE).
              const logoImg = isExternal ? (
                <div
                  role="img"
                  aria-label={partner.name}
                  className="w-[180px] h-[80px] bg-gray-500 group-hover:bg-[#6E2DAE] transition-colors duration-300"
                  style={{
                    WebkitMaskImage: `url(${logoSrc})`,
                    maskImage: `url(${logoSrc})`,
                    WebkitMaskRepeat: "no-repeat",
                    maskRepeat: "no-repeat",
                    WebkitMaskPosition: "center",
                    maskPosition: "center",
                    WebkitMaskSize: "contain",
                    maskSize: "contain",
                  }}
                />
              ) : (
                <Image
                  src={logoSrc}
                  alt={partner.name}
                  width={180}
                  height={80}
                  className={`object-contain transition-all duration-300 ${
                    isDark
                      ? "brightness-0 invert group-hover:brightness-100 group-hover:invert-0"
                      : "brightness-50 group-hover:brightness-100"
                  }`}
                />
              );
              return isExternal ? (
                <a
                  key={`row1-${partner.id}-${index}`}
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cardClass}
                >
                  {logoImg}
                </a>
              ) : (
                <Link
                  key={`row1-${partner.id}-${index}`}
                  href={`/partners/${partner.id}`}
                  className={cardClass}
                >
                  {logoImg}
                </Link>
              );
            })}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
