"use client"

import React from "react"
import { Bell, Search, ChevronDown } from "lucide-react"
import { useAuth } from "@/context/auth-context"

export function Topbar() {
  const { user } = useAuth()

  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-stone-100 sticky top-0 z-40 px-8 flex items-center justify-between gap-6">

      {/* Search */}
      <div className="flex items-center gap-3 bg-stone-50 px-4 py-2.5 rounded-xl w-80 border border-stone-100 focus-within:border-stone-300 focus-within:bg-white transition-all group">
        <Search className="w-4 h-4 text-stone-400 shrink-0" />
        <input
          type="text"
          placeholder="Search orders, products..."
          className="bg-transparent border-none outline-none text-sm w-full placeholder:text-stone-400 text-stone-700"
        />
        <kbd className="hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono font-bold text-stone-400 bg-white rounded border border-stone-200 shadow-sm shrink-0">
          ⌘K
        </kbd>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3 ml-auto">

        {/* Notification bell */}
        <button className="relative p-2 text-stone-400 hover:text-stone-900 hover:bg-stone-50 rounded-xl transition-all">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-primary rounded-full border-2 border-white" />
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-stone-100" />

        {/* User pill */}
        <button className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-brand-primary/15 border border-brand-primary/10 flex items-center justify-center text-brand-text font-black text-sm shrink-0">
            {user?.name?.charAt(0)?.toUpperCase() ?? "A"}
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-sm font-bold text-stone-900 leading-tight">{user?.name ?? "Admin"}</p>
            <p className="text-[10px] uppercase tracking-wider font-bold text-stone-400 leading-tight mt-0.5">
              {user?.role ?? "Seller"}
            </p>
          </div>
          <ChevronDown className="w-4 h-4 text-stone-300 group-hover:text-stone-500 transition-colors hidden sm:block" />
        </button>
      </div>
    </header>
  )
}
