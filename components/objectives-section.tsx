import { CheckCircle2 } from "lucide-react"

const objectives = [
  {
    title: "European Esports Coaching Network",
    description:
      "Create a structured coaching methodology integrating best practices from sports coaching and youth education.",
    target: "Finalized framework available as open-access resource",
  },
  {
    title: "Training Workshops",
    description:
      "Organize hands-on training sessions to equip coaches with inclusive and pedagogical coaching strategies.",
    target: "45-60 grassroots coaches trained across 3+ workshops",
  },
  {
    title: "Pilot Testing",
    description: "Implement the coaching framework in real esports settings, gathering feedback for refinement.",
    target: "60-90 young players involved in pilot sessions",
  },
  {
    title: "Digital Learning Resources",
    description: "Create an open-access online toolkit with training materials ensuring scalability.",
    target: "Digital toolkit shared across European organizations",
  },
  {
    title: "European Dissemination",
    description: "Organize final event and knowledge-sharing opportunities to maximize impact.",
    target: "30-50 stakeholders reached at dissemination event",
  },
]

export function ObjectivesSection() {
  return (
    <section id="objectives" className="py-16 md:py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/5 to-transparent" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 md:mb-4">
            <span className="text-foreground">Project </span>
            <span className="text-accent">Objectives</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Our key milestones aligned with Erasmus+ objectives to transform grassroots esports coaching across Europe.
          </p>
        </div>

        <div className="space-y-3 md:space-y-4">
          {objectives.map((objective, index) => (
            <div
              key={index}
              className="group relative p-4 md:p-6 rounded-xl md:rounded-2xl bg-card border border-border hover:border-accent/50 transition-all duration-300"
            >
              <div className="flex flex-col gap-3 md:gap-4">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                    <span className="text-accent font-bold text-sm md:text-base">{index + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base md:text-xl font-bold text-foreground mb-1">{objective.title}</h3>
                    <p className="text-muted-foreground text-sm md:text-base">{objective.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-full bg-primary/10 border border-primary/30 self-start ml-11 md:ml-14">
                  <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-primary shrink-0" />
                  <span className="text-primary text-xs md:text-sm font-medium">{objective.target}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
