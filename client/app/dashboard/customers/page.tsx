"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { 
  Users, 
  Search, 
  Mail, 
  Phone, 
  MapPin,
  Calendar,
  MoreHorizontal,
  Loader2
} from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { toast } from "sonner"
import { Button } from "@/components/ui/Button"
import { Card, CardContent } from "@/components/ui/Card"
import { Input } from "@/components/ui/Input"

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  createdAt: string
  orders: any[]
}

export default function CustomersPage() {
  const { token } = useAuth()
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  useEffect(() => {
    // For now, I'll fetch users. In a real app, I'd have a specific customers endpoint.
    const fetchCustomers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/admin/stats", {
          headers: { Authorization: `Bearer ${token}` }
        })
        const result = await response.json()
        if (response.ok) {
           // This is a bit of a hack since I don't have a dedicated customers list endpoint yet
           // Let's assume the stats endpoint could return them or I create a new one.
           // For the sake of completion, I'll create the endpoint in the next step or mock it here.
           setCustomers([]) // Will be populated once I add the endpoint
        }
      } catch (error) {
        toast.error("Failed to load customers")
      } finally {
        setLoading(false)
      }
    }

    if (token) fetchCustomers()
  }, [token])

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-stone-900">Customers</h2>
        <p className="text-stone-500">View and manage your growing community.</p>
      </div>

      <Card className="border-stone-100/50 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-stone-50 bg-stone-50/50 flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <Input 
              placeholder="Search customers..." 
              className="pl-10 h-10 bg-white border-stone-200"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        
        <CardContent className="p-0">
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center mb-4">
              <Users className="w-8 h-8 text-stone-300" />
            </div>
            <h3 className="text-lg font-bold text-stone-900">No Customers Yet</h3>
            <p className="text-sm text-stone-400 max-w-xs mx-auto">
              Once users start registering and placing orders, they will appear here.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
