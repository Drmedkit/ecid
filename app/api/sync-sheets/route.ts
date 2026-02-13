import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { getGoogleSheetClient } from "@/lib/google-sheets";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    const { spreadsheetId } = await request.json();

    const sheets = await getGoogleSheetClient();

    const [users, courses, topics, contents, reviews, contacts] = await Promise.all([
      prisma.user.findMany({ orderBy: { createdAt: "asc" } }),
      prisma.course.findMany({ orderBy: { order: "asc" } }),
      prisma.topic.findMany({ orderBy: { order: "asc" }, include: { course: true } }),
      prisma.content.findMany({ orderBy: { createdAt: "asc" }, include: { topic: true, author: true } }),
      prisma.review.findMany({ orderBy: { createdAt: "asc" }, include: { content: true, reviewer: true } }),
      prisma.contactForm.findMany({ orderBy: { createdAt: "desc" } }),
    ]);

    if (spreadsheetId) {
      await syncToExistingSheet(sheets, spreadsheetId, users, courses, topics, contents, reviews, contacts);
      return NextResponse.json({ success: true, spreadsheetId });
    }

    const spreadsheet = await sheets.spreadsheets.create({
      requestBody: {
        properties: { title: "ECID Database Export" },
        sheets: [
          { properties: { title: "Users" } },
          { properties: { title: "Courses" } },
          { properties: { title: "Topics" } },
          { properties: { title: "Content" } },
          { properties: { title: "Reviews" } },
          { properties: { title: "Contact Forms" } },
        ],
      },
    });

    const newId = spreadsheet.data.spreadsheetId!;
    await syncToExistingSheet(sheets, newId, users, courses, topics, contents, reviews, contacts);

    return NextResponse.json({ success: true, spreadsheetId: newId, url: spreadsheet.data.spreadsheetUrl });
  } catch (error: any) {
    console.error("Sync error:", error);
    return NextResponse.json({ error: error.message || "Failed to sync" }, { status: 500 });
  }
}

async function syncToExistingSheet(
  sheets: any,
  spreadsheetId: string,
  users: any[],
  courses: any[],
  topics: any[],
  contents: any[],
  reviews: any[],
  contacts: any[]
) {
  const existingSheets = await sheets.spreadsheets.get({ spreadsheetId });
  const sheetNames = existingSheets.data.sheets?.map((s: any) => s.properties?.title) || [];

  const requiredSheets = ["Users", "Courses", "Topics", "Content", "Reviews", "Contact Forms"];
  const missingSheets = requiredSheets.filter((name) => !sheetNames.includes(name));

  if (missingSheets.length > 0) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: missingSheets.map((title) => ({
          addSheet: { properties: { title } },
        })),
      },
    });
  }

  const usersData = [
    ["ID", "Email", "Name", "Role", "Created At"],
    ...users.map((u) => [u.id, u.email, u.name || "", u.role, u.createdAt?.toISOString() || ""]),
  ];

  const coursesData = [
    ["ID", "Title", "Description", "Guidelines", "Order", "Created At"],
    ...courses.map((c) => [c.id, c.title, c.description || "", c.guidelines || "", c.order, c.createdAt?.toISOString() || ""]),
  ];

  const topicsData = [
    ["ID", "Title", "Description", "Guidelines", "Order", "Course", "Created At"],
    ...topics.map((t) => [t.id, t.title, t.description || "", t.guidelines || "", t.order, t.course?.title || "", t.createdAt?.toISOString() || ""]),
  ];

  const contentData = [
    ["ID", "Title", "Status", "Topic", "Author", "Created At"],
    ...contents.map((c) => [c.id, c.title, c.status, c.topic?.title || "", c.author?.name || c.author?.email || "", c.createdAt?.toISOString() || ""]),
  ];

  const reviewsData = [
    ["ID", "Comment", "Approved", "Content Title", "Reviewer", "Created At"],
    ...reviews.map((r) => [r.id, r.comment || "", r.approved ? "Yes" : "No", r.content?.title || "", r.reviewer?.name || r.reviewer?.email || "", r.createdAt?.toISOString() || ""]),
  ];

  const contactsData = [
    ["ID", "Name", "Email", "Message", "Submitted At"],
    ...contacts.map((c) => [c.id, c.name, c.email, c.message, c.createdAt?.toISOString() || ""]),
  ];

  await sheets.spreadsheets.values.batchUpdate({
    spreadsheetId,
    requestBody: {
      valueInputOption: "RAW",
      data: [
        { range: "Users!A1", values: usersData },
        { range: "Courses!A1", values: coursesData },
        { range: "Topics!A1", values: topicsData },
        { range: "Content!A1", values: contentData },
        { range: "Reviews!A1", values: reviewsData },
        { range: "Contact Forms!A1", values: contactsData },
      ],
    },
  });
}
