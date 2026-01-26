"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const CYCLE_STEPS = [
  { label: "High Pressure", icon: "⚡", color: "#F6F400" },
  { label: "Self-Focus", icon: "👁️", color: "#0EF0EB" },
  { label: "Overthinking", icon: "🤔", color: "#0EF0EB" },
  { label: "Disruption", icon: "⚠️", color: "#ff6b6b" },
  { label: "Decline", icon: "📉", color: "#ff6b6b" },
  { label: "Anxiety", icon: "😰", color: "#F6F400" },
];

const LEARNING_OBJECTIVES = [
  "Recognize the symptoms of choking",
  "Understand the two main theories: distraction theory and self-focus theory",
  "Gain insight into physiological responses to performance pressure",
];

const THEORIES = [
  {
    name: "Distraction Theory",
    icon: "🎯",
    color: "#0EF0EB",
    description: "Pressure creates distracting thoughts that compete for attention, reducing focus on the task at hand.",
  },
  {
    name: "Self-Focus Theory",
    icon: "👁️",
    color: "#F6F400",
    description: "Pressure causes hyper-awareness of movements that should be automatic, disrupting well-learned skills.",
  },
];

export function ChokingCycleScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <div ref={containerRef} className="min-h-[700vh] relative">
      {/* Section 1: Definition */}
      <div className="h-screen sticky top-0 flex items-center justify-center overflow-hidden">
        <Definition scrollProgress={scrollYProgress} />
      </div>

      {/* Section 2: Learning Objectives */}
      <div className="h-screen sticky top-0 flex items-center justify-center overflow-hidden">
        <LearningObjectives scrollProgress={scrollYProgress} />
      </div>

      {/* Section 3: The Two Theories */}
      <div className="h-screen sticky top-0 flex items-center justify-center overflow-hidden">
        <TwoTheories scrollProgress={scrollYProgress} />
      </div>

      {/* Section 4: The Cycle Visualization */}
      <div className="h-screen sticky top-0 flex items-center justify-center overflow-hidden">
        <CycleVisualization scrollProgress={scrollYProgress} />
      </div>

      {/* Section 5: Scientific Foundation */}
      <div className="h-screen sticky top-0 flex items-center justify-center overflow-hidden">
        <ScientificFoundation scrollProgress={scrollYProgress} />
      </div>
    </div>
  );
}

function Definition({ scrollProgress }: { scrollProgress: any }) {
  const opacity = useTransform(scrollProgress, [0, 0.02, 0.12, 0.14], [0, 1, 1, 0]);
  const y = useTransform(scrollProgress, [0, 0.02], [50, 0]);

  return (
    <motion.div style={{ opacity }} className="text-center px-6 max-w-4xl mx-auto">
      <motion.div style={{ y }}>
        {/* Section badge */}
        <span className="inline-block px-4 py-2 bg-red-500/20 text-red-400 text-sm font-medium rounded-full mb-6">
          1.2 Choking Under Pressure
        </span>

        <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
          Choking Under Pressure
        </h2>

        {/* Definition box */}
        <div className="bg-[#1a1a1a] border border-red-500/30 rounded-2xl p-8 mb-8">
          <p className="text-gray-400 text-sm uppercase tracking-wider mb-4">Definition</p>
          <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">
            A <strong className="text-red-400">significant performance decrease</strong> below
            normal levels when <strong className="text-[#F6F400]">pressure is high</strong>.
          </p>
        </div>

        <p className="text-xl text-gray-400">
          It happens to everyone—understanding why is the first step to overcoming it
        </p>
      </motion.div>
    </motion.div>
  );
}

function LearningObjectives({ scrollProgress }: { scrollProgress: any }) {
  const opacity = useTransform(scrollProgress, [0.12, 0.14, 0.26, 0.28], [0, 1, 1, 0]);

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
  const start = 0.13 + index * 0.02;
  const end = start + 0.03;
  const opacity = useTransform(scrollProgress, [start, end], [0, 1]);
  const x = useTransform(scrollProgress, [start, end], [-30, 0]);

  return (
    <motion.div
      style={{ opacity, x }}
      className="flex items-start gap-4 p-4 bg-[#1a1a1a] border border-gray-800 rounded-xl"
    >
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
        <span className="text-red-400 font-bold text-sm">{index + 1}</span>
      </div>
      <p className="text-gray-300 text-lg">{objective}</p>
    </motion.div>
  );
}

