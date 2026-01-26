"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { MermaidDiagram } from "@/components/learn/mermaid-diagram";

// Dynamically import scroll pages to avoid SSR issues with framer-motion
const Module1ScrollPage = dynamic(
  () => import("@/components/learn/scroll").then((mod) => mod.Module1ScrollPage),
  { ssr: false, loading: () => <LoadingScreen /> }
);

const Module2ScrollPage = dynamic(
  () => import("@/components/learn/scroll").then((mod) => mod.Module2ScrollPage),
  { ssr: false, loading: () => <LoadingScreen /> }
);

const Module3ScrollPage = dynamic(
  () => import("@/components/learn/scroll").then((mod) => mod.Module3ScrollPage),
  { ssr: false, loading: () => <LoadingScreen /> }
);

const Module4ScrollPage = dynamic(
  () => import("@/components/learn/scroll").then((mod) => mod.Module4ScrollPage),
  { ssr: false, loading: () => <LoadingScreen /> }
);

const Module5ScrollPage = dynamic(
  () => import("@/components/learn/scroll").then((mod) => mod.Module5ScrollPage),
  { ssr: false, loading: () => <LoadingScreen /> }
);

const Module6ScrollPage = dynamic(
  () => import("@/components/learn/scroll").then((mod) => mod.Module6ScrollPage),
  { ssr: false, loading: () => <LoadingScreen /> }
);

const Module7ScrollPage = dynamic(
  () => import("@/components/learn/scroll").then((mod) => mod.Module7ScrollPage),
  { ssr: false, loading: () => <LoadingScreen /> }
);

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="text-[#0EF0EB]">Loading experience...</div>
    </div>
  );
}

interface Content {
  id: string;
  title: string;
  body: string;
  status: string;
}

interface Topic {
  id: string;
  title: string;
  description: string | null;
  order: number;
  contents: Content[];
  course: { title: string };
}

