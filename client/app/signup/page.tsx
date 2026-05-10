"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Sofa, Mail, Lock, ArrowRight, User, Phone, Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useAuth } from "@/context/auth-context"
import { toast } from "sonner"
import { Button } from "@/components/ui/Button"

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

type SignupFormValues = z.infer<typeof signupSchema>

export default function SignupPage() {
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  })

  const onSubmit = async (data: SignupFormValues) => {
    setIsSubmitting(true)
    try {
      const endpoint = "http://localhost:5000/api/auth/register"
      
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok) {
        toast.success("Account created successfully! Please sign in.")
        window.location.href = "/login"
      } else {
        toast.error(result.error || "Registration failed")
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FDFCFB] flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Premium Background Gradient */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#E8D9CD]/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#D4C4B7]/20 rounded-full blur-[100px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-xl relative z-10"
      >
        <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-[48px] p-8 md:p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)]">
          <div className="flex flex-col items-center mb-8">
            <Link href="/" className="flex items-center gap-2 mb-6 group">
              <div className="bg-[#1A1A1A] text-white p-2.5 rounded-2xl transition-transform group-hover:scale-110 duration-300">
                <Sofa className="w-7 h-7" />
              </div>
              <span className="text-3xl font-bold tracking-tight text-[#1A1A1A]">Wooniq</span>
            </Link>
            <h1 className="text-3xl font-semibold text-[#1A1A1A] mb-2">Create Account</h1>
            <p className="text-gray-500 text-sm">Join the world of premium furniture</p>
          </div>


          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#1A1A1A] ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    {...register("name")}
                    placeholder="John Doe"
                    className={`w-full bg-gray-50/50 border ${
                      errors.name ? "border-red-300" : "border-gray-100"
                    } rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/5 focus:border-[#1A1A1A] transition-all`}
                  />
                </div>
                {errors.name && <p className="text-xs text-red-500 ml-1 mt-1">{errors.name.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#1A1A1A] ml-1">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    {...register("phone")}
                    placeholder="1234567890"
                    className={`w-full bg-gray-50/50 border ${
                      errors.phone ? "border-red-300" : "border-gray-100"
                    } rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/5 focus:border-[#1A1A1A] transition-all`}
                  />
                </div>
                {errors.phone && <p className="text-xs text-red-500 ml-1 mt-1">{errors.phone.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#1A1A1A] ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  {...register("email")}
                  type="email" 
                  placeholder="name@example.com"
                  className={`w-full bg-gray-50/50 border ${
                    errors.email ? "border-red-300" : "border-gray-100"
                  } rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/5 focus:border-[#1A1A1A] transition-all`}
                />
              </div>
              {errors.email && <p className="text-xs text-red-500 ml-1 mt-1">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#1A1A1A] ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  {...register("password")}
                  type="password"
                  placeholder="••••••••"
                  className={`w-full bg-gray-50/50 border ${
                    errors.password ? "border-red-300" : "border-gray-100"
                  } rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/5 focus:border-[#1A1A1A] transition-all`}
                />
              </div>
              {errors.password && <p className="text-xs text-red-500 ml-1 mt-1">{errors.password.message}</p>}
            </div>


            <Button 
              type="submit" 
              className="w-full py-7 rounded-2xl text-base font-bold bg-[#1A1A1A] hover:bg-black text-white transition-all transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 mt-4"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating Account...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  Create Account
                  <ArrowRight className="w-5 h-5" />
                </div>
              )}
            </Button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-100 text-center">
            <p className="text-gray-500 text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-[#1A1A1A] font-bold hover:underline">Sign In</Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
