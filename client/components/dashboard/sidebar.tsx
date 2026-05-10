"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  LogOut, 
  Sofa,
  ChevronRight
} from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Overview", icon: LayoutDashboard, href: "/dashboard" },
  { name: "Products", icon: Package, href: "/dashboard/products" },
  { name: "Orders", icon: ShoppingCart, href: "/dashboard/orders" },
  { name: "Customers", icon: Users, href: "/dashboard/customers" },
]

export function Sidebar() {
  const pathname = usePathname()
  const { logout } = useAuth()

  return (
    <div className="flex flex-col h-screen w-64 bg-white border-r border-stone-100 fixed left-0 top-0 z-50">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="bg-[#1A1A1A] text-white p-2 rounded-xl transition-transform group-hover:rotate-12 duration-300">
            <Sofa className="w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight text-[#1A1A1A]">Wooniq</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.name} href={item.href}>
              <div
                className={cn(
                  "flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-300 group",
                  isActive 
                    ? "bg-[#1A1A1A] text-white shadow-lg shadow-black/5" 
                    : "text-stone-500 hover:bg-stone-50 hover:text-stone-900"
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={cn("w-5 h-5", isActive ? "text-white" : "group-hover:scale-110 transition-transform")} />
                  <span className="font-medium">{item.name}</span>
                </div>
                {isActive && (
                  <motion.div layoutId="active-indicator">
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  </motion.div>
                )}
              </div>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 mt-auto border-t border-stone-50 space-y-2">
        <button
          onClick={() => {}}
          className="flex items-center gap-3 w-full px-4 py-3 text-stone-500 hover:bg-stone-50 hover:text-stone-900 rounded-2xl transition-all"
        >
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </button>
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 rounded-2xl transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  )
}
