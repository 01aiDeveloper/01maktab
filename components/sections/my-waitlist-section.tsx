"use client"

import type { MouseEvent } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { motion } from "framer-motion"
import { ArrowUpRight, Loader2, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { useMyWaitlist, useLeaveWaitlist } from "@/hooks/use-waitlist"
import { baseMediaUrl } from "@/lib/utils"
import { StatusBadge } from "@/components/ui/status-badge"

function mediaUrl(path: string | null | undefined): string {
  if (!path) return ""
  if (path.startsWith("http")) return path
  return `${baseMediaUrl}/${path}`
}

export function MyWaitlistSection() {
  const t = useTranslations("userHome")
  const { data: entries, isLoading } = useMyWaitlist()
  const leaveWaitlist = useLeaveWaitlist()
  const [emblaRef] = useEmblaCarousel({ loop: false, align: "start", slidesToScroll: 1 })

  const handleRemove = (e: MouseEvent, courseId: number) => {
    e.preventDefault()
    e.stopPropagation()
    if (!window.confirm(t("removeWaitlistConfirm"))) return
    leaveWaitlist.mutate(courseId)
  }

  if (isLoading || !entries || entries.length === 0) return null

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="py-8"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">{t("myWaitlist")}</h2>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-3">
          {entries.map((entry) => {
            const courseTitle = entry.title || entry.name || t("unknownCourse")
            const detailHref =
              entry.format === "SKILL"
                ? `/skills/${entry.id}`
                : entry.format === "PROFESSION"
                ? `/professions/${entry.id}`
                : `/courses/${entry.id}`
            const mentorName = entry.mentor?.fullname
            const photoUrl = mediaUrl(entry.photo)
            return (
              <div
                key={entry.id}
                className="flex-[0_0_85%] sm:flex-[0_0_calc(50%-8px)] lg:flex-[0_0_calc(33.333%-12px)] min-w-0"
              >
                <Link href={detailHref} className="block group">
                  <div className="relative rounded-3xl cursor-pointer h-102 border-0">
                    {photoUrl ? (
                      <Image
                        quality={100} src={photoUrl}
                        alt={courseTitle}
                        fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-cover rounded-[20px] overflow-hidden"
                      />
                    ) : (
                      <div className="absolute inset-0 rounded-[20px] bg-gradient-to-br from-[#5d7bf5] to-[#7c71f4]" />
                    )}

                    <div className="absolute top-3 right-3 z-10">
                      <StatusBadge status="waitlist" size="sm" />
                    </div>

                    <button
                      type="button"
                      onClick={(e) => handleRemove(e, entry.id)}
                      disabled={leaveWaitlist.isPending}
                      aria-label={t("removeFromWaitlist")}
                      title={t("removeFromWaitlist")}
                      className="absolute top-3 left-3 z-10 inline-flex items-center justify-center w-8 h-8 rounded-full bg-black/55 text-white hover:bg-black/75 transition-colors disabled:opacity-50 opacity-0 group-hover:opacity-100"
                    >
                      {leaveWaitlist.isPending && leaveWaitlist.variables === entry.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <X className="w-4 h-4" />
                      )}
                    </button>

                    <div
                      className="absolute z-10 rounded-[20px] flex items-center justify-between gap-2 px-4 bg-white"
                      style={{ bottom: "-4px", left: "-2px", right: "-2px", height: "126px" }}
                    >
                      <div className="min-w-0">
                        <h3 className="font-bold text-base leading-snug line-clamp-2 text-[#1a1a1a]">
                          {courseTitle}
                        </h3>
                        {mentorName && (
                          <p className="text-sm mt-1 truncate text-gray-500">
                            {t("mentorLabel")} {mentorName}
                          </p>
                        )}
                      </div>
                      <div className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-[#1a1a1a]">
                        <ArrowUpRight className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </motion.section>
  )
}
