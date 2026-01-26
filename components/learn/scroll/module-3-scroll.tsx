"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ScrollHero } from "./scroll-hero";

interface Module3ScrollPageProps {
  nextModuleId?: string | null;
}

export function Module3ScrollPage({ nextModuleId }: Module3ScrollPageProps) {
  return (
    <div className="bg-[#0a0a0a] text-white">
      {/* Fixed navigation */}
      <FixedNav />

      {/* Progress bar */}
      <ScrollProgressBar />

      {/* Hero section */}
      <ScrollHero
        moduleNumber={3}
        title="Managing Thoughts"
        subtitle="Negative thinking patterns and attribution training"
      />

      {/* Negative Thinking section */}
      <NegativeThinkingScroll />

      {/* Attribution Training section */}
      <AttributionTrainingScroll />

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
      className="fixed top-[60px] left-0 right-0 h-1 bg-gradient-to-r from-[#0EF0EB] to-[#F6F400] origin-left z-50"
    />
  );
}

// ============================================
// SECTION 1: Negative Thinking
// ============================================

const THOUGHT_CYCLE_STEPS = [
  { label: "Negative Thought", icon: "💭", color: "#ff6b6b" },
  { label: "Fight It", icon: "⚔️", color: "#F6F400" },
  { label: "Thought Grows", icon: "📈", color: "#ff6b6b" },
  { label: "More Fighting", icon: "😤", color: "#F6F400" },
  { label: "Overwhelm", icon: "🌊", color: "#ff6b6b" },
];

const MINDFUL_STEPS = [
  {
    step: "Notice",
    icon: "👁️",
    description: "Recognize the thought appearing",
    example: "\"I notice I'm having the thought that I'll miss this shot\"",
  },
  {
    step: "Label",
    icon: "🏷️",
    description: "Name it as just a thought",
    example: "\"That's just a thought, not reality\"",
  },
  {
    step: "Release",
    icon: "🎈",
    description: "Let it pass without engaging",
    example: "\"I don't need to fight this or believe it\"",
  },
  {
    step: "Refocus",
    icon: "🎯",
    description: "Return attention to the task",
    example: "\"Back to what I can control right now\"",
  },
];

function NegativeThinkingScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <div ref={containerRef} className="min-h-[900vh] relative">
      {/* Section 1: Introduction */}
      <div className="h-screen sticky top-0 flex items-center justify-center overflow-hidden">
        <NegativeThinkingIntro scrollProgress={scrollYProgress} />
      </div>

      {/* Section 2: The Core Truth */}
      <div className="h-screen sticky top-0 flex items-center justify-center overflow-hidden">
        <CoreTruth scrollProgress={scrollYProgress} />
      </div>

      {/* Section 3: The Vicious Cycle */}
      <div className="h-screen sticky top-0 flex items-center justify-center overflow-hidden">
        <ViciousCycle scrollProgress={scrollYProgress} />
      </div>

      {/* Section 4: The Alternative */}
      <div className="h-screen sticky top-0 flex items-center justify-center overflow-hidden">
        <TheAlternative scrollProgress={scrollYProgress} />
      </div>

      {/* Section 5: The Mindful Approach */}
      <div className="h-screen sticky top-0 flex items-center justify-center overflow-hidden">
        <MindfulApproach scrollProgress={scrollYProgress} />
      </div>

      {/* Section 6: Key Insight */}
      <div className="h-screen sticky top-0 flex items-center justify-center overflow-hidden">
        <NegativeThinkingInsight scrollProgress={scrollYProgress} />
      </div>
    </div>
  );
}

function NegativeThinkingIntro({ scrollProgress }: { scrollProgress: any }) {
  const opacity = useTransform(scrollProgress, [0, 0.02, 0.10, 0.12], [0, 1, 1, 0]);
  const y = useTransform(scrollProgress, [0, 0.02], [50, 0]);

  return (
    <motion.div style={{ opacity }} className="text-center px-6 max-w-4xl mx-auto">
      <motion.div style={{ y }}>
        <span className="inline-block px-4 py-2 bg-[#0EF0EB]/20 text-[#0EF0EB] text-sm font-medium rounded-full mb-6">
          3.1 Negative Thinking
        </span>

        <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
          The Thought Trap
        </h2>

        <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-8">
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
            "I'm going to miss this shot."
          </p>
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mt-4">
            "We're going to lose."
          </p>
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mt-4">
            "I always choke in big moments."
          </p>
        </div>

        <p className="text-xl text-gray-500 mt-8">
          Sound familiar? Everyone has these thoughts.
        </p>
      </motion.div>
    </motion.div>
  );
}

