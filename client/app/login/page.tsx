"use client"

import * as React from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Sofa, Mail, Lock, ArrowRight, User, Eye, EyeOff, Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/Button"
import api from "@/lib/api"

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginPage() {
  const [showPassword, setShowPassword] = React.useState(false)
  const { login, user, isLoading } = useAuth()
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    if (!isLoading && user) {
      router.replace(user.role === "seller" ? "/dashboard" : "/products")
    }
  }, [user, isLoading, router])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormValues) => {
    setIsSubmitting(true)
    try {
      const result = await api.post("/api/auth/login", data)
      toast.success(`Welcome back, ${result.data.user.name}!`)
      login(result.data.token, result.data.user)
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Something went wrong. Please try again.")
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
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-[48px] p-8 md:p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)]">
          <div className="flex flex-col items-center mb-10">
            <Link href="/" className="flex items-center gap-2 mb-8 group">
              <div className="bg-[#1A1A1A] text-white p-2.5 rounded-2xl transition-transform group-hover:scale-110 duration-300">
                <Sofa className="w-7 h-7" />
              </div>
              <span className="text-3xl font-bold tracking-tight text-[#1A1A1A]">Wooniq</span>
            </Link>
            <h1 className="text-3xl font-semibold text-[#1A1A1A] mb-2">Welcome Back</h1>
            <p className="text-gray-500 text-sm">Experience modern elegance again</p>
          </div>


          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
              <div className="flex justify-between items-center px-1">
                <label className="text-sm font-semibold text-[#1A1A1A]">Password</label>
                <Link href="#" className="text-xs font-semibold text-gray-400 hover:text-[#1A1A1A] transition-colors">Forgot Password?</Link>
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
                  Authenticating...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  Sign In
                  <ArrowRight className="w-5 h-5" />
                </div>
              )}
            </Button>
          </form>

          <div className="mt-10 pt-8 border-t border-gray-100 text-center space-y-4">
            <p className="text-gray-500 text-sm">
              Don't have an account?{" "}
              <Link href="/signup" className="text-[#1A1A1A] font-bold hover:underline">Create Account</Link>
            </p>
            <div className="pt-2">
              <Link 
                href="/seller-login" 
                className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-[#1A1A1A] transition-colors group"
              >
                Are you a seller? <span className="text-[#1A1A1A] group-hover:underline flex items-center gap-1">Seller Portal <ArrowRight className="w-3 h-3" /></span>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
