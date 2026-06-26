"use client"

import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-brand-bg">
        <div className="w-10 h-10 border-4 border-stone-200 border-t-brand-text rounded-full animate-spin" />
      </div>
    )
  }

  if (!user) return null

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}
