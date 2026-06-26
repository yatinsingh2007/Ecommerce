"use client"

import * as React from "react"
import Link from "next/link"
import { ChevronDown, Sofa, ShoppingCart, Menu, X, Store, LogOut, LayoutDashboard } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/Button"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "@/context/auth-context"

const guestNavLinks = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/products", hasDropdown: false },
  { name: "Collections", href: "#" },
  { name: "About", href: "#" },
]

const userNavLinks = [
  { name: "Products", href: "/products", hasDropdown: false },
  { name: "Collections", href: "#", hasDropdown: false },
  { name: "About", href: "#", hasDropdown: false },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const { user, logout } = useAuth()

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = user ? userNavLinks : guestNavLinks
  const initial = user?.name?.charAt(0)?.toUpperCase() ?? ""

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 lg:px-12",
        isScrolled
          ? "py-3 bg-brand-bg/90 backdrop-blur-xl shadow-[0_1px_0_0_rgba(0,0,0,0.06)]"
          : "py-5 bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">

        {/* Logo */}
        <Link href={user ? "/products" : "/"} className="flex items-center gap-2.5 group shrink-0">
          <motion.div
            whileHover={{ rotate: 15 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-brand-text text-brand-bg p-2 rounded-xl"
          >
            <Sofa className="w-5 h-5" />
          </motion.div>
          <span className="text-xl font-bold tracking-tight text-brand-text">Wooniq</span>
        </Link>

        {/* Center pill nav */}
        <nav className="hidden md:flex items-center gap-1 bg-white/70 backdrop-blur-md border border-stone-100 rounded-full px-2 py-2 shadow-sm">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-stone-500 hover:text-brand-text px-4 py-1.5 rounded-full hover:bg-stone-50 flex items-center gap-1 transition-all"
            >
              {link.name}
              {link.hasDropdown && <ChevronDown className="w-3.5 h-3.5 opacity-50" />}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3 shrink-0">

          {user ? (
            <>
              {/* Cart */}
              <button className="relative p-2 text-stone-500 hover:text-brand-text transition-colors rounded-full hover:bg-stone-100">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-primary rounded-full" />
              </button>

              {/* Sell on Wooniq — only for regular users */}
              {user.role === "user" && (
                <Link
                  href="/seller-login"
                  className="hidden md:flex items-center gap-1.5 text-sm font-semibold text-brand-text hover:text-brand-primary transition-colors"
                >
                  <Store className="w-4 h-4" />
                  Sell on Wooniq
                </Link>
              )}

              {/* Seller: dashboard shortcut */}
              {user.role === "seller" && (
                <Link
                  href="/dashboard"
                  className="hidden md:flex items-center gap-1.5 text-sm font-semibold text-brand-text hover:text-brand-primary transition-colors"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
              )}

              {/* User avatar + logout */}
              <div className="hidden md:flex items-center gap-2 pl-1 border-l border-stone-200 ml-1">
                <div className="w-8 h-8 rounded-xl bg-brand-primary/20 border border-brand-primary/10 flex items-center justify-center text-brand-text font-black text-sm shrink-0">
                  {initial}
                </div>
                <span className="text-sm font-semibold text-brand-text max-w-[100px] truncate">{user.name.split(" ")[0]}</span>
                <button
                  onClick={logout}
                  title="Logout"
                  className="p-1.5 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Cart for guests */}
              <button className="relative p-2 text-stone-500 hover:text-brand-text transition-colors rounded-full hover:bg-stone-100">
                <ShoppingCart className="w-5 h-5" />
              </button>

              {/* Sell CTA for guests */}
              <Link
                href="/seller-login"
                className="hidden md:flex items-center gap-1.5 text-sm font-semibold text-brand-text hover:text-brand-primary transition-colors"
              >
                <Store className="w-4 h-4" />
                Sell
              </Link>

              <Link
                href="/login"
                className="hidden md:block text-sm font-semibold text-brand-text hover:text-brand-primary transition-colors"
              >
                Login
              </Link>
              <Link href="/signup">
                <Button
                  size="sm"
                  className="bg-brand-text text-brand-bg hover:bg-brand-primary hover:text-brand-text transition-all rounded-full px-5 font-bold"
                >
                  Get Started
                </Button>
              </Link>
            </>
          )}

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-stone-500 hover:text-brand-text transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 right-0 bg-brand-bg/95 backdrop-blur-xl border-b border-stone-100 py-4 px-6 space-y-1"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between py-3 px-2 text-sm font-semibold text-stone-600 hover:text-brand-text transition-colors border-b border-stone-50 last:border-0"
              >
                {link.name}
              </Link>
            ))}

            {user ? (
              <div className="pt-3 space-y-2">
                <Link href="/seller-login" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" className="w-full rounded-full font-semibold border-stone-200 gap-2">
                    <Store className="w-4 h-4" /> Sell on Wooniq
                  </Button>
                </Link>
                <Button
                  onClick={() => { logout(); setMobileOpen(false) }}
                  className="w-full rounded-full font-bold bg-brand-text text-white gap-2"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </Button>
              </div>
            ) : (
              <div className="pt-3 flex gap-3">
                <Link href="/login" className="flex-1" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" className="w-full rounded-full font-semibold border-stone-200">Login</Button>
                </Link>
                <Link href="/signup" className="flex-1" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full rounded-full font-bold bg-brand-text text-white">Sign Up</Button>
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
