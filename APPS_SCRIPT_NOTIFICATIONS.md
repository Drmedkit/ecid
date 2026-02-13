# Apps Script Email Notifications for Contact Forms

## Overview

Your contact form now **auto-syncs to Google Sheets in real-time**. When someone submits a contact form:
1. Form saved to database ✓
2. Automatically syncs to "Contact Forms" sheet ✓
3. Apps Script triggers email notification ← You set this up

## Setup Instructions

### Step 1: Configure Spreadsheet ID in Replit

1. In Replit, go to **Secrets** (Tools → Secrets)
2. Add a new secret:
   - Key: `GOOGLE_SHEETS_ID`
   - Value: Your Google Spreadsheet ID (from the URL)

   Example URL: `https://docs.google.com/spreadsheets/d/1ABC123xyz/edit`

   The ID is: `1ABC123xyz`

### Step 2: Create Apps Script for Notifications

1. Open your Google Sheet
2. Go to **Extensions → Apps Script**
3. Delete any existing code
4. Paste this code:

```javascript
/**
 * Sends email notification when new contact form is submitted
 * Triggers on sheet edit (when auto-sync updates the sheet)
 */

// ===== CONFIGURATION =====
const NOTIFICATION_EMAIL = "your-email@example.com"; // Change this!
const SHEET_NAME = "Contact Forms";
// =========================

function onEdit(e) {
  try {
    const sheet = e.source.getActiveSheet();

    // Only run on Contact Forms sheet
    if (sheet.getName() !== SHEET_NAME) {
      return;
    }

    // Check if new row was added (row > 1 to skip header)
    const editedRow = e.range.getRow();
    if (editedRow <= 1) {
      return; // Header row, ignore
    }

    // Get the edited range - if it's a full row update, it's likely the auto-sync
    const range = e.range;
    const numColumns = range.getNumColumns();

    // If 5 columns were updated (full row), it's the auto-sync
    if (numColumns >= 5) {
      sendNotification(sheet, editedRow);
    }
  } catch (error) {
    console.error("Notification error:", error);
  }
}

function sendNotification(sheet, row) {
  try {
    // Get data from the row
    const data = sheet.getRange(row, 1, 1, 5).getValues()[0];
    const [id, name, email, message, submittedAt] = data;

    // Format the email
    const subject = `🔔 New Contact Form Submission - ${name}`;

    const body = `
New contact form submission received:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 Name: ${name}
📧 Email: ${email}
📅 Submitted: ${new Date(submittedAt).toLocaleString()}

💬 Message:
${message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ID: ${id}

View all submissions:
${sheet.getParent().getUrl()}

---
This is an automated notification from your ECID contact form.
    `.trim();

    // Send email
    MailApp.sendEmail({
      to: NOTIFICATION_EMAIL,
      subject: subject,
      body: body,
    });

    console.log(`Notification sent for submission from ${name}`);
  } catch (error) {
    console.error("Failed to send notification:", error);
  }
}

// Manual test function - run this once to test
function testNotification() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const lastRow = sheet.getLastRow();

  if (lastRow > 1) {
    sendNotification(sheet, lastRow);
    console.log("Test notification sent!");
  } else {
    console.log("No data to test with");
  }
}
```

4. **Configure the email address:**
   - Change `NOTIFICATION_EMAIL` to your email address (line 9)

5. **Save the script** (Ctrl+S or Cmd+S)

### Step 3: Test the Notification

1. In Apps Script, select the `testNotification` function from the dropdown
2. Click **Run** (▶️ button)
3. **First time only:** Grant permissions when prompted
4. Check your email - you should receive a test notification!

### Step 4: How It Works

The script uses an `onEdit` trigger that automatically runs when the sheet is edited:
- When contact form is submitted → Auto-syncs to sheet → Triggers `onEdit`
- Script detects new row, sends email notification
- Real-time, no manual intervention needed!

## Advanced: Multiple Email Recipients

To send to multiple people, change line 9:

```javascript
const NOTIFICATION_EMAIL = "person1@example.com,person2@example.com,person3@example.com";
```

## Advanced: Slack Notifications

Want Slack notifications instead? Replace the `MailApp.sendEmail` section with:

```javascript
// Get your Slack webhook URL from: https://api.slack.com/messaging/webhooks
const SLACK_WEBHOOK = "https://hooks.slack.com/services/YOUR/WEBHOOK/URL";

function sendSlackNotification(name, email, message, submittedAt) {
  const payload = {
    text: `🔔 New Contact Form Submission`,
    blocks: [
      {
        type: "header",
        text: { type: "plain_text", text: "New Contact Form Submission" }
      },
      {
        type: "section",
        fields: [
          { type: "mrkdwn", text: `*Name:*\n${name}` },
          { type: "mrkdwn", text: `*Email:*\n${email}` },
          { type: "mrkdwn", text: `*Date:*\n${new Date(submittedAt).toLocaleString()}` }
        ]
      },
      {
        type: "section",
        text: { type: "mrkdwn", text: `*Message:*\n${message}` }
      }
    ]
  };

  UrlFetchApp.fetch(SLACK_WEBHOOK, {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload)
  });
}
```

## Troubleshooting

### Not receiving notifications?

1. **Check Apps Script logs:**
   - In Apps Script, go to **Executions** (left sidebar)
   - Look for errors in recent runs

2. **Verify email address:**
   - Make sure `NOTIFICATION_EMAIL` is correct
   - Check spam folder

3. **Test manually:**
   - Run `testNotification` function
   - Check if email arrives

4. **Check sheet name:**
   - Verify the sheet is named exactly "Contact Forms"
   - Case-sensitive!

### Notifications stop working?

Sometimes Google disables triggers. Re-authorize:
1. Go to Apps Script
2. Run any function
3. Re-grant permissions when prompted

## What Gets Synced

The "Contact Forms" sheet contains:
- ID (unique identifier)
- Name
- Email
- Message
- Submitted At (timestamp)

All contact forms appear in **reverse chronological order** (newest first).

---

🎉 You're all set! Test it by submitting a contact form on your website.
