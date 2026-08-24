"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Settings, User, LogOut, Menu, X } from "lucide-react"
import { useTranslations } from "next-intl"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAuthStore } from "@/store/auth-store"
import { useMe } from "@/hooks/use-me"
import { LanguageSwitcher } from "@/components/language-switcher"
import { MenuFeaturedCard } from "@/components/shared/menu-featured-card"

interface CourseHeaderProps {
  variant?: 'light' | 'dark'
}

export function CourseHeader({ variant = 'dark' }: CourseHeaderProps) {
  const tNav = useTranslations("nav")
  const tCourse = useTranslations("courseHeader")
  const tUser = useTranslations("userMenu")
  const tCommon = useTranslations("common")
  const [isOpen, setIsOpen] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const { user, logout } = useAuthStore()
  useMe()

  const isDark = variant === 'dark'

  const defaultNavLinks = [
    { label: tNav("classroom"), href: "/classroom" },
    { label: tNav("catalog"), href: "/catalog" },
    { label: tNav("community"), href: "/community" },
    { label: tNav("market"), href: "/market" },
  ]

  const guestMainNavLinks = [
    { label: tNav("home"), href: "/" },
    { label: tCourse("skills"), href: "/catalog?tab=skills" },
    { label: tCourse("courses"), href: "/catalog?tab=courses" },
    { label: tCourse("professions"), href: "/catalog?tab=professions" },
  ]

  const activeNavLinks = user ? defaultNavLinks : guestMainNavLinks

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={` top-0 z-50 w-full py-4 bg-transparent`}
      // className={`sticky top-0 z-50 w-full ${isDark ? 'bg-[#101010]' : 'bg-transparent'}`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className={`relative flex h-14 items-center justify-between px-6 rounded-[40px] border ${isDark ? ' bg-[#F4F4F6] border-gray-200' : 'bg-[#1a1a1a] border-white/10'}`}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1">
            <span className={`font-bold text-xl tracking-tight ${!isDark ? 'text-white' : 'text-[#18181A]'}`}>
              01<span className="font-normal">AI</span>
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center gap-14">
            {activeNavLinks.map((link) => (
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden"
          >
            {isMobileOpen ? (
              <X className={`h-6 w-6 ${!isDark ? 'text-white' : 'text-[#18181A]'}`} />
            ) : (
              <Menu className={`h-6 w-6 ${!isDark ? 'text-white' : 'text-[#18181A]'}`} />
            )}
          </button>

          {/* Mobile Menu Dropdown */}
          <AnimatePresence>
            {isMobileOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="lg:hidden absolute top-full left-0 right-0 mt-2 bg-[#1a1a1a] rounded-xl border border-white/10 overflow-hidden z-50"
              >
                {activeNavLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="block px-6 py-3 text-white hover:bg-white/10 border-b border-white/5 text-sm font-medium"
                  >
                    {link.label}
                  </Link>
                ))}
                {!user && (
                  <Link
                    href="/login"
                    onClick={() => setIsMobileOpen(false)}
                    className="block px-6 py-3 text-white hover:bg-white/10 text-sm font-semibold"
                  >
                    {tCommon("login")}
                  </Link>
                )}
                <div className="px-4 pb-4 pt-2">
                  <MenuFeaturedCard onNavigate={() => setIsMobileOpen(false)} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Auth Section */}
          {user ? (
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
              <DropdownMenuTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center gap-2 rounded-full pl-1 pr-3 py-1 cursor-pointer ${
                    !isDark ? 'bg-white/10' : 'bg-white'
                  }`}
                >
                  <Avatar className="h-7 w-7">
                    <AvatarImage src={user?.photo || "/diverse-user-avatars.png"} />
                    <AvatarFallback className="bg-gray-200 text-xs">
                      {user?.firstname?.[0]?.toUpperCase() || "U"}
                      {user?.lastname?.[0]?.toUpperCase() || ""}
                    </AvatarFallback>
                  </Avatar>
                  <span className={`text-sm font-medium ${!isDark ? 'text-white' : 'text-gray-900'}`}>
                    {user?.firstname} {user?.lastname}
                  </span>
                  <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown className={`h-4 w-4 ${!isDark ? 'text-white/70' : 'text-gray-600'}`} />
                  </motion.div>
                </motion.button>
              </DropdownMenuTrigger>
              <AnimatePresence>
                {isOpen && (
                  <DropdownMenuContent align="end" className="w-48 p-2 rounded-xl shadow-lg border-0" asChild forceMount>
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <DropdownMenuItem asChild className="flex items-center gap-3 py-2.5 px-3 rounded-lg cursor-pointer">
                        <Link href="/profile">
                          <Settings className="h-4 w-4 text-gray-500" />
                          <span>{tCourse("settings")}</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className="flex items-center gap-3 py-2.5 px-3 rounded-lg cursor-pointer">
                        <Link href="/profile">
                          <User className="h-4 w-4 text-gray-500" />
                          <span>{tUser("profile")}</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          logout()
                          window.location.href = "/"
                        }}
                        className="flex items-center gap-3 py-2.5 px-3 rounded-lg cursor-pointer"
                      >
                        <LogOut className="h-4 w-4 text-gray-500" />
                        <span>{tUser("logout")}</span>
                      </DropdownMenuItem>
                    </motion.div>
                  </DropdownMenuContent>
                )}
              </AnimatePresence>
            </DropdownMenu>
          ) : (
            <Link href="/login" className="hidden lg:block">
              <Button
                className={`rounded-xl px-6 font-medium text-white border-0 ${
                  !isDark
                    ? 'bg-white text-black hover:bg-gray-100'
                    : 'hover:opacity-90 transition-opacity'
                }`}
                style={isDark ? {
                  background: 'linear-gradient(135deg, #2A51E6 0%, #4469F6 100%)'
                } : undefined}
              >
                {tCommon("login")}
              </Button>
            </Link>
          )}
          <LanguageSwitcher isDark={!isDark} />
        </div>
      </div>
    </motion.header>
  )
}
