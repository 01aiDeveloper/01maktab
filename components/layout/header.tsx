'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuItems = ['Bosh Sahifa', 'Skillar', 'Kurslar', 'Kasblar'];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed top-0 md:top-[35px] left-0 md:left-1/2 md:-translate-x-1/2 z-50 w-full md:w-[578px] pointer-events-none">
      <motion.div
        layout
        initial={false}
        animate={{
          height: isMenuOpen ? 'auto' : '61.38px',
          width: '100%',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="bg-[#1a1a1a]/95 backdrop-blur-2xl rounded-none md:rounded-[23px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] border-0 md:border border-white/10 overflow-hidden pointer-events-auto mx-auto"
      >
        {/* Header Top Bar */}
        <div className="flex items-center justify-between px-4 md:px-3 py-2 h-16">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:bg-white/10 md:hover:bg-white rounded-xl px-2 md:px-3 h-10 flex items-center gap-1 md:gap-2"
            >
              {isMenuOpen ? <X className="w-5 h-5 md:w-4 md:h-4" /> : <Menu className="w-5 h-5 md:w-4 md:h-4" />}
              <span className="text-xs md:text-sm font-medium hidden sm:inline">Menu</span>
            </Button>
          </div>

          <div className="flex items-center">
            <span className="text-white font-bold tracking-tighter text-xl md:text-2xl">01AI</span>
          </div>

          <Link href="/login">
            <Button className="bg-[#3b66f5] hover:bg-[#2d52d1] text-white rounded-xl px-4 md:px-6 h-9 md:h-10 text-xs md:text-sm font-semibold shadow-lg">
              Kirish
            </Button>
          </Link>
        </div>

        {/* Dropdown Content */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="py-4 md:py-6 px-3 md:px-5 pt-4 grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-6 md:gap-12 items-center"
            >
              {/* Links */}
              <div className="flex flex-col gap-4 md:gap-6">
                {menuItems.map((item, idx) => (
                  <motion.a
                    key={item}
                    href="#"
                    className="text-white hover:text-[#3b66f5] text-lg md:text-xl lg:text-2xl font-bold transition-colors"
                  >
                    {item}
                  </motion.a>
                ))}
              </div>

              {/* Promo Card */}
              <motion.div className="relative bg-white rounded-[24px] md:rounded-[32px] overflow-hidden group aspect-[4/3] md:aspect-auto md:h-[280px]">
                <div className="absolute inset-0 p-4 flex flex-col justify-center z-10">
                  <h3 className="text-[#141414] text-xl md:text-2xl lg:text-3xl font-black leading-tight max-w-[180px]">ML Engineer Kasbi</h3>
                </div>

                <div className="absolute left-0 top-0 inset-0 p-0 bg-[#f8f9fa]">
                  <Image src="/images/hero3.webp" alt="ML Engineer Promo" fill className="object-cover object-center " />
                </div>

                <div className="absolute bottom-4 md:bottom-6 right-4 md:right-6 w-10 h-10 md:w-12 md:h-12 bg-black/5 backdrop-blur-md rounded-full flex items-center justify-center border border-black/10 group-hover:bg-[#141414] group-hover:text-white transition-all duration-300">
                  <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6" />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Tagline */}
      {!isMenuOpen && !scrolled && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-2 md:mt-4 text-center hidden md:block">
          <p
            className="flex items-center justify-center gap-1 text-white/40 underline"
            style={{
              fontFamily: "'Suisse Intl', sans-serif",
              fontWeight: 450,
              fontSize: '16px',
              lineHeight: '16px',
              letterSpacing: '0%',
            }}
          >
            ML COMMUNITY Uzbekistan ekspertlari tomonidan yartilgan
            <ArrowUpRight className="w-3.5 h-3.5" />
          </p>
        </motion.div>
      )}
    </header>
  );
}
