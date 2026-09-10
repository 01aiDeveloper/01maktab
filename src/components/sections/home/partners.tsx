"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import useEmblaCarousel from "embla-carousel-react";
import { MainTitle } from "@/components/ui/main-title";
import { Subtitle } from "@/components/ui/subtitle";
import { CarouselNavigation } from "@/components/ui/carousel-navigation";
import { useCarouselNavigation } from "@/hooks/common/use-carousel-navigation";
import { useCarouselFitsView } from "@/hooks/common/use-carousel-fits-view";
import { getMediaUrl } from "@/lib/utils";
import type { Partner } from "@/types/common";
import { usePartners } from "@/hooks/queries/use-partners";

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

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "center",
    slidesToScroll: 1,
    containScroll: "trimSnaps",
  });

  const { canScrollPrev, canScrollNext, scrollPrev, scrollNext } =
    useCarouselNavigation(emblaApi);
  const fitsInView = useCarouselFitsView(emblaApi, partners.length);

  const isDark = variant === "dark";
  const cardBg = isDark ? "bg-[#282828]" : "bg-[#F4F4F6]";
  const cardHoverBg = isDark ? "hover:bg-[#F4F4F6]" : "hover:bg-white";
  const cardBorderColor = isDark ? "border-[#282828]" : "border-[#F4F4F6]";
  const titleColor = isDark ? "#FFFFFF" : "#18181A";
  const showNav = canScrollPrev || canScrollNext;

  if (loading || !partners || partners.length === 0) {
    return null;
  }

  return (
    <section
      className={
        isDark
          ? "w-full bg-[#101010] rounded-[28px] md:rounded-[40px] pt-12 md:pt-16 pb-14 md:pb-16 border border-gray-800 overflow-hidden"
          : "w-full bg-white pt-10 md:pt-14 pb-12 md:pb-16"
      }
    >
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8 lg:px-12 text-center">
        <MainTitle align="center" textColor={titleColor} animated>
          {t("title")}
        </MainTitle>
        {showSubtitle && (
          <Subtitle
            align="center"
            textColor={isDark ? "rgb(156, 163, 175)" : ""}
            className="mx-auto mt-3 md:mt-4 max-w-2xl"
            animated
            animationDelay={0.1}
          >
            {t("subtitle")}
          </Subtitle>
        )}
      </div>

      <div className="mt-8 md:mt-10 w-full">
        <div className="overflow-hidden" ref={emblaRef}>
          <div
            className={
              fitsInView
                ? "flex justify-center gap-4 md:gap-5 px-4 md:px-8 lg:px-12"
                : "flex justify-start gap-4 md:gap-5 pl-4 md:pl-8 lg:pl-[max(3rem,calc((100vw-80rem)/2+3rem))] pr-4 md:pr-8"
            }
          >
            {partners.map((partner) => {
              const isLocalLogo = partner.logo?.startsWith("/");
              const logoSrc = isLocalLogo
                ? partner.logo
                : useMediaUrl
                  ? getMediaUrl(partner.logo)
                  : partner.logo;

              return (
                <div
                  key={partner.id}
                  className="min-w-0 flex-[0_0_min(412px,calc(100vw-3rem))]"
                >
                  <Link
                    href={`/partners/${partner.id}`}
                    className={`group relative flex h-[180px] md:h-[203px] w-full items-center justify-center rounded-[16px] border-[3px] ${cardBorderColor} ${cardBg} ${cardHoverBg} p-8 md:p-10 transition-all ${
                      isDark ? "" : "hover:shadow-xl hover:shadow-gray-200/50"
                    }`}
                  >
                    <Image
                      quality={90}
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
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {showNav ? (
          <div className="flex justify-center mt-6 md:mt-8">
            <CarouselNavigation
              onPrevClick={scrollPrev}
              onNextClick={scrollNext}
              canScrollPrev={canScrollPrev}
              canScrollNext={canScrollNext}
              variant={isDark ? "dark" : "light"}
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
