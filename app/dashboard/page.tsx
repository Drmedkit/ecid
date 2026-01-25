"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <nav className="border-b border-gray-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-white">ECID Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-400">{session.user.email}</span>
            <span className="px-2 py-1 text-xs bg-[#0EF0EB]/20 text-[#0EF0EB] rounded">
              {session.user.role}
            </span>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text-gray-400 hover:text-white transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold text-white mb-6">Welcome, {session.user.name || "User"}!</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/dashboard/courses"
            className="p-6 bg-[#1a1a1a] border border-gray-800 rounded-lg hover:border-[#0EF0EB] transition-colors"
          >
            <h3 className="text-lg font-semibold text-white mb-2">Courses</h3>
            <p className="text-gray-400">Browse and learn from available courses</p>
          </Link>

          <Link
            href="/dashboard/contribute"
            className="p-6 bg-[#1a1a1a] border border-gray-800 rounded-lg hover:border-[#0EF0EB] transition-colors"
          >
            <h3 className="text-lg font-semibold text-white mb-2">Contribute</h3>
            <p className="text-gray-400">Add or edit content for courses</p>
          </Link>

          {(session.user.role === "editor" || session.user.role === "admin") && (
            <Link
              href="/dashboard/review"
              className="p-6 bg-[#1a1a1a] border border-gray-800 rounded-lg hover:border-[#F6F400] transition-colors"
            >
              <h3 className="text-lg font-semibold text-white mb-2">Review</h3>
              <p className="text-gray-400">Review and approve submissions</p>
            </Link>
          )}

          {session.user.role === "admin" && (
            <Link
              href="/dashboard/admin"
              className="p-6 bg-[#1a1a1a] border border-gray-800 rounded-lg hover:border-[#F6F400] transition-colors"
            >
              <h3 className="text-lg font-semibold text-white mb-2">Admin</h3>
              <p className="text-gray-400">Manage users and course structure</p>
            </Link>
          )}
        </div>
      </main>
    </div>
  );
}
