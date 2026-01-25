"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Topic {
  id: string;
  title: string;
  description: string | null;
  guidelines: string | null;
}

interface Course {
  id: string;
  title: string;
  description: string | null;
  guidelines: string | null;
  topics: Topic[];
}

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTopic, setEditingTopic] = useState<Topic | null>(null);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated" && session?.user?.role !== "admin") {
      router.push("/dashboard");
    }
  }, [status, session, router]);

  useEffect(() => {
    fetch("/api/courses")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const saveTopic = async () => {
    if (!editingTopic) return;
    setSaving(true);

    try {
      await fetch(`/api/topics/${editingTopic.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingTopic),
      });

      setCourses((prev) =>
        prev.map((c) => ({
          ...c,
          topics: c.topics.map((t) =>
            t.id === editingTopic.id ? editingTopic : t
          ),
        }))
      );
      setEditingTopic(null);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const saveCourse = async () => {
    if (!editingCourse) return;
    setSaving(true);

    try {
      await fetch(`/api/courses/${editingCourse.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingCourse),
      });

      setCourses((prev) =>
        prev.map((c) => (c.id === editingCourse.id ? { ...editingCourse, topics: c.topics } : c))
      );
      setEditingCourse(null);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

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
          <h1 className="text-xl font-bold text-white">Admin - Manage Content Structure</h1>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-8">
        <p className="text-gray-400 mb-8">
          Set guidelines for each course and topic. Contributors will see these when writing content.
        </p>

        <div className="space-y-6">
          {courses.map((course) => (
            <div key={course.id} className="bg-[#1a1a1a] border border-gray-800 rounded-lg overflow-hidden">
              <div className="p-4 border-b border-gray-800 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-white">{course.title}</h2>
                  {course.description && (
                    <p className="text-gray-400 text-sm">{course.description}</p>
                  )}
                </div>
                <button
                  onClick={() => setEditingCourse(course)}
                  className="px-3 py-1 text-sm text-[#0EF0EB] border border-[#0EF0EB] rounded hover:bg-[#0EF0EB]/10 transition-colors"
                >
                  Edit Course
                </button>
              </div>

              {course.guidelines && (
                <div className="px-4 py-2 bg-[#0EF0EB]/5 border-b border-gray-800">
                  <span className="text-xs text-[#0EF0EB]">Course Guidelines:</span>
                  <p className="text-gray-300 text-sm">{course.guidelines}</p>
                </div>
              )}

              <div className="divide-y divide-gray-800">
                {course.topics.map((topic) => (
                  <div key={topic.id} className="p-4 flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-white font-medium">{topic.title}</h3>
                      {topic.description && (
                        <p className="text-gray-400 text-sm">{topic.description}</p>
                      )}
                      {topic.guidelines && (
                        <p className="text-[#0EF0EB]/70 text-sm mt-1">
                          Guidelines: {topic.guidelines.substring(0, 100)}...
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => setEditingTopic(topic)}
                      className="px-3 py-1 text-sm text-gray-400 border border-gray-600 rounded hover:border-gray-400 transition-colors"
                    >
                      Edit
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Topic Edit Modal */}
      {editingTopic && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-[#1a1a1a] border border-gray-700 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-700">
              <h3 className="text-lg font-semibold text-white">Edit Topic</h3>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Title</label>
                <input
                  type="text"
                  value={editingTopic.title}
                  onChange={(e) => setEditingTopic({ ...editingTopic, title: e.target.value })}
                  className="w-full px-3 py-2 bg-[#0a0a0a] border border-gray-700 rounded text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Description</label>
                <input
                  type="text"
                  value={editingTopic.description || ""}
                  onChange={(e) => setEditingTopic({ ...editingTopic, description: e.target.value })}
                  className="w-full px-3 py-2 bg-[#0a0a0a] border border-gray-700 rounded text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Guidelines for Contributors</label>
                <textarea
                  value={editingTopic.guidelines || ""}
                  onChange={(e) => setEditingTopic({ ...editingTopic, guidelines: e.target.value })}
                  rows={6}
                  className="w-full px-3 py-2 bg-[#0a0a0a] border border-gray-700 rounded text-white resize-none"
                  placeholder="Explain what content you expect for this topic. What should contributors write about? What format? What length?"
                />
              </div>
            </div>
            <div className="p-4 border-t border-gray-700 flex justify-end gap-3">
              <button
                onClick={() => setEditingTopic(null)}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveTopic}
                disabled={saving}
                className="px-4 py-2 bg-[#0EF0EB] text-black font-semibold rounded hover:bg-[#0EF0EB]/90 transition-colors disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Course Edit Modal */}
      {editingCourse && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-[#1a1a1a] border border-gray-700 rounded-lg w-full max-w-2xl">
            <div className="p-4 border-b border-gray-700">
              <h3 className="text-lg font-semibold text-white">Edit Course</h3>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Title</label>
                <input
                  type="text"
                  value={editingCourse.title}
                  onChange={(e) => setEditingCourse({ ...editingCourse, title: e.target.value })}
                  className="w-full px-3 py-2 bg-[#0a0a0a] border border-gray-700 rounded text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Description</label>
                <input
                  type="text"
                  value={editingCourse.description || ""}
                  onChange={(e) => setEditingCourse({ ...editingCourse, description: e.target.value })}
                  className="w-full px-3 py-2 bg-[#0a0a0a] border border-gray-700 rounded text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Course Guidelines (applies to all topics)</label>
                <textarea
                  value={editingCourse.guidelines || ""}
                  onChange={(e) => setEditingCourse({ ...editingCourse, guidelines: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 bg-[#0a0a0a] border border-gray-700 rounded text-white resize-none"
                  placeholder="General guidelines for all topics in this course..."
                />
              </div>
            </div>
            <div className="p-4 border-t border-gray-700 flex justify-end gap-3">
              <button
                onClick={() => setEditingCourse(null)}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveCourse}
                disabled={saving}
                className="px-4 py-2 bg-[#0EF0EB] text-black font-semibold rounded hover:bg-[#0EF0EB]/90 transition-colors disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
