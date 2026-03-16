'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Send, Instagram, Linkedin, ArrowLeft, ArrowRight } from 'lucide-react';
import { useState } from 'react';

const footerLinks = [
  { label: 'Darsxona', href: '/' },
  { label: 'Barcha Kurslar', href: '/catalog' },
  { label: 'Hamjamiyat', href: '/community' },
  { label: 'Market', href: '#' },
];

const socialLinks = [
  {
    label: 'Telegram',
    href: 'https://t.me/01AI',
    icon: <Send className="w-5 h-5" />,
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/01AI',
    icon: <Instagram className="w-5 h-5" />,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/company/01AI',
    icon: <Linkedin className="w-5 h-5" />,
  },
];

interface SiteFooterProps {
  variant?: 'light' | 'dark';
}

export function SiteFooter({ variant = 'light' }: SiteFooterProps) {
  const [hoveredLogoIndex, setHoveredLogoIndex] = useState<number | null>(null);

  const isDark = variant === 'dark';
  const bgColor = isDark ? 'bg-[#101010]' : 'bg-[#F4F4F6]';
  const textColor = isDark ? 'text-[#FFFFFF]' : 'text-[#18181A]';
  const logoTextColor = isDark ? 'text-white' : 'text-black';
  const borderColor = isDark ? 'border-white/20' : 'border-border/50';

  return (
    <footer className={`w-full ${bgColor} pt-8`}>
      <div className="container mx-auto px-4">
        {/* Top section with links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className={`flex flex-col md:flex-row items-center justify-between gap-4 py-6 border-b ${borderColor}`}
        >
          {/* Navigation links */}
          <nav className="flex items-center gap-4 md:gap-6">
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
                    className={`text-sm ${isDark ? 'text-white/70 hover:text-white' : 'text-muted-foreground hover:text-foreground'} transition-colors relative group`}
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

          {/* Privacy Policy */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div whileHover={{ scale: 1.05, x: 4 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/privacy"
                className={`text-sm ${isDark ? 'text-white/70 hover:text-white' : 'text-muted-foreground hover:text-foreground'} transition-colors flex items-center gap-1 group`}
              >
                Privacy Policy
              </Link>
            </motion.div>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center gap-4"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${isDark ? 'text-[#18181A] hover:text-white' : 'text-muted-foreground hover:text-foreground'} transition-colors`}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                aria-label={social.label}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

      </div>

      {/* Large logo text — fills left, bottom, right */}
      <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="pt-8 md:pt-12 overflow-hidden w-full"
        >
          <div className="flex items-end justify-center w-full px-0">
              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                onHoverStart={() => setHoveredLogoIndex(3)}
                onHoverEnd={() => setHoveredLogoIndex(null)}
                className={`text-[clamp(4rem,26vw,40rem)] font-bold leading-[0.85] tracking-tighter ${logoTextColor} cursor-pointer relative whitespace-nowrap translate-y-[0.12em]`}
              >
                <motion.span
                  animate={
                    hoveredLogoIndex === 3
                      ? {
                          y: [0, -8, 4, -4, 2, 0],
                          rotate: [0, -5, 5, -3, 3, 0],
                        }
                      : {}
                  }
                  transition={{
                    duration: 0.6,
                    ease: 'easeInOut',
                  }}
                  className="inline-block"
                >
                  0
                </motion.span>
                <motion.span
                  animate={
                    hoveredLogoIndex === 3
                      ? {
                          y: [0, -10, 5, -5, 3, 0],
                          scale: [1, 1.1, 1, 1.05, 1, 1],
                        }
                      : {}
                  }
                  transition={{
                    duration: 0.6,
                    ease: 'easeInOut',
                    delay: 0.05,
                  }}
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
