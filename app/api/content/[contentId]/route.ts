import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ contentId: string }> }
) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { contentId } = await params;
    const { title, body, status } = await request.json();

    const existingContent = await prisma.content.findUnique({
      where: { id: contentId },
    });

    if (!existingContent) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 });
    }

    if (existingContent.authorId !== user.id && user.role !== "admin") {
      return NextResponse.json({ error: "Not authorized to edit this content" }, { status: 403 });
    }

    const content = await prisma.content.update({
      where: { id: contentId },
      data: { title, body, status },
    });

    return NextResponse.json(content);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update content" }, { status: 500 });
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ contentId: string }> }
) {
  try {
    const { contentId } = await params;
    
    const content = await prisma.content.findUnique({
      where: { id: contentId },
      include: {
        topic: {
          include: { course: { select: { title: true } } },
        },
        author: { select: { name: true, email: true } },
        reviews: {
          include: { reviewer: { select: { name: true } } },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!content) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 });
    }

    return NextResponse.json(content);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 });
  }
}
