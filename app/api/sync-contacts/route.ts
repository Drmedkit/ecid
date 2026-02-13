import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getGoogleSheetClient } from "@/lib/google-sheets";

export async function POST(request: NextRequest) {
  try {
    // Get spreadsheet ID from request or environment
    const body = await request.json().catch(() => ({}));
    const spreadsheetId = body.spreadsheetId || process.env.GOOGLE_SHEETS_ID;

    if (!spreadsheetId) {
      return NextResponse.json(
        { error: "No spreadsheet ID configured" },
        { status: 400 }
      );
    }

    // Fetch all contact forms
    const contacts = await prisma.contactForm.findMany({
      orderBy: { createdAt: "desc" },
    });

    // Get Google Sheets client
    const sheets = await getGoogleSheetClient();

    // Check if Contact Forms sheet exists, create if not
    const existingSheets = await sheets.spreadsheets.get({ spreadsheetId });
    const sheetNames = existingSheets.data.sheets?.map((s: any) => s.properties?.title) || [];

    if (!sheetNames.includes("Contact Forms")) {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests: [{
            addSheet: { properties: { title: "Contact Forms" } },
          }],
        },
      });
    }

    // Prepare data
    const contactsData = [
      ["ID", "Name", "Email", "Message", "Submitted At"],
      ...contacts.map((c) => [
        c.id,
        c.name,
        c.email,
        c.message,
        c.createdAt?.toISOString() || "",
      ]),
    ];

    // Update the sheet
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: "Contact Forms!A1",
      valueInputOption: "RAW",
      requestBody: {
        values: contactsData,
      },
    });

    return NextResponse.json({
      success: true,
      count: contacts.length,
      message: "Contact forms synced successfully",
    });
  } catch (error: any) {
    console.error("Contact sync error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to sync contacts" },
      { status: 500 }
    );
  }
}
