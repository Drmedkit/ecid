"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ScrollHero } from "./scroll-hero";

interface Module2ScrollPageProps {
  nextModuleId?: string | null;
}

export function Module2ScrollPage({ nextModuleId }: Module2ScrollPageProps) {
  return (
    <div className="bg-[#0a0a0a] text-white">
      {/* Fixed navigation */}
      <FixedNav />

      {/* Progress bar */}
      <ScrollProgressBar />

      {/* Hero section */}
      <ScrollHero
        moduleNumber={2}
        title="Dealing with Performance Pressure"
        subtitle="Breathing techniques and pre-performance routines"
      />

      {/* Physiological Responses section */}
      <PhysiologicalResponsesScroll />

      {/* Breathing Techniques section */}
      <BreathingTechniquesScroll />

      {/* Pre-Performance Routines section */}
      <PrePerformanceRoutinesScroll />

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
// SECTION 1: Physiological Responses
// ============================================

const FIGHT_FLIGHT_RESPONSES = [
  { symptom: "Racing heart", icon: "💓", reframe: "Pumping oxygen to muscles" },
  { symptom: "Sweaty palms", icon: "💧", reframe: "Cooling system activated" },
  { symptom: "Butterflies", icon: "🦋", reframe: "Energy mobilizing" },
  { symptom: "Tunnel vision", icon: "🎯", reframe: "Focus sharpening" },
  { symptom: "Muscle tension", icon: "💪", reframe: "Ready for action" },
];

function PhysiologicalResponsesScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <div ref={containerRef} className="min-h-[700vh] relative">
      {/* Section 1: Introduction */}
      <div className="h-screen sticky top-0 flex items-center justify-center overflow-hidden">
        <PhysioIntro scrollProgress={scrollYProgress} />
      </div>

      {/* Section 2: The Reframe */}
      <div className="h-screen sticky top-0 flex items-center justify-center overflow-hidden">
        <TheReframe scrollProgress={scrollYProgress} />
      </div>

      {/* Section 3: Fight-or-Flight Responses */}
      <div className="h-screen sticky top-0 flex items-center justify-center overflow-hidden">
        <FightFlightList scrollProgress={scrollYProgress} />
      </div>

      {/* Section 4: The Insight */}
      <div className="h-screen sticky top-0 flex items-center justify-center overflow-hidden">
        <PhysioInsight scrollProgress={scrollYProgress} />
      </div>
    </div>
  );
}

function PhysioIntro({ scrollProgress }: { scrollProgress: any }) {
  const opacity = useTransform(scrollProgress, [0, 0.02, 0.14, 0.16], [0, 1, 1, 0]);
  const y = useTransform(scrollProgress, [0, 0.02], [50, 0]);

  return (
    <motion.div style={{ opacity }} className="text-center px-6 max-w-4xl mx-auto">
      <motion.div style={{ y }}>
        <span className="inline-block px-4 py-2 bg-[#F6F400]/20 text-[#F6F400] text-sm font-medium rounded-full mb-6">
          2.1 Physiological Responses
        </span>

        <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
          Your Body Under Pressure
        </h2>

        <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-8 mb-8">
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
            Heart racing. Palms sweating. Stomach churning.
          </p>
          <p className="text-xl md:text-2xl text-gray-400 mt-4">
            Sound familiar?
          </p>
        </div>

        <p className="text-xl text-gray-500">
          These responses aren't signs of weakness—they're signs your body is preparing
        </p>
      </motion.div>
    </motion.div>
  );
}

