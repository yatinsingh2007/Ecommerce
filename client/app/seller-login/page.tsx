"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Sofa, Mail, Lock, ArrowRight, ShieldCheck, Eye, EyeOff, Loader2, ChevronLeft } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useAuth } from "@/context/auth-context"
import { toast } from "sonner"
import { Button } from "@/components/ui/Button"

const sellerLoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

type SellerLoginFormValues = z.infer<typeof sellerLoginSchema>

export default function SellerLoginPage() {
  const [showPassword, setShowPassword] = React.useState(false)
  const { login } = useAuth()
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SellerLoginFormValues>({
    resolver: zodResolver(sellerLoginSchema),
  })

  const onSubmit = async (data: SellerLoginFormValues) => {
    setIsSubmitting(true)
    try {
      const endpoint = "http://localhost:5000/api/auth/seller/login"
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok) {
        toast.success(`Welcome back, ${result.user.name}! Accessing Seller Portal...`)
        // The auth context handles the redirection based on role
        login(result.token, result.user)
      } else {
        toast.error(result.error || "Login failed")
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FDFCFB] flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Premium Background Gradient - Darker for Seller Portal */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#1A1A1A]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#D4C4B7]/20 rounded-full blur-[100px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        {/* Back Link */}
        <Link 
          href="/login" 
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#1A1A1A] mb-8 transition-colors group"
        >
          <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Customer Login
        </Link>

        <div className="bg-white border border-gray-100 rounded-[48px] p-8 md:p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.06)] relative overflow-hidden">
          {/* Subtle Seller Pattern Overlay */}
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
            <ShieldCheck className="w-32 h-32" />
          </div>

          <div className="flex flex-col items-center mb-10 relative z-10">
            <Link href="/" className="flex items-center gap-2 mb-8 group">
              <div className="bg-[#1A1A1A] text-white p-2.5 rounded-2xl">
                <Sofa className="w-7 h-7" />
              </div>
              <span className="text-3xl font-bold tracking-tight text-[#1A1A1A]">Wooniq</span>
            </Link>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1A1A1A] text-white rounded-full text-[10px] font-bold uppercase tracking-widest mb-4">
              Seller Portal
            </div>
            <h1 className="text-3xl font-semibold text-[#1A1A1A] mb-2">Partner Login</h1>
            <p className="text-gray-500 text-sm text-center">Manage your premium furniture collection</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#1A1A1A] ml-1">Work Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  {...register("email")}
                  type="email" 
                  placeholder="seller@wooniq.com"
                  className={`w-full bg-gray-50/50 border ${
                    errors.email ? "border-red-300" : "border-gray-100"
                  } rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/5 focus:border-[#1A1A1A] transition-all`}
                />
              </div>
              {errors.email && <p className="text-xs text-red-500 ml-1 mt-1">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-sm font-semibold text-[#1A1A1A]">Password</label>
                <Link href="#" className="text-xs font-semibold text-gray-400 hover:text-[#1A1A1A] transition-colors">Forgot?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`w-full bg-gray-50/50 border ${
                    errors.password ? "border-red-300" : "border-gray-100"
                  } rounded-2xl py-4 pl-12 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/5 focus:border-[#1A1A1A] transition-all`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1A1A1A] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-500 ml-1 mt-1">{errors.password.message}</p>}
            </div>

            <Button 
              type="submit" 
              className="w-full py-7 rounded-2xl text-base font-bold bg-[#1A1A1A] hover:bg-black text-white transition-all transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Accessing Portal...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  Partner Sign In
                  <ArrowRight className="w-5 h-5" />
                </div>
              )}
            </Button>
          </form>

          <div className="mt-10 pt-8 border-t border-gray-100 text-center relative z-10">
            <p className="text-gray-400 text-xs leading-relaxed px-4">
              Access to the Wooniq Seller Portal is restricted to authorized partners. 
              Contact your account manager if you're having trouble.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
