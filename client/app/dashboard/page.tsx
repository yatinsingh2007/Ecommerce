"use client"

import React from "react"
import { useAuth } from "@/context/auth-context"
import { SellerDashboardOverview } from "@/components/dashboard/SellerDashboardOverview"
import { UserDashboardOverview } from "@/components/dashboard/UserDashboardOverview"
import { Loader2 } from "lucide-react"

export default function DashboardPage() {
  const { user, isLoading } = useAuth()

  if (isLoading || !user) {
    return (
      <div className="h-[calc(100vh-160px)] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-stone-300" />
      </div>
    )
  }

  if (user.role === "seller") {
    return <SellerDashboardOverview />
  }

  return <UserDashboardOverview />
}