function CoreTruth({ scrollProgress }: { scrollProgress: any }) {
  const opacity = useTransform(scrollProgress, [0.10, 0.12, 0.24, 0.26], [0, 1, 1, 0]);
  const scale = useTransform(scrollProgress, [0.12, 0.16], [0.9, 1]);

  return (
    <motion.div style={{ opacity }} className="text-center px-6 max-w-4xl mx-auto">
      <motion.div style={{ scale }}>
        <div className="bg-gradient-to-r from-red-500/10 to-[#F6F400]/10 border-2 border-red-500/30 rounded-2xl p-8 md:p-12">
          <p className="text-2xl md:text-4xl font-bold text-white leading-relaxed mb-6">
            It is <span className="text-red-400">impossible</span> to never think negatively.
          </p>
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
            Trying to <span className="text-[#F6F400]">suppress</span> negative thoughts only makes them <span className="text-red-400">stronger</span>.
          </p>
        </div>

        <p className="text-gray-500 mt-8 text-lg">
          This is called the "ironic process theory" — try NOT to think of a pink elephant.
        </p>
      </motion.div>
    </motion.div>
  );
}

function ViciousCycle({ scrollProgress }: { scrollProgress: any }) {
  const opacity = useTransform(scrollProgress, [0.24, 0.26, 0.42, 0.44], [0, 1, 1, 0]);

  return (
    <motion.div style={{ opacity }} className="px-6 max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold text-white mb-2 text-center">
        The Vicious Cycle
      </h3>
      <p className="text-gray-400 text-center mb-8">
        Fighting thoughts creates more thoughts
      </p>

      {/* Cycle visualization */}
      <div className="relative h-[350px] md:h-[400px]">
        {/* Circular background */}
        <ThoughtCycleArrow scrollProgress={scrollProgress} />

        {/* Steps */}
        {THOUGHT_CYCLE_STEPS.map((step, index) => (
          <ThoughtCycleStep
            key={step.label}
            step={step}
            index={index}
            total={THOUGHT_CYCLE_STEPS.length}
            scrollProgress={scrollProgress}
          />
        ))}

        {/* Center */}
        <motion.div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-red-500/20 border-2 border-red-500/50 flex flex-col items-center justify-center">
            <span className="text-2xl">🔄</span>
            <span className="text-xs text-red-400 font-bold">STUCK</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function ThoughtCycleArrow({ scrollProgress }: { scrollProgress: any }) {
  const rotation = useTransform(scrollProgress, [0.28, 0.42], [0, 180]);
  const opacity = useTransform(scrollProgress, [0.26, 0.30], [0, 0.3]);

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

function ThoughtCycleStep({
  step,
  index,
  total,
  scrollProgress,
}: {
  step: typeof THOUGHT_CYCLE_STEPS[0];
  index: number;
  total: number;
  scrollProgress: any;
}) {
  const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
  const radius = 130;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;

  const start = 0.27 + index * 0.02;
  const end = start + 0.03;
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

function TheAlternative({ scrollProgress }: { scrollProgress: any }) {
  const opacity = useTransform(scrollProgress, [0.42, 0.44, 0.56, 0.58], [0, 1, 1, 0]);
  const crossOpacity = useTransform(scrollProgress, [0.46, 0.50], [0, 1]);
  const checkOpacity = useTransform(scrollProgress, [0.50, 0.54], [0, 1]);

  return (
    <motion.div style={{ opacity }} className="text-center px-6 max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold text-white mb-12">
        The Alternative
      </h3>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
        {/* Don't do this */}
        <motion.div style={{ opacity: crossOpacity }} className="text-center">
          <div className="w-20 h-20 rounded-full bg-red-500/20 border-2 border-red-500/50 flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">❌</span>
          </div>
          <p className="text-red-400 font-bold mb-2">Don't Fight It</p>
          <p className="text-gray-500 text-sm max-w-[200px]">
            "Stop thinking that! Be positive!"
          </p>
        </motion.div>

        {/* Arrow */}
        <div className="text-4xl text-gray-600 hidden md:block">→</div>

        {/* Do this */}
        <motion.div style={{ opacity: checkOpacity }} className="text-center">
          <div className="w-20 h-20 rounded-full bg-[#0EF0EB]/20 border-2 border-[#0EF0EB]/50 flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">✓</span>
          </div>
          <p className="text-[#0EF0EB] font-bold mb-2">Observe & Release</p>
          <p className="text-gray-500 text-sm max-w-[200px]">
            "I notice that thought. Now back to the task."
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

function MindfulApproach({ scrollProgress }: { scrollProgress: any }) {
  const opacity = useTransform(scrollProgress, [0.56, 0.58, 0.76, 0.78], [0, 1, 1, 0]);

  return (
    <motion.div style={{ opacity }} className="px-6 max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold text-white mb-2 text-center">
        The 4-Step Approach
      </h3>
      <p className="text-gray-400 text-center mb-8">
        Observe, don't engage
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        {MINDFUL_STEPS.map((item, index) => (
          <MindfulStepCard
            key={item.step}
            item={item}
            index={index}
            scrollProgress={scrollProgress}
          />
        ))}
      </div>
    </motion.div>
  );
}

function MindfulStepCard({
  item,
  index,
  scrollProgress,
}: {
  item: typeof MINDFUL_STEPS[0];
  index: number;
  scrollProgress: any;
}) {
  const start = 0.59 + index * 0.03;
  const end = start + 0.04;
  const opacity = useTransform(scrollProgress, [start, end], [0, 1]);
  const y = useTransform(scrollProgress, [start, end], [20, 0]);

  return (
    <motion.div style={{ opacity, y }}>
      <div className="p-5 bg-[#1a1a1a] border border-gray-800 rounded-2xl h-full">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-[#0EF0EB]/20 flex items-center justify-center">
            <span className="text-xl">{item.icon}</span>
          </div>
          <div>
            <span className="text-[#0EF0EB] font-bold text-lg">{index + 1}. {item.step}</span>
          </div>
        </div>
        <p className="text-gray-300 mb-2">{item.description}</p>
        <p className="text-gray-500 text-sm italic">"{item.example}"</p>
      </div>
    </motion.div>
  );
}

function NegativeThinkingInsight({ scrollProgress }: { scrollProgress: any }) {
  const opacity = useTransform(scrollProgress, [0.76, 0.78, 0.92, 0.94], [0, 1, 1, 0]);
  const y = useTransform(scrollProgress, [0.76, 0.78], [30, 0]);

  return (
    <motion.div style={{ opacity }} className="px-6 max-w-3xl mx-auto">
      <motion.div style={{ y }}>
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#F6F400]/20 text-[#F6F400] text-sm font-medium rounded-full">
            <span>💡</span>
            <span>Key Insight</span>
          </span>
        </div>

        <div className="bg-gradient-to-r from-[#0EF0EB]/10 to-[#F6F400]/10 border border-[#0EF0EB]/30 rounded-2xl p-8 text-center">
          <p className="text-2xl text-white leading-relaxed mb-4">
            Thoughts are like <strong className="text-[#0EF0EB]">clouds passing by</strong>.
          </p>
          <p className="text-xl text-gray-300 leading-relaxed">
            You don't have to <span className="text-red-400">chase</span> them or <span className="text-red-400">fight</span> them.
            Just <span className="text-[#F6F400]">watch them pass</span>.
          </p>
        </div>

        <p className="text-center text-gray-500 mt-6">
          This skill improves with practice — start with low-pressure situations.
        </p>
      </motion.div>
    </motion.div>
  );
}

// ============================================
// SECTION 2: Attribution Training
// ============================================

const ATTRIBUTION_MATRIX = [
  {
    type: "Internal + Stable",
    example: "\"I'm just not talented enough\"",
    outcome: "Helplessness",
    color: "#ff6b6b",
    healthy: false,
  },
  {
    type: "Internal + Unstable",
    example: "\"I didn't prepare well this time\"",
    outcome: "Motivation to improve",
    color: "#0EF0EB",
    healthy: true,
  },
  {
    type: "External + Stable",
    example: "\"The refs always favor them\"",
    outcome: "Victim mentality",
    color: "#ff6b6b",
    healthy: false,
  },
  {
    type: "External + Unstable",
    example: "\"They got lucky that round\"",
    outcome: "Protects confidence",
    color: "#F6F400",
    healthy: true,
  },
];

function AttributionTrainingScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <div ref={containerRef} className="min-h-[800vh] relative">
      {/* Section 1: Introduction */}
      <div className="h-screen sticky top-0 flex items-center justify-center overflow-hidden">
        <AttributionIntro scrollProgress={scrollYProgress} />
      </div>

      {/* Section 2: The Question */}
      <div className="h-screen sticky top-0 flex items-center justify-center overflow-hidden">
        <TheQuestion scrollProgress={scrollYProgress} />
      </div>

      {/* Section 3: Attribution Matrix */}
      <div className="h-screen sticky top-0 flex items-center justify-center overflow-hidden">
        <AttributionMatrix scrollProgress={scrollYProgress} />
      </div>

      {/* Section 4: Healthy Patterns */}
      <div className="h-screen sticky top-0 flex items-center justify-center overflow-hidden">
        <HealthyPatterns scrollProgress={scrollYProgress} />
      </div>

      {/* Section 5: Scientific Foundation */}
      <div className="h-screen sticky top-0 flex items-center justify-center overflow-hidden">
        <AttributionScience scrollProgress={scrollYProgress} />
      </div>
    </div>
  );
}

function AttributionIntro({ scrollProgress }: { scrollProgress: any }) {
  const opacity = useTransform(scrollProgress, [0, 0.02, 0.12, 0.14], [0, 1, 1, 0]);
  const y = useTransform(scrollProgress, [0, 0.02], [50, 0]);

  return (
    <motion.div style={{ opacity }} className="text-center px-6 max-w-4xl mx-auto">
      <motion.div style={{ y }}>
        <span className="inline-block px-4 py-2 bg-[#F6F400]/20 text-[#F6F400] text-sm font-medium rounded-full mb-6">
          3.2 Attribution Training
        </span>

        <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
          The Stories We Tell Ourselves
        </h2>

        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          After every win or loss, we create an explanation.
          <br />
          <span className="text-white">These explanations shape our future performance.</span>
        </p>
      </motion.div>
    </motion.div>
  );
}

function TheQuestion({ scrollProgress }: { scrollProgress: any }) {
  const opacity = useTransform(scrollProgress, [0.12, 0.14, 0.28, 0.30], [0, 1, 1, 0]);

  return (
    <motion.div style={{ opacity }} className="text-center px-6 max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold text-white mb-8">
        Two Questions After Every Outcome
      </h3>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Internal vs External */}
        <div className="p-6 bg-[#1a1a1a] border border-gray-800 rounded-2xl">
          <div className="text-3xl mb-4">🪞</div>
          <h4 className="text-xl font-bold text-[#0EF0EB] mb-3">Internal or External?</h4>
          <p className="text-gray-400 mb-4">Was it because of me, or outside factors?</p>
          <div className="text-left space-y-2 text-sm">
            <p className="text-gray-500">Internal: "I played well/poorly"</p>
            <p className="text-gray-500">External: "They got lucky/unlucky"</p>
          </div>
        </div>

        {/* Stable vs Unstable */}
        <div className="p-6 bg-[#1a1a1a] border border-gray-800 rounded-2xl">
          <div className="text-3xl mb-4">⏰</div>
          <h4 className="text-xl font-bold text-[#F6F400] mb-3">Stable or Unstable?</h4>
          <p className="text-gray-400 mb-4">Will this always be true, or can it change?</p>
          <div className="text-left space-y-2 text-sm">
            <p className="text-gray-500">Stable: "I'm just not good enough"</p>
            <p className="text-gray-500">Unstable: "I didn't prepare enough this time"</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function AttributionMatrix({ scrollProgress }: { scrollProgress: any }) {
  const opacity = useTransform(scrollProgress, [0.28, 0.30, 0.52, 0.54], [0, 1, 1, 0]);

  return (
    <motion.div style={{ opacity }} className="px-6 max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold text-white mb-2 text-center">
        The Attribution Matrix
      </h3>
      <p className="text-gray-400 text-center mb-8">
        How we explain failure affects our future
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        {ATTRIBUTION_MATRIX.map((item, index) => (
          <AttributionCard
            key={item.type}
            item={item}
            index={index}
            scrollProgress={scrollProgress}
          />
        ))}
      </div>
    </motion.div>
  );
}

function AttributionCard({
  item,
  index,
  scrollProgress,
}: {
  item: typeof ATTRIBUTION_MATRIX[0];
  index: number;
  scrollProgress: any;
}) {
  const start = 0.32 + index * 0.03;
  const end = start + 0.04;
  const opacity = useTransform(scrollProgress, [start, end], [0, 1]);
  const scale = useTransform(scrollProgress, [start, end], [0.9, 1]);

  return (
    <motion.div style={{ opacity, scale }}>
      <div
        className="p-5 rounded-2xl border-2 h-full"
        style={{
          backgroundColor: `${item.color}10`,
          borderColor: `${item.color}40`,
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-bold" style={{ color: item.color }}>
            {item.type}
          </span>
          {item.healthy ? (
            <span className="text-xs px-2 py-1 bg-[#0EF0EB]/20 text-[#0EF0EB] rounded-full">Healthy</span>
          ) : (
            <span className="text-xs px-2 py-1 bg-red-500/20 text-red-400 rounded-full">Harmful</span>
          )}
        </div>
        <p className="text-gray-300 italic mb-3">"{item.example}"</p>
        <p className="text-gray-500 text-sm">→ {item.outcome}</p>
      </div>
    </motion.div>
  );
}

function HealthyPatterns({ scrollProgress }: { scrollProgress: any }) {
  const opacity = useTransform(scrollProgress, [0.52, 0.54, 0.70, 0.72], [0, 1, 1, 0]);

  return (
    <motion.div style={{ opacity }} className="px-6 max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold text-white mb-8 text-center">
        The Healthy Pattern
      </h3>

      <div className="grid md:grid-cols-2 gap-8">
        {/* After a win */}
        <div className="p-6 bg-[#0EF0EB]/10 border border-[#0EF0EB]/30 rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🏆</span>
            <h4 className="text-xl font-bold text-[#0EF0EB]">After a Win</h4>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <span className="text-[#0EF0EB]">✓</span>
              <p className="text-gray-300">Attribute to <strong className="text-white">internal factors</strong></p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#0EF0EB]">✓</span>
              <p className="text-gray-300">Recognize your <strong className="text-white">preparation & skill</strong></p>
            </div>
            <p className="text-gray-500 text-sm mt-4 italic">
              "We won because we prepared well and executed our strategy."
            </p>
          </div>
        </div>

        {/* After a loss */}
        <div className="p-6 bg-[#F6F400]/10 border border-[#F6F400]/30 rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">📉</span>
            <h4 className="text-xl font-bold text-[#F6F400]">After a Loss</h4>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <span className="text-[#F6F400]">✓</span>
              <p className="text-gray-300">Attribute to <strong className="text-white">unstable factors</strong></p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#F6F400]">✓</span>
              <p className="text-gray-300">Focus on what you <strong className="text-white">can change</strong></p>
            </div>
            <p className="text-gray-500 text-sm mt-4 italic">
              "We didn't adapt fast enough — that's something we can work on."
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function AttributionScience({ scrollProgress }: { scrollProgress: any }) {
  const opacity = useTransform(scrollProgress, [0.70, 0.72, 0.88, 0.90], [0, 1, 1, 0]);
  const y = useTransform(scrollProgress, [0.70, 0.72], [30, 0]);

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
            Attribution training <strong className="text-[#0EF0EB]">reduces sources of stress</strong> for
            athletes and helps them effectively manage <strong className="text-[#F6F400]">anxiety and fear of failure</strong>.
          </p>
          <p className="text-gray-300 leading-relaxed">
            It acts as a <strong className="text-white">counterbalance</strong> to the negative psychological
            states that athletes experience after choking.
          </p>
        </div>

        <div className="text-center text-gray-500 text-sm mb-6">
          Source: Frontiers in Psychology, 2025
        </div>

        <div className="flex items-start gap-3 p-4 bg-[#0EF0EB]/10 border border-[#0EF0EB]/30 rounded-xl">
          <span className="text-2xl">💡</span>
          <p className="text-gray-300">
            <strong className="text-white">Coach tip:</strong> After matches, guide your players to
            attribute outcomes in healthy ways. This builds resilience over time.
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
      icon: "💭",
      title: "Observe, Don't Fight",
      description: "Thoughts are just thoughts — let them pass without engaging",
    },
    {
      icon: "🏷️",
      title: "Label & Release",
      description: "Notice → Name → Release → Refocus on the task",
    },
    {
      icon: "📊",
      title: "Attribute Wisely",
      description: "Own your wins, learn from losses without self-blame",
    },
  ];

  return (
    <div ref={ref} className="min-h-screen flex items-center justify-center py-20 px-6">
      <motion.div style={{ opacity, y }} className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-white mb-4">
          Key Takeaways
        </h2>
        <p className="text-xl text-gray-400 text-center mb-12">
          Master your mental game
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
            Module 3 Complete
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Ready for the next step?
          </h2>
          <p className="text-xl text-gray-400 max-w-xl mx-auto">
            In Module 4, you'll learn about attention control and focus techniques
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={nextModuleId ? `/learn/${nextModuleId}` : "/learn"}
            className="px-8 py-4 bg-[#0EF0EB] text-black font-semibold rounded-xl hover:bg-[#0EF0EB]/90 transition-colors"
          >
            Continue to Module 4
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
