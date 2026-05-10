"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { 
  ShoppingCart, 
  Search, 
  Filter, 
  Eye, 
  Download,
  MoreHorizontal,
  Clock,
  CheckCircle2,
  Truck,
  Loader2
} from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { toast } from "sonner"
import { Button } from "@/components/ui/Button"
import { Card, CardContent } from "@/components/ui/Card"
import { Input } from "@/components/ui/Input"

interface Order {
  id: string
  createdAt: string
  status: "PENDING" | "SHIPPED" | "DELIVERED"
  user: { name: string; email: string }
  products: any[]
}

export default function OrdersPage() {
  const { token } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  useEffect(() => {
    if (token) fetchOrders()
  }, [token])

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/orders", {
        headers: { Authorization: `Bearer ${token}` }
      })
      const result = await response.json()
      if (response.ok) {
        setOrders(result.orders)
      }
    } catch (error) {
      toast.error("Failed to load orders")
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "PENDING": return <Clock className="w-3.5 h-3.5" />
      case "SHIPPED": return <Truck className="w-3.5 h-3.5" />
      case "DELIVERED": return <CheckCircle2 className="w-3.5 h-3.5" />
      default: return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING": return "bg-amber-50 text-amber-600 border-amber-100"
      case "SHIPPED": return "bg-blue-50 text-blue-600 border-blue-100"
      case "DELIVERED": return "bg-emerald-50 text-emerald-600 border-emerald-100"
      default: return "bg-stone-50 text-stone-600 border-stone-100"
    }
  }

  const filteredOrders = orders.filter(o => 
    o.user.name.toLowerCase().includes(search.toLowerCase()) ||
    o.id.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-stone-900">Orders</h2>
          <p className="text-stone-500">Track and manage customer orders effortlessly.</p>
        </div>
        <Button variant="outline" className="border-stone-200 text-stone-600 rounded-xl h-12 px-6 flex items-center gap-2">
          <Download className="w-5 h-5" />
          Export CSV
        </Button>
      </div>

      <Card className="border-stone-100/50 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-stone-50 flex items-center justify-between gap-4 bg-stone-50/50">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <Input 
              placeholder="Search orders by ID or customer..." 
              className="pl-10 h-10 bg-white border-stone-200"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button variant="outline" className="border-stone-200 text-stone-600 gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </Button>
        </div>
        
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-stone-50 bg-stone-50/30">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-stone-400">Order ID</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-stone-400">Customer</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-stone-400">Items</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-stone-400">Total</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-stone-400">Date</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-stone-400">Status</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-stone-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-50">
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td colSpan={7} className="px-6 py-8">
                        <div className="h-4 bg-stone-100 rounded w-full" />
                      </td>
                    </tr>
                  ))
                ) : filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-20 text-center text-stone-400 font-medium">
                      No orders found.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => {
                    const totalAmount = order.products.reduce((sum, p) => sum + (p.finalPrice * p.quantity), 0)
                    return (
                      <motion.tr 
                        key={order.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="hover:bg-stone-50/50 transition-colors group"
                      >
                        <td className="px-6 py-4">
                          <span className="text-xs font-bold text-stone-400 bg-stone-50 px-2 py-1 rounded border border-stone-100">
                            #{order.id.slice(-6).toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-sm font-bold text-stone-900">{order.user.name}</p>
                            <p className="text-xs text-stone-400">{order.user.email}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-stone-600">
                            {order.products.length} {order.products.length === 1 ? "item" : "items"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-bold text-stone-900">${totalAmount.toFixed(2)}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-stone-500 font-medium">
                            {new Date(order.createdAt).toLocaleDateString("en-US", { 
                              month: "short", 
                              day: "numeric", 
                              year: "numeric" 
                            })}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider ${getStatusColor(order.status)}`}>
                            {getStatusIcon(order.status)}
                            {order.status}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                           <div className="flex items-center justify-end gap-2">
                             <Button variant="ghost" size="icon" className="h-8 w-8 text-stone-400 hover:text-stone-900">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-stone-400 hover:text-stone-900">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                           </div>
                        </td>
                      </motion.tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
