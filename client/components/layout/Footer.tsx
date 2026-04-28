import Link from "next/link"
import { Sofa } from "lucide-react"

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
)

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
)

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)

export function Footer() {
  return (
    <footer className="bg-brand-text text-white py-20 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* Brand */}
        <div className="space-y-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-brand-primary text-brand-text p-2 rounded-lg">
              <Sofa className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight">Wooniq</span>
          </Link>
          <p className="text-white/60 text-sm leading-relaxed max-w-xs">
            Premium furniture for modern living. We combine style, comfort, and sustainability to create pieces that tell your story.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="p-2 bg-white/5 rounded-full hover:bg-brand-primary hover:text-brand-text transition-all">
              <InstagramIcon className="w-5 h-5" />
            </Link>
            <Link href="#" className="p-2 bg-white/5 rounded-full hover:bg-brand-primary hover:text-brand-text transition-all">
              <TwitterIcon className="w-5 h-5" />
            </Link>
            <Link href="#" className="p-2 bg-white/5 rounded-full hover:bg-brand-primary hover:text-brand-text transition-all">
              <FacebookIcon className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-bold text-lg mb-6">Shop</h4>
          <ul className="space-y-4 text-white/60 text-sm">
            <li><Link href="#" className="hover:text-brand-primary transition-colors">Living Room</Link></li>
            <li><Link href="#" className="hover:text-brand-primary transition-colors">Bedroom</Link></li>
            <li><Link href="#" className="hover:text-brand-primary transition-colors">Dining</Link></li>
            <li><Link href="#" className="hover:text-brand-primary transition-colors">Office</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-6">Company</h4>
          <ul className="space-y-4 text-white/60 text-sm">
            <li><Link href="#" className="hover:text-brand-primary transition-colors">About Us</Link></li>
            <li><Link href="#" className="hover:text-brand-primary transition-colors">Careers</Link></li>
            <li><Link href="#" className="hover:text-brand-primary transition-colors">Sustainability</Link></li>
            <li><Link href="#" className="hover:text-brand-primary transition-colors">Press</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-6">Newsletter</h4>
          <p className="text-white/60 text-sm mb-6">Subscribe to get latest updates and offers.</p>
          <form className="relative">
            <input 
              type="email" 
              placeholder="Email address" 
              className="w-full bg-white/5 border border-white/10 rounded-full py-4 px-6 text-sm focus:outline-none focus:border-brand-primary transition-colors"
            />
            <button className="absolute right-2 top-2 bottom-2 bg-brand-primary text-brand-text px-6 rounded-full text-xs font-bold hover:bg-brand-primary/90 transition-colors">
              Join
            </button>
          </form>
        </div>

      </div>
      
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-white/40 text-xs">
        <p>© 2024 Wooniq Furniture. All rights reserved.</p>
        <div className="flex gap-8">
          <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  )
}
