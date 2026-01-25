"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ContentItem {
  id: string;
  title: string;
  body: string;
  status: string;
  updatedAt: string;
  author: { name: string; email: string };
  topic: { title: string; course: { title: string } };
  reviews: { id: string; status: string; comment: string; reviewer: { name: string }; createdAt: string }[];
}

export default function ReviewPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await fetch("/api/reviews");
      if (res.ok) {
        const data = await res.json();
        setContent(data);
      }
    } catch (error) {
      console.error("Failed to fetch content:", error);
    } finally {
      setLoading(false);
    }
  };

  const submitReview = async (contentId: string, reviewStatus: "approved" | "changes_requested") => {
    setSubmitting(true);
    try {
      const res = await fetch(`/api/reviews/${contentId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: reviewStatus, comment }),
      });
      if (res.ok) {
        setSelectedItem(null);
        setComment("");
        fetchContent();
      }
    } catch (error) {
      console.error("Failed to submit review:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-[#0EF0EB]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <header className="border-b border-gray-800 p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            <span className="text-[#0EF0EB]">ECID</span> Review Dashboard
          </h1>
          <button
            onClick={() => router.push("/dashboard")}
            className="text-gray-400 hover:text-white"
          >
            Back to Dashboard
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        <h2 className="text-xl mb-6 text-[#F6F400]">Pending Content for Review</h2>

        {content.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No content pending review
          </div>
        ) : (
          <div className="grid gap-4">
            {content.map((item) => (
              <div
                key={item.id}
                className="border border-gray-800 rounded-lg p-4 hover:border-[#0EF0EB] transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-400">
                      {item.topic.course.title} / {item.topic.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      By {item.author.name || item.author.email} - Updated {new Date(item.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedItem(selectedItem?.id === item.id ? null : item)}
                    className="px-4 py-2 bg-[#0EF0EB] text-black rounded hover:bg-[#0EF0EB]/80"
                  >
                    {selectedItem?.id === item.id ? "Close" : "Review"}
                  </button>
                </div>

                {selectedItem?.id === item.id && (
                  <div className="mt-4 border-t border-gray-800 pt-4">
                    <div className="bg-gray-900 rounded p-4 mb-4 max-h-96 overflow-y-auto">
                      <h4 className="text-sm text-[#F6F400] mb-2">Content Preview:</h4>
                      <div className="prose prose-invert prose-sm max-w-none whitespace-pre-wrap">
                        {item.body}
                      </div>
                    </div>

                    {item.reviews.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm text-gray-400 mb-2">Previous Reviews:</h4>
                        {item.reviews.map((review) => (
                          <div key={review.id} className="text-sm bg-gray-900/50 p-2 rounded mb-2">
                            <span className={review.status === "approved" ? "text-green-400" : "text-orange-400"}>
                              {review.status === "approved" ? "Approved" : "Changes Requested"}
                            </span>
                            <span className="text-gray-500"> by {review.reviewer.name}</span>
                            {review.comment && <p className="text-gray-400 mt-1">{review.comment}</p>}
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="space-y-3">
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Add feedback for the contributor (optional for approval, recommended for changes)..."
                        className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white placeholder-gray-500 focus:border-[#0EF0EB] focus:outline-none"
                        rows={3}
                      />
                      <div className="flex gap-3">
                        <button
                          onClick={() => submitReview(item.id, "approved")}
                          disabled={submitting}
                          className="flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                        >
                          {submitting ? "..." : "Approve"}
                        </button>
                        <button
                          onClick={() => submitReview(item.id, "changes_requested")}
                          disabled={submitting}
                          className="flex-1 px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 disabled:opacity-50"
                        >
                          {submitting ? "..." : "Request Changes"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
