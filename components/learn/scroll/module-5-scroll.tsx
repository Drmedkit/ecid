"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ScrollHero } from "./scroll-hero";

interface Module5ScrollPageProps {
  nextModuleId?: string | null;
}

export function Module5ScrollPage({ nextModuleId }: Module5ScrollPageProps) {
  return (
    <div className="bg-[#0a0a0a] text-white">
      {/* Fixed navigation */}
      <FixedNav />

      {/* Progress bar */}
      <ScrollProgressBar />

      {/* Hero section */}
      <ScrollHero
        moduleNumber={5}
        title="Control the Controllables"
        subtitle="Focus only on what you can influence"
      />

      {/* Main content section */}
      <ControlTheControllablesScroll />

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
// Data
// ============================================

const CONTROLLABLES = [
  { item: "Your preparation", icon: "📚" },
  { item: "Your effort and intensity", icon: "💪" },
  { item: "Your attitude and mindset", icon: "🧠" },
  { item: "Your response to mistakes", icon: "🔄" },
  { item: "Your technique execution", icon: "🎮" },
];

const UNCONTROLLABLES = [
  { item: "Referee decisions", icon: "🧑‍⚖️" },
  { item: "Opponent's performance", icon: "👥" },
  { item: "Server/ping issues", icon: "🌐" },
  { item: "Crowd/chat reactions", icon: "💬" },
  { item: "Teammate's performance", icon: "🤝" },
];

// ============================================
// Main Section
// ============================================

function ControlTheControllablesScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <div ref={containerRef} className="min-h-[1000vh] relative">
      {/* Section 1: Introduction */}
      <div className="h-screen sticky top-0 flex items-center justify-center overflow-hidden">
        <ControlIntro scrollProgress={scrollYProgress} />
      </div>

      {/* Section 2: The Core Principle */}
      <div className="h-screen sticky top-0 flex items-center justify-center overflow-hidden">
        <CorePrinciple scrollProgress={scrollYProgress} />
      </div>

      {/* Section 3: Circle of Control */}
      <div className="h-screen sticky top-0 flex items-center justify-center overflow-hidden">
        <CircleOfControl scrollProgress={scrollYProgress} />
      </div>

      {/* Section 4: The Two Lists */}
      <div className="h-screen sticky top-0 flex items-center justify-center overflow-hidden">
        <TwoLists scrollProgress={scrollYProgress} />
      </div>

      {/* Section 5: Where Does Your Energy Go */}
      <div className="h-screen sticky top-0 flex items-center justify-center overflow-hidden">
        <EnergyFlow scrollProgress={scrollYProgress} />
      </div>

      {/* Section 6: The Consequence */}
      <div className="h-screen sticky top-0 flex items-center justify-center overflow-hidden">
        <TheConsequence scrollProgress={scrollYProgress} />
      </div>

      {/* Section 7: The Practice */}
      <div className="h-screen sticky top-0 flex items-center justify-center overflow-hidden">
        <ThePractice scrollProgress={scrollYProgress} />
      </div>

      {/* Section 8: Scientific Foundation */}
      <div className="h-screen sticky top-0 flex items-center justify-center overflow-hidden">
        <ControlScience scrollProgress={scrollYProgress} />
      </div>
    </div>
  );
}

