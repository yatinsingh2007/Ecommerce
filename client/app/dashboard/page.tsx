"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { 
  DollarSign, 
  Package, 
  ShoppingCart, 
  Users, 
  ArrowUpRight, 
  ArrowDownRight,
  Loader2,
  MoreVertical
} from "lucide-react"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { useAuth } from "@/context/auth-context"

interface Stats {
  revenue: number
  orders: number
  products: number
  customers: number
}

interface RevenueData {
  name: string
  total: number
}

interface RecentSale {
  id: string
  createdAt: string
  user: { name: string; email: string }
  products: any[]
}

export default function DashboardOverview() {
  const { token } = useAuth()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<{
    stats: Stats
    recentSales: RecentSale[]
    revenueData: RevenueData[]
  } | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/admin/stats", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        const result = await response.json()
        if (response.ok) {
          setData(result)
        }
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error)
      } finally {
        setLoading(false)
      }
    }

    if (token) {
      fetchStats()
    }
  }, [token])

  if (loading) {
    return (
      <div className="h-[calc(100vh-160px)] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-stone-300" />
      </div>
    )
  }

  const statsCards = [
    {
      title: "Total Revenue",
      value: `$${data?.stats.revenue.toLocaleString()}`,
      description: "+12.5% from last month",
      icon: DollarSign,
      color: "text-emerald-600",
      bg: "bg-emerald-50"
    },
    {
      title: "Orders",
      value: data?.stats.orders.toString() || "0",
      description: "+8.2% from last month",
      icon: ShoppingCart,
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      title: "Total Customers",
      value: data?.stats.customers.toString() || "0",
      description: "+4.1% from last month",
      icon: Users,
      color: "text-stone-600",
      bg: "bg-stone-50"
    },
    {
      title: "Active Products",
      value: data?.stats.products.toString() || "0",
      description: "2 out of stock",
      icon: Package,
      color: "text-brand-primary",
      bg: "bg-brand-primary/10"
    }
  ]

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-stone-900">Dashboard Overview</h2>
          <p className="text-stone-500">Welcome back to your workspace.</p>
        </div>
        <Button className="bg-[#1A1A1A] hover:bg-black text-white rounded-xl h-11">
          Download Report
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((stat, i) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="border-stone-100/50 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between space-y-0 pb-2">
                  <p className="text-sm font-medium text-stone-500">{stat.title}</p>
                  <div className={cn("p-2 rounded-lg", stat.bg)}>
                    <stat.icon className={cn("w-4 h-4", stat.color)} />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-2xl font-bold text-stone-900">{stat.value}</h3>
                  <p className="text-xs text-stone-400 flex items-center gap-1">
                    <ArrowUpRight className="w-3 h-3 text-emerald-500" />
                    {stat.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4 border-stone-100/50 shadow-sm">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Monthly revenue performance for the last 6 months.</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px] pl-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data?.revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F5F5F5" />
                <XAxis 
                  dataKey="name" 
                  stroke="#A8A29E" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="#A8A29E" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                  cursor={{ fill: '#F5F5F5', radius: 8 }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Bar 
                  dataKey="total" 
                  fill="#1A1A1A" 
                  radius={[6, 6, 0, 0]} 
                  barSize={40}
                >
                  {data?.revenueData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 5 ? "#F1B30B" : "#1A1A1A"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 border-stone-100/50 shadow-sm overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>You have {data?.recentSales.length} new orders today.</CardDescription>
            </div>
            <Button variant="ghost" size="icon">
              <MoreVertical className="w-4 h-4 text-stone-400" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {data?.recentSales.map((sale) => (
                <div key={sale.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center font-bold text-stone-400 border border-stone-100">
                      {sale.user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-stone-900">{sale.user.name}</p>
                      <p className="text-xs text-stone-400">{sale.user.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-stone-900">
                      +${sale.products.reduce((sum, p) => sum + (p.finalPrice * p.quantity), 0).toFixed(2)}
                    </p>
                    <p className="text-[10px] text-stone-400 uppercase font-bold tracking-wider">
                      {new Date(sale.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-8 border-stone-100 text-stone-600 hover:bg-stone-50" variant="outline">
              View All Orders
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ")
}
