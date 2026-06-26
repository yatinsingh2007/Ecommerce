"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/Button"
import { ArrowRight, Leaf, Paintbrush2 } from "lucide-react"

const FEATURES = [
  {
    Icon: Leaf,
    number: "01",
    title: "Eco-Friendly Materials",
    description: "Sustainably sourced wood and eco-conscious finishes to protect your home and the planet.",
    image: "/assets/feature-1.png",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    tagBg: "bg-emerald-50/80 text-emerald-700",
  },
  {
    Icon: Paintbrush2,
    number: "02",
    title: "Tailored Just for You",
    description: "Wide range of customizable options to perfectly match your style and space.",
    image: "/assets/feature-2.png",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    tagBg: "bg-amber-50/80 text-amber-700",
  },
]

export function CraftingSection() {
  return (
    <section className="py-24 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

        {/* Left sticky text */}
        <div className="lg:col-span-5 space-y-10 lg:sticky lg:top-28">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-[2px] bg-brand-primary rounded-full" />
              <span className="text-brand-primary font-black tracking-widest uppercase text-xs">Our Craft</span>
            </div>
            <p className="text-brand-secondary leading-relaxed max-w-sm">
              At Wooniq, each piece is crafted with precision and care, infused with elegance to reflect timeless beauty.
            </p>
            <h2 className="text-5xl lg:text-6xl font-black tracking-tight text-brand-text leading-[1.05]">
              Crafting<br />Timeless<br />Furniture
            </h2>
          </div>

          {/* Feature highlights */}
          <div className="space-y-4">
            {FEATURES.map((f) => (
              <div key={f.number} className="flex items-start gap-4 p-4 rounded-2xl bg-stone-50 border border-stone-100">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${f.iconBg}`}>
                  <f.Icon className={`w-5 h-5 ${f.iconColor}`} />
                </div>
                <div>
                  <p className="text-sm font-bold text-stone-900">{f.title}</p>
                  <p className="text-xs text-stone-500 leading-relaxed mt-0.5">{f.description}</p>
                </div>
              </div>
            ))}
          </div>

          <Button size="lg" className="font-bold rounded-full px-8 gap-2">
            Explore Craft <ArrowRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Right feature image cards */}
        <div className="lg:col-span-7 space-y-6">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.number}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group relative aspect-video rounded-[2rem] overflow-hidden"
            >
              <Image
                src={feature.image}
                alt={feature.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />

              <div className="absolute inset-0 p-8 flex flex-col justify-between">
                <div className={`self-start flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-md ${feature.tagBg}`}>
                  <feature.Icon className="w-3.5 h-3.5" />
                  Feature {feature.number}
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-white">{feature.title}</h3>
                  <p className="text-sm text-white/70 max-w-md leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
