'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

interface MenuItem {
  label: string;
  href: string;
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTab = searchParams?.get('tab');

  const menuItems: MenuItem[] = [
    { label: 'Bosh Sahifa', href: '/' },
    { label: 'Darsxona', href: '/classroom' },
    { label: 'Barcha kurslar', href: '/catalog' },
    { label: 'Hamjamiyat', href: '/community' },
  ];

  const isActiveItem = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href === '/catalog') return pathname === '/catalog' && !currentTab;
    return pathname === href || pathname?.startsWith(`${href}/`);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    const startY = window.scrollY;
    const onScroll = () => {
      if (Math.abs(window.scrollY - startY) > 8) setIsMenuOpen(false);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isMenuOpen]);

  return (
    <header className={`fixed left-[13px] right-[13px] md:left-1/2 md:right-auto md:-translate-x-1/2 z-50 w-auto md:w-144.5 pointer-events-none transition-all duration-300 ${scrolled ? "top-[10px] md:top-1.5" : "top-[10px] md:top-8.75"}`}>
      <motion.div
        layout
        initial={false}
        animate={{
          height: isMenuOpen ? 'auto' : '61.38px',
          width: '100%',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="bg-[#1a1a1a]/95 backdrop-blur-2xl rounded-[23px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] border border-white/10 overflow-hidden pointer-events-auto mx-auto"
      >
        {/* Header Top Bar */}
        <div className="flex items-center justify-between px-4 md:px-3 py-2 h-16">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:bg-white/10 cursor-pointer md:hover:bg-white rounded-xl px-2 md:px-3 h-10 flex items-center gap-1 md:gap-2"
            >
              {isMenuOpen ? <X className="w-5 h-5 md:w-4 md:h-4" /> : <Menu className="w-5 h-5 md:w-4 md:h-4" />}
              <span className="text-xs md:text-sm font-medium hidden sm:inline">Menu</span>
            </Button>
          </div>

          <div className="flex items-center">
            <span className="text-white font-bold tracking-tighter text-xl md:text-2xl">01AI</span>
          </div>

          <Link href="/login">
            <Button className="bg-[#3b66f5] hover:bg-[#2d52d1] cursor-pointer text-white rounded-xl px-4 md:px-6 h-9 md:h-10 text-xs md:text-sm font-semibold shadow-lg">
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
                {menuItems.map((item) => {
                  const active = isActiveItem(item.href);
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`text-lg md:text-xl lg:text-2xl font-bold transition-colors text-left w-fit ${
                        active
                          ? 'text-white/60 underline underline-offset-[6px] decoration-white/60'
                          : 'text-white hover:text-[#3b66f5]'
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
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
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-2 md:mt-4 text-center hidden md:block pointer-events-auto">
          <a
            href="https://t.me/mlc_uz"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1 underline hover:text-white/60 transition-colors cursor-pointer"
            style={{
              fontFamily: "'Suisse Intl', sans-serif",
              fontWeight: 450,
              fontSize: '16px',
              lineHeight: '16px',
              letterSpacing: '0%',
              color: "#FFFFFF"
            }}
          >
            ML COMMUNITY Uzbekistan ekspertlari tomonidan yartilgan
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </motion.div>
      )}
    </header>
  );
}
