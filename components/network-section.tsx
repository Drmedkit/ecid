"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const mainPartners = [
  { country: "Denmark", code: "DK", color: "#C8102E" },
  { country: "Norway", code: "NO", color: "#BA0C2F" },
  { country: "Netherlands", code: "NL", color: "#FF6B00" },
];

function AnimatedConnection({ delay }: { delay: number }) {
  return (
    <motion.div
      className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-[#0EF0EB]/50 to-transparent"
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ scaleX: 1, opacity: [0, 1, 0] }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
        repeatDelay: 3,
      }}
    />
  );
}

function CountryNode({ partner, index, total }: { partner: typeof mainPartners[0]; index: number; total: number }) {
  const angle = (index / total) * 360 - 90; // Start from top
  const radius = 120;
  const x = Math.cos((angle * Math.PI) / 180) * radius;
  const y = Math.sin((angle * Math.PI) / 180) * radius;

  return (
    <motion.div
      className="absolute"
      style={{
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        transform: "translate(-50%, -50%)",
      }}
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      viewport={{ once: true }}
    >
      {/* Connection line to center */}
      <motion.div
        className="absolute w-px bg-gradient-to-b from-[#0EF0EB]/30 to-transparent"
        style={{
          height: radius,
          left: "50%",
          bottom: "50%",
          transformOrigin: "bottom center",
          transform: `rotate(${angle + 90}deg)`,
        }}
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        transition={{ duration: 0.8, delay: index * 0.15 + 0.3 }}
        viewport={{ once: true }}
      />

      {/* Country node */}
      <motion.div
        className="relative group cursor-pointer"
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        {/* Pulse effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-[#0EF0EB]/30"
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
        />

        {/* Node */}
        <div className="relative w-16 h-16 rounded-full bg-[#1a1a1a] border-2 border-[#0EF0EB]/50 flex items-center justify-center group-hover:border-[#0EF0EB] transition-colors">
          <span className="text-white font-bold text-sm">{partner.code}</span>
        </div>

        {/* Country name tooltip */}
        <motion.div
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {partner.country}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function NetworkVisualization() {
  // Random positions for individual contributors (outer ring)
  const contributors = [...Array(12)].map((_, i) => ({
    angle: (i / 12) * 360 + Math.random() * 15,
    radius: 160 + Math.random() * 30,
    delay: Math.random() * 2,
    size: 6 + Math.random() * 4,
  }));

  return (
    <div className="relative w-full h-[400px] flex items-center justify-center">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[#0EF0EB]/5 rounded-full blur-[100px]" />

      {/* Outer ring for contributors */}
      <motion.div
        className="absolute w-[360px] h-[360px] rounded-full border border-dashed border-white/10"
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      />

      {/* Inner rings */}
      <motion.div
        className="absolute w-72 h-72 rounded-full border border-[#0EF0EB]/20"
        animate={{ rotate: -360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute w-56 h-56 rounded-full border border-[#F6F400]/15"
        animate={{ rotate: 360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
      />

      {/* Individual contributors (small dots on outer ring) */}
      {contributors.map((c, i) => (
        <motion.div
          key={`contributor-${i}`}
          className="absolute rounded-full bg-white/40"
          style={{
            width: c.size,
            height: c.size,
            left: `calc(50% + ${Math.cos((c.angle * Math.PI) / 180) * c.radius}px)`,
            top: `calc(50% + ${Math.sin((c.angle * Math.PI) / 180) * c.radius}px)`,
            transform: "translate(-50%, -50%)",
          }}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: [0.3, 0.7, 0.3], scale: 1 }}
          transition={{
            opacity: { duration: 3, repeat: Infinity, delay: c.delay },
            scale: { duration: 0.5, delay: i * 0.05 },
          }}
          viewport={{ once: true }}
        />
      ))}

      {/* Center hub */}
      <motion.div
        className="relative z-10"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ type: "spring", duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="w-24 h-24 rounded-full bg-gradient-to-br from-[#0EF0EB] to-[#F6F400] flex items-center justify-center"
          animate={{ boxShadow: ["0 0 20px #0EF0EB40", "0 0 40px #0EF0EB60", "0 0 20px #0EF0EB40"] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-black font-bold text-lg">ECID</span>
        </motion.div>
      </motion.div>

      {/* Main partner nodes (3 countries) */}
      {mainPartners.map((partner, index) => (
        <CountryNode key={partner.code} partner={partner} index={index} total={mainPartners.length} />
      ))}

      {/* Data flow particles from contributors to center */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-[#0EF0EB]"
          style={{
            left: "50%",
            top: "50%",
          }}
          animate={{
            x: [Math.cos(((i * 60 - 90) * Math.PI) / 180) * 180, 0],
            y: [Math.sin(((i * 60 - 90) * Math.PI) / 180) * 180, 0],
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2.5,
            delay: i * 0.4,
            repeat: Infinity,
            repeatDelay: 1.5,
          }}
        />
      ))}
    </div>
  );
}

export function NetworkSection() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section id="network" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Network visualization */}
          <div className="order-2 lg:order-1">
            <NetworkVisualization />
          </div>

          {/* Right: Content */}
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, x: 30 }}
            animate={isHeaderInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={isHeaderInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-2 rounded-full bg-[#0EF0EB]/10 border border-[#0EF0EB]/30 text-[#0EF0EB] text-sm font-medium mb-6"
            >
              Erasmus+ Project
            </motion.span>

            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">European </span>
              <span className="text-[#0EF0EB]">Network</span>
            </h2>

            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              ECID brings together esports organizations, universities, and coaching experts
              from across Europe to develop a unified approach to grassroots esports coaching.
            </p>

            {/* Partner list */}
            <div className="space-y-4">
              <h3 className="text-white font-semibold mb-3">Core Partners</h3>
              <div className="flex flex-wrap gap-3">
                {mainPartners.map((partner, index) => (
                  <motion.div
                    key={partner.code}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#0EF0EB]" />
                    <span className="text-gray-300 text-sm">{partner.country}</span>
                  </motion.div>
                ))}
              </div>
              <p className="text-gray-500 text-sm mt-3">
                + Individual contributors from across Europe
              </p>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.6 }}
              className="mt-8 grid grid-cols-3 gap-4"
            >
              {[
                { value: "3", label: "Countries" },
                { value: "∞", label: "Partners" },
                { value: "2025-27", label: "Duration" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl font-bold text-[#0EF0EB]">{stat.value}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
