"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { ShoppingCart, Zap, Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  id: string
  name: string
  price: number
  discountPrice?: number | null
  image: string
  category: string
  rating?: number
  className?: string
  onAddToCart?: () => void
  onBuyNow?: () => void
  addingToCart?: boolean
  buyingNow?: boolean
}

export function ProductCard({
  name,
  price,
  discountPrice,
  image,
  category,
  rating = 4.5,
  className,
  onAddToCart,
  onBuyNow,
  addingToCart = false,
  buyingNow = false,
}: ProductCardProps) {
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
      <div className="relative aspect-4/5 overflow-hidden rounded-2xl bg-[#F7F5F2] mb-5">
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

        {/* Discount badge */}
        {discountPrice && (
          <div className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-lg">
            -{Math.round((1 - discountPrice / price) * 100)}%
          </div>
        )}
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

        <h3 className="text-base font-bold text-brand-text leading-tight line-clamp-2">{name}</h3>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <p className="text-xl font-black text-brand-text">
            ${(discountPrice ?? price).toLocaleString()}
          </p>
          {discountPrice && (
            <p className="text-sm text-stone-400 line-through">${price.toLocaleString()}</p>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 pt-1">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onAddToCart}
            disabled={addingToCart || !onAddToCart}
            className="flex-1 flex items-center justify-center gap-1.5 bg-stone-50 hover:bg-stone-100 border border-stone-200 text-stone-800 text-xs font-bold py-2.5 rounded-xl transition-all disabled:opacity-50"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            {addingToCart ? "Adding…" : "Add to Cart"}
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onBuyNow}
            disabled={buyingNow || !onBuyNow}
            className="flex-1 flex items-center justify-center gap-1.5 bg-brand-text hover:bg-brand-primary hover:text-brand-text text-white text-xs font-bold py-2.5 rounded-xl transition-all disabled:opacity-50"
          >
            <Zap className="w-3.5 h-3.5" />
            {buyingNow ? "Ordering…" : "Buy Now"}
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
