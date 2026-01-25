import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  const { courseId } = await params;
  const url = new URL(request.url);
  const includeTopics = url.searchParams.get("includeTopics") === "true";

  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: includeTopics
      ? {
          topics: {
            include: {
              _count: { select: { contents: { where: { status: "approved" } } } },
            },
            orderBy: { order: "asc" },
          },
        }
      : undefined,
  });

  if (!course) {
    return NextResponse.json({ error: "Course not found" }, { status: 404 });
  }

  return NextResponse.json(course);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  const { courseId } = await params;
  const { title, description, guidelines } = await request.json();

  const course = await prisma.course.update({
    where: { id: courseId },
    data: { title, description, guidelines },
  });

  return NextResponse.json(course);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  const { courseId } = await params;

  await prisma.course.delete({ where: { id: courseId } });

  return NextResponse.json({ success: true });
}