function TheReframe({ scrollProgress }: { scrollProgress: any }) {
  const opacity = useTransform(scrollProgress, [0.14, 0.16, 0.32, 0.34], [0, 1, 1, 0]);
  const threatOpacity = useTransform(scrollProgress, [0.16, 0.22], [1, 0.3]);
  const prepOpacity = useTransform(scrollProgress, [0.22, 0.26], [0.3, 1]);
  const arrowOpacity = useTransform(scrollProgress, [0.20, 0.24], [0, 1]);

  return (
    <motion.div style={{ opacity }} className="text-center px-6 max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold text-white mb-12">
        The Critical Mindset Shift
      </h3>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
        {/* Threat interpretation */}
        <motion.div
          style={{ opacity: threatOpacity }}
          className="p-6 bg-red-500/10 border-2 border-red-500/40 rounded-2xl w-64"
        >
          <div className="text-4xl mb-3">😰</div>
          <div className="text-red-400 font-bold text-lg mb-2">THREAT</div>
          <p className="text-gray-400 text-sm">"I'm nervous, I'm going to fail"</p>
        </motion.div>

        {/* Arrow */}
        <motion.div style={{ opacity: arrowOpacity }} className="text-4xl text-[#0EF0EB]">
          →
        </motion.div>

        {/* Preparation interpretation */}
        <motion.div
          style={{ opacity: prepOpacity }}
          className="p-6 bg-[#0EF0EB]/10 border-2 border-[#0EF0EB]/40 rounded-2xl w-64"
        >
          <div className="text-4xl mb-3">💪</div>
          <div className="text-[#0EF0EB] font-bold text-lg mb-2">PREPARATION</div>
          <p className="text-gray-400 text-sm">"My body is getting ready to perform"</p>
        </motion.div>
      </div>

      <motion.p
        style={{ opacity: arrowOpacity }}
        className="mt-12 text-gray-400 text-lg"
      >
        Same physical sensations. <span className="text-white">Different interpretation.</span>
      </motion.p>
    </motion.div>
  );
}

function FightFlightList({ scrollProgress }: { scrollProgress: any }) {
  const opacity = useTransform(scrollProgress, [0.32, 0.34, 0.52, 0.54], [0, 1, 1, 0]);

  return (
    <motion.div style={{ opacity }} className="px-6 max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold text-white mb-2 text-center">
        Reframe Your Responses
      </h3>
      <p className="text-gray-400 text-center mb-8">
        Every "symptom" has a purpose
      </p>

      <div className="space-y-4">
        {FIGHT_FLIGHT_RESPONSES.map((item, index) => (
          <ResponseItem
            key={item.symptom}
            item={item}
            index={index}
            scrollProgress={scrollProgress}
          />
        ))}
      </div>
    </motion.div>
  );
}

function ResponseItem({
  item,
  index,
  scrollProgress,
}: {
  item: typeof FIGHT_FLIGHT_RESPONSES[0];
  index: number;
  scrollProgress: any;
}) {
  const start = 0.35 + index * 0.02;
  const end = start + 0.03;
  const opacity = useTransform(scrollProgress, [start, end], [0, 1]);
  const x = useTransform(scrollProgress, [start, end], [-30, 0]);

  return (
    <motion.div
      style={{ opacity, x }}
      className="flex items-center gap-4 p-4 bg-[#1a1a1a] border border-gray-800 rounded-xl"
    >
      <div className="text-3xl">{item.icon}</div>
      <div className="flex-1">
        <div className="flex items-center gap-3">
          <span className="text-red-400 line-through">{item.symptom}</span>
          <span className="text-gray-600">→</span>
          <span className="text-[#0EF0EB] font-medium">{item.reframe}</span>
        </div>
      </div>
    </motion.div>
  );
}

function PhysioInsight({ scrollProgress }: { scrollProgress: any }) {
  const opacity = useTransform(scrollProgress, [0.52, 0.54, 0.72, 0.74], [0, 1, 1, 0]);
  const y = useTransform(scrollProgress, [0.52, 0.54], [30, 0]);

  return (
    <motion.div style={{ opacity }} className="px-6 max-w-3xl mx-auto">
      <motion.div style={{ y }}>
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#F6F400]/20 text-[#F6F400] text-sm font-medium rounded-full">
            <span>🧠</span>
            <span>Key Learning</span>
          </span>
        </div>

        <div className="bg-gradient-to-r from-[#0EF0EB]/10 to-[#F6F400]/10 border border-[#0EF0EB]/30 rounded-2xl p-8 text-center">
          <p className="text-2xl text-white leading-relaxed mb-4">
            Your body doesn't know the difference between <strong className="text-red-400">fear</strong> and <strong className="text-[#0EF0EB]">excitement</strong>.
          </p>
          <p className="text-xl text-gray-300">
            The only difference is how <strong className="text-[#F6F400]">you interpret it</strong>.
          </p>
        </div>

        <p className="text-center text-gray-500 mt-6">
          But interpretation alone isn't enough. You also need <span className="text-white">tools to regulate</span>.
        </p>
      </motion.div>
    </motion.div>
  );
}

