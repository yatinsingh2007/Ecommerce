"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Search, SlidersHorizontal, ShoppingCart, Zap, Star, Package, Store } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"
import api from "@/lib/api"
import { cn } from "@/lib/utils"

const CATEGORIES = [
  "All", "Chairs", "Sofas", "Beds", "Dining Tables",
  "Office Furniture", "Cabinets", "Lighting", "Decor",
  "Living Room", "Storage", "Outdoor",
]

const SORT_OPTIONS = [
  { label: "Newest First", value: "createdAt_desc" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Top Rated", value: "rating_desc" },
  { label: "Name A–Z", value: "name_asc" },
]

interface Product {
  id: string
  name: string
  description: string
  price: number
  discountPrice: number | null
  stock: number
  category: string
  imageUrl: string
  rating: number
  brand: string | null
  seller: { id: string; name: string }
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const [category, setCategory] = useState("All")
  const [sort, setSort] = useState("createdAt_desc")
  const [cartLoading, setCartLoading] = useState<Record<string, boolean>>({})
  const [buyLoading, setBuyLoading] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 400)
    return () => clearTimeout(t)
  }, [search])

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const [sortBy, order] = sort.split("_")
        const params: Record<string, string> = { sortBy, order, limit: "50" }
        if (debouncedSearch) params.search = debouncedSearch
        if (category !== "All") params.category = category
        const res = await api.get("/api/products", { params })
        setProducts(res.data.products)
      } catch {
        toast.error("Failed to load products")
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [debouncedSearch, category, sort])

  const handleAddToCart = async (productId: string) => {
    setCartLoading(p => ({ ...p, [productId]: true }))
    try {
      await api.post("/api/cart", { productId, quantity: 1 })
      toast.success("Added to cart!")
    } catch (e: any) {
      toast.error(e.response?.data?.error || "Failed to add to cart")
    } finally {
      setCartLoading(p => ({ ...p, [productId]: false }))
    }
  }

  const handleBuyNow = async (productId: string) => {
    setBuyLoading(p => ({ ...p, [productId]: true }))
    try {
      await api.post("/api/cart", { productId, quantity: 1 })
      await api.post("/api/orders")
      toast.success("Order placed successfully!")
    } catch (e: any) {
      toast.error(e.response?.data?.error || "Failed to place order")
    } finally {
      setBuyLoading(p => ({ ...p, [productId]: false }))
    }
  }

  return (
    <main className="min-h-screen bg-brand-bg">

      {/* Page header */}
      <div className="pt-28 pb-8 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-[2px] bg-brand-primary rounded-full" />
              <span className="text-brand-primary font-black tracking-widest uppercase text-xs">Shop</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-black tracking-tight text-brand-text leading-tight">
              All Products
            </h1>
            {!loading && (
              <p className="text-brand-secondary mt-2 text-sm font-medium">
                {products.length} {products.length === 1 ? "item" : "items"} available
              </p>
            )}
          </div>

          {/* Sell CTA */}
          <Link
            href="/seller-login"
            className="inline-flex items-center gap-2 bg-brand-text text-white px-5 py-3 rounded-2xl font-bold text-sm hover:bg-brand-primary hover:text-brand-text transition-all self-start md:self-auto"
          >
            <Store className="w-4 h-4" />
            Sell on Wooniq
          </Link>
        </div>
      </div>

      {/* Sticky controls bar */}
      <div className="sticky top-16 z-30 bg-brand-bg/90 backdrop-blur-md border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-3 flex items-center gap-3">

          {/* Search */}
          <div className="flex items-center gap-2.5 bg-white border border-stone-100 rounded-xl px-4 py-2.5 flex-1 max-w-sm focus-within:border-stone-300 focus-within:shadow-sm transition-all">
            <Search className="w-4 h-4 text-stone-400 shrink-0" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search products, brands..."
              className="bg-transparent outline-none text-sm w-full placeholder:text-stone-400 text-stone-800"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="text-stone-300 hover:text-stone-500 text-xs font-bold shrink-0"
              >
                ✕
              </button>
            )}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2 bg-white border border-stone-100 rounded-xl px-3 py-2.5 shrink-0">
            <SlidersHorizontal className="w-4 h-4 text-stone-400 shrink-0" />
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="bg-transparent outline-none text-sm text-stone-700 cursor-pointer"
            >
              {SORT_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Category pills */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-3">
          <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={cn(
                  "text-xs font-bold px-4 py-2 rounded-full whitespace-nowrap transition-all shrink-0",
                  category === cat
                    ? "bg-brand-text text-white shadow-sm"
                    : "bg-white text-stone-500 border border-stone-100 hover:border-stone-300 hover:text-stone-800"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-8 pb-20">

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white rounded-3xl p-5 border border-stone-50 animate-pulse">
                <div className="aspect-4/5 rounded-2xl bg-stone-100 mb-5" />
                <div className="space-y-3 px-1">
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <div key={j} className="w-3 h-3 rounded-full bg-stone-100" />
                    ))}
                  </div>
                  <div className="h-4 bg-stone-100 rounded-lg w-3/4" />
                  <div className="h-3 bg-stone-100 rounded-lg w-1/2" />
                  <div className="h-6 bg-stone-100 rounded-lg w-1/3" />
                  <div className="flex gap-2 pt-1">
                    <div className="flex-1 h-9 bg-stone-100 rounded-xl" />
                    <div className="flex-1 h-9 bg-stone-100 rounded-xl" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-16 h-16 bg-stone-100 rounded-2xl flex items-center justify-center mb-4">
              <Package className="w-8 h-8 text-stone-400" />
            </div>
            <h3 className="text-xl font-bold text-stone-900 mb-2">No products found</h3>
            <p className="text-stone-500 text-sm max-w-xs">
              Try adjusting your search or selecting a different category.
            </p>
            <button
              onClick={() => { setSearch(""); setCategory("All") }}
              className="mt-6 text-sm font-bold text-brand-text underline underline-offset-4 hover:text-brand-primary transition-colors"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.04, 0.32) }}
                className="group relative bg-white rounded-3xl p-5 border border-stone-50 hover:shadow-2xl hover:shadow-stone-900/8 transition-all hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative aspect-4/5 overflow-hidden rounded-2xl bg-[#F7F5F2] mb-5">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Category badge */}
                  <div className="absolute top-3 left-3 bg-brand-primary text-brand-text text-[10px] font-black uppercase tracking-wide px-2.5 py-1 rounded-lg">
                    {product.category}
                  </div>

                  {/* Discount badge */}
                  {product.discountPrice && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-lg">
                      -{Math.round((1 - product.discountPrice / product.price) * 100)}%
                    </div>
                  )}

                  {/* Low stock */}
                  {product.stock > 0 && product.stock <= 3 && (
                    <div className="absolute bottom-3 left-3 bg-black/65 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg backdrop-blur-sm">
                      Only {product.stock} left
                    </div>
                  )}

                  {/* Out of stock overlay */}
                  {product.stock === 0 && (
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center rounded-2xl">
                      <span className="text-xs font-black uppercase tracking-wider text-stone-500 bg-white px-3 py-1.5 rounded-full shadow-sm">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>

                {/* Rating + brand */}
                <div className="flex items-center gap-1.5 mb-2">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star
                      key={j}
                      className={cn(
                        "w-3 h-3",
                        j < Math.floor(product.rating)
                          ? "fill-brand-primary text-brand-primary"
                          : "fill-stone-100 text-stone-200"
                      )}
                    />
                  ))}
                  <span className="text-xs text-stone-400 ml-0.5 font-semibold">{product.rating.toFixed(1)}</span>
                  {product.brand && (
                    <>
                      <span className="text-stone-200 text-xs">·</span>
                      <span className="text-xs text-stone-400 font-medium truncate">{product.brand}</span>
                    </>
                  )}
                </div>

                {/* Name */}
                <h3 className="text-sm font-bold text-brand-text leading-snug mb-2 line-clamp-2">
                  {product.name}
                </h3>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-xl font-black text-brand-text">
                    ${(product.discountPrice ?? product.price).toLocaleString()}
                  </span>
                  {product.discountPrice && (
                    <span className="text-sm text-stone-400 line-through">
                      ${product.price.toLocaleString()}
                    </span>
                  )}
                </div>

                {/* Action buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAddToCart(product.id)}
                    disabled={cartLoading[product.id] || product.stock === 0}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-stone-50 hover:bg-stone-100 active:scale-95 border border-stone-200 text-stone-800 text-xs font-bold py-2.5 rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <ShoppingCart className="w-3.5 h-3.5 shrink-0" />
                    {cartLoading[product.id] ? "Adding…" : "Add to Cart"}
                  </button>
                  <button
                    onClick={() => handleBuyNow(product.id)}
                    disabled={buyLoading[product.id] || product.stock === 0}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-brand-text hover:bg-brand-primary hover:text-brand-text active:scale-95 text-white text-xs font-bold py-2.5 rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Zap className="w-3.5 h-3.5 shrink-0" />
                    {buyLoading[product.id] ? "Ordering…" : "Buy Now"}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
