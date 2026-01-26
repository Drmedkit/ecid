"use client";

import { useSession } from "next-auth/react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

const MarkdownEditor = dynamic(
  () => import("@/components/editor/markdown-editor").then((mod) => mod.MarkdownEditor),
  { ssr: false, loading: () => <div className="text-gray-400">Loading editor...</div> }
);

interface Topic {
  id: string;
  title: string;
  description: string | null;
  guidelines: string | null;
  course: { title: string; guidelines: string | null };
}

export default function EditorPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const topicId = params.topicId as string;
  const editId = searchParams.get("edit");

  const [topic, setTopic] = useState<Topic | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState<"saved" | "saving" | "unsaved">("saved");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [contentId, setContentId] = useState<string | null>(editId);
  const [showGuidelines, setShowGuidelines] = useState(true);
  const [loadingContent, setLoadingContent] = useState(!!editId);

  const autoSaveTimerRef = useRef<NodeJS.Timeout | null>(null);
  const initialLoadDone = useRef(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    fetch(`/api/topics/${topicId}`)
      .then((res) => res.json())
      .then(setTopic)
      .catch(console.error);
  }, [topicId]);

  // Load existing content if editing
  useEffect(() => {
    if (editId && !initialLoadDone.current) {
      initialLoadDone.current = true;
      fetch(`/api/content/${editId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data && !data.error) {
            setTitle(data.title || "");
            setContent(data.body || "");
            setContentId(data.id);
          }
          setLoadingContent(false);
        })
        .catch((err) => {
          console.error("Failed to load content:", err);
          setLoadingContent(false);
        });
    }
  }, [editId]);

  // Auto-save function
  const autoSave = useCallback(async () => {
    if (!title.trim() || !content.trim()) return;
    
    setAutoSaveStatus("saving");
    
    try {
      const res = await fetch(contentId ? `/api/content/${contentId}` : "/api/content", {
        method: contentId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          body: content,
          topicId,
          status: "draft",
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (!contentId) setContentId(data.id);
        setAutoSaveStatus("saved");
      }
    } catch (err) {
      console.error("Auto-save failed:", err);
    }
  }, [title, content, topicId, contentId]);

  // Trigger auto-save on content change
  useEffect(() => {
    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current);
    }

    if (title || content) {
      setAutoSaveStatus("unsaved");
      autoSaveTimerRef.current = setTimeout(autoSave, 3000);
    }

    return () => {
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current);
      }
    };
  }, [title, content, autoSave]);

  const handleSubmit = async (asDraft: boolean) => {
    if (!title.trim()) {
      setError("Please enter a title");
      return;
    }
    if (!content.trim()) {
      setError("Please enter some content");
      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch(contentId ? `/api/content/${contentId}` : "/api/content", {
        method: contentId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          body: content,
          topicId,
          status: asDraft ? "draft" : "pending",
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save");
      }

      setSuccess(asDraft ? "Draft saved!" : "Submitted for review!");
      setTimeout(() => router.push("/dashboard/contribute"), 1500);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (status === "loading" || !topic || loadingContent) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  const hasGuidelines = topic.guidelines || topic.course.guidelines;

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <nav className="border-b border-gray-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/contribute" className="text-gray-400 hover:text-white">
              ← Back
            </Link>
            <div>
              <div className="text-xs text-[#0EF0EB]">{topic.course.title}</div>
              <h1 className="text-xl font-bold text-white">{topic.title}</h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className={`text-xs ${
              autoSaveStatus === "saved" ? "text-green-500" : 
              autoSaveStatus === "saving" ? "text-yellow-500" : 
              "text-gray-500"
            }`}>
              {autoSaveStatus === "saved" && "✓ Saved"}
              {autoSaveStatus === "saving" && "Saving..."}
              {autoSaveStatus === "unsaved" && "Unsaved changes"}
            </span>
            <button
              onClick={() => handleSubmit(true)}
              disabled={saving}
              className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:border-gray-400 transition-colors disabled:opacity-50"
            >
              Save Draft
            </button>
            <button
              onClick={() => handleSubmit(false)}
              disabled={saving}
              className="px-4 py-2 bg-[#0EF0EB] text-black font-semibold rounded-lg hover:bg-[#0EF0EB]/90 transition-colors disabled:opacity-50"
            >
              Submit for Review
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {error && (
          <div className="mb-4 p-4 bg-red-500/10 border border-red-500 text-red-500 rounded-lg">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-4 bg-green-500/10 border border-green-500 text-green-500 rounded-lg">
            {success}
          </div>
        )}

        {/* Guidelines Panel */}
        {hasGuidelines && (
          <div className="mb-6 bg-[#1a1a1a] border border-[#0EF0EB]/30 rounded-lg overflow-hidden">
            <button
              onClick={() => setShowGuidelines(!showGuidelines)}
              className="w-full px-4 py-3 flex items-center justify-between text-left bg-[#0EF0EB]/10 hover:bg-[#0EF0EB]/20 transition-colors"
            >
              <span className="text-[#0EF0EB] font-medium">📋 Content Guidelines</span>
              <span className="text-gray-400">{showGuidelines ? "▼" : "▶"}</span>
            </button>
            {showGuidelines && (
              <div className="p-4 space-y-4">
                {topic.course.guidelines && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-2">Course Guidelines:</h4>
                    <p className="text-gray-300 text-sm whitespace-pre-wrap">{topic.course.guidelines}</p>
                  </div>
                )}
                {topic.guidelines && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-2">Topic Guidelines:</h4>
                    <p className="text-gray-300 text-sm whitespace-pre-wrap">{topic.guidelines}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Content Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#0EF0EB] transition-colors"
                placeholder="Enter a title for your content"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Content
              </label>
              <MarkdownEditor key={contentId || "new"} initialValue={content} onChange={setContent} />
            </div>
          </div>

          {/* Topic Info Sidebar */}
          <div className="space-y-4">
            <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-4">
              <h3 className="text-white font-medium mb-2">About this topic</h3>
              {topic.description && (
                <p className="text-gray-400 text-sm">{topic.description}</p>
              )}
            </div>

            <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-4">
              <h3 className="text-white font-medium mb-2">Tips</h3>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>• Your content is auto-saved every 3 seconds</li>
                <li>• Use the toolbar buttons to format text</li>
                <li>• Submit for review when ready</li>
                <li>• Editors will review and provide feedback</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
