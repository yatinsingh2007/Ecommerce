"use client"

import { ProductCard } from "@/components/ui/ProductCard"
import { motion } from "framer-motion"

const PRODUCTS = [
  {
    id: "1",
    name: "Velvet Emerald Sofa",
    price: 899,
    image: "/assets/product-sofa-green.png",
    category: "Living Room"
  },
  {
    id: "2",
    name: "Classic Yellow Chair",
    price: 249,
    image: "/assets/hero-chair-yellow.png",
    category: "Seating"
  },
  {
    id: "3",
    name: "Minimalist Grey Armchair",
    price: 329,
    image: "/assets/hero-chair-grey.png",
    category: "Seating"
  }
]

export function FeaturedProducts() {
  return (
    <section className="py-32 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-4">
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-brand-primary font-bold tracking-widest uppercase text-sm"
            >
              Popular Choice
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl lg:text-6xl font-black text-brand-text leading-tight"
            >
              Featured <br /> Products
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-secondary max-w-sm leading-relaxed"
          >
            Discover our hand-picked selection of top-rated furniture, designed to bring elegance and comfort to your home.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.map((product, index) => (
            <ProductCard 
              key={product.id}
              {...product}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