// ============================================
// SECTION 2: Breathing Techniques
// ============================================

const BREATHING_TECHNIQUES = [
  {
    name: "Box Breathing",
    icon: "⬛",
    color: "#0EF0EB",
    pattern: "4-4-4-4",
    description: "Inhale 4s → Hold 4s → Exhale 4s → Hold 4s",
    use: "Before competition • During timeouts",
  },
  {
    name: "Diaphragmatic",
    icon: "🫁",
    color: "#F6F400",
    pattern: "Belly",
    description: "Deep belly breathing, not chest breathing",
    use: "Parasympathetic activation • Instant calm",
  },
  {
    name: "7-11 Breathing",
    icon: "🌊",
    color: "#0EF0EB",
    pattern: "7-11",
    description: "Inhale 7s → Exhale 11s",
    use: "Post-competition recovery • Sleep preparation",
  },
];

function BreathingTechniquesScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <div ref={containerRef} className="min-h-[800vh] relative">
      {/* Section 1: Intro */}
      <div className="h-screen sticky top-0 flex items-center justify-center overflow-hidden">
        <BreathingIntro scrollProgress={scrollYProgress} />
      </div>

      {/* Section 2: Why Breathing Works */}
      <div className="h-screen sticky top-0 flex items-center justify-center overflow-hidden">
        <WhyBreathingWorks scrollProgress={scrollYProgress} />
      </div>

      {/* Section 3: Box Breathing Visualization */}
      <div className="h-screen sticky top-0 flex items-center justify-center overflow-hidden">
        <BoxBreathingDemo scrollProgress={scrollYProgress} />
      </div>

      {/* Section 4: All Techniques */}
      <div className="h-screen sticky top-0 flex items-center justify-center overflow-hidden">
        <AllTechniques scrollProgress={scrollYProgress} />
      </div>

      {/* Section 5: Scientific Foundation */}
      <div className="h-screen sticky top-0 flex items-center justify-center overflow-hidden">
        <BreathingScience scrollProgress={scrollYProgress} />
      </div>
    </div>
  );
}

function BreathingIntro({ scrollProgress }: { scrollProgress: any }) {
  const opacity = useTransform(scrollProgress, [0, 0.02, 0.12, 0.14], [0, 1, 1, 0]);
  const y = useTransform(scrollProgress, [0, 0.02], [50, 0]);

  return (
    <motion.div style={{ opacity }} className="text-center px-6 max-w-4xl mx-auto">
      <motion.div style={{ y }}>
        <span className="inline-block px-4 py-2 bg-[#0EF0EB]/20 text-[#0EF0EB] text-sm font-medium rounded-full mb-6">
          2.2 Breathing Techniques
        </span>

        <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
          Your Built-in Reset Button
        </h2>

        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Breathing is the <strong className="text-white">only</strong> autonomic function you can consciously control.
          This makes it your direct line to the nervous system.
        </p>
      </motion.div>
    </motion.div>
  );
}

