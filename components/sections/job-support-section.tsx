"use client"

import { JobSupportItem } from "@/components/cards/job-support-item"

const jobSupportData = [
  {
    id: 1,
    title: "Rezyume",
    tagText: "Professional CV yaratish",
    illustration: "/icons/professions/support1.webp",
  },
  {
    id: 2,
    title: "Portfolio",
    tagText: "GitHub va loyihalar",
    illustration: "/icons/professions/support2.webp",
  },
  {
    id: 3,
    title: "Interview",
    tagText: "Tayyorgarlik va mashq",
    illustration: "/icons/professions/support3.webp",
  },
  {
    id: 4,
    title: "Mock Interview",
    tagText: "Haqiqiy suhbat simulyatsiyasi",
    illustration: "/icons/professions/support4.webp",
  },
]


export function JobSupportSection() {
  return (
    <section className="w-full py-12 lg:py-16 bg-[#0a0a0a]">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-white text-2xl lg:text-4xl font-bold text-center mb-8 lg:mb-12">
          Ishga joylashishda to'liq yordam
        </h2>

        {/* Cards List */}
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
