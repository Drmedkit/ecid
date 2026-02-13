import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Helper function to trigger contact sync in background
async function triggerContactSync(spreadsheetId?: string) {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const body = spreadsheetId ? JSON.stringify({ spreadsheetId }) : '{}';

    // Trigger sync in background (don't await)
    fetch(`${baseUrl}/api/sync-contacts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    }).catch(err => console.error('Background contact sync failed:', err));
  } catch (error) {
    console.error('Failed to trigger contact sync:', error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Save to database
    const contactForm = await prisma.contactForm.create({
      data: {
        name,
        email,
        message,
      },
    });

    // Get spreadsheet ID from environment variable if configured
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

    // Trigger sync to Google Sheets in background (non-blocking)
    triggerContactSync(spreadsheetId);

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for contacting us! We'll get back to you soon.",
        id: contactForm.id
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to submit contact form" },
      { status: 500 }
    );
  }
}

// GET endpoint for Google Sheets sync
export async function GET() {
  try {
    const contacts = await prisma.contactForm.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return NextResponse.json(
      { error: "Failed to fetch contacts" },
      { status: 500 }
    );
  }
}
