"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Topic {
  id: string;
  title: string;
  description: string | null;
  order: number;
}

interface Course {
  id: string;
  title: string;
  description: string | null;
  topics: Topic[];
}

export default function LearnPage() {
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the Mental Performance course
    fetch("/api/courses")
      .then((res) => res.json())
      .then((courses) => {
        const mentalPerformanceCourse = courses.find((c: Course) =>
          c.title.includes("Mental Performance")
        );
        if (mentalPerformanceCourse) {
          // Fetch with topics
          fetch(`/api/courses/${mentalPerformanceCourse.id}?includeTopics=true`)
            .then((res) => res.json())
            .then(setCourse)
            .catch(console.error);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-[#0EF0EB]">Loading course...</div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-white">Course not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <nav className="border-b border-gray-800 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Image
              src="/images/ecid-logo-horizontal.png"
              alt="ECID Logo"
              width={100}
              height={35}
              className="object-contain"
            />
          </Link>
          <Link
            href="/dashboard"
            className="text-gray-400 hover:text-white transition-colors"
          >
            Dashboard
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0EF0EB]/10 to-transparent" />
        <div className="max-w-6xl mx-auto px-6 py-16 relative">
          <div className="text-center mb-8">
            <span className="inline-block px-4 py-1 bg-[#0EF0EB]/20 text-[#0EF0EB] text-sm font-medium rounded-full mb-4">
              Interactive Course
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {course.title}
            </h1>
            {course.description && (
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                {course.description}
              </p>
            )}
          </div>

          {/* Course Stats */}
          <div className="flex justify-center gap-8 mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#0EF0EB]">
                {course.topics.length}
              </div>
              <div className="text-gray-400">Modules</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#F6F400]">7+</div>
              <div className="text-gray-400">Video Lessons</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">Interactive</div>
              <div className="text-gray-400">Learning</div>
            </div>
          </div>
        </div>
      </div>

      {/* Module Grid */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-white mb-8">Course Modules</h2>
        <div className="grid gap-4">
          {course.topics
            .sort((a, b) => a.order - b.order)
            .map((topic, index) => (
              <Link
                key={topic.id}
                href={`/learn/${topic.id}`}
                className="group block p-6 bg-[#1a1a1a] border border-gray-800 rounded-xl hover:border-[#0EF0EB] transition-all hover:shadow-lg hover:shadow-[#0EF0EB]/10"
              >
                <div className="flex items-start gap-6">
                  {/* Module Number */}
                  <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-[#0EF0EB]/10 flex items-center justify-center">
                    <span className="text-2xl font-bold text-[#0EF0EB]">
                      {topic.order}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-white group-hover:text-[#0EF0EB] transition-colors">
                      {topic.title}
                    </h3>
                    {topic.description && (
                      <p className="text-gray-400 mt-2 line-clamp-2">
                        {topic.description}
                      </p>
                    )}
                  </div>

                  {/* Arrow */}
                  <div className="flex-shrink-0 text-gray-600 group-hover:text-[#0EF0EB] transition-colors">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-12 py-8 px-6">
        <div className="max-w-6xl mx-auto text-center text-gray-500 text-sm">
          ECID - Esports Coaching for Inclusion and Development
        </div>
      </footer>
    </div>
  );
}
