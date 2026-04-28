import { Navbar } from "@/components/layout/Navbar"
import { Hero } from "@/components/sections/Hero"
import { CraftingSection } from "@/components/sections/CraftingSection"
import { CollectionsSection } from "@/components/sections/CollectionsSection"
import { FeaturedProducts } from "@/components/sections/FeaturedProducts"
import { Footer } from "@/components/layout/Footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <CraftingSection />
      <CollectionsSection />
      <FeaturedProducts />
      <Footer />
    </main>
  )
}
