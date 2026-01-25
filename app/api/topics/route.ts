import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const topics = await prisma.topic.findMany({
      include: {
        course: {
          select: { title: true },
        },
      },
      orderBy: [
        { course: { order: "asc" } },
        { order: "asc" },
      ],
    });

    return NextResponse.json(topics);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch topics" }, { status: 500 });
  }
}