function WhyBreathingWorks({ scrollProgress }: { scrollProgress: any }) {
  const opacity = useTransform(scrollProgress, [0.12, 0.14, 0.28, 0.30], [0, 1, 1, 0]);

  return (
    <motion.div style={{ opacity }} className="px-6 max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold text-white mb-8 text-center">
        The Nervous System Switch
      </h3>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Sympathetic */}
        <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">⚡</span>
            <h4 className="text-xl font-bold text-red-400">Sympathetic</h4>
          </div>
          <p className="text-gray-400 mb-3">Fight-or-flight mode</p>
          <ul className="text-gray-500 text-sm space-y-1">
            <li>• Rapid, shallow breathing</li>
            <li>• Increased heart rate</li>
            <li>• Heightened alertness</li>
          </ul>
        </div>

        {/* Parasympathetic */}
        <div className="p-6 bg-[#0EF0EB]/10 border border-[#0EF0EB]/30 rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🧘</span>
            <h4 className="text-xl font-bold text-[#0EF0EB]">Parasympathetic</h4>
          </div>
          <p className="text-gray-400 mb-3">Rest-and-digest mode</p>
          <ul className="text-gray-500 text-sm space-y-1">
            <li>• Slow, deep breathing</li>
            <li>• Lowered heart rate</li>
            <li>• Calm focus</li>
          </ul>
        </div>
      </div>

      <p className="text-center text-gray-400 mt-8">
        <strong className="text-white">Extended exhales</strong> activate the vagus nerve → triggers parasympathetic response
      </p>
    </motion.div>
  );
}

