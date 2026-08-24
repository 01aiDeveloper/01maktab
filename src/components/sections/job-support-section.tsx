"use client"

import { useTranslations } from "next-intl"
import { JobSupportItem } from "@/components/cards/job-support-item"

export function JobSupportSection() {
  const t = useTranslations("jobSupport")
  const jobSupportData = [
    { id: 1, title: t("item1Title"), tagText: t("item1Tag"), illustration: "/icons/professions/support1.webp" },
    { id: 2, title: t("item2Title"), tagText: t("item2Tag"), illustration: "/icons/professions/support2.webp" },
    { id: 3, title: t("item3Title"), tagText: t("item3Tag"), illustration: "/icons/professions/support3.webp" },
    { id: 4, title: t("item4Title"), tagText: t("item4Tag"), illustration: "/icons/professions/support4.webp" },
  ]
  return (
    <section className="w-full py-12 lg:py-16 bg-[#0a0a0a]">
      <div className="container mx-auto px-4">
        <h2 className="text-white text-2xl lg:text-4xl font-bold text-center mb-8 lg:mb-12">
          {t("title")}
        </h2>

        <div className="max-w-4xl mx-auto space-y-4 lg:space-y-5">
          {jobSupportData.map((item) => (
            <JobSupportItem
              key={item.id}
              number={item.id}
              title={item.title}
              tagText={item.tagText}
              illustration={item.illustration}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
