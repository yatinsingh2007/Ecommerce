"use client"

import { Button } from "@/components/ui/Button"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

const COLLECTIONS = [
  {
    name: "Living Room",
    count: "48 pieces",
    bg: "bg-amber-50",
    border: "border-amber-100",
    accent: "text-amber-600",
    dot: "bg-amber-400",
  },
  {
    name: "Bedroom",
    count: "32 pieces",
    bg: "bg-sky-50",
    border: "border-sky-100",
    accent: "text-sky-600",
    dot: "bg-sky-400",
  },
  {
    name: "Dining",
    count: "24 pieces",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
    accent: "text-emerald-600",
    dot: "bg-emerald-400",
  },
  {
    name: "Office",
    count: "19 pieces",
    bg: "bg-violet-50",
    border: "border-violet-100",
    accent: "text-violet-600",
    dot: "bg-violet-400",
  },
]

export function CollectionsSection() {
  return (
    <section className="py-32 px-6 lg:px-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#F1B30B12_0%,_transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-16">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-[2px] bg-brand-primary rounded-full" />
              <span className="text-brand-primary font-black tracking-widest uppercase text-xs">Browse</span>
            </div>
            <h2 className="text-5xl lg:text-7xl font-black tracking-tight text-brand-text leading-[0.9]">
              Our<br />Collections
            </h2>
          </div>
          <p className="text-brand-secondary max-w-sm leading-relaxed md:text-right">
            From classic and timeless designs to sleek contemporary styles — find the perfect piece for every room.
          </p>
        </div>

        {/* Collection cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {COLLECTIONS.map((col, i) => (
            <motion.div
              key={col.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className={`group relative p-6 rounded-3xl border-2 ${col.bg} ${col.border} cursor-pointer transition-all hover:shadow-xl hover:shadow-stone-900/5`}
            >
              <div className={`flex items-center gap-1.5 mb-4`}>
                <div className={`w-1.5 h-1.5 rounded-full ${col.dot}`} />
                <span className={`text-[11px] font-black uppercase tracking-wider ${col.accent}`}>{col.count}</span>
              </div>
              <h3 className="text-xl font-black text-stone-900 mb-6 leading-tight">{col.name}</h3>
              <div className={`w-9 h-9 rounded-full flex items-center justify-center bg-white/60 group-hover:bg-white transition-all shadow-sm ${col.accent}`}>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <Button size="lg" className="font-bold rounded-full px-10 gap-2">
            View All Collections <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
