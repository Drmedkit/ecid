"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Course {
  id: string;
  title: string;
  description: string | null;
  _count: { topics: number };
}

export default function CoursesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    fetch("/api/courses")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <nav className="border-b border-gray-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <Link href="/dashboard" className="text-gray-400 hover:text-white">
            ← Back
          </Link>
          <h1 className="text-xl font-bold text-white">Courses</h1>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <p className="text-gray-400 mb-8">
          Browse available courses and learn from community-contributed content.
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <Link
              key={course.id}
              href={`/dashboard/courses/${course.id}`}
              className="p-6 bg-[#1a1a1a] border border-gray-800 rounded-lg hover:border-[#0EF0EB] transition-all hover:shadow-lg hover:shadow-[#0EF0EB]/10"
            >
              <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
              {course.description && (
                <p className="text-gray-400 text-sm mb-4">{course.description}</p>
              )}
              <div className="flex items-center gap-2 text-sm">
                <span className="text-[#0EF0EB]">{course._count.topics} topics</span>
              </div>
            </Link>
          ))}

          {courses.length === 0 && (
            <p className="text-gray-500 col-span-full text-center py-12">
              No courses available yet.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
