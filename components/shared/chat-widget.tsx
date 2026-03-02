'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export function ChatWidget() {
  return (
    <motion.div
      animate={{
        scale: 1,
        opacity: 1,
      }}
      transition={{
        duration: 1.5,
        times: [0, 0.4, 0.6, 0.8, 1],
        ease: 'easeOut',
        delay: 0.8,
      }}
      className="fixed  right-10 bottom-10 z-60"
    >
      <div className="relative">
        {[1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute inset-0 bg-[#3b66f5]/40 rounded-[24px]"
            animate={{
              scale: [1, 2.2],
              opacity: [0.6, 0],
            }}
            transition={{
              duration: 2,
              repeat: 2, // Plays 2 times as requested
              delay: 2.3 + i * 0.4, // Starts after the bounce
              ease: 'easeOut',
            }}
          />
        ))}
        <button className="relative cursor-pointer bg-[#3b66f5] text-white w-16 h-16 rounded-[24px] shadow-2xl flex items-center justify-center hover:bg-[#2d52d1] hover:scale-110 active:scale-95 transition-all group">
          <Image src="/icons/chat.svg" alt="chat" width={30} height={30} unoptimized className="group-hover:rotate-12 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}
