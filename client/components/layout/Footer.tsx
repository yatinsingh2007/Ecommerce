import Link from "next/link"
import { Sofa, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/Button"

const footerLinks: Record<string, string[]> = {
  Shop: ["Living Room", "Bedroom", "Dining", "Office", "Outdoor"],
  Company: ["About Us", "Careers", "Press", "Blog", "Partners"],
  Support: ["FAQ", "Shipping", "Returns", "Track Order", "Contact"],
}

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
)

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
)

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)

export function Footer() {
  return (
    <footer className="bg-[#111111] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-14 border-b border-white/8">

          {/* Brand column */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="flex items-center gap-2.5 w-fit">
              <div className="bg-brand-primary p-2 rounded-xl">
                <Sofa className="w-5 h-5 text-[#111111]" />
              </div>
              <span className="text-xl font-bold tracking-tight">Wooniq</span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Premium furniture crafted for modern living. Each piece tells a story of elegance, comfort, and lasting quality.
            </p>
            <div className="flex items-center gap-2">
              {[InstagramIcon, TwitterIcon, FacebookIcon].map((Icon, i) => (
                <button
                  key={i}
                  className="w-9 h-9 rounded-xl bg-white/8 flex items-center justify-center text-white/50 hover:bg-brand-primary hover:text-[#111111] transition-all"
                >
                  <Icon />
                </button>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="lg:col-span-2 space-y-5">
              <h4 className="text-xs font-black uppercase tracking-widest text-white/60">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-sm text-white/35 hover:text-white transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div className="lg:col-span-4 space-y-5">
            <h4 className="text-xs font-black uppercase tracking-widest text-white/60">Stay Updated</h4>
            <p className="text-sm text-white/35 leading-relaxed">
              Get the latest collections and exclusive offers delivered to your inbox.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 min-w-0 bg-white/6 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none focus:border-brand-primary transition-colors"
              />
              <Button className="bg-brand-primary text-[#111111] hover:bg-brand-primary/90 rounded-xl px-4 shrink-0 font-bold text-sm">
                Subscribe
              </Button>
            </div>
            <div className="space-y-2.5 pt-1">
              <div className="flex items-center gap-2 text-xs text-white/30">
                <Mail className="w-3.5 h-3.5 shrink-0" />
                hello@wooniq.com
              </div>
              <div className="flex items-center gap-2 text-xs text-white/30">
                <Phone className="w-3.5 h-3.5 shrink-0" />
                +1 (555) 123-4567
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/25">
          <p>© {new Date().getFullYear()} Wooniq Furniture. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-white/50 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white/50 transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-white/50 transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
