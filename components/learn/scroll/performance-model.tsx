"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const PILLARS = [
  {
    name: "Mental",
    icon: "🧠",
    color: "#0EF0EB",
    description: "Focus, confidence, emotional control, resilience under pressure",
  },
  {
    name: "Physical",
    icon: "💪",
    color: "#F6F400",
    description: "Reaction time, endurance, sleep, nutrition, hand-eye coordination",
  },
  {
    name: "Tactical",
    icon: "🎯",
    color: "#0EF0EB",
    description: "Game sense, strategy, adaptation, reading opponents",
  },
  {
    name: "Technical",
    icon: "🎮",
    color: "#F6F400",
    description: "Mechanics, precision, muscle memory, execution speed",
  },
];

const LEARNING_OBJECTIVES = [
  "Understand that performance loss is almost always present",
  "Identify mental factors that cause performance loss",
  "Gain insight into uncontrollable factors (coaches, opponents, referees)",
];

export function PerformanceModelScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <div ref={containerRef} className="min-h-[800vh] relative">
      {/* Section 1: Title and Formula */}
      <div className="h-screen sticky top-0 flex items-center justify-center overflow-hidden">
        <TitleAndFormula scrollProgress={scrollYProgress} />
      </div>

      {/* Section 2: The Invisible Gap */}
      <div className="h-screen sticky top-0 flex items-center justify-center overflow-hidden">
        <TheInvisibleGap scrollProgress={scrollYProgress} />
      </div>

      {/* Section 3: Learning Objectives */}
      <div className="h-screen sticky top-0 flex items-center justify-center overflow-hidden">
        <LearningObjectives scrollProgress={scrollYProgress} />
      </div>

      {/* Section 3: Four Pillars */}
      <div className="h-screen sticky top-0 flex items-center justify-center overflow-hidden">
        <FourPillars scrollProgress={scrollYProgress} />
      </div>

      {/* Section 4: Scientific Foundation */}
      <div className="h-screen sticky top-0 flex items-center justify-center overflow-hidden">
        <ScientificFoundation scrollProgress={scrollYProgress} />
      </div>
    </div>
  );
}

function TitleAndFormula({ scrollProgress }: { scrollProgress: any }) {
  const opacity = useTransform(scrollProgress, [0, 0.02, 0.10, 0.12], [0, 1, 1, 0]);
  const y = useTransform(scrollProgress, [0, 0.02], [50, 0]);

  return (
    <motion.div style={{ opacity }} className="text-center px-6 max-w-4xl mx-auto">
      <motion.div style={{ y }}>
        {/* Section badge */}
        <span className="inline-block px-4 py-2 bg-[#0EF0EB]/20 text-[#0EF0EB] text-sm font-medium rounded-full mb-6">
          1.1 Performance Model
        </span>

        <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
          The Performance Model
        </h2>

        {/* Core Formula */}
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-8 mb-8">
          <p className="text-gray-400 text-sm uppercase tracking-wider mb-4">Core Formula</p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-2xl md:text-3xl font-mono">
            <span className="text-[#0EF0EB] font-bold">Performance</span>
            <span className="text-gray-500">=</span>
            <span className="text-white">Potential</span>
            <span className="text-red-400">−</span>
            <span className="text-red-400">Loss</span>
          </div>
        </div>

        <p className="text-xl text-gray-400">
          Understanding this formula is key to improving your game
        </p>
      </motion.div>
    </motion.div>
  );
}

