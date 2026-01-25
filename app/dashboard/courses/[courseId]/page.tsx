"use client";

import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Course {
  id: string;
  title: string;
  description: string | null;
  topics: {
    id: string;
    title: string;
    description: string | null;
    order: number;
    _count: { contents: number };
  }[];
}

export default function CourseDetailPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const courseId = params.courseId as string;
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    fetch(`/api/courses/${courseId}?includeTopics=true`)
      .then((res) => res.json())
      .then((data) => {
        setCourse(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [courseId]);

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-white">Loading...</div>
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
      <nav className="border-b border-gray-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <Link href="/dashboard/courses" className="text-gray-400 hover:text-white">
            ← Courses
          </Link>
        </div>
      </nav>

      <header className="bg-gradient-to-b from-[#0EF0EB]/10 to-transparent border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h1 className="text-3xl font-bold text-white mb-4">{course.title}</h1>
          {course.description && (
            <p className="text-gray-400 max-w-2xl">{course.description}</p>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-xl font-bold text-white mb-6">Topics</h2>

        <div className="space-y-4">
          {course.topics
            .sort((a, b) => a.order - b.order)
            .map((topic, index) => (
              <Link
                key={topic.id}
                href={`/dashboard/courses/${courseId}/${topic.id}`}
                className="flex items-start gap-4 p-6 bg-[#1a1a1a] border border-gray-800 rounded-lg hover:border-[#0EF0EB] transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-[#0EF0EB]/20 flex items-center justify-center text-[#0EF0EB] font-bold shrink-0">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white group-hover:text-[#0EF0EB] transition-colors">
                    {topic.title}
                  </h3>
                  {topic.description && (
                    <p className="text-gray-400 text-sm mt-1">{topic.description}</p>
                  )}
                  <div className="text-xs text-gray-500 mt-2">
                    {topic._count.contents} article{topic._count.contents !== 1 ? "s" : ""}
                  </div>
                </div>
                <div className="text-gray-600 group-hover:text-[#0EF0EB] transition-colors">
                  →
                </div>
              </Link>
            ))}

          {course.topics.length === 0 && (
            <p className="text-gray-500 text-center py-12">
              No topics available yet.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
