"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ScrollHero } from "./scroll-hero";

interface Module4ScrollPageProps {
  nextModuleId?: string | null;
}

export function Module4ScrollPage({ nextModuleId }: Module4ScrollPageProps) {
  return (
    <div className="bg-[#0a0a0a] text-white">
      {/* Fixed navigation */}
      <FixedNav />

      {/* Progress bar */}
      <ScrollProgressBar />

      {/* Hero section */}
      <ScrollHero
        moduleNumber={4}
        title="Attention and Focus"
        subtitle="Refocusing techniques and attention dimensions"
      />

      {/* Refocusing section */}
      <RefocusingScroll />

      {/* Attention Dimensions section */}
      <AttentionDimensionsScroll />

      {/* Key Takeaways */}
      <KeyTakeaways />

      {/* Next module CTA */}
      <NextModuleCTA nextModuleId={nextModuleId} />
    </div>
  );
}

function FixedNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-gray-800/50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/learn"
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Back to Course</span>
        </Link>
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <Image
            src="/images/ecid-logo-horizontal.png"
            alt="ECID Logo"
            width={80}
            height={28}
            className="object-contain"
          />
        </Link>
      </div>
    </nav>
  );
}

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="fixed top-[60px] left-0 right-0 h-1 bg-gradient-to-r from-[#F6F400] to-[#0EF0EB] origin-left z-50"
    />
  );
}

// ============================================
// SECTION 1: Refocusing
// ============================================

const REFOCUS_TECHNIQUES = [
  {
    name: "Thought-Stopping",
    icon: "🛑",
    color: "#ff6b6b",
    description: "Short, powerful phrases to interrupt unwanted thoughts",
    examples: ["\"Stop!\"", "\"Reset!\"", "\"Next play!\""],
    when: "When negative thoughts intrude",
  },
  {
    name: "Centering",
    icon: "🧘",
    color: "#0EF0EB",
    description: "Combine deep breathing with muscle relaxation",
    examples: ["Breathe to belly", "Release shoulders", "Feel grounded"],
    when: "Between rounds or during timeouts",
  },
  {
    name: "Performance Cues",
    icon: "🎯",
    color: "#F6F400",
    description: "Task-related attention points that direct focus",
    examples: ["\"Crosshair placement\"", "\"Check minimap\"", "\"Communicate\""],
    when: "During active play",
  },
];

function RefocusingScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <div ref={containerRef} className="min-h-[800vh] relative">
      {/* Section 1: Introduction */}
      <div className="h-screen sticky top-0 flex items-center justify-center overflow-hidden">
        <RefocusingIntro scrollProgress={scrollYProgress} />
      </div>

      {/* Section 2: The Core Insight */}
      <div className="h-screen sticky top-0 flex items-center justify-center overflow-hidden">
        <CoreInsight scrollProgress={scrollYProgress} />
      </div>

      {/* Section 3: Focus Bounce Visualization */}
      <div className="h-screen sticky top-0 flex items-center justify-center overflow-hidden">
        <FocusBounce scrollProgress={scrollYProgress} />
      </div>

      {/* Section 4: Three Techniques */}
      <div className="h-screen sticky top-0 flex items-center justify-center overflow-hidden">
        <ThreeTechniques scrollProgress={scrollYProgress} />
      </div>

      {/* Section 5: Technique Details */}
      <div className="h-screen sticky top-0 flex items-center justify-center overflow-hidden">
        <TechniqueDetails scrollProgress={scrollYProgress} />
      </div>
    </div>
  );
}

function RefocusingIntro({ scrollProgress }: { scrollProgress: any }) {
  const opacity = useTransform(scrollProgress, [0, 0.02, 0.10, 0.12], [0, 1, 1, 0]);
  const y = useTransform(scrollProgress, [0, 0.02], [50, 0]);

  return (
    <motion.div style={{ opacity }} className="text-center px-6 max-w-4xl mx-auto">
      <motion.div style={{ y }}>
        <span className="inline-block px-4 py-2 bg-[#0EF0EB]/20 text-[#0EF0EB] text-sm font-medium rounded-full mb-6">
          4.1 Refocusing
        </span>

        <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
          The Art of Coming Back
        </h2>

        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Every player loses focus. The difference between good and great players
          is <span className="text-white">how quickly they return</span>.
        </p>
      </motion.div>
    </motion.div>
  );
}