function ControlIntro({ scrollProgress }: { scrollProgress: any }) {
  const opacity = useTransform(scrollProgress, [0, 0.02, 0.08, 0.10], [0, 1, 1, 0]);
  const y = useTransform(scrollProgress, [0, 0.02], [50, 0]);

  return (
    <motion.div style={{ opacity }} className="text-center px-6 max-w-4xl mx-auto">
      <motion.div style={{ y }}>
        <span className="inline-block px-4 py-2 bg-[#0EF0EB]/20 text-[#0EF0EB] text-sm font-medium rounded-full mb-6">
          5.1 Control the Controllables
        </span>

        <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
          Where Is Your Energy Going?
        </h2>

        <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-8">
          <p className="text-xl text-gray-300 leading-relaxed">
            "The ref is so bad." "My teammate is throwing." "The server is lagging."
          </p>
          <p className="text-xl text-gray-500 mt-4">
            Sound familiar?
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

function CorePrinciple({ scrollProgress }: { scrollProgress: any }) {
  const opacity = useTransform(scrollProgress, [0.08, 0.10, 0.20, 0.22], [0, 1, 1, 0]);
  const scale = useTransform(scrollProgress, [0.10, 0.14], [0.9, 1]);

  return (
    <motion.div style={{ opacity }} className="text-center px-6 max-w-4xl mx-auto">
      <motion.div style={{ scale }}>
        <div className="bg-gradient-to-r from-[#0EF0EB]/10 to-[#F6F400]/10 border-2 border-[#0EF0EB]/30 rounded-2xl p-8 md:p-12">
          <p className="text-2xl md:text-3xl font-bold text-white leading-relaxed mb-6">
            Focus <span className="text-[#0EF0EB]">only</span> on what you can influence.
          </p>
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
            Your <span className="text-[#F6F400]">performance</span> is your only influence on the <span className="text-white">result</span>.
          </p>
        </div>

        <p className="text-gray-500 mt-8 text-lg">
          Everything else is wasted energy.
        </p>
      </motion.div>
    </motion.div>
  );
}

function CircleOfControl({ scrollProgress }: { scrollProgress: any }) {
  const opacity = useTransform(scrollProgress, [0.20, 0.22, 0.36, 0.38], [0, 1, 1, 0]);

  // Animated circles
  const outerScale = useTransform(scrollProgress, [0.22, 0.26], [0, 1]);
  const innerScale = useTransform(scrollProgress, [0.26, 0.30], [0, 1]);

  return (
    <motion.div style={{ opacity }} className="text-center px-6 max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold text-white mb-2">
        The Circle of Control
      </h3>
      <p className="text-gray-400 mb-12">
        Focus your energy on the inner circle
      </p>

      {/* Circle visualization */}
      <div className="relative w-80 h-80 mx-auto">
        {/* Outer circle - Uncontrollable */}
        <motion.div
          style={{ scale: outerScale }}
          className="absolute inset-0 rounded-full border-2 border-red-500/40 bg-red-500/5"
        >
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-red-400 text-sm font-medium">
            OUTSIDE YOUR CONTROL
          </div>
        </motion.div>

        {/* Inner circle - Controllable */}
        <motion.div
          style={{ scale: innerScale }}
          className="absolute inset-16 rounded-full border-2 border-[#0EF0EB] bg-[#0EF0EB]/10"
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[#0EF0EB] text-sm font-medium mb-1">YOUR CONTROL</span>
            <span className="text-3xl">🎯</span>
            <span className="text-white text-sm mt-1">Focus here</span>
          </div>
        </motion.div>

        {/* Labels around outer circle */}
        <motion.div style={{ opacity: outerScale }} className="absolute -top-2 left-1/2 -translate-x-1/2 text-gray-500 text-xs">
          Opponents
        </motion.div>
        <motion.div style={{ opacity: outerScale }} className="absolute top-1/2 -right-16 -translate-y-1/2 text-gray-500 text-xs">
          Refs/Admins
        </motion.div>
        <motion.div style={{ opacity: outerScale }} className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-gray-500 text-xs">
          Teammates
        </motion.div>
        <motion.div style={{ opacity: outerScale }} className="absolute top-1/2 -left-12 -translate-y-1/2 text-gray-500 text-xs">
          Server
        </motion.div>
      </div>
    </motion.div>
  );
}

function TwoLists({ scrollProgress }: { scrollProgress: any }) {
  const opacity = useTransform(scrollProgress, [0.36, 0.38, 0.54, 0.56], [0, 1, 1, 0]);

  return (
    <motion.div style={{ opacity }} className="px-6 max-w-5xl mx-auto">
      <h3 className="text-2xl font-bold text-white mb-8 text-center">
        Know the Difference
      </h3>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Controllables */}
        <div className="p-6 bg-[#0EF0EB]/10 border-2 border-[#0EF0EB]/40 rounded-2xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">✓</span>
            <h4 className="text-xl font-bold text-[#0EF0EB]">CONTROLLABLE</h4>
          </div>
          <div className="space-y-3">
            {CONTROLLABLES.map((item, index) => (
              <ControllableItem
                key={item.item}
                item={item}
                index={index}
                scrollProgress={scrollProgress}
                isControllable={true}
              />
            ))}
          </div>
        </div>

        {/* Uncontrollables */}
        <div className="p-6 bg-red-500/10 border-2 border-red-500/40 rounded-2xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">✗</span>
            <h4 className="text-xl font-bold text-red-400">UNCONTROLLABLE</h4>
          </div>
          <div className="space-y-3">
            {UNCONTROLLABLES.map((item, index) => (
              <ControllableItem
                key={item.item}
                item={item}
                index={index}
                scrollProgress={scrollProgress}
                isControllable={false}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ControllableItem({
  item,
  index,
  scrollProgress,
  isControllable,
}: {
  item: { item: string; icon: string };
  index: number;
  scrollProgress: any;
  isControllable: boolean;
}) {
  const baseStart = isControllable ? 0.39 : 0.41;
  const start = baseStart + index * 0.015;
  const end = start + 0.02;
  const opacity = useTransform(scrollProgress, [start, end], [0, 1]);
  const x = useTransform(scrollProgress, [start, end], [isControllable ? -20 : 20, 0]);

  return (
    <motion.div
      style={{ opacity, x }}
      className="flex items-center gap-3 p-2 rounded-lg bg-black/20"
    >
      <span className="text-xl">{item.icon}</span>
      <span className={isControllable ? "text-gray-200" : "text-gray-400"}>
        {item.item}
      </span>
    </motion.div>
  );
}

function EnergyFlow({ scrollProgress }: { scrollProgress: any }) {
  const opacity = useTransform(scrollProgress, [0.54, 0.56, 0.68, 0.70], [0, 1, 1, 0]);

  // Energy animation
  const wrongEnergy = useTransform(scrollProgress, [0.56, 0.60], [0, 100]);
  const rightEnergy = useTransform(scrollProgress, [0.60, 0.64], [0, 100]);

  const wrongEnergyPercent = useTransform(wrongEnergy, (v) => `${v}%`);
  const rightEnergyPercent = useTransform(rightEnergy, (v) => `${v}%`);

  return (
    <motion.div style={{ opacity }} className="px-6 max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold text-white mb-2 text-center">
        Where Is Your Energy Going?
      </h3>
      <p className="text-gray-400 text-center mb-10">
        Every moment of focus is a choice
      </p>

      <div className="space-y-8">
        {/* Wrong way */}
        <div className="p-6 bg-[#1a1a1a] border border-gray-800 rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">😤</span>
            <span className="text-red-400 font-bold">Wasted Energy</span>
          </div>
          <p className="text-gray-500 text-sm mb-3">
            "Why is this happening to me?" "This is so unfair!"
          </p>
          <div className="relative h-6 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              style={{ width: wrongEnergyPercent }}
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-red-500 to-red-600 rounded-full"
            />
          </div>
          <p className="text-gray-600 text-xs mt-2">Energy spent on things you can't change</p>
        </div>

        {/* Right way */}
        <div className="p-6 bg-[#1a1a1a] border border-gray-800 rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">🎯</span>
            <span className="text-[#0EF0EB] font-bold">Focused Energy</span>
          </div>
          <p className="text-gray-500 text-sm mb-3">
            "What can I do right now?" "Focus on the next play."
          </p>
          <div className="relative h-6 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              style={{ width: rightEnergyPercent }}
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#0EF0EB] to-[#F6F400] rounded-full"
            />
          </div>
          <p className="text-gray-600 text-xs mt-2">Energy invested in what you can control</p>
        </div>
      </div>
    </motion.div>
  );
}

function TheConsequence({ scrollProgress }: { scrollProgress: any }) {
  const opacity = useTransform(scrollProgress, [0.68, 0.70, 0.80, 0.82], [0, 1, 1, 0]);

  return (
    <motion.div style={{ opacity }} className="px-6 max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold text-white mb-8 text-center">
        The Downward Spiral
      </h3>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Focus on uncontrollables */}
        <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-2xl">
          <div className="text-center mb-4">
            <span className="text-4xl">😠</span>
          </div>
          <h4 className="text-lg font-bold text-red-400 text-center mb-4">
            Focus on Uncontrollables
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-gray-400">
              <span>→</span> Frustration builds
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <span>→</span> Negative emotions rise
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <span>→</span> Task focus drops
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <span>→</span> Performance declines
            </div>
            <div className="flex items-center gap-2 text-red-400 font-medium">
              <span>→</span> More frustration...
            </div>
          </div>
        </div>

        {/* Focus on controllables */}
        <div className="p-6 bg-[#0EF0EB]/10 border border-[#0EF0EB]/30 rounded-2xl">
          <div className="text-center mb-4">
            <span className="text-4xl">😌</span>
          </div>
          <h4 className="text-lg font-bold text-[#0EF0EB] text-center mb-4">
            Focus on Controllables
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-gray-400">
              <span>→</span> Emotions stay in check
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <span>→</span> Clear thinking maintained
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <span>→</span> Task focus stays high
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <span>→</span> Optimal performance
            </div>
            <div className="flex items-center gap-2 text-[#0EF0EB] font-medium">
              <span>→</span> Confidence grows...
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ThePractice({ scrollProgress }: { scrollProgress: any }) {
  const opacity = useTransform(scrollProgress, [0.80, 0.82, 0.90, 0.92], [0, 1, 1, 0]);

  return (
    <motion.div style={{ opacity }} className="px-6 max-w-3xl mx-auto">
      <h3 className="text-2xl font-bold text-white mb-8 text-center">
        The Practice
      </h3>

      <div className="space-y-4">
        <div className="flex items-start gap-4 p-4 bg-[#1a1a1a] border border-gray-800 rounded-xl">
          <div className="w-10 h-10 rounded-full bg-[#0EF0EB]/20 flex items-center justify-center text-[#0EF0EB] font-bold flex-shrink-0">
            1
          </div>
          <div>
            <p className="text-white font-medium">Notice when you're focused on uncontrollables</p>
            <p className="text-gray-500 text-sm">Catch yourself complaining about refs, teammates, luck</p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-4 bg-[#1a1a1a] border border-gray-800 rounded-xl">
          <div className="w-10 h-10 rounded-full bg-[#0EF0EB]/20 flex items-center justify-center text-[#0EF0EB] font-bold flex-shrink-0">
            2
          </div>
          <div>
            <p className="text-white font-medium">Ask: "Can I control this?"</p>
            <p className="text-gray-500 text-sm">Simple yes or no — be honest</p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-4 bg-[#1a1a1a] border border-gray-800 rounded-xl">
          <div className="w-10 h-10 rounded-full bg-[#0EF0EB]/20 flex items-center justify-center text-[#0EF0EB] font-bold flex-shrink-0">
            3
          </div>
          <div>
            <p className="text-white font-medium">If no, redirect to something you CAN control</p>
            <p className="text-gray-500 text-sm">"What's my next play? What can I do better right now?"</p>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-[#F6F400]/10 border border-[#F6F400]/30 rounded-xl text-center">
        <p className="text-gray-300">
          <span className="text-[#F6F400] font-bold">Mantra:</span> "Control what I can, let go of what I can't."
        </p>
      </div>
    </motion.div>
  );
}

function ControlScience({ scrollProgress }: { scrollProgress: any }) {
  const opacity = useTransform(scrollProgress, [0.90, 0.92, 1, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollProgress, [0.90, 0.92], [30, 0]);

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
            When athletes focus on <strong className="text-red-400">uncontrollable factors</strong>,
            negative emotions arise, task focus diminishes, and performance declines rapidly.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Focusing on <strong className="text-[#0EF0EB]">controllable factors</strong> helps keep
            emotions in check and perform optimally.
          </p>
        </div>

        <div className="text-center text-gray-500 text-sm mb-6">
          Source: Peak Sports Psychology
        </div>

        <div className="flex items-start gap-3 p-4 bg-[#0EF0EB]/10 border border-[#0EF0EB]/30 rounded-xl">
          <span className="text-2xl">💡</span>
          <p className="text-gray-300">
            <strong className="text-white">Coach tip:</strong> When a player starts blaming external factors,
            ask them: "What can YOU do differently right now?" Redirect to controllables.
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
      icon: "🎯",
      title: "Inner Circle Only",
      description: "Focus your energy on things within your control",
    },
    {
      icon: "⚡",
      title: "Energy Is Limited",
      description: "Every moment spent on uncontrollables is wasted",
    },
    {
      icon: "🔄",
      title: "Redirect Fast",
      description: "Catch yourself and ask: 'What CAN I control?'",
    },
  ];

  return (
    <div ref={ref} className="min-h-screen flex items-center justify-center py-20 px-6">
      <motion.div style={{ opacity, y }} className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-white mb-4">
          Key Takeaways
        </h2>
        <p className="text-xl text-gray-400 text-center mb-12">
          Control the controllables
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
            Module 5 Complete
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Ready for the next step?
          </h2>
          <p className="text-xl text-gray-400 max-w-xl mx-auto">
            In Module 6, you'll learn about developing a growth mindset
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={nextModuleId ? `/learn/${nextModuleId}` : "/learn"}
            className="px-8 py-4 bg-[#0EF0EB] text-black font-semibold rounded-xl hover:bg-[#0EF0EB]/90 transition-colors"
          >
            Continue to Module 6
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
