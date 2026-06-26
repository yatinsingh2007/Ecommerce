"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/Button"
import { ArrowRight, Star, Shield, Truck } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-16 px-6 lg:px-12 overflow-hidden">
      {/* Soft background blobs */}
      <div className="absolute top-1/4 right-[-5%] w-[700px] h-[700px] bg-brand-primary/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-[-5%] w-[500px] h-[500px] bg-stone-300/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

        {/* Left content */}
        <div className="lg:col-span-5 space-y-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-brand-primary/10 border border-brand-primary/20 text-brand-text px-4 py-2 rounded-full text-sm font-semibold"
          >
            <Star className="w-3.5 h-3.5 fill-brand-primary text-brand-primary" />
            New 2025 Collection
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl lg:text-8xl font-black tracking-tight text-brand-text leading-[0.9]"
          >
            Stylish<br />
            <span className="text-brand-primary">Furniture</span><br />
            For You
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-brand-secondary max-w-sm leading-relaxed"
          >
            Furniture isn't just functional — it tells your story through style, taste, and personality.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-4 flex-wrap"
          >
            <Button size="lg" className="font-bold rounded-full px-8 gap-2">
              Shop Now <ArrowRight className="w-5 h-5" />
            </Button>
            <button className="text-sm font-semibold text-brand-text hover:text-brand-primary transition-colors underline underline-offset-4">
              View Collections
            </button>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="flex items-center gap-8 pt-6 border-t border-stone-100"
          >
            {[
              { value: "12K+", label: "Happy Customers" },
              { value: "240+", label: "Products" },
              { value: "4.9★", label: "Rating" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-black text-brand-text">{stat.value}</p>
                <p className="text-xs text-stone-400 font-medium mt-0.5">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Center hero image */}
        <div className="lg:col-span-4 relative flex justify-center">
          <div className="relative w-full max-w-[480px]">
            {/* Floating card — Warranty */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: -20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.55, type: "spring", stiffness: 200 }}
              className="absolute top-10 -left-6 z-20 bg-white rounded-2xl p-3 shadow-xl border border-stone-50"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 bg-brand-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <Shield className="w-4 h-4 text-brand-primary" />
                </div>
                <div>
                  <p className="text-xs font-black text-stone-900 leading-tight">5 Year</p>
                  <p className="text-[10px] text-stone-400 font-medium">Warranty</p>
                </div>
              </div>
            </motion.div>

            {/* Floating card — Delivery */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.65, type: "spring", stiffness: 200 }}
              className="absolute bottom-16 -right-6 z-20 bg-white rounded-2xl p-3 shadow-xl border border-stone-50"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0">
                  <Truck className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs font-black text-stone-900 leading-tight">Free</p>
                  <p className="text-[10px] text-stone-400 font-medium">Delivery</p>
                </div>
              </div>
            </motion.div>

            {/* Main image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-full aspect-square"
            >
              <div className="absolute inset-[15%] bg-brand-primary/8 rounded-full" />
              <Image
                src="/assets/hero-chair-yellow.png"
                alt="Stylish Yellow Armchair"
                fill
                className="object-contain drop-shadow-2xl relative z-10"
                priority
              />
            </motion.div>
          </div>
        </div>

        {/* Right feature card */}
        <div className="lg:col-span-3 flex flex-col justify-center space-y-5">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-wider text-brand-primary">Featured</p>
              <h3 className="text-xl font-black text-brand-text">Maderne</h3>
              <p className="text-sm text-brand-secondary">Sitting room chair</p>
              <p className="text-2xl font-black text-brand-text mt-1">$329</p>
            </div>

            <div className="relative w-full aspect-square bg-stone-50 rounded-3xl overflow-hidden group border border-stone-100">
              <Image
                src="/assets/hero-chair-grey.png"
                alt="Maderne Chair"
                fill
                className="object-contain p-8 group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            <Button className="w-full rounded-xl font-semibold text-sm" variant="outline">
              Quick View →
            </Button>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
