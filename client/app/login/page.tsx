"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Sofa, Mail, Lock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/Button"

export default function LoginPage() {
  const [isLoading, setIsLoading] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate login
    setTimeout(() => setIsLoading(false), 2000)
  }

  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[100px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white/70 backdrop-blur-2xl border border-white/50 rounded-[40px] p-8 md:p-12 shadow-2xl shadow-brand-text/5">
          <div className="flex flex-col items-center mb-10">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="bg-brand-primary text-brand-text p-2 rounded-xl">
                <Sofa className="w-8 h-8" />
              </div>
              <span className="text-3xl font-black tracking-tight text-brand-text italic">Wooniq</span>
            </Link>
            <h1 className="text-3xl font-black text-brand-text mb-2">Welcome Back</h1>
            <p className="text-brand-secondary text-sm">Please enter your details to login</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-brand-text ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-secondary" />
                <input 
                  type="email" 
                  placeholder="name@example.com"
                  required
                  className="w-full bg-white border border-brand-text/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-brand-primary transition-all shadow-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-sm font-bold text-brand-text">Password</label>
                <Link href="#" className="text-xs font-bold text-brand-primary hover:underline">Forgot Password?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-secondary" />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  required
                  className="w-full bg-white border border-brand-text/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-brand-primary transition-all shadow-sm"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full py-7 rounded-2xl text-base font-black"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
              {!isLoading && <ArrowRight className="ml-2 w-5 h-5" />}
            </Button>
          </form>

          <div className="mt-10 pt-8 border-t border-brand-text/5 text-center">
            <p className="text-brand-secondary text-sm">
              Don't have an account?{" "}
              <Link href="/signup" className="text-brand-primary font-bold hover:underline">Create Account</Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
