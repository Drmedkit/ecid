import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-20">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1E1E1E_1px,transparent_1px),linear-gradient(to_bottom,#1E1E1E_1px,transparent_1px)] bg-[size:2rem_2rem] md:bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      {/* Glow effects - smaller on mobile */}
      <div className="absolute top-1/4 left-1/4 w-48 h-48 md:w-96 md:h-96 bg-primary/20 rounded-full blur-[80px] md:blur-[128px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 md:w-96 md:h-96 bg-accent/20 rounded-full blur-[80px] md:blur-[128px] animate-pulse delay-1000" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-8 md:gap-12">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight">
              <span className="text-foreground">Esports Coaching for</span>
              <br />
              <span className="text-primary">Inclusion</span>
              <span className="text-foreground"> & </span>
              <span className="text-accent">Development</span>
            </h1>

            <p className="text-base md:text-xl text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto lg:mx-0">
              Building a European esports coaching framework that fosters inclusion, responsible digital habits, and
              player well-being for grassroots youth esports.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start">
              <Link href="/dashboard/courses">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-background font-bold text-base md:text-lg px-6 md:px-8 w-full sm:w-auto"
                >
                  Start Learning
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-accent text-accent hover:bg-accent/10 font-semibold text-base md:text-lg px-6 md:px-8 bg-transparent w-full sm:w-auto"
                >
                  Contribute
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex-1 relative">
            <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-96 md:h-96 mx-auto flex items-center justify-center">
              {/* Outer glow - cyan/yellow gradient */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-primary/40 via-transparent to-accent/40 blur-[40px] md:blur-[60px] animate-pulse" />

              {/* Secondary glow ring */}
              <div className="absolute inset-4 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 blur-[30px] md:blur-[40px] animate-pulse delay-500" />

              {/* Dark circular container */}
              <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full bg-[#1a1a1a] flex items-center justify-center shadow-[0_0_40px_rgba(14,240,235,0.3),0_0_60px_rgba(246,244,0,0.2)] md:shadow-[0_0_60px_rgba(14,240,235,0.3),0_0_100px_rgba(246,244,0,0.2)]">
                {/* Inner subtle gradient overlay */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-primary/10 via-transparent to-accent/10" />

                {/* Logo without text */}
                <Image
                  src="/images/ecid-icon.png"
                  alt="ECID Logo"
                  width={160}
                  height={160}
                  className="object-contain relative z-10 w-[120px] h-[120px] sm:w-[160px] sm:h-[160px] md:w-[240px] md:h-[240px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
