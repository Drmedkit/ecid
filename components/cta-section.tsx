import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"

export function CTASection() {
  return (
    <section id="contact" className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="relative rounded-2xl md:rounded-3xl overflow-hidden">
          {/* Background with glow effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-card to-accent/20" />
          <div className="absolute top-0 left-1/4 w-32 h-32 md:w-64 md:h-64 bg-primary/30 rounded-full blur-[60px] md:blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-32 h-32 md:w-64 md:h-64 bg-accent/30 rounded-full blur-[60px] md:blur-[100px]" />

          <div className="relative px-5 py-10 md:px-16 md:py-24 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 md:mb-4 text-foreground">
              Join the <span className="text-primary">Movement</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mb-6 md:mb-8">
              Are you a grassroots esports coach, organization, or stakeholder? Connect with us to be part of the
              European esports coaching transformation.
            </p>

            <div className="flex justify-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-background font-bold text-base md:text-lg px-6 md:px-8 w-full sm:w-auto"
              >
                <Mail className="mr-2 w-5 h-5" />
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