function BoxBreathingDemo({ scrollProgress }: { scrollProgress: any }) {
  const opacity = useTransform(scrollProgress, [0.28, 0.30, 0.48, 0.50], [0, 1, 1, 0]);

  // Animate the box sides
  const phase = useTransform(scrollProgress, [0.32, 0.38, 0.42, 0.46], [0, 1, 2, 3]);
  const boxScale = useTransform(scrollProgress, [0.30, 0.32], [0.8, 1]);

  return (
    <motion.div style={{ opacity }} className="px-6 max-w-4xl mx-auto text-center">
      <h3 className="text-2xl font-bold text-white mb-2">
        Box Breathing
      </h3>
      <p className="text-gray-400 mb-8">
        Used by Navy SEALs and elite athletes
      </p>

      {/* Box visualization */}
      <motion.div style={{ scale: boxScale }} className="relative w-64 h-64 mx-auto mb-8">
        {/* The box */}
        <div className="absolute inset-0 border-2 border-gray-700 rounded-lg" />

        {/* Animated sides */}
        <BoxSide side="top" label="Inhale 4s" scrollProgress={scrollProgress} activeRange={[0.33, 0.37]} />
        <BoxSide side="right" label="Hold 4s" scrollProgress={scrollProgress} activeRange={[0.37, 0.41]} />
        <BoxSide side="bottom" label="Exhale 4s" scrollProgress={scrollProgress} activeRange={[0.41, 0.45]} />
        <BoxSide side="left" label="Hold 4s" scrollProgress={scrollProgress} activeRange={[0.45, 0.49]} />

        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-6xl font-bold text-[#0EF0EB]">4</div>
        </div>
      </motion.div>

      <p className="text-gray-500">
        Repeat 4 cycles before competition
      </p>
    </motion.div>
  );
}

function BoxSide({
  side,
  label,
  scrollProgress,
  activeRange,
}: {
  side: "top" | "right" | "bottom" | "left";
  label: string;
  scrollProgress: any;
  activeRange: [number, number];
}) {
  const opacity = useTransform(scrollProgress, [activeRange[0], activeRange[0] + 0.01, activeRange[1] - 0.01, activeRange[1]], [0.3, 1, 1, 0.3]);
  const color = useTransform(scrollProgress, [activeRange[0], activeRange[0] + 0.01], ["#374151", "#0EF0EB"]);

  const positions = {
    top: "top-0 left-0 right-0 h-1 -translate-y-4",
    right: "top-0 right-0 bottom-0 w-1 translate-x-4",
    bottom: "bottom-0 left-0 right-0 h-1 translate-y-4",
    left: "top-0 left-0 bottom-0 w-1 -translate-x-4",
  };

  const labelPositions = {
    top: "-top-10 left-1/2 -translate-x-1/2",
    right: "top-1/2 -right-20 -translate-y-1/2",
    bottom: "-bottom-10 left-1/2 -translate-x-1/2",
    left: "top-1/2 -left-20 -translate-y-1/2",
  };

  return (
    <>
      <motion.div
        style={{ opacity, backgroundColor: color }}
        className={`absolute ${positions[side]} rounded-full`}
      />
      <motion.span
        style={{ opacity }}
        className={`absolute ${labelPositions[side]} text-sm text-[#0EF0EB] whitespace-nowrap`}
      >
        {label}
      </motion.span>
    </>
  );
}

function AllTechniques({ scrollProgress }: { scrollProgress: any }) {
  const opacity = useTransform(scrollProgress, [0.48, 0.50, 0.66, 0.68], [0, 1, 1, 0]);

  return (
    <motion.div style={{ opacity }} className="px-6 max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold text-white mb-8 text-center">
        Three Techniques for Different Moments
      </h3>

      <div className="grid md:grid-cols-3 gap-6">
        {BREATHING_TECHNIQUES.map((technique, index) => (
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
  technique: typeof BREATHING_TECHNIQUES[0];
  index: number;
  scrollProgress: any;
}) {
  const start = 0.51 + index * 0.03;
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
        <div className="text-3xl mb-3">{technique.icon}</div>
        <h4 className="text-lg font-bold mb-2" style={{ color: technique.color }}>
          {technique.name}
        </h4>
        <div className="text-2xl font-mono text-white mb-2">{technique.pattern}</div>
        <p className="text-gray-400 text-sm mb-3">{technique.description}</p>
        <p className="text-gray-600 text-xs">{technique.use}</p>
      </div>
    </motion.div>
  );
}

function BreathingScience({ scrollProgress }: { scrollProgress: any }) {
  const opacity = useTransform(scrollProgress, [0.66, 0.68, 0.82, 0.84], [0, 1, 1, 0]);
  const y = useTransform(scrollProgress, [0.66, 0.68], [30, 0]);

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
            A study with <strong className="text-[#0EF0EB]">76 varsity athletes</strong> showed that
            diaphragmatic breathing leads to significantly greater relaxation and better stress
            management during competitions.
          </p>
          <p className="text-gray-300 leading-relaxed">
            <strong className="text-[#F6F400]">Extended exhalation</strong> activates the vagus nerve
            and the parasympathetic nervous system.
          </p>
        </div>

        <div className="text-center text-gray-500 text-sm mb-6">
          Source: Journal of Sports Medicine and Physical Fitness
        </div>

        <div className="flex items-start gap-3 p-4 bg-[#0EF0EB]/10 border border-[#0EF0EB]/30 rounded-xl">
          <span className="text-2xl">💡</span>
          <p className="text-gray-300">
            <strong className="text-white">Practical tip:</strong> Exhale longer than you inhale.
            Even a 1:2 ratio (4s in, 8s out) can trigger the relaxation response.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ============================================
// SECTION 3: Pre-Performance Routines
// ============================================

const ROUTINE_COMPONENTS = [
  {
    name: "Behavioral",
    icon: "🎮",
    color: "#0EF0EB",
    description: "Physical actions that anchor your preparation",
    examples: "Equipment check, warm-up movements, stretching routine",
  },
  {
    name: "Mental",
    icon: "🧠",
    color: "#F6F400",
    description: "Visualization and mental rehearsal",
    examples: "Visualize successful plays, review game plan, positive self-talk",
  },
  {
    name: "Breathing",
    icon: "🫁",
    color: "#0EF0EB",
    description: "Controlled breathing to regulate arousal",
    examples: "Box breathing, deep breaths before match start",
  },
  {
    name: "Cue Words",
    icon: "💬",
    color: "#F6F400",
    description: "Trigger words that activate focus",
    examples: "\"Locked in\", \"Trust\", \"One play at a time\"",
  },
];

function PrePerformanceRoutinesScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <div ref={containerRef} className="min-h-[700vh] relative">
      {/* Section 1: Intro */}
      <div className="h-screen sticky top-0 flex items-center justify-center overflow-hidden">
        <RoutineIntro scrollProgress={scrollYProgress} />
      </div>

      {/* Section 2: The Four Components */}
      <div className="h-screen sticky top-0 flex items-center justify-center overflow-hidden">
        <FourComponents scrollProgress={scrollYProgress} />
      </div>

      {/* Section 3: Building Your Routine */}
      <div className="h-screen sticky top-0 flex items-center justify-center overflow-hidden">
        <BuildingRoutine scrollProgress={scrollYProgress} />
      </div>

      {/* Section 4: Scientific Foundation */}
      <div className="h-screen sticky top-0 flex items-center justify-center overflow-hidden">
        <RoutineScience scrollProgress={scrollYProgress} />
      </div>
    </div>
  );
}

function RoutineIntro({ scrollProgress }: { scrollProgress: any }) {
  const opacity = useTransform(scrollProgress, [0, 0.02, 0.16, 0.18], [0, 1, 1, 0]);
  const y = useTransform(scrollProgress, [0, 0.02], [50, 0]);

  return (
    <motion.div style={{ opacity }} className="text-center px-6 max-w-4xl mx-auto">
      <motion.div style={{ y }}>
        <span className="inline-block px-4 py-2 bg-[#F6F400]/20 text-[#F6F400] text-sm font-medium rounded-full mb-6">
          2.3 Pre-Performance Routines
        </span>

        <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
          Consistency Creates Confidence
        </h2>

        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          A pre-performance routine is your <strong className="text-white">anchor</strong>—a consistent
          sequence that signals to your brain: <span className="text-[#0EF0EB]">"It's time to perform."</span>
        </p>
      </motion.div>
    </motion.div>
  );
}

function FourComponents({ scrollProgress }: { scrollProgress: any }) {
  const opacity = useTransform(scrollProgress, [0.16, 0.18, 0.42, 0.44], [0, 1, 1, 0]);

  return (
    <motion.div style={{ opacity }} className="px-6 max-w-5xl mx-auto">
      <h3 className="text-2xl font-bold text-white mb-8 text-center">
        Four Components of an Effective Routine
      </h3>

      <div className="grid md:grid-cols-2 gap-6">
        {ROUTINE_COMPONENTS.map((component, index) => (
          <ComponentCard
            key={component.name}
            component={component}
            index={index}
            scrollProgress={scrollProgress}
          />
        ))}
      </div>
    </motion.div>
  );
}

function ComponentCard({
  component,
  index,
  scrollProgress,
}: {
  component: typeof ROUTINE_COMPONENTS[0];
  index: number;
  scrollProgress: any;
}) {
  const start = 0.20 + index * 0.04;
  const end = start + 0.05;
  const opacity = useTransform(scrollProgress, [start, end], [0, 1]);
  const x = useTransform(scrollProgress, [start, end], [index % 2 === 0 ? -30 : 30, 0]);

  return (
    <motion.div style={{ opacity, x }}>
      <div
        className="p-5 rounded-2xl border-2 h-full"
        style={{
          backgroundColor: `${component.color}10`,
          borderColor: `${component.color}40`,
        }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
            style={{ backgroundColor: `${component.color}20` }}
          >
            {component.icon}
          </div>
          <h4 className="text-xl font-bold" style={{ color: component.color }}>
            {component.name}
          </h4>
        </div>
        <p className="text-gray-300 mb-2">{component.description}</p>
        <p className="text-gray-500 text-sm">{component.examples}</p>
      </div>
    </motion.div>
  );
}

function BuildingRoutine({ scrollProgress }: { scrollProgress: any }) {
  const opacity = useTransform(scrollProgress, [0.42, 0.44, 0.62, 0.64], [0, 1, 1, 0]);

  return (
    <motion.div style={{ opacity }} className="px-6 max-w-3xl mx-auto">
      <h3 className="text-2xl font-bold text-white mb-8 text-center">
        Building Your Routine
      </h3>

      <div className="space-y-4">
        <div className="flex items-center gap-4 p-4 bg-[#1a1a1a] border border-gray-800 rounded-xl">
          <div className="w-10 h-10 rounded-full bg-[#0EF0EB]/20 flex items-center justify-center text-[#0EF0EB] font-bold">1</div>
          <div>
            <p className="text-white font-medium">Keep it short</p>
            <p className="text-gray-500 text-sm">30 seconds to 2 minutes max</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 bg-[#1a1a1a] border border-gray-800 rounded-xl">
          <div className="w-10 h-10 rounded-full bg-[#0EF0EB]/20 flex items-center justify-center text-[#0EF0EB] font-bold">2</div>
          <div>
            <p className="text-white font-medium">Make it consistent</p>
            <p className="text-gray-500 text-sm">Same sequence every time, practice and competition</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 bg-[#1a1a1a] border border-gray-800 rounded-xl">
          <div className="w-10 h-10 rounded-full bg-[#0EF0EB]/20 flex items-center justify-center text-[#0EF0EB] font-bold">3</div>
          <div>
            <p className="text-white font-medium">Include all four elements</p>
            <p className="text-gray-500 text-sm">Behavioral + Mental + Breathing + Cue word</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 bg-[#1a1a1a] border border-gray-800 rounded-xl">
          <div className="w-10 h-10 rounded-full bg-[#0EF0EB]/20 flex items-center justify-center text-[#0EF0EB] font-bold">4</div>
          <div>
            <p className="text-white font-medium">Personalize it</p>
            <p className="text-gray-500 text-sm">It should feel natural and meaningful to you</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function RoutineScience({ scrollProgress }: { scrollProgress: any }) {
  const opacity = useTransform(scrollProgress, [0.62, 0.64, 0.82, 0.84], [0, 1, 1, 0]);
  const y = useTransform(scrollProgress, [0.62, 0.64], [30, 0]);

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
            Meta-analysis shows that pre-performance routines (PPR) <strong className="text-[#0EF0EB]">significantly
            improve sports performance</strong>.
          </p>
          <p className="text-gray-300 leading-relaxed mb-4">
            Even routines learned in just <strong className="text-[#F6F400]">10 minutes</strong> show measurable effects.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Extensive PPRs (with multiple elements) have a <strong className="text-white">stronger effect</strong> than
            single elements in isolation.
          </p>
        </div>

        <div className="text-center text-gray-500 text-sm mb-6">
          Source: International Review of Sport and Exercise Psychology, 2021
        </div>

        <div className="flex items-start gap-3 p-4 bg-[#0EF0EB]/10 border border-[#0EF0EB]/30 rounded-xl">
          <span className="text-2xl">💡</span>
          <p className="text-gray-300">
            <strong className="text-white">Coach tip:</strong> Help your players develop their own routine.
            The best routine is one they'll actually use consistently.
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
      title: "Reframe, Don't Fight",
      description: "Physical stress responses are preparation, not problems",
    },
    {
      icon: "🫁",
      title: "Breathe to Reset",
      description: "Extended exhales activate your body's natural calm response",
    },
    {
      icon: "🎯",
      title: "Routine = Consistency",
      description: "A pre-performance routine anchors your focus every time",
    },
  ];

  return (
    <div ref={ref} className="min-h-screen flex items-center justify-center py-20 px-6">
      <motion.div style={{ opacity, y }} className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-white mb-4">
          Key Takeaways
        </h2>
        <p className="text-xl text-gray-400 text-center mb-12">
          Tools you can use starting today
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
            Module 2 Complete
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Ready for the next step?
          </h2>
          <p className="text-xl text-gray-400 max-w-xl mx-auto">
            In Module 3, you'll learn how to manage negative thoughts and build mental resilience
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={nextModuleId ? `/learn/${nextModuleId}` : "/learn"}
            className="px-8 py-4 bg-[#0EF0EB] text-black font-semibold rounded-xl hover:bg-[#0EF0EB]/90 transition-colors"
          >
            Continue to Module 3
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
