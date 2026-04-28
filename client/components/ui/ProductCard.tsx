"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { ShoppingCart, Heart } from "lucide-react"
import { Button } from "./Button"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  id: string
  name: string
  price: number
  image: string
  category: string
  className?: string
}

export function ProductCard({ name, price, image, category, className }: ProductCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn("group relative bg-white rounded-3xl p-4 transition-all hover:shadow-2xl hover:shadow-brand-primary/10", className)}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-brand-bg mb-6">
        <Image 
          src={image} 
          alt={name}
          fill
          className="object-contain p-8 transition-transform duration-500 group-hover:scale-110"
        />
        <button className="absolute top-4 right-4 p-3 bg-white/80 backdrop-blur-md rounded-full text-brand-text opacity-0 group-hover:opacity-100 transition-all hover:bg-brand-primary">
          <Heart className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-2 px-2">
        <p className="text-xs font-bold text-brand-primary uppercase tracking-widest">{category}</p>
        <h3 className="text-xl font-bold text-brand-text truncate">{name}</h3>
        <div className="flex items-center justify-between pt-2">
          <p className="text-2xl font-black text-brand-text">${price}</p>
          <Button size="sm" className="rounded-full w-10 h-10 p-0">
            <ShoppingCart className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
