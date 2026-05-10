"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { 
  Package, 
  Search, 
  Plus, 
  Filter, 
  MoreHorizontal, 
  Edit2, 
  Trash2, 
  ExternalLink,
  Loader2
} from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { toast } from "sonner"
import { Button } from "@/components/ui/Button"
import { Card, CardContent } from "@/components/ui/Card"
import { Input } from "@/components/ui/Input"

interface Product {
  id: string
  name: string
  price: number
  stock: number
  category: string
  imageUrl: string
  brand: string
}

export default function ProductsPage() {
  const { token } = useAuth()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products")
      const result = await response.json()
      if (response.ok) {
        setProducts(result.products)
      }
    } catch (error) {
      toast.error("Failed to load products")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return
    
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      })
      if (response.ok) {
        toast.success("Product deleted successfully")
        setProducts(products.filter(p => p.id !== id))
      }
    } catch (error) {
      toast.error("Failed to delete product")
    }
  }

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase()) ||
    p.brand?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-stone-900">Products</h2>
          <p className="text-stone-500">Manage your furniture collection and inventory.</p>
        </div>
        <Button className="bg-[#1A1A1A] hover:bg-black text-white rounded-xl h-12 px-6 flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add New Product
        </Button>
      </div>

      <Card className="border-stone-100/50 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-stone-50 flex items-center justify-between gap-4 bg-stone-50/50">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <Input 
              placeholder="Search products..." 
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
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-stone-400">Product</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-stone-400">Category</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-stone-400">Price</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-stone-400">Stock</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-stone-400">Status</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-stone-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-50">
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td colSpan={6} className="px-6 py-8">
                        <div className="h-4 bg-stone-100 rounded w-full" />
                      </td>
                    </tr>
                  ))
                ) : filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-20 text-center text-stone-400 font-medium">
                      No products found matching your search.
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product) => (
                    <motion.tr 
                      key={product.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-stone-50/50 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-stone-100 overflow-hidden border border-stone-100 relative group-hover:scale-105 transition-transform duration-300">
                             <img 
                              src={product.imageUrl} 
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-stone-900">{product.name}</p>
                            <p className="text-xs text-stone-400">{product.brand || "Wooniq Signature"}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-stone-600 bg-stone-100 px-2.5 py-1 rounded-lg">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-bold text-stone-900">${product.price.toFixed(2)}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-stone-600">{product.stock} units</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className={cn(
                            "w-2 h-2 rounded-full",
                            product.stock > 10 ? "bg-emerald-500" : product.stock > 0 ? "bg-amber-500" : "bg-red-500"
                          )} />
                          <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                            {product.stock > 10 ? "In Stock" : product.stock > 0 ? "Low Stock" : "Out of Stock"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-stone-400 hover:text-stone-900">
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-stone-400 hover:text-red-500"
                            onClick={() => handleDelete(product.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-stone-400 hover:text-stone-900">
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="group-hover:hidden">
                           <MoreHorizontal className="w-4 h-4 text-stone-300 ml-auto" />
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ")
}
