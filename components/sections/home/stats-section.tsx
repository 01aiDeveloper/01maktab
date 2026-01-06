"use client"

import { motion } from "framer-motion"
import { Users, Briefcase } from "lucide-react"
import Image from "next/image"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export function StatsSection() {
  return (
    <section className="container py-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Row 1 */}
        {/* Black card - Graduates count */}
        <motion.div
          variants={itemVariants}
          className="bg-black rounded-3xl p-6 text-white flex flex-col justify-between min-h-[220px]"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <span className="text-sm text-white/80">Hozirda Bitiruvchilarimiz</span>
          </div>
          <span className="text-7xl font-bold">+400</span>
        </motion.div>

        {/* Team photo 1 - right side of row 1 */}
        <motion.div variants={itemVariants} className="rounded-3xl overflow-hidden min-h-[220px]">
          <Image
            src="/images/team1.png"
            alt="01Maktab jamoasi"
            width={600}
            height={400}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Row 2 */}
        {/* Team photo 2 - left side of row 2 */}
        <motion.div variants={itemVariants} className="rounded-3xl overflow-hidden min-h-[220px]">
          <Image
            src="/images/team2.png"
            alt="Jamoa ishlayapti"
            width={600}
            height={400}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Blue card - Employment rate - right side of row 2 */}
        <motion.div
          variants={itemVariants}
          className="bg-[#4361ee] rounded-3xl p-6 text-white flex flex-col justify-between min-h-[220px]"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
            <span className="text-sm text-white/80">{"Ishga Kirish Ko'rsatgichi"}</span>
          </div>
          <span className="text-7xl font-bold">83%</span>
        </motion.div>

      </motion.div>
    </section>
  )
}
