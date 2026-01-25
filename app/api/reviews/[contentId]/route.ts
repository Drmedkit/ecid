import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ contentId: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email as string },
  });

  if (!user || (user.role !== "editor" && user.role !== "admin")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { contentId } = await params;
  const { status, comment } = await request.json();

  if (!["approved", "changes_requested"].includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const content = await prisma.content.findUnique({
    where: { id: contentId },
  });

  if (!content) {
    return NextResponse.json({ error: "Content not found" }, { status: 404 });
  }

  const review = await prisma.review.create({
    data: {
      status,
      comment: comment || "",
      contentId,
      reviewerId: user.id,
    },
  });

  const newStatus = status === "approved" ? "approved" : "draft";
  await prisma.content.update({
    where: { id: contentId },
    data: { status: newStatus },
  });

  return NextResponse.json(review);
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ contentId: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { contentId } = await params;

  const reviews = await prisma.review.findMany({
    where: { contentId },
    include: { reviewer: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(reviews);
}
