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
  ChevronRight,
} from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { cn } from "@/lib/utils"

type NavItem = {
  name: string
  icon: React.ElementType
  href: string
  badge?: string
}

const sellerNavItems: NavItem[] = [
  { name: "Overview", icon: LayoutDashboard, href: "/dashboard" },
  { name: "Products", icon: Package, href: "/dashboard/products" },
  { name: "Orders", icon: ShoppingCart, href: "/dashboard/orders", badge: "3" },
  { name: "Customers", icon: Users, href: "/dashboard/customers" },
]

const userNavItems: NavItem[] = [
  { name: "My Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { name: "My Orders", icon: Package, href: "/dashboard/orders" },
  { name: "Wishlist", icon: ShoppingCart, href: "/dashboard/wishlist" },
]

export function Sidebar() {
  const pathname = usePathname()
  const { logout, user } = useAuth()

  return (
    <div className="flex flex-col h-screen w-64 bg-white border-r border-stone-100 fixed left-0 top-0 z-50">

      {/* Logo */}
      <div className="px-6 py-5 border-b border-stone-50">
        <Link href="/" className="flex items-center gap-3 group w-fit">
          <div className="bg-brand-text text-white p-2 rounded-xl transition-transform group-hover:rotate-12 duration-300 shrink-0">
            <Sofa className="w-5 h-5" />
          </div>
          <div>
            <p className="text-base font-black tracking-tight text-brand-text leading-tight">Wooniq</p>
            <p className="text-[10px] text-stone-400 font-semibold uppercase tracking-wider leading-tight">
              {user?.role === "seller" ? "Seller Hub" : "User Hub"}
            </p>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-5 space-y-0.5 overflow-y-auto">
        <p className="px-3 text-[10px] font-black uppercase tracking-widest text-stone-400 mb-3">Menu</p>
        {((user?.role === "seller" ? sellerNavItems : userNavItems)).map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.name} href={item.href}>
              <motion.div
                whileHover={isActive ? {} : { x: 2 }}
                className={cn(
                  "flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-150 group",
                  isActive
                    ? "bg-brand-text text-white shadow-lg shadow-black/10"
                    : "text-stone-500 hover:bg-stone-50 hover:text-stone-900"
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon
                    className={cn(
                      "w-5 h-5 shrink-0",
                      isActive ? "text-white" : "group-hover:text-stone-700 transition-colors"
                    )}
                  />
                  <span className="text-sm font-semibold">{item.name}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {item.badge && !isActive && (
                    <span className="bg-brand-primary text-brand-text text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shrink-0">
                      {item.badge}
                    </span>
                  )}
                  {isActive && <ChevronRight className="w-3.5 h-3.5 opacity-40" />}
                </div>
              </motion.div>
            </Link>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 pb-4 pt-3 border-t border-stone-50 space-y-1">
        <button className="flex items-center gap-3 w-full px-4 py-3 text-stone-500 hover:bg-stone-50 hover:text-stone-900 rounded-2xl transition-all group">
          <Settings className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
          <span className="text-sm font-semibold">Settings</span>
        </button>

        {/* User card */}
        <div className="mt-2 p-3 bg-stone-50 rounded-2xl border border-stone-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-brand-primary/20 border border-brand-primary/10 flex items-center justify-center text-brand-text font-black text-sm shrink-0">
              {user?.name?.charAt(0)?.toUpperCase() ?? "A"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-stone-900 truncate leading-tight">{user?.name ?? "Admin"}</p>
              <p className="text-[10px] text-stone-400 font-semibold uppercase tracking-wider leading-tight mt-0.5">
                {user?.role ?? "Seller"}
              </p>
            </div>
            <button
              onClick={logout}
              title="Logout"
              className="p-1.5 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all shrink-0"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
