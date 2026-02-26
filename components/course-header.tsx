"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Settings, User, LogOut, Menu, X } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAuthStore } from "@/store/auth-store"
import { useMe } from "@/hooks/use-me"

const defaultNavLinks = [
  { label: "Darsxona", href: "/" },
  { label: "Barcha Kurslar", href: "/catalog" },
  { label: "Hamjamiyat", href: "/community" },
  { label: "Market", href: "#" },
]

interface NavLink {
  label: string
  href: string
}

interface CourseHeaderProps {
  variant?: 'light' | 'dark'
  guestNavLinks?: NavLink[]
}

export function CourseHeader({ variant = 'dark', guestNavLinks }: CourseHeaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuthStore()
  useMe()

  const isDark = variant === 'dark'
  const activeNavLinks = !user && guestNavLinks ? guestNavLinks : defaultNavLinks

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={` top-0 z-50 w-full py-4 bg-transparent`}
      // className={`sticky top-0 z-50 w-full ${isDark ? 'bg-[#101010]' : 'bg-transparent'}`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className={`flex h-14 items-center justify-between px-6 rounded-full border ${isDark ? ' bg-[#F4F4F6] border-gray-200' : 'bg-[#1a1a1a] border-white/10'}`}>
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
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden"
          >
            {isOpen ? (
              <X className={`h-6 w-6 ${!isDark ? 'text-white' : 'text-[#18181A]'}`} />
            ) : (
              <Menu className={`h-6 w-6 ${!isDark ? 'text-white' : 'text-[#18181A]'}`} />
            )}
          </button>

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
                    <AvatarImage src={user?.avatar || "/diverse-user-avatars.png"} />
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
                          <span>Sozlash</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className="flex items-center gap-3 py-2.5 px-3 rounded-lg cursor-pointer">
                        <Link href="/profile">
                          <User className="h-4 w-4 text-gray-500" />
                          <span>Profil</span>
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
                        <span>Chiqish</span>
                      </DropdownMenuItem>
                    </motion.div>
                  </DropdownMenuContent>
                )}
              </AnimatePresence>
            </DropdownMenu>
          ) : (
            <Link href="/login" className="hidden lg:block">
              <Button
                className={`rounded-full px-6 font-medium ${
                  isDark
                    ? 'bg-white text-black hover:bg-gray-100'
                    : 'bg-[#5d7bf5] text-white hover:bg-[#4c6ae4]'
                }`}
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
