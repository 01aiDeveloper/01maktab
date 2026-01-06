"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Settings, User, LogOut } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const navLinks = [
  { label: "Darsxona", href: "/darsxona" },
  { label: "Barcha Kurslar", href: "/kurslar" },
  { label: "Hamjamiyat", href: "/hamjamiyat" },
  { label: "Market", href: "/market" },
]

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full bg-[#1a1a1a] rounded-b-2xl"
    >
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 md:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1">
          <span className="text-white font-bold text-xl tracking-tight">
            <span className="text-white">01</span>
            <span className="text-white font-normal">MAKTAB</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white/90 hover:text-white text-sm font-medium transition-colors underline underline-offset-4 decoration-white/50"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* User Dropdown */}
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 bg-white rounded-full pl-1 pr-3 py-1 cursor-pointer"
            >
              <Avatar className="h-7 w-7">
                <AvatarImage src="/diverse-user-avatars.png" />
                <AvatarFallback className="bg-gray-200 text-xs">AG</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-gray-900">Aziz Gafurov</span>
              <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown className="h-4 w-4 text-gray-600" />
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
                  <DropdownMenuItem className="flex items-center gap-3 py-2.5 px-3 rounded-lg cursor-pointer">
                    <Settings className="h-4 w-4 text-gray-500" />
                    <span>Sozlash</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-3 py-2.5 px-3 rounded-lg cursor-pointer">
                    <User className="h-4 w-4 text-gray-500" />
                    <span>Profil</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-3 py-2.5 px-3 rounded-lg cursor-pointer">
                    <LogOut className="h-4 w-4 text-gray-500" />
                    <span>Chiqish</span>
                  </DropdownMenuItem>
                </motion.div>
              </DropdownMenuContent>
            )}
          </AnimatePresence>
        </DropdownMenu>
      </div>
    </motion.header>
  )
}
