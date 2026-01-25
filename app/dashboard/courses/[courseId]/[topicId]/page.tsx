"use client";

import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

interface TopicContent {
  id: string;
  title: string;
  body: string;
  author: { name: string | null };
  createdAt: string;
}

interface Topic {
  id: string;
  title: string;
  description: string | null;
  course: { id: string; title: string };
  contents: TopicContent[];
}

export default function TopicContentPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const courseId = params.courseId as string;
  const topicId = params.topicId as string;
  const [topic, setTopic] = useState<Topic | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedContent, setSelectedContent] = useState<TopicContent | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    fetch(`/api/topics/${topicId}?includeContent=true`)
      .then((res) => res.json())
      .then((data) => {
        setTopic(data);
        if (data.contents?.length > 0) {
          setSelectedContent(data.contents[0]);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [topicId]);

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-white">Topic not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <nav className="border-b border-gray-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <Link href={`/dashboard/courses/${courseId}`} className="text-gray-400 hover:text-white">
            ← {topic.course.title}
          </Link>
        </div>
      </nav>

      <header className="bg-gradient-to-b from-[#F6F400]/10 to-transparent border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-xs text-[#0EF0EB] mb-2">{topic.course.title}</div>
          <h1 className="text-2xl font-bold text-white mb-2">{topic.title}</h1>
          {topic.description && (
            <p className="text-gray-400">{topic.description}</p>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {topic.contents.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No approved content yet for this topic.</p>
            <Link
              href={`/dashboard/contribute/${topicId}`}
              className="text-[#0EF0EB] hover:underline"
            >
              Be the first to contribute →
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Content List Sidebar */}
            <div className="lg:col-span-1">
              <h3 className="text-sm font-medium text-gray-400 mb-4">Articles</h3>
              <div className="space-y-2">
                {topic.contents.map((content) => (
                  <button
                    key={content.id}
                    onClick={() => setSelectedContent(content)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedContent?.id === content.id
                        ? "bg-[#0EF0EB]/20 border border-[#0EF0EB]/50 text-white"
                        : "bg-[#1a1a1a] border border-gray-800 text-gray-300 hover:border-gray-600"
                    }`}
                  >
                    <div className="font-medium text-sm">{content.title}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      by {content.author.name || "Anonymous"}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Content Display */}
            <div className="lg:col-span-3">
              {selectedContent && (
                <article className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">{selectedContent.title}</h2>
                  <div className="text-xs text-gray-500 mb-6">
                    By {selectedContent.author.name || "Anonymous"} • {new Date(selectedContent.createdAt).toLocaleDateString()}
                  </div>
                  <div className="prose prose-invert prose-cyan max-w-none">
                    {selectedContent.body.split("\n").map((paragraph, i) => {
                      if (paragraph.startsWith("# ")) {
                        return <h1 key={i} className="text-2xl font-bold text-white mt-8 mb-4">{paragraph.slice(2)}</h1>;
                      }
                      if (paragraph.startsWith("## ")) {
                        return <h2 key={i} className="text-xl font-bold text-white mt-6 mb-3">{paragraph.slice(3)}</h2>;
                      }
                      if (paragraph.startsWith("### ")) {
                        return <h3 key={i} className="text-lg font-bold text-white mt-4 mb-2">{paragraph.slice(4)}</h3>;
                      }
                      if (paragraph.startsWith("- ")) {
                        return <li key={i} className="text-gray-300 ml-4">{paragraph.slice(2)}</li>;
                      }
                      if (paragraph.trim() === "") {
                        return <br key={i} />;
                      }
                      return <p key={i} className="text-gray-300 mb-4">{paragraph}</p>;
                    })}
                  </div>
                </article>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
