'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Equal, X, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/auth-store';
import { useMe } from '@/hooks/use-me';
import { LanguageSwitcher } from '@/components/language-switcher';

interface MenuItem {
  label: string;
  href: string;
}

export function Header() {
  const tNav = useTranslations('nav');
  const tGuest = useTranslations('guestHeader');
  const tCommon = useTranslations('common');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const [currentTab, setCurrentTab] = useState<string | null>(null);
  const { user } = useAuthStore();
  useMe();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    setCurrentTab(params.get('tab'));
  }, [pathname]);

  const menuItems: MenuItem[] = [
    { label: tNav('home'), href: '/' },
    { label: tNav('classroom'), href: '/classroom' },
    { label: tNav('catalog'), href: '/catalog' },
    { label: tNav('community'), href: '/community' },
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
        <div className="relative flex items-center justify-between px-4 md:px-3 py-2 h-16">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:bg-white/10 cursor-pointer md:hover:bg-white rounded-xl px-2 md:px-3 h-10 flex items-center gap-2"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Equal className="w-6 h-6" strokeWidth={2.5} />}
              <span className="text-[16px] leading-5 font-medium">{tNav('menu')}</span>
            </Button>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 flex items-center">
            <span className="text-white font-semibold tracking-tight text-[30.57px] leading-none">01AI</span>
          </div>

          <div className="flex items-center gap-2">
            {user ? (
              <Link href="/profile" className="rounded-full bg-white p-0.5">
                <Avatar className="h-7 w-7">
                  <AvatarImage src={user?.photo || "/diverse-user-avatars.png"} />
                  <AvatarFallback className="bg-gray-100 text-xs font-semibold text-gray-900">
                    {user?.firstname?.[0]?.toUpperCase() || "U"}
                    {user?.lastname?.[0]?.toUpperCase() || ""}
                  </AvatarFallback>
                </Avatar>
              </Link>
            ) : (
              <Link href="/login">
                <Button className="bg-[#3b66f5] hover:bg-[#2d52d1] cursor-pointer text-white rounded-xl px-4 md:px-6 h-9 md:h-10 text-xs md:text-sm font-semibold shadow-lg">
                  {tCommon('login')}
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Dropdown Content */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="py-4 md:py-6 px-3 md:px-5 pt-4 flex flex-col gap-4 md:gap-6"
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

              {/* Til tanlash — menyu ichida */}
              <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                <span className="text-sm font-medium text-white/70">{tNav('language')}</span>
                <LanguageSwitcher isDark />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Tagline */}
      {!isMenuOpen && !scrolled && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-2 md:mt-4 text-center hidden md:block pointer-events-auto">
          <a
            href="https://mlcommunity.uz"
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
            {tGuest('tagline')}
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </motion.div>
      )}
    </header>
  );
}
