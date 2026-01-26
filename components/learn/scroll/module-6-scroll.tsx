"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ScrollHero } from "./scroll-hero";

interface Module6ScrollPageProps {
  nextModuleId?: string | null;
}

export function Module6ScrollPage({ nextModuleId }: Module6ScrollPageProps) {
  return (
    <div className="bg-[#0a0a0a] text-white">
      {/* Fixed navigation */}
      <FixedNav />

      {/* Progress bar */}
      <ScrollProgressBar />

      {/* Hero section */}
      <ScrollHero
        moduleNumber={6}
        title="Mindset"
        subtitle="Growth mindset vs. fixed mindset"
      />

      {/* Main content section */}
      <MindsetScroll />

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
// Data
// ============================================

const MINDSET_COMPARISONS = [
  {
    topic: "Skills",
    growth: "Skills are developable through practice",
    fixed: "Talent is innate and fixed",
    growthIcon: "📈",
    fixedIcon: "🔒",
  },
  {
    topic: "Failure",
    growth: "Failure is a learning opportunity",
    fixed: "Failure means I have no talent",
    growthIcon: "🎓",
    fixedIcon: "💔",
  },
  {
    topic: "Effort",
    growth: "Effort leads to improvement",
    fixed: "Effort is a sign of weakness",
    growthIcon: "💪",
    fixedIcon: "😓",
  },
  {
    topic: "Challenges",
    growth: "Seeks out challenges",
    fixed: "Avoids challenges",
    growthIcon: "🏔️",
    fixedIcon: "🏃",
  },
  {
    topic: "Others' Success",
    growth: "Learns from better players",
    fixed: "Feels threatened by others",
    growthIcon: "🤝",
    fixedIcon: "😤",
  },
];

const GROWTH_TRAITS = [
  { trait: "Less afraid of failure", icon: "🛡️" },
  { trait: "Can win and lose with grace", icon: "🏆" },
  { trait: "Enjoys the success of others", icon: "👏" },
  { trait: "More open to feedback", icon: "👂" },
  { trait: "Works harder", icon: "💪" },
  { trait: "Stays calm under pressure", icon: "😌" },
  { trait: "More coachable", icon: "📋" },
];

// ============================================
// Main Section
// ============================================

function MindsetScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <div ref={containerRef} className="min-h-[1100vh] relative">
      {/* Section 1: Introduction */}
      <div className="h-screen sticky top-0 flex items-center justify-center overflow-hidden">
        <MindsetIntro scrollProgress={scrollYProgress} />
      </div>

      {/* Section 2: The Two Mindsets */}
      <div className="h-screen sticky top-0 flex items-center justify-center overflow-hidden">
        <TwoMindsets scrollProgress={scrollYProgress} />
      </div>

      {/* Section 3: The Comparison Table */}
      <div className="h-screen sticky top-0 flex items-center justify-center overflow-hidden">
        <ComparisonTable scrollProgress={scrollYProgress} />
      </div>

      {/* Section 4: Response to Failure */}
      <div className="h-screen sticky top-0 flex items-center justify-center overflow-hidden">
        <ResponseToFailure scrollProgress={scrollYProgress} />
      </div>

      {/* Section 5: The Growth Loop */}
      <div className="h-screen sticky top-0 flex items-center justify-center overflow-hidden">
        <GrowthLoop scrollProgress={scrollYProgress} />
      </div>

      {/* Section 6: Core Principle */}
      <div className="h-screen sticky top-0 flex items-center justify-center overflow-hidden">
        <CorePrinciple scrollProgress={scrollYProgress} />
      </div>

      {/* Section 7: Benefits of Growth Mindset */}
      <div className="h-screen sticky top-0 flex items-center justify-center overflow-hidden">
        <GrowthBenefits scrollProgress={scrollYProgress} />
      </div>

      {/* Section 8: Scientific Foundation */}
      <div className="h-screen sticky top-0 flex items-center justify-center overflow-hidden">
        <MindsetScience scrollProgress={scrollYProgress} />
      </div>
    </div>
  );
}

function MindsetIntro({ scrollProgress }: { scrollProgress: any }) {
  const opacity = useTransform(scrollProgress, [0, 0.02, 0.08, 0.10], [0, 1, 1, 0]);
  const y = useTransform(scrollProgress, [0, 0.02], [50, 0]);

  return (
    <motion.div style={{ opacity }} className="text-center px-6 max-w-4xl mx-auto">
      <motion.div style={{ y }}>
        <span className="inline-block px-4 py-2 bg-[#F6F400]/20 text-[#F6F400] text-sm font-medium rounded-full mb-6">
          6.1 Growth vs Fixed Mindset
        </span>

        <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
          What Do You Believe?
        </h2>

        <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-8">
          <p className="text-xl text-gray-300 leading-relaxed">
            "I'm just not a clutch player."
          </p>
          <p className="text-xl text-gray-300 leading-relaxed mt-4">
            "Some people are naturals, I'm not."
          </p>
          <p className="text-xl text-gray-300 leading-relaxed mt-4">
            "I've hit my ceiling."
          </p>
        </div>

        <p className="text-xl text-gray-500 mt-8">
          These beliefs shape everything.
        </p>
      </motion.div>
    </motion.div>
  );
}

