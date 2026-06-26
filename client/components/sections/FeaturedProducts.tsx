"use client"

import { ProductCard } from "@/components/ui/ProductCard"
import { motion } from "framer-motion"
import * as Tabs from "@radix-ui/react-tabs"

const PRODUCTS = [
  { id: "1", name: "Velvet Emerald Sofa", price: 899, image: "/assets/product-sofa-green.png", category: "Living Room", rating: 4.8 },
  { id: "2", name: "Classic Yellow Chair", price: 249, image: "/assets/hero-chair-yellow.png", category: "Seating", rating: 4.5 },
  { id: "3", name: "Minimalist Grey Armchair", price: 329, image: "/assets/hero-chair-grey.png", category: "Seating", rating: 4.7 },
]

const TABS = ["All", "Living Room", "Seating", "Bedroom"]

export function FeaturedProducts() {
  return (
    <section className="py-32 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3"
            >
              <div className="w-8 h-[2px] bg-brand-primary rounded-full" />
              <span className="text-brand-primary font-black tracking-widest uppercase text-xs">Popular Choice</span>
            </motion.div>
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
            Hand-picked selection of top-rated furniture, designed to bring elegance and comfort to your home.
          </motion.p>
        </div>

        {/* Tabs */}
        <Tabs.Root defaultValue="All" className="space-y-10">
          <Tabs.List className="flex items-center gap-2 flex-wrap">
            {TABS.map((tab) => (
              <Tabs.Trigger
                key={tab}
                value={tab}
                className="text-sm font-semibold text-stone-500 px-5 py-2.5 rounded-full border border-stone-100 hover:border-stone-300 hover:text-stone-900 transition-all cursor-pointer data-[state=active]:bg-brand-text data-[state=active]:text-white data-[state=active]:border-brand-text"
              >
                {tab}
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          {TABS.map((tab) => {
            const filtered = PRODUCTS.filter((p) => tab === "All" || p.category === tab)
            return (
              <Tabs.Content key={tab} value={tab}>
                {filtered.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filtered.map((product) => (
                      <ProductCard key={product.id} {...product} />
                    ))}
                  </div>
                ) : (
                  <div className="py-24 text-center text-stone-400 font-medium">
                    No products in this category yet.
                  </div>
                )}
              </Tabs.Content>
            )
          })}
        </Tabs.Root>
      </div>
    </section>
  )
}
