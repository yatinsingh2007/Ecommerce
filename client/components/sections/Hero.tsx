"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Star, ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/Button"

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-6 lg:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Content */}
        <div className="lg:col-span-5 space-y-8 relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-6xl lg:text-8xl font-bold tracking-tight text-brand-text leading-[0.9]"
          >
            Stylish <br /> Furniture
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-brand-secondary max-w-sm leading-relaxed"
          >
            Furniture isn't just functional; it tells your story through style, taste, and personality.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Button size="lg" className="font-bold">
              Shop Now
            </Button>
          </motion.div>

          {/* Social Proof Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-xl shadow-black/5 inline-block space-y-3"
          >
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden relative">
                  <Image 
                    src="/assets/avatars.png" 
                    alt="Customer" 
                    width={40} 
                    height={40} 
                    className="object-cover h-full"
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-4 h-4 fill-brand-primary text-brand-primary" />
              ))}
            </div>
            <div>
              <p className="text-xl font-bold text-brand-text">12k+</p>
              <p className="text-xs text-brand-secondary font-medium uppercase tracking-wider">Satisfied Customers</p>
            </div>
          </motion.div>
        </div>

        {/* Center Visual (Main Chair) */}
        <div className="lg:col-span-4 relative flex justify-center lg:block">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full aspect-square max-w-[500px]"
          >
            <Image 
              src="/assets/hero-chair-yellow.png" 
              alt="Stylish Yellow Armchair" 
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </motion.div>
        </div>

        {/* Right Content (Secondary Slider) */}
        <div className="lg:col-span-3 flex flex-col justify-end space-y-8 pb-12">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4"
          >
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-brand-text">Maderne</h3>
              <p className="text-sm text-brand-secondary">Sitting room chair</p>
            </div>
            
            <div className="relative w-full aspect-square bg-brand-text/5 rounded-3xl overflow-hidden p-6 group">
              <Image 
                src="/assets/hero-chair-grey.png" 
                alt="Maderne Chair" 
                fill
                className="object-contain p-8 group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            
            <div className="flex gap-4">
              <button className="w-10 h-10 rounded-full border border-brand-text/10 flex items-center justify-center hover:bg-brand-text hover:text-white transition-all">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button className="w-10 h-10 rounded-full border border-brand-text/10 flex items-center justify-center hover:bg-brand-text hover:text-white transition-all">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
