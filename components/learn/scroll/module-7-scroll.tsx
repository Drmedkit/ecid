"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

// Team Culture Section - Foundation building blocks
function TeamCultureScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0.1, 0.25, 0.75, 0.9], [0, 1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0.1, 0.25], [50, 0]);

  const block1Scale = useTransform(scrollYProgress, [0.2, 0.3], [0, 1]);
  const block2Scale = useTransform(scrollYProgress, [0.3, 0.4], [0, 1]);
  const block3Scale = useTransform(scrollYProgress, [0.4, 0.5], [0, 1]);

  const q1Opacity = useTransform(scrollYProgress, [0.35, 0.42], [0, 1]);
  const q2Opacity = useTransform(scrollYProgress, [0.45, 0.52], [0, 1]);
  const q3Opacity = useTransform(scrollYProgress, [0.55, 0.62], [0, 1]);

  const questions = [
    {
      icon: "🎯",
      question: "Where do we want to go and how do we want to get there?",
      focus: "Vision & Direction",
    },
    {
      icon: "🏗️",
      question: "How do we structure the learning environment?",
      focus: "Environment Design",
    },
    {
      icon: "🔄",
      question: "How do we deal with mistakes and setbacks?",
      focus: "Resilience Building",
    },
  ];

  return (
    <section ref={sectionRef} className="min-h-[800vh] relative">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ opacity }} className="max-w-6xl mx-auto px-6 w-full">
          <motion.div style={{ y: titleY }} className="text-center mb-12">
            <span className="text-[#0EF0EB] text-sm font-medium tracking-wider uppercase mb-4 block">
              7.1 Team Culture
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Building a Development Culture
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Three core questions that shape how your team grows together
            </p>
          </motion.div>

          {/* Building Blocks Visualization */}
          <div className="flex flex-col items-center gap-4">
            {/* Top block */}
            <motion.div
              style={{ scale: block3Scale }}
              className="w-64 h-24 bg-gradient-to-r from-[#F6F400]/20 to-[#F6F400]/10 border border-[#F6F400]/30 rounded-lg flex items-center justify-center"
            >
              <motion.div style={{ opacity: q3Opacity }} className="text-center px-4">
                <span className="text-2xl mb-1 block">{questions[2].icon}</span>
                <span className="text-[#F6F400] text-xs font-medium">{questions[2].focus}</span>
              </motion.div>
            </motion.div>

            {/* Middle block */}
            <motion.div
              style={{ scale: block2Scale }}
              className="w-80 h-24 bg-gradient-to-r from-[#0EF0EB]/20 to-[#0EF0EB]/10 border border-[#0EF0EB]/30 rounded-lg flex items-center justify-center"
            >
              <motion.div style={{ opacity: q2Opacity }} className="text-center px-4">
                <span className="text-2xl mb-1 block">{questions[1].icon}</span>
                <span className="text-[#0EF0EB] text-xs font-medium">{questions[1].focus}</span>
              </motion.div>
            </motion.div>

            {/* Foundation block */}
            <motion.div
              style={{ scale: block1Scale }}
              className="w-96 h-24 bg-gradient-to-r from-white/10 to-white/5 border border-white/20 rounded-lg flex items-center justify-center"
            >
              <motion.div style={{ opacity: q1Opacity }} className="text-center px-4">
                <span className="text-2xl mb-1 block">{questions[0].icon}</span>
                <span className="text-white text-xs font-medium">{questions[0].focus}</span>
              </motion.div>
            </motion.div>
          </div>

          {/* Questions Detail */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {questions.map((q, i) => (
              <motion.div
                key={i}
                style={{ opacity: i === 0 ? q1Opacity : i === 1 ? q2Opacity : q3Opacity }}
                className="bg-white/5 rounded-xl p-5 border border-white/10"
              >
                <p className="text-gray-300 text-sm leading-relaxed">{q.question}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Priorities Section - Pyramid hierarchy
function PrioritiesScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0.1, 0.25, 0.75, 0.9], [0, 1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0.1, 0.25], [50, 0]);

  const priority1 = useTransform(scrollYProgress, [0.25, 0.35], [0, 1]);
  const priority2 = useTransform(scrollYProgress, [0.35, 0.45], [0, 1]);
  const priority3 = useTransform(scrollYProgress, [0.45, 0.55], [0, 1]);

  const arrow1X = useTransform(scrollYProgress, [0.3, 0.4], [-50, 0]);
  const arrow2X = useTransform(scrollYProgress, [0.4, 0.5], [-50, 0]);
  const arrow3X = useTransform(scrollYProgress, [0.5, 0.6], [-50, 0]);

  const priorities = [
    {
      over: "Team",
      under: "Individual",
      description: "Collective goals prevail over personal achievements",
      color: "#0EF0EB",
    },
    {
      over: "Long-term",
      under: "Short-term",
      description: "Development over immediate results",
      color: "#F6F400",
    },
    {
      over: "Process",
      under: "Outcome",
      description: "Performance evaluation over results measurement",
      color: "#FF6B6B",
    },
  ];

  return (
    <section ref={sectionRef} className="min-h-[800vh] relative">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ opacity }} className="max-w-5xl mx-auto px-6 w-full">
          <motion.div style={{ y: titleY }} className="text-center mb-16">
            <span className="text-[#F6F400] text-sm font-medium tracking-wider uppercase mb-4 block">
              7.2 Priorities
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Development-First Priorities
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Three guiding principles for sustainable team growth
            </p>
          </motion.div>

          {/* Priority Comparisons */}
          <div className="space-y-8">
            {priorities.map((p, i) => (
              <motion.div
                key={i}
                style={{
                  opacity: i === 0 ? priority1 : i === 1 ? priority2 : priority3,
                  x: i === 0 ? arrow1X : i === 1 ? arrow2X : arrow3X,
                }}
                className="flex items-center gap-6"
              >
                {/* Priority Number */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold"
                  style={{ backgroundColor: `${p.color}20`, color: p.color }}
                >
                  {i + 1}
                </div>

                {/* Comparison */}
                <div className="flex-1 bg-white/5 rounded-xl p-6 border border-white/10">
                  <div className="flex items-center gap-4 mb-3">
                    <span
                      className="text-2xl font-bold"
                      style={{ color: p.color }}
                    >
                      {p.over}
                    </span>
                    <span className="text-gray-500 text-lg">over</span>
                    <span className="text-gray-400 text-xl">{p.under}</span>
                  </div>
                  <p className="text-gray-400 text-sm">{p.description}</p>
                </div>

                {/* Visual indicator */}
                <div className="hidden md:flex items-center gap-2">
                  <div
                    className="w-16 h-3 rounded-full"
                    style={{ backgroundColor: p.color }}
                  />
                  <div className="w-8 h-3 rounded-full bg-gray-700" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Summary */}
          <motion.div
            style={{ opacity: priority3 }}
            className="mt-12 text-center"
          >
            <p className="text-gray-400 text-sm">
              These priorities create an environment where players can take risks,
              make mistakes, and grow without fear.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Communication Section - Guidelines
function CommunicationScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0.1, 0.25, 0.75, 0.9], [0, 1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0.1, 0.25], [50, 0]);

  const card1 = useTransform(scrollYProgress, [0.25, 0.35], [0, 1]);
  const card2 = useTransform(scrollYProgress, [0.32, 0.42], [0, 1]);
  const card3 = useTransform(scrollYProgress, [0.39, 0.49], [0, 1]);
  const card4 = useTransform(scrollYProgress, [0.46, 0.56], [0, 1]);

  const guidelines = [
    {
      icon: "📋",
      title: "Clear Norms",
      description: "Clear social norms and expectations that everyone understands and follows",
      color: "#0EF0EB",
    },
    {
      icon: "🎮",
      title: "Constructive In-Game",
      description: "Constructive communication during performance - support, not blame",
      color: "#F6F400",
    },
    {
      icon: "💬",
      title: "Process Feedback",
      description: "Feedback focused on process, not person - critique actions, not character",
      color: "#FF6B6B",
    },
    {
      icon: "🛡️",
      title: "Safe Environment",
      description: "Safe environment for learning and experimentation without fear of judgment",
      color: "#9B59B6",
    },
  ];

  return (
    <section ref={sectionRef} className="min-h-[800vh] relative">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ opacity }} className="max-w-5xl mx-auto px-6 w-full">
          <motion.div style={{ y: titleY }} className="text-center mb-12">
            <span className="text-[#FF6B6B] text-sm font-medium tracking-wider uppercase mb-4 block">
              7.3 Communication
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Communication Guidelines
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              How we talk to each other shapes how we grow together
            </p>
          </motion.div>

          {/* Guidelines Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {guidelines.map((g, i) => (
              <motion.div
                key={i}
                style={{ opacity: i === 0 ? card1 : i === 1 ? card2 : i === 2 ? card3 : card4 }}
                className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
                    style={{ backgroundColor: `${g.color}20` }}
                  >
                    {g.icon}
                  </div>
                  <div className="flex-1">
                    <h3
                      className="text-lg font-semibold mb-2"
                      style={{ color: g.color }}
                    >
                      {g.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {g.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Connection visual */}
          <motion.div
            style={{ opacity: card4 }}
            className="mt-10 flex justify-center"
          >
            <div className="flex items-center gap-3">
              {guidelines.map((g, i) => (
                <div key={i} className="flex items-center">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: g.color }}
                  />
                  {i < guidelines.length - 1 && (
                    <div className="w-12 h-0.5 bg-gradient-to-r from-white/20 to-white/5" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Course Completion Section
function CourseCompletionScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0.1, 0.3, 0.8, 0.95], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0.1, 0.3], [0.8, 1]);
  const badgeScale = useTransform(scrollYProgress, [0.25, 0.4], [0, 1]);
  const listOpacity = useTransform(scrollYProgress, [0.4, 0.5], [0, 1]);

  const modules = [
    { num: 1, title: "Foundation", color: "#0EF0EB" },
    { num: 2, title: "Pressure", color: "#F6F400" },
    { num: 3, title: "Thoughts", color: "#FF6B6B" },
    { num: 4, title: "Attention", color: "#9B59B6" },
    { num: 5, title: "Control", color: "#3498DB" },
    { num: 6, title: "Mindset", color: "#E74C3C" },
    { num: 7, title: "Team", color: "#2ECC71" },
  ];

  return (
    <section ref={sectionRef} className="min-h-[600vh] relative">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ opacity, scale }}
          className="max-w-4xl mx-auto px-6 w-full text-center"
        >
          {/* Completion Badge */}
          <motion.div
            style={{ scale: badgeScale }}
            className="mb-8"
          >
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-[#0EF0EB] via-[#F6F400] to-[#FF6B6B] p-1">
              <div className="w-full h-full rounded-full bg-[#0a0a0a] flex items-center justify-center">
                <span className="text-5xl">🏆</span>
              </div>
            </div>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Course Complete!
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
            You've completed all 7 modules of the ECID Esports Coaching program.
          </p>

          {/* Module Summary */}
          <motion.div
            style={{ opacity: listOpacity }}
            className="flex flex-wrap justify-center gap-3 mb-10"
          >
            {modules.map((m) => (
              <div
                key={m.num}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10"
              >
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ backgroundColor: m.color }}
                >
                  {m.num}
                </div>
                <span className="text-gray-300 text-sm">{m.title}</span>
                <span className="text-green-500">✓</span>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div style={{ opacity: listOpacity }}>
            <Link
              href="/learn"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#0EF0EB] to-[#0EF0EB]/80 text-black font-semibold rounded-xl hover:opacity-90 transition-opacity"
            >
              Back to Course Overview
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Main Module 7 Page
export function Module7ScrollPage() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
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
              alt="ECID"
              width={80}
              height={28}
              className="object-contain"
            />
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2ECC71]/10 via-transparent to-[#0EF0EB]/10" />
        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-[#2ECC71]/20 text-[#2ECC71] text-sm font-medium mb-6">
              Module 7 • Final Module
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Team Dynamics
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
              Building a development-focused team culture through shared values and effective communication
            </p>
            <div className="flex items-center justify-center gap-2 text-gray-500">
              <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              <span>Scroll to explore</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Sections */}
      <TeamCultureScroll />
      <PrioritiesScroll />
      <CommunicationScroll />
      <CourseCompletionScroll />

      {/* Footer */}
      <footer className="py-12 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-500 text-sm">
            ECID Esports Coaching Program • Module 7: Team Dynamics
          </p>
        </div>
      </footer>
    </div>
  );
}
