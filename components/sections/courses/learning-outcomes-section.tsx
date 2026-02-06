'use client';

import { motion } from 'framer-motion';

interface LearningOutcome {
  title: string;
  description: string;
}

interface LearningOutcomesSectionProps {
  outcomes: LearningOutcome[];
  title?: string;
}

export function LearningOutcomesSection({ outcomes, title = "Bu kursda nimani o'rganasiz?" }: LearningOutcomesSectionProps) {
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
          <h2 className="font-suisse text-2xl lg:text-3xl font-bold text-gray-900 mb-6">{title}</h2>
          <div className="space-y-6">
            {outcomes.map((outcome, index) => (
              <div key={index} className="space-y-2">
                <h3 className="font-semibold text-base text-gray-900">{outcome.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{outcome.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
