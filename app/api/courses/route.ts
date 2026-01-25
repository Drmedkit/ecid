import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const courses = await prisma.course.findMany({
    include: {
      _count: { select: { topics: true } },
    },
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json(courses);
}

export async function POST(request: NextRequest) {
  const { title, description, guidelines } = await request.json();

  const course = await prisma.course.create({
    data: { title, description, guidelines },
  });

  return NextResponse.json(course);
}
