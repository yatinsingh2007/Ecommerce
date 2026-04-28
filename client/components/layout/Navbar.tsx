"use client"

import * as React from "react"
import Link from "next/link"
import { Search, ShoppingCart, User, ChevronDown, Sofa } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/Button"

const navLinks = [
  { name: "Home", href: "#" },
  { name: "Shop", href: "#", hasDropdown: true },
  { name: "Collections", href: "#" },
  { name: "About", href: "#" },
  { name: "Contact", href: "#" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 lg:px-12",
        isScrolled ? "bg-brand-bg/80 backdrop-blur-md shadow-sm py-3" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-brand-text text-brand-bg p-2 rounded-lg group-hover:bg-brand-primary transition-colors">
            <Sofa className="w-6 h-6" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-brand-text">Wooniq</span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-brand-text/80 hover:text-brand-text flex items-center gap-1 transition-colors"
            >
              {link.name}
              {link.hasDropdown && <ChevronDown className="w-4 h-4 opacity-50" />}
            </Link>
          ))}
        </nav>

        {/* Action Icons */}
        <div className="flex items-center gap-4 lg:gap-6">
          <button className="p-2 hover:bg-brand-text/5 rounded-full transition-colors">
            <Search className="w-5 h-5 text-brand-text" />
          </button>
          <button className="p-2 hover:bg-brand-text/5 rounded-full transition-colors relative">
            <ShoppingCart className="w-5 h-5 text-brand-text" />
            <span className="absolute top-0 right-0 bg-brand-primary text-brand-text text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-brand-bg">
              02
            </span>
          </button>
          <Link href="/login" className="p-2 hover:bg-brand-text/5 rounded-full transition-colors">
            <User className="w-5 h-5 text-brand-text" />
          </Link>
        </div>
      </div>
    </header>
  )
}
