'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface FeatureCard {
  id: number;
  title: string;
  bgColor: string;
  borderColor: string;
  image: string;
  href: string;
}

const featureCards: FeatureCard[] = [
  {
    id: 1,
    title: "No'l bir maktab bu nima?",
    bgColor: 'bg-[#ff6b35]',
    borderColor: 'border-[#ff8c5a]',
    image: '/images/hero-info-image1.png',
    href: '/about',
  },
  {
    id: 2,
    title: "Hamjimiyatga qanday a'zo bo'laman",
    bgColor: 'bg-[#3b82f6]',
    borderColor: 'border-[#60a5fa]',
    image: '/images/hero-info-image2.png',
    href: '/community',
  },
  {
    id: 3,
    title: 'Kasb bu nima?',
    bgColor: 'bg-[#84cc16]',
    borderColor: 'border-[#a3e635]',
    image: '/images/hero-info-image3.png',
    href: '/careers',
  },
  {
    id: 4,
    title: 'Skillar nima uchun kerak?',
    bgColor: 'bg-[#a855f7]',
    borderColor: 'border-[#c084fc]',
    image: '/images/hero-info-image4.png',
    href: '/skills',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export function FeatureCards() {
  return (
    <section className="w-full py-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {featureCards.map((card) => (
          <motion.div key={card.id} variants={cardVariants}>
            <Link href={card.href} className="block group">
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className={`${card.bgColor} ${card.borderColor} border-4 rounded-3xl p-5 h-[180px] relative overflow-hidden cursor-pointer`}
              >
                {/* Text Content */}
                <h3 className="text-white font-bold text-lg md:text-xl leading-tight max-w-[60%] relative z-10">{card.title}</h3>

                {/* Image */}
                <div className="absolute right-0 bottom-0 w-[45%] h-full">
                  <Image src={card.image || '/placeholder.svg'} alt={card.title} fill className="object-contain object-right-bottom" />
                </div>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
