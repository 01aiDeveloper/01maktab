"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTranslations } from "next-intl"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, User, LogOut, Menu, X, Info, Trophy, Award, CreditCard, Monitor } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/common/use-auth"
import { useMe } from "@/hooks/queries/use-me"
import { LanguageSwitcher } from "@/components/language-switcher"
import { NotificationPanel } from "@/components/shared/notification-panel"
import { MenuFeaturedCard } from "@/components/shared/menu-featured-card"

function VibecoinBadge({ amount, isDark }: { amount: number; isDark: boolean }) {
  const formatted = new Intl.NumberFormat("ru-RU").format(amount)
  return (
    <div
      className={`hidden sm:flex items-center gap-2 rounded-xl px-3 h-9 ${
        isDark ? "bg-white/5" : "bg-black/5"
      }`}
    >
      <span className={`text-sm font-semibold tabular-nums ${isDark ? "text-white" : "text-[#18181A]"}`}>
        {formatted}
      </span>
      <span
        className="flex items-center justify-center w-5 h-5 rounded-md text-white text-[10px] font-black"
        style={{ background: "linear-gradient(135deg, #4469F6 0%, #2A51E6 100%)" }}
        aria-label="Vibecoin"
      >
        V
      </span>
    </div>
  )
}

interface SiteHeaderProps {
  variant?: 'light' | 'dark'
}

export function SiteHeader({ variant = 'dark' }: SiteHeaderProps) {
  const tNav = useTranslations("nav")
  const tUser = useTranslations("userMenu")
  const tCommon = useTranslations("common")

  const navLinks = [
    { label: tNav("classroom"), href: "/classroom" },
    { label: tNav("catalog"), href: "/catalog" },
    { label: tNav("community"), href: "/community" },
    { label: tNav("market"), href: "/market" },
  ]

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)
  const { user, logout } = useAuth()
  useMe()
  const pathname = usePathname()

  const isDark = variant === 'dark'
  const showVibecoin = !!user && (pathname?.startsWith('/profile') || pathname === '/catalog')
  const coins = user?.coins ?? 0

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`sticky top-0 z-50 w-full py-4 bg-transparent`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className={`flex h-14 items-center justify-between gap-3 px-3 sm:px-6 rounded-[23px] border relative ${isDark ? ' bg-[#F4F4F6] border-gray-200' : 'bg-[#1a1a1a] border-white/10'}`}>
          {/* Mobile Menu Button - Left (lg:hidden) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden flex items-center gap-2 shrink-0"
          >
            {isMobileMenuOpen ? (
              <X className={`h-5 w-5 ${!isDark ? 'text-white' : 'text-[#18181A]'}`} />
            ) : (
              <Menu className={`h-5 w-5 ${!isDark ? 'text-white' : 'text-[#18181A]'}`} />
            )}
            <span className={`hidden sm:inline text-xs font-medium ${!isDark ? 'text-white' : 'text-[#18181A]'}`}>{tNav("menu")}</span>
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
                    className="block px-6 py-3 text-white hover:bg-white/10 border-b border-white/5 text-sm font-medium"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="px-6 py-3 flex items-center justify-between">
                  <span className="text-sm font-medium text-white/70">{tNav("language")}</span>
                  <LanguageSwitcher isDark />
                </div>
                <div className="px-4 pb-4 pt-1">
                  <MenuFeaturedCard onNavigate={() => setIsMobileMenuOpen(false)} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Logo - Left on Desktop, Center on Mobile */}
          <Link href="/" className="flex items-center gap-1 shrink-0">
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
          <div className="flex items-center gap-2 shrink-0">
            <span className="hidden lg:block">
              <LanguageSwitcher isDark={!isDark} />
            </span>
            {user && <NotificationPanel isDark={!isDark} />}
            {user ? (
              <div className="flex items-center gap-2 relative">
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
                        <User className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-900">{tUser("profile")}</span>
                      </Link>
                      <Link
                        href="/profile?tab=info"
                        onClick={() => setIsUserDropdownOpen(false)}
                        className="flex items-center gap-3 py-2.5 px-3 hover:bg-gray-100 border-b border-gray-100"
                      >
                        <Info className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-900">{tUser("info")}</span>
                      </Link>
                      <Link
                        href="/profile?tab=achievements"
                        onClick={() => setIsUserDropdownOpen(false)}
                        className="flex items-center gap-3 py-2.5 px-3 hover:bg-gray-100 border-b border-gray-100"
                      >
                        <Trophy className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-900">{tUser("achievements")}</span>
                      </Link>
                      <Link
                        href="/profile?tab=certificates"
                        onClick={() => setIsUserDropdownOpen(false)}
                        className="flex items-center gap-3 py-2.5 px-3 hover:bg-gray-100 border-b border-gray-100"
                      >
                        <Award className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-900">{tUser("certificates")}</span>
                      </Link>
                      <Link
                        href="/profile?tab=payments"
                        onClick={() => setIsUserDropdownOpen(false)}
                        className="flex items-center gap-3 py-2.5 px-3 hover:bg-gray-100 border-b border-gray-100"
                      >
                        <CreditCard className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-900">{tUser("payments")}</span>
                      </Link>
                      <div
                        className="flex items-center gap-3 py-2.5 px-3 border-b border-gray-100 cursor-default opacity-50"
                      >
                        <Monitor className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-400">{tUser("devices")} –</span>
                      </div>
                      <button
                        onClick={() => {
                          logout()
                          window.location.href = "/"
                        }}
                        className="w-full flex items-center gap-3 py-2.5 px-3 hover:bg-gray-100 text-left"
                      >
                        <LogOut className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-900">{tUser("logout")}</span>
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
                  {tCommon("login")}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  )
}
