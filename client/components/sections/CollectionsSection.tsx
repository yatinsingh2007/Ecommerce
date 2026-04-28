"use client"

import { Button } from "@/components/ui/Button"
import { motion } from "framer-motion"

export function CollectionsSection() {
  return (
    <section className="py-32 px-6 lg:px-12 bg-brand-bg relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-end justify-between gap-12 relative z-10">
        <div className="space-y-8 max-w-xl">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-secondary leading-relaxed"
          >
            From classic and traditional designs to sleek and contemporary styles, 
            our furniture collection includes sofas, chairs, tables, beds, and more.
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-6xl lg:text-8xl font-bold tracking-tight text-brand-text leading-[0.9]"
          >
            Our <br /> Collections
          </motion.h2>
        </div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Button size="lg" className="font-bold min-w-[200px]">
            Shop Now
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
