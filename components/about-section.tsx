import { Users, Target, Globe, Shield } from "lucide-react"

const features = [
  {
    icon: Users,
    title: "Inclusive Training",
    description: "Ensuring esports coaching is accessible to young players from diverse backgrounds.",
  },
  {
    icon: Target,
    title: "Structured Framework",
    description: "Pedagogically sound methodologies for grassroots esports coaches.",
  },
  {
    icon: Globe,
    title: "European Network",
    description: "Supporting collaboration between organizations across multiple countries.",
  },
  {
    icon: Shield,
    title: "Player Well-being",
    description: "Promoting responsible digital habits and personal development.",
  },
]

export function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 md:mb-4">
            <span className="text-foreground">Why </span>
            <span className="text-primary">ECID</span>
            <span className="text-foreground">?</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-3xl mx-auto">
            Grassroots esports is rapidly gaining popularity, but coaching practices remain largely unstructured. Unlike
            traditional sports, esports lacks a unified coaching framework for safe, inclusive, and developmentally
            appropriate training.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-5 md:p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm md:text-base">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
