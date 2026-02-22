'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { StoryModal, STORIES } from './feature-cards-modal';

const featureCards = [
  {
    id: 1,
    title: "No'l bir maktab bu nima?",
    bgColor: 'bg-[#ff6b35]',
    borderColor: 'border-[#ff8c5a]',
    image: '/images/hero-info-image1.png',
    imagePosition: 'object-right-bottom',
  },
  {
    id: 2,
    title: "Hamjimiyatga qanday a'zo bo'laman",
    bgColor: 'bg-[#3b82f6]',
    borderColor: 'border-[#60a5fa]',
    image: '/images/hero-info-image2.png',
    imagePosition: 'object-right-top',
  },
  {
    id: 3,
    title: 'Kasb bu nima?',
    bgColor: 'bg-[#84cc16]',
    borderColor: 'border-[#a3e635]',
    image: '/images/hero-info-image3.png',
    imagePosition: 'object-right-bottom',
  },
  {
    id: 4,
    title: 'Skillar nima uchun kerak?',
    bgColor: 'bg-[#a855f7]',
    borderColor: 'border-[#c084fc]',
    image: '/images/hero-info-image4.png',
    imagePosition: 'object-right-bottom',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export function FeatureCards() {
  const [activeStoryId, setActiveStoryId] = useState<number | null>(null);

  const activeStory = activeStoryId !== null
    ? STORIES.find((s) => s.id === activeStoryId) ?? null
    : null;

  return (
    <>
      <section className="w-full py-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {featureCards.map((card) => (
            <motion.div key={card.id} variants={cardVariants}>
              <motion.button
                onClick={() => setActiveStoryId(card.id)}
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className={`w-full text-left ${card.bgColor} ${card.borderColor} border-4 rounded-3xl p-5 h-[180px] relative overflow-hidden cursor-pointer`}
              >
                <h3 className="text-white font-bold text-lg md:text-xl leading-tight max-w-[60%] relative z-10">
                  {card.title}
                </h3>
                <div className="absolute right-0 bottom-0 w-[45%] h-full">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className={`object-contain ${card.imagePosition}`}
                  />
                </div>
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <AnimatePresence>
        {activeStory && (
          <StoryModal
            key={activeStory.id}
            story={activeStory}
            onClose={() => setActiveStoryId(null)}
            onPrev={() => {
              const idx = STORIES.findIndex((s) => s.id === activeStoryId);
              if (idx > 0) setActiveStoryId(STORIES[idx - 1].id);
            }}
            onNext={() => {
              const idx = STORIES.findIndex((s) => s.id === activeStoryId);
              if (idx < STORIES.length - 1) setActiveStoryId(STORIES[idx + 1].id);
            }}
            hasPrev={STORIES.findIndex((s) => s.id === activeStoryId) > 0}
            hasNext={STORIES.findIndex((s) => s.id === activeStoryId) < STORIES.length - 1}
          />
        )}
      </AnimatePresence>
    </>
  );
}
