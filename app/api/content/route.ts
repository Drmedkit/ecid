import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
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

    const { title, body, topicId, status } = await request.json();

    if (!title || !body || !topicId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const content = await prisma.content.create({
      data: {
        title,
        body,
        topicId,
        authorId: user.id,
        status: status || "draft",
      },
    });

    return NextResponse.json(content);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create content" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const authorId = searchParams.get("authorId");

    const where: any = {};
    if (status) where.status = status;
    if (authorId) where.authorId = authorId;

    const contents = await prisma.content.findMany({
      where,
      include: {
        topic: {
          include: {
            course: { select: { title: true } },
          },
        },
        author: {
          select: { name: true, email: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(contents);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 });
  }
}