function TwoTheories({ scrollProgress }: { scrollProgress: any }) {
  const opacity = useTransform(scrollProgress, [0.26, 0.28, 0.42, 0.44], [0, 1, 1, 0]);

  return (
    <motion.div style={{ opacity }} className="px-6 max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold text-white mb-4 text-center">
        Two Main Theories
      </h3>
      <p className="text-gray-400 text-center mb-8">
        Scientists explain choking through two complementary theories
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {THEORIES.map((theory, index) => (
          <TheoryCard
            key={theory.name}
            theory={theory}
            index={index}
            scrollProgress={scrollProgress}
          />
        ))}
      </div>

      {/* Connection note */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-8 text-center"
      >
        <p className="text-gray-500 text-sm">
          Both theories can occur simultaneously, amplifying the effect
        </p>
      </motion.div>
    </motion.div>
  );
}

function TheoryCard({
  theory,
  index,
  scrollProgress,
}: {
  theory: typeof THEORIES[0];
  index: number;
  scrollProgress: any;
}) {
  const start = 0.29 + index * 0.03;
  const end = start + 0.04;
  const opacity = useTransform(scrollProgress, [start, end], [0, 1]);
  const y = useTransform(scrollProgress, [start, end], [30, 0]);

  return (
    <motion.div style={{ opacity, y }}>
      <div
        className="p-6 rounded-2xl border-2 h-full"
        style={{
          backgroundColor: `${theory.color}10`,
          borderColor: `${theory.color}40`,
        }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
            style={{ backgroundColor: `${theory.color}20` }}
          >
            {theory.icon}
          </div>
          <h4 className="text-xl font-bold" style={{ color: theory.color }}>
            {theory.name}
          </h4>
        </div>
        <p className="text-gray-300">{theory.description}</p>
      </div>
    </motion.div>
  );
}

function CycleVisualization({ scrollProgress }: { scrollProgress: any }) {
  const opacity = useTransform(scrollProgress, [0.42, 0.44, 0.60, 0.62], [0, 1, 1, 0]);

  return (
    <motion.div style={{ opacity }} className="px-6 max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold text-white mb-2 text-center">
        The Vicious Cycle
      </h3>
      <p className="text-gray-400 text-center mb-8">
        Once triggered, choking can become a self-reinforcing loop
      </p>

      {/* Cycle diagram */}
      <div className="relative h-[350px] md:h-[400px]">
        {/* Circular background */}
        <CircularArrow scrollProgress={scrollProgress} />

        {/* Steps */}
        {CYCLE_STEPS.map((step, index) => (
          <CycleStep
            key={step.label}
            step={step}
            index={index}
            total={CYCLE_STEPS.length}
            scrollProgress={scrollProgress}
          />
        ))}

        {/* Center */}
        <CenterWarning scrollProgress={scrollProgress} />
      </div>
    </motion.div>
  );
}

function CircularArrow({ scrollProgress }: { scrollProgress: any }) {
  const rotation = useTransform(scrollProgress, [0.44, 0.60], [0, 180]);
  const opacity = useTransform(scrollProgress, [0.44, 0.48], [0, 0.3]);

  return (
    <motion.div
      style={{ opacity }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
    >
      <motion.svg
        style={{ rotate: rotation }}
        width="300"
        height="300"
        viewBox="0 0 300 300"
        className="w-[250px] h-[250px] md:w-[300px] md:h-[300px]"
      >
        <circle
          cx="150"
          cy="150"
          r="120"
          fill="none"
          stroke="#ff6b6b"
          strokeWidth="2"
          strokeDasharray="15 8"
        />
      </motion.svg>
    </motion.div>
  );
}

function CycleStep({
  step,
  index,
  total,
  scrollProgress,
}: {
  step: typeof CYCLE_STEPS[0];
  index: number;
  total: number;
  scrollProgress: any;
}) {
  const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
  const radius = 140;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;

  const start = 0.45 + index * 0.015;
  const end = start + 0.025;
  const opacity = useTransform(scrollProgress, [start, end], [0, 1]);
  const scale = useTransform(scrollProgress, [start, end], [0.5, 1]);

  return (
    <motion.div
      style={{
        opacity,
        scale,
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
      }}
      className="absolute -translate-x-1/2 -translate-y-1/2"
    >
      <div
        className="p-3 rounded-xl border text-center w-24 md:w-28"
        style={{
          backgroundColor: `${step.color}15`,
          borderColor: `${step.color}40`,
        }}
      >
        <div className="text-xl md:text-2xl mb-1">{step.icon}</div>
        <span className="text-xs font-bold" style={{ color: step.color }}>
          {step.label}
        </span>
      </div>
    </motion.div>
  );
}

function CenterWarning({ scrollProgress }: { scrollProgress: any }) {
  const opacity = useTransform(scrollProgress, [0.54, 0.56], [0, 1]);
  const scale = useTransform(scrollProgress, [0.54, 0.56], [0.8, 1]);

  return (
    <motion.div
      style={{ opacity, scale }}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-red-500/20 border-2 border-red-500/50 flex flex-col items-center justify-center">
        <span className="text-xs text-red-400 font-bold">CYCLE</span>
        <span className="text-xs text-red-400 font-bold">REPEATS</span>
      </div>
    </motion.div>
  );
}

function ScientificFoundation({ scrollProgress }: { scrollProgress: any }) {
  const opacity = useTransform(scrollProgress, [0.60, 0.62, 0.78, 0.80], [0, 1, 1, 0]);
  const y = useTransform(scrollProgress, [0.60, 0.62], [30, 0]);

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

        <h3 className="text-2xl font-bold text-white mb-6 text-center">
          What Happens in the Brain
        </h3>

        {/* Main explanation */}
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-6 mb-6">
          <p className="text-gray-300 leading-relaxed mb-4">
            Meta-analyses show that choking arises from a <strong className="text-red-400">disruption of
            neural efficiency</strong> and coordination of motor networks.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Increased <strong className="text-[#0EF0EB]">self-monitoring</strong> and <strong className="text-[#F6F400]">worry</strong> disturb
            optimized neural systems, leading to <strong className="text-red-400">inefficient motor control</strong>.
          </p>
        </div>

        {/* Source */}
        <div className="text-center text-gray-500 text-sm mb-6">
          Source: Frontiers in Psychology, 2024
        </div>

        {/* Key insight */}
        <div className="flex items-start gap-3 p-4 bg-[#0EF0EB]/10 border border-[#0EF0EB]/30 rounded-xl">
          <span className="text-2xl">💡</span>
          <p className="text-gray-300">
            <strong className="text-white">Key Insight:</strong> Breaking this cycle requires
            specific techniques to reduce self-focus and manage physiological arousal—covered in Module 2.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