export default function ModulePage() {
  const params = useParams();
  const moduleId = params.moduleId as string;
  const [topic, setTopic] = useState<Topic | null>(null);
  const [nextModuleId, setNextModuleId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [useScrollExperience, setUseScrollExperience] = useState(false);

  useEffect(() => {
    // Fetch current topic and all topics to find next module
    Promise.all([
      fetch(`/api/topics/${moduleId}?includeContent=true`).then((res) => res.json()),
      fetch("/api/courses").then((res) => res.json()),
    ])
      .then(async ([topicData, courses]) => {
        setTopic(topicData);

        // Find the course and get all topics to determine next module
        const course = courses.find((c: { title: string }) =>
          c.title.includes("Mental Performance")
        );
        if (course) {
          const courseWithTopics = await fetch(
            `/api/courses/${course.id}?includeTopics=true`
          ).then((res) => res.json());

          const sortedTopics = courseWithTopics.topics.sort(
            (a: Topic, b: Topic) => a.order - b.order
          );
          const currentIndex = sortedTopics.findIndex(
            (t: Topic) => t.order === topicData?.order
          );
          if (currentIndex >= 0 && currentIndex < sortedTopics.length - 1) {
            setNextModuleId(sortedTopics[currentIndex + 1].id);
          }
        }

        // Enable scroll experience for Modules 1-7
        if (topicData?.order >= 1 && topicData?.order <= 7) {
          setUseScrollExperience(true);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [moduleId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-[#0EF0EB]">Loading module...</div>
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-white">Module not found</div>
      </div>
    );
  }

  // Use scroll experience for Modules 1-7
  if (useScrollExperience) {
    if (topic.order === 1) {
      return <Module1ScrollPage nextModuleId={nextModuleId} />;
    }
    if (topic.order === 2) {
      return <Module2ScrollPage nextModuleId={nextModuleId} />;
    }
    if (topic.order === 3) {
      return <Module3ScrollPage nextModuleId={nextModuleId} />;
    }
    if (topic.order === 4) {
      return <Module4ScrollPage nextModuleId={nextModuleId} />;
    }
    if (topic.order === 5) {
      return <Module5ScrollPage nextModuleId={nextModuleId} />;
    }
    if (topic.order === 6) {
      return <Module6ScrollPage nextModuleId={nextModuleId} />;
    }
    if (topic.order === 7) {
      return <Module7ScrollPage />;
    }
  }

  const content = topic.contents?.find((c) => c.status === "approved");

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <nav className="border-b border-gray-800 px-6 py-4 sticky top-0 bg-[#0a0a0a]/95 backdrop-blur z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/learn"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </Link>
            <div>
              <div className="text-xs text-[#0EF0EB]">{topic.course?.title}</div>
              <h1 className="text-lg font-semibold text-white">{topic.title}</h1>
            </div>
          </div>
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

      {/* Module Header */}
      <div className="relative overflow-hidden border-b border-gray-800">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0EF0EB]/10 via-transparent to-[#F6F400]/10" />
        <div className="max-w-6xl mx-auto px-6 py-12 relative">
          <div className="flex items-center gap-4 mb-4">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-[#0EF0EB]/20 text-[#0EF0EB] font-bold text-xl">
              {topic.order}
            </span>
            <h2 className="text-3xl font-bold text-white">{topic.title}</h2>
          </div>
          {topic.description && (
            <p className="text-gray-400 text-lg max-w-3xl">{topic.description}</p>
          )}
        </div>
      </div>

      {/* Content Area */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        {content ? (
          <div className="space-y-8">
            {/* Video Player */}
            <ModuleVideo moduleOrder={topic.order} moduleTitle={topic.title} />

            {/* Content Sections */}
            <div className="prose prose-invert prose-lg max-w-none">
              <ContentRenderer body={content.body} />
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No content available for this module yet.</p>
          </div>
        )}
      </main>

      {/* Navigation Footer */}
      <footer className="border-t border-gray-800 py-6 px-6">
        <div className="max-w-6xl mx-auto flex justify-between">
          <Link
            href="/learn"
            className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
          >
            ← Back to Course
          </Link>
        </div>
      </footer>
    </div>
  );
}

// Video mapping for modules
const MODULE_VIDEOS: Record<number, string> = {
  1: "/videos/module-1-foundation.mp4",
  // Add more modules as videos are created
  // 2: "/videos/module-2-pressure.mp4",
};

function ModuleVideo({ moduleOrder, moduleTitle }: { moduleOrder: number; moduleTitle: string }) {
  const videoSrc = MODULE_VIDEOS[moduleOrder];

  if (!videoSrc) {
    // Placeholder for modules without videos
    return (
      <div className="aspect-video bg-[#1a1a1a] rounded-xl border border-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🎬</div>
          <p className="text-gray-400">Video coming soon</p>
          <p className="text-gray-600 text-sm mt-2">
            Module {moduleOrder}: {moduleTitle}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <video
        className="w-full aspect-video rounded-xl border border-gray-800 bg-black"
        controls
        poster=""
        preload="metadata"
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="mt-3 flex items-center justify-between text-sm">
        <span className="text-gray-500">
          Module {moduleOrder} Introduction
        </span>
        <span className="text-[#0EF0EB]">
          40 seconds
        </span>
      </div>
    </div>
  );
}

// Content renderer that handles markdown and mermaid blocks
function ContentRenderer({ body }: { body: string }) {
  // Split content by mermaid code blocks
  const parts = body.split(/(```mermaid[\s\S]*?```)/g);

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("```mermaid")) {
          // Extract mermaid code
          const code = part.replace(/```mermaid\n?/, "").replace(/\n?```$/, "");
          return (
            <div key={index} className="my-8">
              <MermaidDiagram chart={code} />
            </div>
          );
        }

        // Regular markdown content - render as HTML
        // For now, simple rendering with basic formatting
        return (
          <div
            key={index}
            className="content-section"
            dangerouslySetInnerHTML={{
              __html: formatMarkdown(part),
            }}
          />
        );
      })}
    </>
  );
}

// Simple markdown formatter (can be enhanced later)
function formatMarkdown(text: string): string {
  return text
    // Headers
    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold text-white mt-8 mb-4">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-white mt-10 mb-4">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-white mt-12 mb-6">$1</h1>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#0EF0EB]">$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Lists
    .replace(/^\s*[-*]\s+(.*$)/gim, '<li class="text-gray-300 ml-4">$1</li>')
    // Numbered lists
    .replace(/^\s*(\d+)\.\s+(.*$)/gim, '<li class="text-gray-300 ml-4"><span class="text-[#F6F400]">$1.</span> $2</li>')
    // Paragraphs
    .replace(/\n\n/g, '</p><p class="text-gray-300 leading-relaxed mb-4">')
    // Wrap in paragraph if not already
    .replace(/^(?!<)(.+)$/gim, '<p class="text-gray-300 leading-relaxed mb-4">$1</p>');
}
