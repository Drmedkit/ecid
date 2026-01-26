"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { BookOpen, Video, FileText, Users, Globe, Sparkles } from "lucide-react";

const resources = [
  {
    icon: BookOpen,
    title: "Open-Access Curriculum",
    description: "Structured learning modules covering mental performance, pressure management, focus, and team dynamics.",
    color: "#0EF0EB",
    stat: "7+",
    statLabel: "Modules",
  },
  {
    icon: Video,
    title: "Video Training",
    description: "Interactive visual content explaining coaching techniques and psychological principles.",
    color: "#F6F400",
    stat: "Free",
    statLabel: "Always",
  },
  {
    icon: FileText,
    title: "Best Practices",
    description: "Evidence-based coaching methods adapted from sports psychology for esports contexts.",
    color: "#FF6B6B",
    stat: "EU",
    statLabel: "Standards",
  },
  {
    icon: Users,
    title: "Community Content",
    description: "Peer-reviewed materials contributed by coaches across the European network.",
    color: "#9B59B6",
    stat: "Open",
    statLabel: "Source",
  },
];

function ResourceCard({ resource, index }: { resource: typeof resources[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 h-full overflow-hidden">
        {/* Animated background gradient on hover */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at 50% 100%, ${resource.color}15 0%, transparent 70%)`,
          }}
        />

        {/* Top row: Icon and Stat */}
        <div className="flex items-start justify-between mb-4 relative">
          <motion.div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${resource.color}20` }}
            whileHover={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.5 }}
          >
            <resource.icon className="w-6 h-6" style={{ color: resource.color }} />
          </motion.div>

          {/* Stat badge */}
          <div className="text-right">
            <motion.div
              className="text-2xl font-bold"
              style={{ color: resource.color }}
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ type: "spring", delay: index * 0.1 + 0.3 }}
            >
              {resource.stat}
            </motion.div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">{resource.statLabel}</div>
          </div>
        </div>

        {/* Content */}
        <h3 className="text-lg font-semibold text-white mb-2">{resource.title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{resource.description}</p>

        {/* Bottom animated line */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5"
          style={{ backgroundColor: resource.color }}
          initial={{ width: 0 }}
          animate={isInView ? { width: "100%" } : { width: 0 }}
          transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
        />
      </div>
    </motion.div>
  );
}

function AnimatedGlobe() {
  return (
    <div className="relative w-full h-64 flex items-center justify-center">
      {/* Rotating rings */}
      <motion.div
        className="absolute w-48 h-48 rounded-full border border-[#0EF0EB]/30"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute w-40 h-40 rounded-full border border-[#F6F400]/30"
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute w-32 h-32 rounded-full border border-[#FF6B6B]/30"
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />

      {/* Center globe icon */}
      <motion.div
        className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-br from-[#0EF0EB]/20 to-[#F6F400]/20 flex items-center justify-center"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <Globe className="w-10 h-10 text-white" />
      </motion.div>

      {/* Orbiting dots */}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 rounded-full"
          style={{
            backgroundColor: ["#0EF0EB", "#F6F400", "#FF6B6B", "#9B59B6", "#3498DB"][i],
          }}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "linear",
          }}
          initial={{
            x: Math.cos((i * 72 * Math.PI) / 180) * 70,
            y: Math.sin((i * 72 * Math.PI) / 180) * 70,
          }}
        />
      ))}
    </div>
  );
}

export function ObjectivesSection() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section id="resources" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />

      {/* Decorative elements */}
      <motion.div
        className="absolute top-1/4 right-0 w-96 h-96 bg-[#0EF0EB]/5 rounded-full blur-[150px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Header and description */}
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, x: -30 }}
            animate={isHeaderInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={isHeaderInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2 mb-6"
            >
              <Sparkles className="w-5 h-5 text-[#F6F400]" />
              <span className="text-[#F6F400] font-medium">100% Free Resources</span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">Free </span>
              <span className="text-[#F6F400]">Digital</span>
              <br />
              <span className="text-white">Resources</span>
            </h2>

            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Everything we create is open-access and free forever. Our goal is to democratize
              esports coaching education across Europe and beyond.
            </p>

            {/* Animated globe visualization */}
            <div className="hidden lg:block">
              <AnimatedGlobe />
            </div>
          </motion.div>

          {/* Right: Resource cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {resources.map((resource, index) => (
              <ResourceCard key={resource.title} resource={resource} index={index} />
            ))}
          </div>
        </div>

        {/* Bottom banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 p-6 md:p-8 rounded-2xl bg-gradient-to-r from-[#0EF0EB]/10 via-[#F6F400]/10 to-[#FF6B6B]/10 border border-white/10"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-semibold text-white mb-1">No paywalls. No subscriptions.</h3>
              <p className="text-gray-400">Funded by Erasmus+ to ensure accessibility for all.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {["#0EF0EB", "#F6F400", "#FF6B6B", "#9B59B6"].map((color, i) => (
                  <motion.div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-[#0a0a0a]"
                    style={{ backgroundColor: color }}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                  />
                ))}
              </div>
              <span className="text-gray-400 text-sm">European Collaboration</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
