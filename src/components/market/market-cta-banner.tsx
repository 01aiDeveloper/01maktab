'use client';

import { motion } from 'framer-motion';

export function MarketCtaBanner() {
  return (
    <section className="container py-2">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5 }}
        className="rounded-3xl bg-[#ECECEC] p-8 lg:p-10 text-center"
      >
        <p className="font-semibold text-base lg:text-xl xl:text-[30px] text-neutral-700 leading-relaxed max-w-3xl mx-auto">
        Skillar orqali bilimingizdagi bo‘shliqlarni to‘ldiring. <br />
Tez va amaliy mini-kurslar orqali Python, SQL, <br />
Prompt yozish kabi ko‘nikmalarni o‘rganing.
        </p>
      </motion.div>
    </section>
  );
}
