"use client"

import React from "react"
import { Bell, Search, User } from "lucide-react"
import { useAuth } from "@/context/auth-context"

export function Topbar() {
  const { user } = useAuth()

  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-stone-100 sticky top-0 z-40 px-8 flex items-center justify-between">
      <div className="flex items-center gap-4 bg-stone-50 px-4 py-2 rounded-2xl w-96 border border-stone-100/50">
        <Search className="w-4 h-4 text-stone-400" />
        <input 
          type="text" 
          placeholder="Search for orders, products..." 
          className="bg-transparent border-none outline-none text-sm w-full placeholder:text-stone-400 text-stone-700"
        />
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 text-stone-400 hover:text-stone-900 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-brand-primary rounded-full border-2 border-white" />
        </button>

        <div className="flex items-center gap-3 pl-6 border-l border-stone-100">
          <div className="text-right">
            <p className="text-sm font-bold text-stone-900">{user?.name || "Admin"}</p>
            <p className="text-[10px] uppercase tracking-wider font-bold text-stone-400">{user?.role || "Seller"}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-stone-500 border border-stone-200">
            <User className="w-6 h-6" />
          </div>
        </div>
      </div>
    </header>
  )
}
