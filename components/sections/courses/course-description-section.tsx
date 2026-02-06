'use client';

import { motion } from 'framer-motion';

interface CourseDescriptionSectionProps {
  title: string;
  description: string;
}

export function CourseDescriptionSection({ title, description }: CourseDescriptionSectionProps) {
  return (
    <section className="w-full py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl p-8 lg:p-12"
        >
          <h2 className="font-suisse text-2xl lg:text-3xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-gray-600 text-sm lg:text-base leading-relaxed">{description}</p>
        </motion.div>
      </div>
    </section>
  );
}