function TheInvisibleGap({ scrollProgress }: { scrollProgress: any }) {
  const opacity = useTransform(scrollProgress, [0.10, 0.12, 0.24, 0.26], [0, 1, 1, 0]);

  // Animated bar widths
  const practiceWidth = useTransform(scrollProgress, [0.12, 0.16], [0, 100]);
  const practiceWidthPercent = useTransform(practiceWidth, (v) => `${v}%`);
  const tournamentWidth = useTransform(scrollProgress, [0.16, 0.20], [0, 73]);
  const tournamentWidthPercent = useTransform(tournamentWidth, (v) => `${v}%`);
  const gapOpacity = useTransform(scrollProgress, [0.18, 0.20], [0, 1]);
  const insightOpacity = useTransform(scrollProgress, [0.20, 0.22], [0, 1]);

  return (
    <motion.div style={{ opacity }} className="px-6 max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
          The Invisible Gap
        </h3>
        <p className="text-gray-400">
          What separates practice from competition
        </p>
      </div>

      {/* The two perspectives */}
      <div className="space-y-8 mb-10">
        {/* What coaches see */}
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">👁️</span>
            <span className="text-gray-400 text-sm uppercase tracking-wider">What coaches see in practice</span>
          </div>
          <div className="relative h-12 bg-gray-900 rounded-lg overflow-hidden">
            <motion.div
              style={{ width: practiceWidthPercent }}
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#0EF0EB] to-[#0EF0EB]/70 rounded-lg"
            />
            <div className="absolute inset-0 flex items-center justify-end pr-4">
              <span className="text-white font-bold text-lg">100%</span>
            </div>
          </div>
          <p className="text-gray-500 text-sm mt-2">True potential — the plays they hit every day</p>
        </div>

        {/* What scouts see */}
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">🎬</span>
            <span className="text-gray-400 text-sm uppercase tracking-wider">What scouts see in tournaments</span>
          </div>
          <div className="relative h-12 bg-gray-900 rounded-lg overflow-hidden">
            <motion.div
              style={{ width: tournamentWidthPercent }}
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#F6F400] to-[#F6F400]/70 rounded-lg"
            />
            <div className="absolute inset-0 flex items-center justify-end pr-4">
              <span className="text-white font-bold text-lg">73%</span>
            </div>
          </div>
          <p className="text-gray-500 text-sm mt-2">Measured performance — under pressure, on stage</p>
        </div>
      </div>

      {/* The gap reveal */}
      <motion.div style={{ opacity: gapOpacity }} className="text-center mb-8">
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-red-500/10 border border-red-500/30 rounded-full">
          <span className="text-red-400 font-bold text-xl">27%</span>
          <span className="text-gray-300">Performance Loss</span>
        </div>
      </motion.div>

      {/* The insight */}
      <motion.div style={{ opacity: insightOpacity }} className="space-y-4">
        <div className="bg-gradient-to-r from-[#0EF0EB]/10 to-[#F6F400]/10 border border-[#0EF0EB]/30 rounded-2xl p-6">
          <p className="text-xl text-center text-white leading-relaxed">
            The players who become <strong className="text-[#F6F400]">legends</strong> aren't always the most talented.
          </p>
          <p className="text-xl text-center text-white leading-relaxed mt-2">
            They're the ones who <strong className="text-[#0EF0EB]">lose the least</strong> when pressure is highest.
          </p>
        </div>

        <p className="text-center text-gray-400">
          Learning to close this gap is what separates <span className="text-white">finalists</span> from <span className="text-[#F6F400]">champions</span>.
        </p>
      </motion.div>
    </motion.div>
  );
}

function LearningObjectives({ scrollProgress }: { scrollProgress: any }) {
  const opacity = useTransform(scrollProgress, [0.24, 0.26, 0.38, 0.40], [0, 1, 1, 0]);

  return (
    <motion.div style={{ opacity }} className="px-6 max-w-3xl mx-auto">
      <h3 className="text-2xl font-bold text-white mb-8 text-center">
        Learning Objectives
      </h3>

      <div className="space-y-4">
        {LEARNING_OBJECTIVES.map((objective, index) => (
          <ObjectiveItem
            key={index}
            objective={objective}
            index={index}
            scrollProgress={scrollProgress}
          />
        ))}
      </div>
    </motion.div>
  );
}

function ObjectiveItem({
  objective,
  index,
  scrollProgress,
}: {
  objective: string;
  index: number;
  scrollProgress: any;
}) {
  const start = 0.25 + index * 0.02;
  const end = start + 0.03;
  const opacity = useTransform(scrollProgress, [start, end], [0, 1]);
  const x = useTransform(scrollProgress, [start, end], [-30, 0]);

  return (
    <motion.div
      style={{ opacity, x }}
      className="flex items-start gap-4 p-4 bg-[#1a1a1a] border border-gray-800 rounded-xl"
    >
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#0EF0EB]/20 flex items-center justify-center">
        <span className="text-[#0EF0EB] font-bold text-sm">{index + 1}</span>
      </div>
      <p className="text-gray-300 text-lg">{objective}</p>
    </motion.div>
  );
}

