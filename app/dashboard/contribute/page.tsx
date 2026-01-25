"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Topic {
  id: string;
  title: string;
  description: string | null;
  course: {
    title: string;
  };
}

interface MyContent {
  id: string;
  title: string;
  status: string;
  updatedAt: string;
  topic: { title: string; course: { title: string } };
  reviews: { status: string; comment: string; reviewer: { name: string }; createdAt: string }[];
}

export default function ContributePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [myContent, setMyContent] = useState<MyContent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    Promise.all([
      fetch("/api/topics").then((res) => res.json()),
      fetch("/api/content/mine").then((res) => res.ok ? res.json() : []),
    ])
      .then(([topicsData, contentData]) => {
        setTopics(topicsData);
        setMyContent(contentData);
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

  const getStatusBadge = (s: string) => {
    const styles: Record<string, string> = {
      draft: "bg-gray-600 text-gray-200",
      pending: "bg-yellow-600 text-yellow-100",
      approved: "bg-green-600 text-green-100",
    };
    return styles[s] || styles.draft;
  };

  const getStatusLabel = (s: string) => {
    const labels: Record<string, string> = {
      draft: "Draft",
      pending: "Pending Review",
      approved: "Approved",
    };
    return labels[s] || s;
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <nav className="border-b border-gray-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-gray-400 hover:text-white">
              ← Back
            </Link>
            <h1 className="text-xl font-bold text-white">Contribute Content</h1>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* My Submissions Section */}
        {myContent.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-bold text-[#F6F400] mb-4">My Submissions</h2>
            <div className="grid gap-4">
              {myContent.map((item) => (
                <div
                  key={item.id}
                  className="p-4 bg-[#1a1a1a] border border-gray-800 rounded-lg"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                      <p className="text-xs text-gray-400">
                        {item.topic.course.title} / {item.topic.title}
                      </p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded ${getStatusBadge(item.status)}`}>
                      {getStatusLabel(item.status)}
                    </span>
                  </div>
                  
                  {item.reviews.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-700">
                      <h4 className="text-sm text-gray-400 mb-2">Latest Review:</h4>
                      <div className="bg-gray-900 p-3 rounded">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={item.reviews[0].status === "approved" ? "text-green-400" : "text-orange-400"}>
                            {item.reviews[0].status === "approved" ? "✓ Approved" : "⚠ Changes Requested"}
                          </span>
                          <span className="text-gray-500 text-sm">
                            by {item.reviews[0].reviewer.name}
                          </span>
                        </div>
                        {item.reviews[0].comment && (
                          <p className="text-gray-300 text-sm mt-2">{item.reviews[0].comment}</p>
                        )}
                      </div>
                    </div>
                  )}

                  <Link
                    href={`/dashboard/contribute/${item.topic.id}?edit=${item.id}`}
                    className="inline-block mt-3 text-[#0EF0EB] text-sm hover:underline"
                  >
                    Continue editing →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* New Contribution Section */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Start New Contribution</h2>
          <p className="text-gray-400 mb-6">
            Select a topic to contribute content to. Your submission will be reviewed by editors.
          </p>

          <div className="grid gap-4">
            {topics.map((topic) => (
              <Link
                key={topic.id}
                href={`/dashboard/contribute/${topic.id}`}
                className="p-6 bg-[#1a1a1a] border border-gray-800 rounded-lg hover:border-[#0EF0EB] transition-colors"
              >
                <div className="text-xs text-[#0EF0EB] mb-2">{topic.course.title}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{topic.title}</h3>
                {topic.description && (
                  <p className="text-gray-400 text-sm">{topic.description}</p>
                )}
              </Link>
            ))}

            {topics.length === 0 && (
              <p className="text-gray-500">No topics available yet.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
