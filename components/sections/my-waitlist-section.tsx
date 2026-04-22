"use client"

import { motion } from "framer-motion"
import { Clock, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useMyWaitlist } from "@/hooks/use-waitlist"
import { baseMediaUrl } from "@/lib/utils"

function mediaUrl(path: string | null | undefined): string {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${baseMediaUrl}/${path}`;
}

export function MyWaitlistSection() {
  const { data: entries, isLoading } = useMyWaitlist()

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
        <h2 className="text-2xl font-bold text-foreground">Kutish ro&apos;yxati</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {entries.map((entry) => (
          <Link key={entry.id} href={`/catalog`}>
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              {/* Image */}
              <div className="relative h-40 bg-gradient-to-br from-[#5d7bf5] to-[#7c71f4]">
                {entry.coursePhoto && (
                  <Image
                    src={mediaUrl(entry.coursePhoto)}
                    alt={entry.courseName ?? "Kurs"}
                    fill
                    className="object-cover"
                  />
                )}
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                <h3 className="font-suisse font-bold text-gray-900 text-base line-clamp-2">
                  {entry.courseName ?? `Kurs #${entry.courseId}`}
                </h3>
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 rounded-full px-3 py-1 text-xs font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    Kutilmoqda
                  </div>
                  <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 rounded-full px-3 py-1 text-xs font-medium">
                    <Users className="w-3.5 h-3.5" />
                    Navbat: #{entry.queueNumber}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </motion.section>
  )
}
