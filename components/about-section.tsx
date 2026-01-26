"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Users, Hammer, GraduationCap } from "lucide-react";

const pillars = [
  {
    icon: Users,
    title: "Contribute",
    description: "Share your expertise and help shape the future of esports coaching across Europe.",
    color: "#0EF0EB",
    gradient: "from-[#0EF0EB]/20 to-[#0EF0EB]/5",
    items: ["Share best practices", "Review content", "Join the community"],
  },
  {
    icon: Hammer,
    title: "Build",
    description: "Collaborate with coaches and organizations to create open-access training resources.",
    color: "#F6F400",
    gradient: "from-[#F6F400]/20 to-[#F6F400]/5",
    items: ["Open curriculum", "European network", "Collaborative framework"],
  },
  {
    icon: GraduationCap,
    title: "Train",
    description: "Access free, structured coaching materials designed for grassroots esports.",
    color: "#FF6B6B",
    gradient: "from-[#FF6B6B]/20 to-[#FF6B6B]/5",
    items: ["Free resources", "Practical methods", "Youth-focused approach"],
  },
];

function AnimatedPillar({ pillar, index }: { pillar: typeof pillars[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="group relative"
    >
      <div className={`relative p-8 rounded-3xl bg-gradient-to-b ${pillar.gradient} border border-white/10 hover:border-white/20 transition-all duration-500 h-full`}>
        {/* Animated glow on hover */}
        <div
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
          style={{ backgroundColor: `${pillar.color}20` }}
        />

        {/* Icon with pulse animation */}
        <motion.div
          className="relative w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
          style={{ backgroundColor: `${pillar.color}20` }}
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <pillar.icon className="w-8 h-8" style={{ color: pillar.color }} />

          {/* Pulse ring */}
          <motion.div
            className="absolute inset-0 rounded-2xl"
            style={{ border: `2px solid ${pillar.color}` }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-white mb-3">{pillar.title}</h3>

        {/* Description */}
        <p className="text-gray-400 mb-6 leading-relaxed">{pillar.description}</p>

        {/* Animated list items */}
        <ul className="space-y-3">
          {pillar.items.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.4, delay: index * 0.2 + i * 0.1 + 0.3 }}
              className="flex items-center gap-3 text-gray-300"
            >
              <motion.div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: pillar.color }}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
              />
              <span className="text-sm">{item}</span>
            </motion.li>
          ))}
        </ul>

        {/* Bottom accent line */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 rounded-full"
          style={{ backgroundColor: pillar.color }}
          initial={{ width: 0 }}
          animate={isInView ? { width: "40%" } : { width: 0 }}
          transition={{ duration: 0.8, delay: index * 0.2 + 0.5 }}
        />
      </div>
    </motion.div>
  );
}

export function AboutSection() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />

      {/* Floating orbs */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 bg-[#0EF0EB]/10 rounded-full blur-[100px]"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-64 h-64 bg-[#F6F400]/10 rounded-full blur-[100px]"
        animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isHeaderInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-400 mb-6"
          >
            Open Source Framework
          </motion.span>

          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">How </span>
            <span className="text-[#0EF0EB]">You</span>
            <span className="text-white"> Can Help</span>
          </h2>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            ECID is built by the community, for the community. Join coaches across Europe
            in creating the future of grassroots esports education.
          </p>
        </motion.div>

        {/* Three Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((pillar, index) => (
            <AnimatedPillar key={pillar.title} pillar={pillar} index={index} />
          ))}
        </div>

        {/* Connecting lines (desktop only) */}
        <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl pointer-events-none">
          <svg className="w-full h-20 opacity-20" viewBox="0 0 800 80">
            <motion.path
              d="M 150 40 Q 400 80 650 40"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="2"
              strokeDasharray="8 4"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 2 }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0EF0EB" />
                <stop offset="50%" stopColor="#F6F400" />
                <stop offset="100%" stopColor="#FF6B6B" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </section>
  );
}
