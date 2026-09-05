"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { MainTitle } from "@/components/ui/main-title";
import { Subtitle } from "@/components/ui/subtitle";
import { getMediaUrl } from "@/lib/utils";
import type { Partner } from "@/types/common";
import { usePartners } from "@/hooks/queries/use-partners";
import { PaginatedGrid } from '@/components/ui/paginated-grid';

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
  const { data: fetchedResponse, isLoading } = usePartners(100);
  const rawPartners = partnersProp ?? fetchedResponse?.data ?? [];
  const partners = rawPartners.filter((partner) => {
    const name = partner.name?.toLowerCase() ?? "";
    const logo = partner.logo?.toLowerCase() ?? "";
    return !name.includes("ucell") && !logo.includes("ucell");
  });
  const loading = partnersProp ? false : isLoading;

  const isDark = variant === "dark";
  const sectionBg = isDark ? "bg-[#101010]" : "bg-[#FFFFFF]";
  const cardBg = isDark ? "bg-[#282828]" : "bg-[#F4F4F6]";
  const cardHoverBg = isDark ? "hover:bg-[#F4F4F6]" : "hover:bg-white";
  const cardBorderColor = isDark ? "border-[#282828]" : "border-[#F4F4F6]";
  const titleColor = isDark ? "#FFFFFF" : "#18181A";
  const borderColor = isDark ? "border-gray-800" : "border-gray-100";

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

      <div className="container mt-12">
          <PaginatedGrid items={partners} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(partner) => {
              const isLocalLogo = partner.logo?.startsWith("/");
              const logoSrc = isLocalLogo
                ? partner.logo
                : useMediaUrl
                  ? getMediaUrl(partner.logo)
                  : partner.logo;
              const cardClass = `group relative flex h-[203px] w-[412px] shrink-0 items-center justify-center rounded-[16px] border-[3px] ${cardBorderColor} ${cardBg} ${cardHoverBg} p-10 transition-all ${isDark ? "" : "hover:shadow-xl hover:shadow-gray-200/50"}`;
              return (
                <Link
                  key={partner.id}
                  href={`/partners/${partner.id}`}
                  className={cardClass}
                >
                  <Image
                    quality={90} src={logoSrc}
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
            }}
          </PaginatedGrid>
      </div>
    </section>
  );
}