function FourPillars({ scrollProgress }: { scrollProgress: any }) {
  const opacity = useTransform(scrollProgress, [0.38, 0.40, 0.54, 0.56], [0, 1, 1, 0]);

  return (
    <motion.div style={{ opacity }} className="px-6 w-full max-w-5xl mx-auto">
      <h3 className="text-2xl font-bold text-white mb-8 text-center">
        Four Pillars of Performance
      </h3>

      {/* Center circle */}
      <div className="relative">
        <CenterCircle scrollProgress={scrollProgress} />

        {/* Four pillars grid */}
        <div className="grid grid-cols-2 gap-6 md:gap-12">
          {PILLARS.map((pillar, index) => (
            <PillarCard
              key={pillar.name}
              pillar={pillar}
              index={index}
              scrollProgress={scrollProgress}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function CenterCircle({ scrollProgress }: { scrollProgress: any }) {
  const scale = useTransform(scrollProgress, [0.40, 0.43], [0, 1]);
  const opacity = useTransform(scrollProgress, [0.40, 0.43], [0, 1]);

  return (
    <motion.div
      style={{ scale, opacity }}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:flex"
    >
      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#0EF0EB]/20 to-[#F6F400]/20 border-2 border-[#0EF0EB] flex flex-col items-center justify-center">
        <span className="text-xs text-gray-400">PEAK</span>
        <span className="text-sm font-bold text-white">PERFORMANCE</span>
      </div>
    </motion.div>
  );
}

function PillarCard({
  pillar,
  index,
  scrollProgress,
}: {
  pillar: typeof PILLARS[0];
  index: number;
  scrollProgress: any;
}) {
  const start = 0.41 + index * 0.02;
  const end = start + 0.03;
  const opacity = useTransform(scrollProgress, [start, end], [0, 1]);
  const x = useTransform(scrollProgress, [start, end], [index % 2 === 0 ? -50 : 50, 0]);
  const scale = useTransform(scrollProgress, [start, end], [0.9, 1]);

  return (
    <motion.div style={{ opacity, x, scale }}>
      <div
        className="p-5 rounded-2xl border-2 transition-all duration-300 hover:scale-105"
        style={{
          backgroundColor: `${pillar.color}10`,
          borderColor: `${pillar.color}40`,
        }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
            style={{ backgroundColor: `${pillar.color}20` }}
          >
            {pillar.icon}
          </div>
          <h4 className="text-xl font-bold" style={{ color: pillar.color }}>
            {pillar.name}
          </h4>
        </div>
        <p className="text-gray-400 text-sm">{pillar.description}</p>
      </div>
    </motion.div>
  );
}

function ScientificFoundation({ scrollProgress }: { scrollProgress: any }) {
  const opacity = useTransform(scrollProgress, [0.54, 0.56, 0.72, 0.74], [0, 1, 1, 0]);
  const y = useTransform(scrollProgress, [0.54, 0.56], [30, 0]);

  return (
    <motion.div style={{ opacity }} className="px-6 max-w-3xl mx-auto">
      <motion.div style={{ y }}>
        {/* Scientific badge */}
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#F6F400]/20 text-[#F6F400] text-sm font-medium rounded-full">
            <span>🔬</span>
            <span>Scientific Foundation</span>
          </span>
        </div>

        {/* Main statistic */}
        <div className="text-center mb-8">
          <div className="text-7xl md:text-8xl font-bold text-[#0EF0EB] mb-4">60%</div>
          <p className="text-xl text-gray-300">
            Average control athletes have over the final result
          </p>
        </div>

        {/* Explanation */}
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-6">
          <p className="text-gray-300 leading-relaxed">
            Research shows that athletes have on average only <strong className="text-[#0EF0EB]">60% control</strong> over
            the final result. The remaining factors—<strong className="text-[#F6F400]">teammates, opponents,
            circumstances</strong>—are beyond direct control but still influence the outcome for which
            they are held accountable.
          </p>
        </div>

        {/* Key insight */}
        <div className="mt-6 flex items-start gap-3 p-4 bg-[#0EF0EB]/10 border border-[#0EF0EB]/30 rounded-xl">
          <span className="text-2xl">💡</span>
          <p className="text-gray-300">
            <strong className="text-white">Key Insight:</strong> Focus on what you can control—your
            mental preparation, physical condition, and technical execution—rather than external factors.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
