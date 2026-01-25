import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ topicId: string }> }
) {
  const { topicId } = await params;
  const url = new URL(request.url);
  const includeContent = url.searchParams.get("includeContent") === "true";

  const topic = await prisma.topic.findUnique({
    where: { id: topicId },
    include: {
      course: { select: { id: true, title: true, guidelines: true } },
      ...(includeContent
        ? {
            contents: {
              where: { status: "approved" },
              include: { author: { select: { name: true } } },
              orderBy: { createdAt: "desc" },
            },
          }
        : {}),
    },
  });

  if (!topic) {
    return NextResponse.json({ error: "Topic not found" }, { status: 404 });
  }

  return NextResponse.json(topic);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ topicId: string }> }
) {
  const { topicId } = await params;
  const { title, description, guidelines, order } = await request.json();

  const topic = await prisma.topic.update({
    where: { id: topicId },
    data: { title, description, guidelines, order },
  });

  return NextResponse.json(topic);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ topicId: string }> }
) {
  const { topicId } = await params;

  await prisma.topic.delete({ where: { id: topicId } });

  return NextResponse.json({ success: true });
}