function CoreInsight({ scrollProgress }: { scrollProgress: any }) {
  const opacity = useTransform(scrollProgress, [0.10, 0.12, 0.26, 0.28], [0, 1, 1, 0]);
  const scale = useTransform(scrollProgress, [0.12, 0.16], [0.9, 1]);

  return (
    <motion.div style={{ opacity }} className="text-center px-6 max-w-4xl mx-auto">
      <motion.div style={{ scale }}>
        <div className="bg-gradient-to-r from-[#0EF0EB]/10 to-[#F6F400]/10 border-2 border-[#0EF0EB]/30 rounded-2xl p-8 md:p-12">
          <p className="text-2xl md:text-4xl font-bold text-white leading-relaxed mb-6">
            It's not about <span className="text-red-400 line-through">eternal focus</span>.
          </p>
          <p className="text-2xl md:text-4xl font-bold text-white leading-relaxed">
            It's about the skill to <span className="text-[#0EF0EB]">regain focus</span> time and again.
          </p>
        </div>

        <p className="text-gray-500 mt-8 text-lg">
          Focus is like a muscle — it gets tired. The skill is in the recovery.
        </p>
      </motion.div>
    </motion.div>
  );
}

function FocusBounce({ scrollProgress }: { scrollProgress: any }) {
  const opacity = useTransform(scrollProgress, [0.26, 0.28, 0.44, 0.46], [0, 1, 1, 0]);

  // Animated ball position
  const ballY = useTransform(
    scrollProgress,
    [0.30, 0.33, 0.36, 0.39, 0.42],
    [0, 80, 0, 60, 0]
  );

  return (
    <motion.div style={{ opacity }} className="text-center px-6 max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold text-white mb-4">
        Focus Bounces Back
      </h3>
      <p className="text-gray-400 mb-12">
        Like a ball, focus naturally dips — the skill is in the return
      </p>

      {/* Visualization */}
      <div className="relative h-[250px] max-w-md mx-auto">
        {/* Baseline */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gray-700" />
        <div className="absolute bottom-0 left-0 text-xs text-gray-500 -translate-y-4">Distracted</div>

        {/* Top line */}
        <div className="absolute top-8 left-0 right-0 h-[2px] bg-[#0EF0EB]/30" />
        <div className="absolute top-8 left-0 text-xs text-[#0EF0EB] -translate-y-4">Focused</div>

        {/* The bouncing ball */}
        <motion.div
          style={{ y: ballY }}
          className="absolute top-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0EF0EB] to-[#F6F400] flex items-center justify-center shadow-lg shadow-[#0EF0EB]/30">
            <span className="text-2xl">🎯</span>
          </div>
        </motion.div>

        {/* Labels */}
        <div className="absolute bottom-16 left-1/4 -translate-x-1/2 text-center">
          <span className="text-red-400 text-sm">Lose focus</span>
        </div>
        <div className="absolute bottom-16 right-1/4 translate-x-1/2 text-center">
          <span className="text-[#0EF0EB] text-sm">Refocus</span>
        </div>
      </div>

      <p className="text-gray-500 mt-8 text-sm">
        The best players bounce back faster — that's the skill we're building
      </p>
    </motion.div>
  );
}

function ThreeTechniques({ scrollProgress }: { scrollProgress: any }) {
  const opacity = useTransform(scrollProgress, [0.44, 0.46, 0.62, 0.64], [0, 1, 1, 0]);

  return (
    <motion.div style={{ opacity }} className="px-6 max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold text-white mb-2 text-center">
        Three Refocusing Techniques
      </h3>
      <p className="text-gray-400 text-center mb-8">
        Tools to bring your attention back
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {REFOCUS_TECHNIQUES.map((technique, index) => (
          <TechniqueCard
            key={technique.name}
            technique={technique}
            index={index}
            scrollProgress={scrollProgress}
          />
        ))}
      </div>
    </motion.div>
  );
}

function TechniqueCard({
  technique,
  index,
  scrollProgress,
}: {
  technique: typeof REFOCUS_TECHNIQUES[0];
  index: number;
  scrollProgress: any;
}) {
  const start = 0.47 + index * 0.03;
  const end = start + 0.04;
  const opacity = useTransform(scrollProgress, [start, end], [0, 1]);
  const y = useTransform(scrollProgress, [start, end], [30, 0]);

  return (
    <motion.div style={{ opacity, y }}>
      <div
        className="p-5 rounded-2xl border-2 h-full"
        style={{
          backgroundColor: `${technique.color}10`,
          borderColor: `${technique.color}40`,
        }}
      >
        <div className="text-4xl mb-3">{technique.icon}</div>
        <h4 className="text-lg font-bold mb-2" style={{ color: technique.color }}>
          {technique.name}
        </h4>
        <p className="text-gray-400 text-sm mb-3">{technique.description}</p>
        <div className="space-y-1">
          {technique.examples.map((ex, i) => (
            <span key={i} className="inline-block text-xs px-2 py-1 bg-gray-800 rounded mr-1 mb-1 text-gray-300">
              {ex}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function TechniqueDetails({ scrollProgress }: { scrollProgress: any }) {
  const opacity = useTransform(scrollProgress, [0.62, 0.64, 0.82, 0.84], [0, 1, 1, 0]);

  return (
    <motion.div style={{ opacity }} className="px-6 max-w-3xl mx-auto">
      <h3 className="text-2xl font-bold text-white mb-8 text-center">
        When to Use Each
      </h3>

      <div className="space-y-4">
        {REFOCUS_TECHNIQUES.map((technique, index) => (
          <WhenToUseItem
            key={technique.name}
            technique={technique}
            index={index}
            scrollProgress={scrollProgress}
          />
        ))}
      </div>

      <div className="mt-8 p-4 bg-[#0EF0EB]/10 border border-[#0EF0EB]/30 rounded-xl">
        <p className="text-gray-300 text-center">
          <span className="text-[#0EF0EB] font-bold">Pro tip:</span> Combine techniques —
          use thought-stopping first, then centering, then performance cues.
        </p>
      </div>
    </motion.div>
  );
}

function WhenToUseItem({
  technique,
  index,
  scrollProgress,
}: {
  technique: typeof REFOCUS_TECHNIQUES[0];
  index: number;
  scrollProgress: any;
}) {
  const start = 0.65 + index * 0.03;
  const end = start + 0.04;
  const opacity = useTransform(scrollProgress, [start, end], [0, 1]);
  const x = useTransform(scrollProgress, [start, end], [-20, 0]);

  return (
    <motion.div
      style={{ opacity, x }}
      className="flex items-center gap-4 p-4 bg-[#1a1a1a] border border-gray-800 rounded-xl"
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
        style={{ backgroundColor: `${technique.color}20` }}
      >
        {technique.icon}
      </div>
      <div>
        <p className="font-bold" style={{ color: technique.color }}>{technique.name}</p>
        <p className="text-gray-500 text-sm">{technique.when}</p>
      </div>
    </motion.div>
  );
}

// ============================================
// SECTION 2: Attention Dimensions
// ============================================

const ATTENTION_QUADRANTS = [
  {
    type: "Broad External",
    position: "top-left",
    icon: "🔭",
    color: "#0EF0EB",
    description: "Scanning environment, reading opponents",
    examples: "Map awareness, team positioning, enemy movements",
  },
  {
    type: "Broad Internal",
    position: "top-right",
    icon: "🧠",
    color: "#F6F400",
    description: "Planning strategy, analyzing options",
    examples: "Game plan, adapting strategy, decision making",
  },
  {
    type: "Narrow External",
    position: "bottom-left",
    icon: "🎯",
    color: "#F6F400",
    description: "Focus on specific target or object",
    examples: "Crosshair placement, ability timing, last-hitting",
  },
  {
    type: "Narrow Internal",
    position: "bottom-right",
    icon: "🫀",
    color: "#0EF0EB",
    description: "Body awareness, technique focus",
    examples: "Mouse grip, posture check, breathing",
  },
];

function AttentionDimensionsScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <div ref={containerRef} className="min-h-[800vh] relative">
      {/* Section 1: Introduction */}
      <div className="h-screen sticky top-0 flex items-center justify-center overflow-hidden">
        <AttentionIntro scrollProgress={scrollYProgress} />
      </div>

      {/* Section 2: The Two Axes */}
      <div className="h-screen sticky top-0 flex items-center justify-center overflow-hidden">
        <TwoAxes scrollProgress={scrollYProgress} />
      </div>

      {/* Section 3: The Quadrant */}
      <div className="h-screen sticky top-0 flex items-center justify-center overflow-hidden">
        <AttentionQuadrant scrollProgress={scrollYProgress} />
      </div>

      {/* Section 4: Shifting Attention */}
      <div className="h-screen sticky top-0 flex items-center justify-center overflow-hidden">
        <ShiftingAttention scrollProgress={scrollYProgress} />
      </div>

      {/* Section 5: Scientific Foundation */}
      <div className="h-screen sticky top-0 flex items-center justify-center overflow-hidden">
        <AttentionScience scrollProgress={scrollYProgress} />
      </div>
    </div>
  );
}

function AttentionIntro({ scrollProgress }: { scrollProgress: any }) {
  const opacity = useTransform(scrollProgress, [0, 0.02, 0.12, 0.14], [0, 1, 1, 0]);
  const y = useTransform(scrollProgress, [0, 0.02], [50, 0]);

  return (
    <motion.div style={{ opacity }} className="text-center px-6 max-w-4xl mx-auto">
      <motion.div style={{ y }}>
        <span className="inline-block px-4 py-2 bg-[#F6F400]/20 text-[#F6F400] text-sm font-medium rounded-full mb-6">
          4.2 Attention Dimensions
        </span>

        <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
          Where Is Your Focus?
        </h2>

        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Attention isn't one thing — it has <span className="text-white">dimensions</span>.
          Understanding them helps you focus on <span className="text-[#0EF0EB]">the right things</span> at the right time.
        </p>
      </motion.div>
    </motion.div>
  );
}

function TwoAxes({ scrollProgress }: { scrollProgress: any }) {
  const opacity = useTransform(scrollProgress, [0.12, 0.14, 0.30, 0.32], [0, 1, 1, 0]);

  return (
    <motion.div style={{ opacity }} className="px-6 max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold text-white mb-8 text-center">
        Nideffer's Two Dimensions
      </h3>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Width: Broad vs Narrow */}
        <div className="p-6 bg-[#1a1a1a] border border-gray-800 rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">↔️</span>
            <h4 className="text-xl font-bold text-white">Width</h4>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#0EF0EB]" />
              <div>
                <p className="text-[#0EF0EB] font-medium">Broad</p>
                <p className="text-gray-500 text-sm">Taking in many things at once</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#F6F400]" />
              <div>
                <p className="text-[#F6F400] font-medium">Narrow</p>
                <p className="text-gray-500 text-sm">Focusing on one specific thing</p>
              </div>
            </div>
          </div>
        </div>

        {/* Direction: Internal vs External */}
        <div className="p-6 bg-[#1a1a1a] border border-gray-800 rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🔄</span>
            <h4 className="text-xl font-bold text-white">Direction</h4>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#0EF0EB]" />
              <div>
                <p className="text-[#0EF0EB] font-medium">External</p>
                <p className="text-gray-500 text-sm">Outside world, environment</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#F6F400]" />
              <div>
                <p className="text-[#F6F400] font-medium">Internal</p>
                <p className="text-gray-500 text-sm">Inside, thoughts, body</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function AttentionQuadrant({ scrollProgress }: { scrollProgress: any }) {
  const opacity = useTransform(scrollProgress, [0.30, 0.32, 0.54, 0.56], [0, 1, 1, 0]);

  return (
    <motion.div style={{ opacity }} className="px-6 max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold text-white mb-2 text-center">
        The Four Quadrants
      </h3>
      <p className="text-gray-400 text-center mb-8">
        Different situations require different focus types
      </p>

      {/* 2x2 Grid */}
      <div className="relative max-w-2xl mx-auto">
        {/* Axis labels */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-gray-500 text-sm">EXTERNAL</div>
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-gray-500 text-sm">INTERNAL</div>
        <div className="absolute top-1/2 -left-16 -translate-y-1/2 text-gray-500 text-sm -rotate-90">BROAD</div>
        <div className="absolute top-1/2 -right-16 -translate-y-1/2 text-gray-500 text-sm rotate-90">NARROW</div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-3">
          {ATTENTION_QUADRANTS.map((quadrant, index) => (
            <QuadrantCard
              key={quadrant.type}
              quadrant={quadrant}
              index={index}
              scrollProgress={scrollProgress}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function QuadrantCard({
  quadrant,
  index,
  scrollProgress,
}: {
  quadrant: typeof ATTENTION_QUADRANTS[0];
  index: number;
  scrollProgress: any;
}) {
  const start = 0.34 + index * 0.03;
  const end = start + 0.04;
  const opacity = useTransform(scrollProgress, [start, end], [0, 1]);
  const scale = useTransform(scrollProgress, [start, end], [0.9, 1]);

  return (
    <motion.div style={{ opacity, scale }}>
      <div
        className="p-4 rounded-xl border-2 h-full"
        style={{
          backgroundColor: `${quadrant.color}10`,
          borderColor: `${quadrant.color}40`,
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">{quadrant.icon}</span>
          <span className="text-sm font-bold" style={{ color: quadrant.color }}>
            {quadrant.type}
          </span>
        </div>
        <p className="text-gray-300 text-sm mb-2">{quadrant.description}</p>
        <p className="text-gray-500 text-xs">{quadrant.examples}</p>
      </div>
    </motion.div>
  );
}

function ShiftingAttention({ scrollProgress }: { scrollProgress: any }) {
  const opacity = useTransform(scrollProgress, [0.54, 0.56, 0.74, 0.76], [0, 1, 1, 0]);

  return (
    <motion.div style={{ opacity }} className="px-6 max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold text-white mb-4 text-center">
        Shifting Between Quadrants
      </h3>
      <p className="text-gray-400 text-center mb-8">
        Elite players smoothly transition their focus based on the moment
      </p>

      {/* Example sequence */}
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-6">
        <p className="text-gray-400 text-sm mb-4">Example: A round in a competitive FPS</p>

        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <div className="w-24 text-right text-gray-500 text-sm">Round start</div>
            <div className="w-3 h-3 rounded-full bg-[#0EF0EB]" />
            <div className="flex-1">
              <span className="text-[#0EF0EB] font-medium">Broad External</span>
              <span className="text-gray-500 text-sm ml-2">— Check minimap, team positions</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-24 text-right text-gray-500 text-sm">Contact</div>
            <div className="w-3 h-3 rounded-full bg-[#F6F400]" />
            <div className="flex-1">
              <span className="text-[#F6F400] font-medium">Narrow External</span>
              <span className="text-gray-500 text-sm ml-2">— Crosshair on target</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-24 text-right text-gray-500 text-sm">After kill</div>
            <div className="w-3 h-3 rounded-full bg-[#0EF0EB]" />
            <div className="flex-1">
              <span className="text-[#0EF0EB] font-medium">Broad External</span>
              <span className="text-gray-500 text-sm ml-2">— Scan for next threat</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-24 text-right text-gray-500 text-sm">Post-round</div>
            <div className="w-3 h-3 rounded-full bg-[#F6F400]" />
            <div className="flex-1">
              <span className="text-[#F6F400] font-medium">Broad Internal</span>
              <span className="text-gray-500 text-sm ml-2">— Analyze, plan next round</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function AttentionScience({ scrollProgress }: { scrollProgress: any }) {
  const opacity = useTransform(scrollProgress, [0.74, 0.76, 0.92, 0.94], [0, 1, 1, 0]);
  const y = useTransform(scrollProgress, [0.74, 0.76], [30, 0]);

  return (
    <motion.div style={{ opacity }} className="px-6 max-w-3xl mx-auto">
      <motion.div style={{ y }}>
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#F6F400]/20 text-[#F6F400] text-sm font-medium rounded-full">
            <span>🔬</span>
            <span>Scientific Foundation</span>
          </span>
        </div>

        <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-6 mb-6">
          <p className="text-gray-300 leading-relaxed mb-4">
            Research shows that an <strong className="text-[#0EF0EB]">external focus of attention</strong> promotes
            automatic control of actions, preventing the motor system from being constrained by conscious cognitive control.
          </p>
          <p className="text-gray-300 leading-relaxed">
            This leads to better <strong className="text-[#F6F400]">movement economy</strong> and performance.
          </p>
        </div>

        <div className="text-center text-gray-500 text-sm mb-6">
          Source: Constrained Action Hypothesis
        </div>

        <div className="flex items-start gap-3 p-4 bg-[#0EF0EB]/10 border border-[#0EF0EB]/30 rounded-xl">
          <span className="text-2xl">💡</span>
          <p className="text-gray-300">
            <strong className="text-white">Key insight:</strong> During execution, focus externally
            (on the target, the ball, the effect) rather than internally (on your technique).
            Save internal focus for practice.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ============================================
// Key Takeaways & CTA
// ============================================

function KeyTakeaways() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.3], [50, 0]);

  const takeaways = [
    {
      icon: "🔄",
      title: "Focus Bounces Back",
      description: "It's not about never losing focus — it's about returning faster",
    },
    {
      icon: "🛠️",
      title: "Three Tools",
      description: "Thought-stopping, centering, and performance cues",
    },
    {
      icon: "🎯",
      title: "Four Quadrants",
      description: "Match your attention type to the moment",
    },
  ];

  return (
    <div ref={ref} className="min-h-screen flex items-center justify-center py-20 px-6">
      <motion.div style={{ opacity, y }} className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-white mb-4">
          Key Takeaways
        </h2>
        <p className="text-xl text-gray-400 text-center mb-12">
          Master your attention
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {takeaways.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-6 bg-[#1a1a1a] border border-gray-800 rounded-2xl hover:border-[#0EF0EB]/50 transition-colors"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function NextModuleCTA({ nextModuleId }: { nextModuleId?: string | null }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);

  return (
    <div ref={ref} className="min-h-[70vh] flex items-center justify-center py-20 px-6">
      <motion.div style={{ opacity, scale }} className="text-center">
        <div className="mb-8">
          <span className="inline-block px-4 py-2 bg-[#F6F400]/20 text-[#F6F400] rounded-full text-sm font-medium mb-4">
            Module 4 Complete
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Ready for the next step?
          </h2>
          <p className="text-xl text-gray-400 max-w-xl mx-auto">
            In Module 5, you'll learn about controlling the controllables
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={nextModuleId ? `/learn/${nextModuleId}` : "/learn"}
            className="px-8 py-4 bg-[#0EF0EB] text-black font-semibold rounded-xl hover:bg-[#0EF0EB]/90 transition-colors"
          >
            Continue to Module 5
          </Link>
          <Link
            href="/learn"
            className="px-8 py-4 border border-gray-600 text-gray-300 rounded-xl hover:border-gray-400 transition-colors"
          >
            Back to Course Overview
          </Link>
        </div>

        <div className="mt-16 text-gray-600 text-sm">
          ECID - Mental Performance in Esports
        </div>
      </motion.div>
    </div>
  );
}
