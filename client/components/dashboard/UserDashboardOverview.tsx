"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { 
  Package, 
  Heart, 
  ShoppingBag, 
  Clock, 
  ArrowRight,
  Loader2,
  ChevronRight,
  Sofa
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { useAuth } from "@/context/auth-context"
import api from "@/lib/api"
import Link from "next/link"

interface OrderProduct {
  id: string
  quantity: number
  finalPrice: number
  product: {
    id: string
    name: string
    imageUrl: string
    category: string
  }
}

interface Order {
  id: string
  createdAt: string
  status: string
  products: OrderProduct[]
}

interface Product {
  id: string
  name: string
  price: number
  imageUrl: string
  category: string
}

export function UserDashboardOverview() {
  const { user, token } = useAuth()
  const [loading, setLoading] = useState(true)
  const [orders, setOrders] = useState<Order[]>([])
  const [recommended, setRecommended] = useState<Product[]>([])

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [ordersRes, productsRes] = await Promise.all([
          api.get("/api/orders"),
          api.get("/api/products") // fetching all for recommendation demo
        ])
        setOrders(ordersRes.data.orders.slice(0, 5))
        setRecommended(productsRes.data.products.slice(0, 4))
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    if (token) {
      fetchDashboardData()
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
      title: "Total Orders",
      value: orders.length.toString(),
      description: "Lifetime orders placed",
      icon: ShoppingBag,
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      title: "In Transit",
      value: orders.filter(o => o.status === "PENDING").length.toString(),
      description: "Orders on the way",
      icon: Package,
      color: "text-emerald-600",
      bg: "bg-emerald-50"
    },
    {
      title: "Wishlist",
      value: "12",
      description: "Saved for later",
      icon: Heart,
      color: "text-rose-600",
      bg: "bg-rose-50"
    },
    {
      title: "Points",
      value: "450",
      description: "Available rewards",
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-50"
    }
  ]

  return (
    <div className="space-y-8 pb-8">
      {/* Header Section */}
      <div className="relative overflow-hidden rounded-[32px] bg-[#1A1A1A] p-8 md:p-12 text-white">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Welcome back, {user?.name.split(' ')[0]}!
            </h2>
            <p className="text-stone-300 text-lg mb-8">
              Discover new arrivals and track your recent orders. Your premium furniture journey continues here.
            </p>
            <Button className="bg-white text-[#1A1A1A] hover:bg-stone-100 rounded-full h-12 px-8 font-bold">
              Shop New Arrivals
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((stat, i) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + (i * 0.1) }}
          >
            <Card className="border-stone-100/50 shadow-sm hover:shadow-md transition-all duration-300 rounded-[24px]">
              <CardContent className="p-6">
                <div className="flex items-center justify-between space-y-0 pb-4">
                  <p className="text-sm font-semibold text-stone-500">{stat.title}</p>
                  <div className={`p-2.5 rounded-xl ${stat.bg}`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-3xl font-black text-stone-900">{stat.value}</h3>
                  <p className="text-xs font-medium text-stone-400">
                    {stat.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Recent Orders */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-stone-900">Recent Orders</h3>
            <Link href="/dashboard/orders" className="text-sm font-bold text-brand-primary hover:text-[#1A1A1A] flex items-center gap-1 transition-colors">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="space-y-4">
            {orders.length === 0 ? (
              <Card className="border-stone-100/50 shadow-sm rounded-[24px] bg-stone-50/50 border-dashed">
                <CardContent className="flex flex-col items-center justify-center p-12 text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                    <ShoppingBag className="w-6 h-6 text-stone-300" />
                  </div>
                  <h4 className="text-lg font-bold text-stone-900 mb-2">No orders yet</h4>
                  <p className="text-stone-500 text-sm max-w-sm mb-6">
                    Looks like you haven't made your first purchase yet. Explore our collection of premium furniture.
                  </p>
                  <Button className="rounded-full font-bold px-8">Start Shopping</Button>
                </CardContent>
              </Card>
            ) : (
              orders.map((order, i) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + (i * 0.1) }}
                >
                  <Card className="border-stone-100/50 shadow-sm hover:shadow-md transition-shadow rounded-[24px] overflow-hidden">
                    <CardContent className="p-0">
                      <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-stone-50">
                        <div className="flex items-center gap-6">
                          <div>
                            <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-1">Order Date</p>
                            <p className="text-sm font-bold text-stone-900">{new Date(order.createdAt).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-1">Order ID</p>
                            <p className="text-sm font-bold text-stone-900">#{order.id.slice(-6).toUpperCase()}</p>
                          </div>
                          <div>
                            <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-1">Status</p>
                            <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                              order.status === 'PENDING' ? 'bg-amber-100 text-amber-700' :
                              order.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-700' :
                              'bg-rose-100 text-rose-700'
                            }`}>
                              {order.status}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-1">Total Amount</p>
                          <p className="text-xl font-black text-stone-900">
                            ${order.products.reduce((sum, p) => sum + p.finalPrice, 0).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="p-6 bg-stone-50/30">
                        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                          {order.products.map((item) => (
                            <div key={item.id} className="shrink-0 flex items-center gap-3">
                              <div className="w-12 h-12 rounded-xl bg-stone-100 border border-stone-200 overflow-hidden shrink-0">
                                {item.product.imageUrl ? (
                                  <img src={item.product.imageUrl} alt={item.product.name} className="w-full h-full object-cover" />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center">
                                    <Package className="w-4 h-4 text-stone-300" />
                                  </div>
                                )}
                              </div>
                              <div className="min-w-[120px]">
                                <p className="text-sm font-bold text-stone-900 truncate">{item.product.name}</p>
                                <p className="text-xs text-stone-500 font-medium">Qty: {item.quantity}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Recommended Products */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-stone-900">Recommended for You</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {recommended.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + (i * 0.1) }}
                className="group relative"
              >
                <Link href={`/product/${product.id}`} className="block relative aspect-[4/5] rounded-[20px] overflow-hidden bg-stone-100 mb-3">
                  {product.imageUrl ? (
                    <img 
                      src={product.imageUrl} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Sofa className="w-8 h-8 text-stone-300" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <button className="absolute bottom-3 right-3 w-8 h-8 bg-white text-[#1A1A1A] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all duration-300 shadow-lg">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
                <h4 className="text-sm font-bold text-stone-900 truncate">{product.name}</h4>
                <p className="text-sm font-medium text-stone-500">${product.price.toLocaleString()}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
