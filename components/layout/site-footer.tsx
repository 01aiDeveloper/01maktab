'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Send, Instagram, Linkedin } from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '@/store/auth-store';

const guestLinks = [
  { label: 'Bosh Sahifa', href: '/' },
  { label: 'Skillar', href: '/catalog?tab=skills' },
  { label: 'Kurslar', href: '/catalog?tab=courses' },
  { label: 'Kasblar', href: '/catalog?tab=professions' },
];

const authLinks = [
  { label: 'Darsxona', href: '/classroom' },
  { label: 'Barcha Kurslar', href: '/catalog' },
  { label: 'Hamjamiyat', href: '/community' },
  { label: 'Market', href: '/market' },
];

const socialLinks = [
  {
    label: 'Telegram',
    href: 'https://t.me/mlc_uz',
    icon: <Send className="w-5 h-5" />,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/mlc_uz/',
    icon: <Instagram className="w-5 h-5" />,
  },
  {
    label: 'LinkedIn',
    href: 'https://uz.linkedin.com/company/mlc-uz',
    icon: <Linkedin className="w-5 h-5" />,
  },
];

interface SiteFooterProps {
  variant?: 'light' | 'dark';
}

export function SiteFooter({ variant = 'light' }: SiteFooterProps) {
  const [hoveredLogoIndex, setHoveredLogoIndex] = useState<number | null>(null);
  const { user } = useAuthStore();
  const footerLinks = user ? authLinks : guestLinks;

  const isDark = variant === 'dark';
  const bgColor = isDark ? 'bg-[#101010]' : 'bg-[#F4F4F6]';
  const logoTextColor = isDark ? 'text-white' : 'text-black';
  const borderColor = isDark ? 'border-white/20' : 'border-border/50';

  const linkStyle: React.CSSProperties = {
    fontFamily: 'Suisse Intl, sans-serif',
    fontWeight: 450,
    fontSize: '16px',
    lineHeight: '24px',
    letterSpacing: '-0.05em',
  };

  return (
    <footer className={`w-full ${bgColor} pt-8`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className={`pt-6 pb-8 border-b ${borderColor}`}
        >
          {/* Mobile: only social icons centered */}
          <div className="flex md:hidden items-center justify-center gap-3">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-black/5 text-foreground hover:bg-black/10'} transition-colors`}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={social.label}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>

          {/* Desktop (md+): single row — nav links | Maxfiylik siyosati (centered) | social icons */}
          <div className="hidden md:grid grid-cols-3 items-center">
            {/* Left: nav links */}
            <nav className="flex flex-wrap items-center gap-5 lg:gap-8">
              {footerLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <motion.div whileHover={{ scale: 1.05, x: 2 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href={link.href}
                      className={`${isDark ? 'text-white/70 hover:text-white' : 'text-muted-foreground hover:text-foreground'} transition-colors relative group`}
                      style={linkStyle}
                    >
                      {link.label}
                      <motion.span
                        className={`absolute bottom-0 left-0 w-0 h-0.5 ${isDark ? 'bg-white' : 'bg-foreground'} group-hover:w-full transition-all duration-300`}
                        initial={{ width: 0 }}
                        whileHover={{ width: '100%' }}
                      />
                    </Link>
                  </motion.div>
                </motion.div>
              ))}
            </nav>

            {/* Center: Maxfiylik siyosati */}
            <div className="flex justify-center">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/Maxfiylik_Siyosati_01AI_UZ.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${isDark ? 'text-white/70 hover:text-white' : 'text-muted-foreground hover:text-foreground'} transition-colors group`}
                    style={linkStyle}
                  >
                    Maxfiylik siyosati
                  </Link>
                </motion.div>
              </motion.div>
            </div>

            {/* Right: social icons */}
            <div className="flex items-center justify-end gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-black/5 text-foreground hover:bg-black/10'} transition-colors`}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Large logo text */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="pt-8 pb-6 md:pt-12 overflow-hidden w-full max-w-full"
        
      >
        <div className="flex items-end justify-center w-full px-[15px]">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            onHoverStart={() => setHoveredLogoIndex(3)}
            onHoverEnd={() => setHoveredLogoIndex(null)}
            className={`text-[clamp(3.75rem,25.5vw,39rem)] font-bold leading-[0.85] tracking-tighter ${logoTextColor} cursor-default relative whitespace-nowrap translate-y-[0.12em] -translate-x-[0.02em]`}
          >
            <motion.span
              animate={hoveredLogoIndex === 3 ? { y: [0, -8, 4, -4, 2, 0], rotate: [0, -5, 5, -3, 3, 0] } : {}}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              className="inline-block"
            >
              0
            </motion.span>
            <motion.span
              animate={hoveredLogoIndex === 3 ? { y: [0, -10, 5, -5, 3, 0], scale: [1, 1.1, 1, 1.05, 1, 1] } : {}}
              transition={{ duration: 0.6, ease: 'easeInOut', delay: 0.05 }}
              className="inline-block"
            >
              1
            </motion.span>
            <motion.span
              animate={hoveredLogoIndex === 3 ? { y: [0, -6, 3, -3, 1, 0], rotate: [0, 3, -3, 2, -2, 0] } : {}}
              transition={{ duration: 0.6, ease: 'easeInOut', delay: 0.1 }}
              className="inline-block"
            >
              A
            </motion.span>
            <motion.span
              animate={hoveredLogoIndex === 3 ? { y: [0, -7, 4, -4, 2, 0] } : {}}
              transition={{ duration: 0.6, ease: 'easeInOut', delay: 0.15 }}
              className="inline-block"
            >
              I
            </motion.span>
            <motion.span
              animate={hoveredLogoIndex === 3 ? { y: [0, -8, 4, -4, 2, 0], rotate: [0, -5, 5, -3, 3, 0] } : {}}
              transition={{ duration: 0.6, ease: 'easeInOut', delay: 0.2 }}
              className="inline-block"
            >
              0
            </motion.span>
            <motion.span
              animate={hoveredLogoIndex === 3 ? { y: [0, -10, 5, -5, 3, 0], scale: [1, 1.1, 1, 1.05, 1, 1] } : {}}
              transition={{ duration: 0.6, ease: 'easeInOut', delay: 0.25 }}
              className="inline-block"
            >
              1
            </motion.span>
            <motion.span
              animate={hoveredLogoIndex === 3 ? { y: [0, -6, 3, -3, 1, 0], rotate: [0, 3, -3, 2, -2, 0] } : {}}
              transition={{ duration: 0.6, ease: 'easeInOut', delay: 0.3 }}
              className="inline-block"
            >
              A
            </motion.span>
            <motion.span
              animate={hoveredLogoIndex === 3 ? { y: [0, -7, 4, -4, 2, 0] } : {}}
              transition={{ duration: 0.6, ease: 'easeInOut', delay: 0.35 }}
              className="inline-block"
            >
              I
            </motion.span>
          </motion.h2>
        </div>
      </motion.div>
    </footer>
  );
}