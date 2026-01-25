import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ObjectivesSection } from "@/components/objectives-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ObjectivesSection />
      <CTASection />
      <Footer />
    </main>
  )
}
