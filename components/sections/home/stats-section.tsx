'use client';

import { motion } from 'framer-motion';
import { Users, Briefcase } from 'lucide-react';
import Image from 'next/image';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function StatsSection() {
  return (
    <section className="min-h-screen flex flex-col justify-center py-8 md:py-10">
      <div className="container">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-1 md:grid-cols-2 gap-3"
      >
        {/* Row 1 */}
        {/* Black card - Graduates count */}
        <motion.div variants={itemVariants} className="bg-[#18181A] rounded-[25px] text-white flex flex-col items-center justify-center h-52.5 md:h-80 gap-4 md:gap-8 order-1 md:order-1">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3.75">
            <div className="w-[46.47px] h-[46.47px] bg-white/20 border border-white/17 backdrop-blur-[7.89px] rounded-[14.67px] flex items-center justify-center">
              <Users className="w-[26.66px] h-[26.66px]" />
            </div>
            <span className="text-sm md:text-[32px] font-[450] text-white text-center tracking-[-0.05em]">Hozirda Bitiruvchilarimiz</span>
          </div>
          <span className="text-4xl md:text-[121.2px] font-[450] text-white text-center tracking-[-0.05em] leading-none">+400</span>
        </motion.div>

        {/* Team photo 1 - right side of row 1 */}
        <motion.div variants={itemVariants} className="rounded-[14px] overflow-hidden h-52.5 md:h-80 order-2 md:order-2">
          <Image src="/images/Statistics_1.jpg" alt="01AI jamoasi" width={600} height={400} className="w-full h-full object-cover" />
        </motion.div>

        {/* Row 2 */}
        {/* Team photo 2 - left side of row 2 */}
        <motion.div variants={itemVariants} className="rounded-[14px] overflow-hidden h-52.5 md:h-80 order-4 md:order-3">
          <Image src="/images/Statistics_2.jpg" alt="Jamoa ishlayapti" width={600} height={400} className="w-full h-full object-cover" />
        </motion.div>

        {/* Blue card - Employment rate - right side of row 2 */}
        <motion.div variants={itemVariants} className="bg-[#4361ee] rounded-[25px] text-white flex flex-col items-center justify-center h-52.5 md:h-80 gap-4 md:gap-8 order-3 md:order-4">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3.75">
            <div className="w-[46.47px] h-[46.47px] bg-white/20 border border-white/17 backdrop-blur-[7.89px] rounded-[14.67px] flex items-center justify-center">
              <Briefcase className="w-[26.66px] h-[26.66px]" />
            </div>
            <span className="text-sm md:text-[32px] font-[450] text-white text-center tracking-[-0.05em]">{"Ishga Kirish Ko'rsatgichi"}</span>
          </div>
          <span className="text-4xl md:text-[121.2px] font-[450] text-white text-center tracking-[-0.05em] leading-none">83%</span>
        </motion.div>
      </motion.div>
      </div>
    </section>
  );
}
