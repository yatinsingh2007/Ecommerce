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
  address: string
  orderCount: number
}

export default function CustomersPage() {
  const { token } = useAuth()
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/admin/customers", {
          headers: { Authorization: `Bearer ${token}` }
        })
        const result = await response.json()
        if (response.ok) {
           setCustomers(result.customers || [])
        }
      } catch (error) {
        toast.error("Failed to load customers")
      } finally {
        setLoading(false)
      }
    }

    if (token) fetchCustomers()
  }, [token])

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-stone-900">Customers</h2>
          <p className="text-stone-500">View and manage your growing community.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-stone-50 rounded-lg border border-stone-100">
          <Users className="w-4 h-4 text-stone-500" />
          <span className="text-sm font-medium text-stone-900">{customers.length} Total</span>
        </div>
      </div>

      <Card className="border-stone-100/50 shadow-sm overflow-hidden bg-white">
        <div className="p-4 border-b border-stone-50 bg-stone-50/50 flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <Input 
              placeholder="Search customers..." 
              className="pl-10 h-10 bg-white border-stone-200 focus-visible:ring-stone-400"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-stone-300 animate-spin" />
            </div>
          ) : filteredCustomers.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-stone-50 bg-stone-50/30">
                    <th className="px-6 py-4 text-xs font-semibold text-stone-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-4 text-xs font-semibold text-stone-500 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-4 text-xs font-semibold text-stone-500 uppercase tracking-wider">Join Date</th>
                    <th className="px-6 py-4 text-xs font-semibold text-stone-500 uppercase tracking-wider">Orders</th>
                    <th className="px-6 py-4 text-xs font-semibold text-stone-500 uppercase tracking-wider">Address</th>
                    <th className="px-6 py-4 text-xs font-semibold text-stone-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-50">
                  {filteredCustomers.map((customer) => (
                    <motion.tr 
                      key={customer.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-stone-50/50 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 font-medium">
                            {customer.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium text-stone-900">{customer.name}</div>
                            <div className="text-xs text-stone-400">ID: {customer.id.slice(0, 8)}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-stone-600">
                            <Mail className="w-3 h-3" />
                            {customer.email}
                          </div>
                          {customer.phone && (
                            <div className="flex items-center gap-2 text-xs text-stone-400">
                              <Phone className="w-3 h-3" />
                              {customer.phone}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-stone-600">
                          <Calendar className="w-3 h-3" />
                          {new Date(customer.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-stone-100 text-stone-800">
                          {customer.orderCount} Orders
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-stone-600 max-w-[200px] truncate">
                          <MapPin className="w-3 h-3 shrink-0" />
                          {customer.address || "No address provided"}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-stone-300" />
              </div>
              <h3 className="text-lg font-bold text-stone-900">
                {search ? "No matches found" : "No Customers Yet"}
              </h3>
              <p className="text-sm text-stone-400 max-w-xs mx-auto">
                {search 
                  ? "Try adjusting your search criteria to find what you're looking for." 
                  : "Once users start registering and placing orders, they will appear here."}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
