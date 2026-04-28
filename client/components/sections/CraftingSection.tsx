"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"

interface FeatureCardProps {
  number: string
  title: string
  description: string
  image: string
  className?: string
}

function FeatureCard({ number, title, description, image, className }: FeatureCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className={cn(
        "relative aspect-[4/5] rounded-[2.5rem] overflow-hidden group",
        className
      )}
    >
      <Image 
        src={image} 
        alt={title} 
        fill 
        className="object-cover group-hover:scale-110 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
      
      <div className="absolute inset-0 p-8 flex flex-col justify-between text-white">
        <div className="space-y-3">
          <h3 className="text-2xl font-bold">{title}</h3>
          <p className="text-sm text-white/80 max-w-[200px] leading-relaxed">
            {description}
          </p>
        </div>
        <div className="text-6xl font-bold opacity-30 text-right">
          {number}
        </div>
      </div>
    </motion.div>
  )
}

export function CraftingSection() {
  return (
    <section className="py-20 px-6 lg:px-12 bg-white/50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Side */}
        <div className="lg:col-span-5 space-y-12">
          <div className="space-y-6">
            <p className="text-brand-secondary leading-relaxed max-w-sm">
              At Hearthline, each piece is crafted with precision and care, infused with elegance to reflect timeless beauty.
            </p>
            <h2 className="text-5xl lg:text-7xl font-bold tracking-tight text-brand-text leading-[1.1]">
              Crafting Timeless Furniture
            </h2>
          </div>
          
          <Button size="lg" className="font-bold">
            Shop Now
          </Button>
        </div>

        {/* Right Side - Feature Cards */}
        <div className="lg:col-span-7 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FeatureCard 
              number="01"
              title="Eco-Friendly Materials"
              description="We use sustainably sourced wood and eco-conscious finishes to protect your home."
              image="/assets/feature-1.png"
            />
            <FeatureCard 
              number="02"
              title="Tailored Just for You"
              description="Choose from a wide range of customizable options to match your style and space."
              image="/assets/feature-2.png"
            />
          </div>
          
          {/* Navigation */}
          <div className="flex justify-end gap-4 pr-4">
            <button className="w-12 h-12 rounded-full border border-brand-text/10 flex items-center justify-center hover:bg-brand-text hover:text-white transition-all shadow-sm">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button className="w-12 h-12 rounded-full border border-brand-text/10 flex items-center justify-center hover:bg-brand-text hover:text-white transition-all shadow-sm">
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  )
}
