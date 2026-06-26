"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { ShoppingCart, Heart, Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  id: string
  name: string
  price: number
  image: string
  category: string
  rating?: number
  className?: string
}

export function ProductCard({ name, price, image, category, rating = 4.5, className }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "group relative bg-white rounded-3xl p-5 border border-stone-50 hover:shadow-2xl hover:shadow-stone-900/8 transition-shadow",
        className
      )}
    >
      {/* Image container */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#F7F5F2] mb-5">
        <Image
          src={image}
          alt={name}
          fill
          className="object-contain p-8 transition-transform duration-700 group-hover:scale-110"
        />

        {/* Category badge */}
        <div className="absolute top-3 left-3 bg-brand-primary text-brand-text text-[10px] font-black uppercase tracking-wide px-2.5 py-1 rounded-lg">
          {category}
        </div>

        {/* Wishlist */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-3 right-3 p-2.5 bg-white rounded-xl text-stone-400 opacity-0 group-hover:opacity-100 transition-all shadow-md hover:text-red-500 hover:shadow-lg"
        >
          <Heart className="w-4 h-4" />
        </motion.button>
      </div>

      {/* Content */}
      <div className="space-y-3 px-1">
        {/* Stars */}
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                "w-3 h-3",
                i < Math.floor(rating)
                  ? "fill-brand-primary text-brand-primary"
                  : "fill-stone-100 text-stone-200"
              )}
            />
          ))}
          <span className="text-xs text-stone-400 ml-1 font-semibold">{rating.toFixed(1)}</span>
        </div>

        <h3 className="text-lg font-bold text-brand-text leading-tight">{name}</h3>

        <div className="flex items-center justify-between pt-1">
          <p className="text-2xl font-black text-brand-text">${price.toLocaleString()}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 bg-brand-text text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-brand-primary hover:text-brand-text transition-all"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Add
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
