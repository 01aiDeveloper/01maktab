"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Settings, User, LogOut, Menu, X } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/store/auth-store"
import { useMe } from "@/hooks/use-me"

const navLinks = [
  { label: "Darsxona", href: "/classroom" },
  { label: "Barcha Kurslar", href: "/catalog" },
  { label: "Hamjamiyat", href: "/community" },
  { label: "Market", href: "/market" },
]

interface SiteHeaderProps {
  variant?: 'light' | 'dark'
}

export function SiteHeader({ variant = 'dark' }: SiteHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)
  const { user, logout } = useAuthStore()
  useMe()

  const isDark = variant === 'dark'

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`relative z-50 w-full py-4 bg-transparent`}
      // className={`sticky top-0 z-50 w-full ${isDark ? 'bg-[#101010]' : 'bg-transparent'}`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className={`flex h-14 items-center justify-between px-6 rounded-[23px] border relative ${isDark ? ' bg-[#F4F4F6] border-gray-200' : 'bg-[#1a1a1a] border-white/10'}`}>
          {/* Mobile Menu Button - Left (lg:hidden) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden flex items-center gap-2"
          >
            {isMobileMenuOpen ? (
              <X className={`h-5 w-5 ${!isDark ? 'text-white' : 'text-[#18181A]'}`} />
            ) : (
              <Menu className={`h-5 w-5 ${!isDark ? 'text-white' : 'text-[#18181A]'}`} />
            )}
            <span className={`text-xs font-medium ${!isDark ? 'text-white' : 'text-[#18181A]'}`}>Menu</span>
          </button>

          {/* Mobile Menu Dropdown */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="lg:hidden absolute top-full left-0 right-0 mt-2 mx-4 bg-[#1a1a1a] rounded-xl border border-white/10 overflow-hidden z-50"
              >
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-6 py-3 text-white hover:bg-white/10 border-b border-white/5 last:border-b-0 text-sm font-medium"
                  >
                    {link.label}
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Logo - Left on Desktop, Center on Mobile */}
          <Link href="/" className="flex items-center gap-1 lg:static absolute left-1/2 lg:left-auto transform lg:transform-none -translate-x-1/2 lg:translate-x-0">
            <span className={`font-bold text-xl tracking-tight ${!isDark ? 'text-white' : 'text-[#18181A]'}`}>
              01<span className="font-normal">AI</span>
            </span>
          </Link>

          {/* Navigation - Hidden on mobile */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  !isDark
                    ? 'text-white/80 hover:text-white'
                    : 'text-[#18181A]/70 hover:text-[#18181A]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Auth Section - Right */}
          {user ? (
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                className={`flex items-center gap-2 rounded-xl pl-1 pr-3 py-1 cursor-pointer ${
                  isDark ? 'bg-white/10' : 'bg-white'
                }`}
              >
                <Avatar className="h-7 w-7">
                  <AvatarImage src={user?.photo || "/diverse-user-avatars.png"} />
                  <AvatarFallback className="bg-gray-200 text-xs">
                    {user?.firstname?.[0]?.toUpperCase() || "U"}
                    {user?.lastname?.[0]?.toUpperCase() || ""}
                  </AvatarFallback>
                </Avatar>
                <span className={`hidden lg:block text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {user?.firstname} {user?.lastname}
                </span>
                <motion.div animate={{ rotate: isUserDropdownOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className={`h-4 w-4 ${isDark ? 'text-white/70' : 'text-gray-600'}`} />
                </motion.div>
              </motion.button>
              <AnimatePresence>
                {isUserDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl border border-gray-200 overflow-hidden z-50 shadow-lg"
                  >
                    <Link
                      href="/profile"
                      onClick={() => setIsUserDropdownOpen(false)}
                      className="flex items-center gap-3 py-2.5 px-3 hover:bg-gray-100 border-b border-gray-100"
                    >
                      <Settings className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-900">Sozlash</span>
                    </Link>
                    <Link
                      href="/profile"
                      onClick={() => setIsUserDropdownOpen(false)}
                      className="flex items-center gap-3 py-2.5 px-3 hover:bg-gray-100 border-b border-gray-100"
                    >
                      <User className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-900">Profil</span>
                    </Link>
                    <button
                      onClick={() => {
                        logout()
                        window.location.href = "/"
                      }}
                      className="w-full flex items-center gap-3 py-2.5 px-3 hover:bg-gray-100 text-left"
                    >
                      <LogOut className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-900">Chiqish</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link href="/login" className="hidden lg:block">
              <Button
                className={`rounded-full px-6 font-medium border-0 ${
                  isDark
                    ? 'bg-white text-black hover:bg-gray-100'
                    : 'text-white hover:opacity-90 transition-opacity'
                }`}
                style={!isDark ? {
                  background: 'linear-gradient(135deg, #2A51E6 0%, #4469F6 100%)'
                } : undefined}
              >
                Kirish
              </Button>
            </Link>
          )}
        </div>
      </div>
    </motion.header>
  )
}