function TwoMindsets({ scrollProgress }: { scrollProgress: any }) {
  const opacity = useTransform(scrollProgress, [0.08, 0.10, 0.20, 0.22], [0, 1, 1, 0]);
  const growthX = useTransform(scrollProgress, [0.10, 0.14], [-50, 0]);
  const fixedX = useTransform(scrollProgress, [0.10, 0.14], [50, 0]);

  return (
    <motion.div style={{ opacity }} className="px-6 max-w-5xl mx-auto">
      <h3 className="text-2xl font-bold text-white mb-2 text-center">
        Two Ways to See the World
      </h3>
      <p className="text-gray-400 text-center mb-10">
        Based on research by Carol Dweck, Stanford University
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Growth Mindset */}
        <motion.div style={{ x: growthX }}>
          <div className="p-8 bg-[#0EF0EB]/10 border-2 border-[#0EF0EB]/40 rounded-2xl h-full">
            <div className="text-center mb-6">
              <span className="text-6xl">🌱</span>
            </div>
            <h4 className="text-2xl font-bold text-[#0EF0EB] text-center mb-4">
              Growth Mindset
            </h4>
            <p className="text-gray-300 text-center">
              "I can develop my abilities through dedication and hard work."
            </p>
          </div>
        </motion.div>

        {/* Fixed Mindset */}
        <motion.div style={{ x: fixedX }}>
          <div className="p-8 bg-red-500/10 border-2 border-red-500/40 rounded-2xl h-full">
            <div className="text-center mb-6">
              <span className="text-6xl">🪨</span>
            </div>
            <h4 className="text-2xl font-bold text-red-400 text-center mb-4">
              Fixed Mindset
            </h4>
            <p className="text-gray-300 text-center">
              "My abilities are carved in stone. I either have talent or I don't."
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function ComparisonTable({ scrollProgress }: { scrollProgress: any }) {
  const opacity = useTransform(scrollProgress, [0.20, 0.22, 0.40, 0.42], [0, 1, 1, 0]);

  return (
    <motion.div style={{ opacity }} className="px-6 max-w-5xl mx-auto">
      <h3 className="text-2xl font-bold text-white mb-8 text-center">
        How Each Mindset Thinks
      </h3>

      <div className="space-y-3">
        {MINDSET_COMPARISONS.map((item, index) => (
          <ComparisonRow
            key={item.topic}
            item={item}
            index={index}
            scrollProgress={scrollProgress}
          />
        ))}
      </div>
    </motion.div>
  );
}

function ComparisonRow({
  item,
  index,
  scrollProgress,
}: {
  item: typeof MINDSET_COMPARISONS[0];
  index: number;
  scrollProgress: any;
}) {
  const start = 0.23 + index * 0.025;
  const end = start + 0.03;
  const opacity = useTransform(scrollProgress, [start, end], [0, 1]);
  const y = useTransform(scrollProgress, [start, end], [20, 0]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="grid grid-cols-3 gap-4 items-center"
    >
      {/* Growth */}
      <div className="p-3 bg-[#0EF0EB]/10 border border-[#0EF0EB]/30 rounded-xl">
        <div className="flex items-center gap-2">
          <span className="text-xl">{item.growthIcon}</span>
          <span className="text-sm text-gray-300">{item.growth}</span>
        </div>
      </div>

      {/* Topic */}
      <div className="text-center">
        <span className="text-sm font-bold text-gray-500 uppercase">{item.topic}</span>
      </div>

      {/* Fixed */}
      <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl">
        <div className="flex items-center gap-2">
          <span className="text-xl">{item.fixedIcon}</span>
          <span className="text-sm text-gray-300">{item.fixed}</span>
        </div>
      </div>
    </motion.div>
  );
}

function ResponseToFailure({ scrollProgress }: { scrollProgress: any }) {
  const opacity = useTransform(scrollProgress, [0.40, 0.42, 0.54, 0.56], [0, 1, 1, 0]);

  return (
    <motion.div style={{ opacity }} className="px-6 max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold text-white mb-4 text-center">
        When You Lose a Match...
      </h3>
      <p className="text-gray-400 text-center mb-10">
        The same event, two different responses
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Growth Response */}
        <div className="p-6 bg-[#0EF0EB]/10 border border-[#0EF0EB]/30 rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🌱</span>
            <h4 className="text-lg font-bold text-[#0EF0EB]">Growth Mindset</h4>
          </div>
          <div className="space-y-3 text-sm">
            <p className="text-gray-300">"What can I learn from this?"</p>
            <p className="text-gray-300">"Where did I make mistakes I can fix?"</p>
            <p className="text-gray-300">"This is data for improvement."</p>
            <p className="text-gray-300">"I'll be better next time."</p>
          </div>
          <div className="mt-4 pt-4 border-t border-[#0EF0EB]/20">
            <p className="text-[#0EF0EB] text-sm font-medium">→ Reviews VOD, identifies 3 things to work on</p>
          </div>
        </div>

        {/* Fixed Response */}
        <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🪨</span>
            <h4 className="text-lg font-bold text-red-400">Fixed Mindset</h4>
          </div>
          <div className="space-y-3 text-sm">
            <p className="text-gray-300">"I'm just not good enough."</p>
            <p className="text-gray-300">"See? I knew I'd choke."</p>
            <p className="text-gray-300">"Some people have it, I don't."</p>
            <p className="text-gray-300">"Why even try harder?"</p>
          </div>
          <div className="mt-4 pt-4 border-t border-red-500/20">
            <p className="text-red-400 text-sm font-medium">→ Avoids thinking about it, blames others</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function GrowthLoop({ scrollProgress }: { scrollProgress: any }) {
  const opacity = useTransform(scrollProgress, [0.54, 0.56, 0.68, 0.70], [0, 1, 1, 0]);

  const step1 = useTransform(scrollProgress, [0.56, 0.58], [0, 1]);
  const step2 = useTransform(scrollProgress, [0.58, 0.60], [0, 1]);
  const step3 = useTransform(scrollProgress, [0.60, 0.62], [0, 1]);
  const step4 = useTransform(scrollProgress, [0.62, 0.64], [0, 1]);

  return (
    <motion.div style={{ opacity }} className="px-6 max-w-4xl mx-auto text-center">
      <h3 className="text-2xl font-bold text-white mb-2">
        The Growth Loop
      </h3>
      <p className="text-gray-400 mb-10">
        A cycle that builds on itself
      </p>

      {/* Loop visualization */}
      <div className="relative max-w-md mx-auto">
        <div className="grid grid-cols-2 gap-4">
          <motion.div style={{ opacity: step1 }} className="p-4 bg-[#0EF0EB]/10 border border-[#0EF0EB]/30 rounded-xl">
            <span className="text-2xl">🎯</span>
            <p className="text-sm text-[#0EF0EB] font-medium mt-2">Challenge</p>
            <p className="text-xs text-gray-500">Seek difficulty</p>
          </motion.div>

          <motion.div style={{ opacity: step2 }} className="p-4 bg-[#F6F400]/10 border border-[#F6F400]/30 rounded-xl">
            <span className="text-2xl">💪</span>
            <p className="text-sm text-[#F6F400] font-medium mt-2">Effort</p>
            <p className="text-xs text-gray-500">Work through it</p>
          </motion.div>

          <motion.div style={{ opacity: step3 }} className="p-4 bg-[#F6F400]/10 border border-[#F6F400]/30 rounded-xl">
            <span className="text-2xl">📚</span>
            <p className="text-sm text-[#F6F400] font-medium mt-2">Learn</p>
            <p className="text-xs text-gray-500">Extract lessons</p>
          </motion.div>

          <motion.div style={{ opacity: step4 }} className="p-4 bg-[#0EF0EB]/10 border border-[#0EF0EB]/30 rounded-xl">
            <span className="text-2xl">📈</span>
            <p className="text-sm text-[#0EF0EB] font-medium mt-2">Grow</p>
            <p className="text-xs text-gray-500">Skills improve</p>
          </motion.div>
        </div>

        {/* Center arrow */}
        <motion.div
          style={{ opacity: step4 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="w-16 h-16 rounded-full bg-[#0a0a0a] border-2 border-[#0EF0EB] flex items-center justify-center">
            <span className="text-2xl">🔄</span>
          </div>
        </motion.div>
      </div>

      <motion.p style={{ opacity: step4 }} className="text-gray-500 mt-8 text-sm">
        Each cycle makes the next one easier
      </motion.p>
    </motion.div>
  );
}

function CorePrinciple({ scrollProgress }: { scrollProgress: any }) {
  const opacity = useTransform(scrollProgress, [0.68, 0.70, 0.80, 0.82], [0, 1, 1, 0]);
  const scale = useTransform(scrollProgress, [0.70, 0.74], [0.9, 1]);

  return (
    <motion.div style={{ opacity }} className="text-center px-6 max-w-4xl mx-auto">
      <motion.div style={{ scale }}>
        <div className="bg-gradient-to-r from-[#0EF0EB]/10 to-[#F6F400]/10 border-2 border-[#F6F400]/30 rounded-2xl p-8 md:p-12">
          <p className="text-2xl md:text-3xl font-bold text-white leading-relaxed mb-6">
            <span className="text-[#F6F400]">Performance</span> is more important than the <span className="text-gray-400">result</span>.
          </p>
          <p className="text-xl text-gray-300 leading-relaxed">
            Working on improving your performance potential knows <span className="text-[#0EF0EB]">no seasons or competitions</span>.
          </p>
        </div>

        <p className="text-gray-500 mt-8 text-lg">
          The result is outside your control. Your performance is not.
        </p>
      </motion.div>
    </motion.div>
  );
}

function GrowthBenefits({ scrollProgress }: { scrollProgress: any }) {
  const opacity = useTransform(scrollProgress, [0.80, 0.82, 0.92, 0.94], [0, 1, 1, 0]);

  return (
    <motion.div style={{ opacity }} className="px-6 max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold text-white mb-2 text-center">
        Athletes with Growth Mindset
      </h3>
      <p className="text-gray-400 text-center mb-8">
        Research shows they are...
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {GROWTH_TRAITS.slice(0, 4).map((item, index) => (
          <TraitCard
            key={item.trait}
            item={item}
            index={index}
            scrollProgress={scrollProgress}
          />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3 mt-3 max-w-xl mx-auto">
        {GROWTH_TRAITS.slice(4).map((item, index) => (
          <TraitCard
            key={item.trait}
            item={item}
            index={index + 4}
            scrollProgress={scrollProgress}
          />
        ))}
      </div>
    </motion.div>
  );
}

function TraitCard({
  item,
  index,
  scrollProgress,
}: {
  item: typeof GROWTH_TRAITS[0];
  index: number;
  scrollProgress: any;
}) {
  const start = 0.83 + index * 0.01;
  const end = start + 0.02;
  const opacity = useTransform(scrollProgress, [start, end], [0, 1]);
  const scale = useTransform(scrollProgress, [start, end], [0.8, 1]);

  return (
    <motion.div style={{ opacity, scale }}>
      <div className="p-3 bg-[#0EF0EB]/10 border border-[#0EF0EB]/30 rounded-xl text-center">
        <span className="text-2xl">{item.icon}</span>
        <p className="text-xs text-gray-300 mt-2">{item.trait}</p>
      </div>
    </motion.div>
  );
}

function MindsetScience({ scrollProgress }: { scrollProgress: any }) {
  const opacity = useTransform(scrollProgress, [0.92, 0.94, 1, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollProgress, [0.92, 0.94], [30, 0]);

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
            Athletes with a growth mindset are <strong className="text-[#0EF0EB]">less afraid of failure</strong>,
            can <strong className="text-[#F6F400]">win and lose with grace</strong>, and enjoy the success of others.
          </p>
          <p className="text-gray-300 leading-relaxed">
            This leads to more <strong className="text-white">openness, harder work, calmness, and coachability</strong>.
          </p>
        </div>

        <div className="text-center text-gray-500 text-sm mb-6">
          Source: Carol Dweck, Stanford University
        </div>

        <div className="flex items-start gap-3 p-4 bg-[#0EF0EB]/10 border border-[#0EF0EB]/30 rounded-xl">
          <span className="text-2xl">💡</span>
          <p className="text-gray-300">
            <strong className="text-white">Key insight:</strong> Mindset can be changed. Praising effort
            over talent, and reframing failure as learning, builds growth mindset over time.
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
      icon: "🌱",
      title: "Growth > Fixed",
      description: "Believe abilities can be developed through effort",
    },
    {
      icon: "📚",
      title: "Failure = Data",
      description: "Every loss is information for improvement",
    },
    {
      icon: "🎯",
      title: "Performance Focus",
      description: "Focus on your performance, not just the result",
    },
  ];

  return (
    <div ref={ref} className="min-h-screen flex items-center justify-center py-20 px-6">
      <motion.div style={{ opacity, y }} className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-white mb-4">
          Key Takeaways
        </h2>
        <p className="text-xl text-gray-400 text-center mb-12">
          Cultivate a growth mindset
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
            Module 6 Complete
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Ready for the final module?
          </h2>
          <p className="text-xl text-gray-400 max-w-xl mx-auto">
            In Module 7, you'll learn about team dynamics and communication
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={nextModuleId ? `/learn/${nextModuleId}` : "/learn"}
            className="px-8 py-4 bg-[#0EF0EB] text-black font-semibold rounded-xl hover:bg-[#0EF0EB]/90 transition-colors"
          >
            Continue to Module 7
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
