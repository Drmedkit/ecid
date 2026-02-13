# Contact Form & Google Sheets Integration

## What Was Built

### 1. Database Model
Added `ContactForm` table to Prisma schema with:
- `id` - Unique identifier
- `name` - Contact's name
- `email` - Contact's email
- `message` - Their message/question
- `createdAt` - Timestamp

### 2. API Endpoints (`/api/contact`)

#### POST - Submit Contact Form
- Validates name, email, and message
- Saves to PostgreSQL database
- Returns success/error response

#### GET - Fetch All Contacts (for Google Sheets sync)
- Returns all contact form submissions
- Ordered by most recent first
- Ready for Google Sheets integration

### 3. Contact Form UI
- Beautiful animated form in the Contact section
- Fields: Name, Email, Message
- Real-time validation
- Success/error feedback
- Integrated on homepage (accessible via navbar "Contact" link)

## How Contact Data Flows

```
User fills form → POST /api/contact → PostgreSQL database
                                    ↓
Google Sheets ← GET /api/contact ← Read all contacts
```

## Google Sheets Sync Setup

### Step 1: Deploy to Replit
When you deploy on Replit, run this to update the database:
```bash
npx prisma db push
```

This will add the `ContactForm` table to your PostgreSQL database.

### Step 2: Google Cloud Setup

1. **Create a Google Cloud Project**
   - Go to https://console.cloud.google.com
   - Create a new project or select existing

2. **Enable Google Sheets API**
   - In Cloud Console, go to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click "Enable"

3. **Create Service Account**
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "Service Account"
   - Give it a name (e.g., "ecid-sheets-sync")
   - Download the JSON key file

4. **Create Google Sheet**
   - Create a new Google Sheet
   - Name it "ECID Contact Forms"
   - Add headers in row 1: `ID`, `Name`, `Email`, `Message`, `Date`
   - Share the sheet with the service account email (found in JSON file)
   - Give it "Editor" permissions

### Step 3: Sync Script Options

#### Option A: Manual Script (Run locally or on-demand)
Create a file `scripts/sync-contacts.js`:

```javascript
const { google } = require('googleapis');
const path = require('path');

// Load service account credentials
const credentials = require('./path-to-your-service-account.json');

async function syncContacts() {
  // Authenticate
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = 'YOUR_SPREADSHEET_ID'; // Get from sheet URL

  // Fetch contacts from your API
  const response = await fetch('https://your-replit-url.repl.co/api/contact');
  const contacts = await response.json();

  // Format data for sheets
  const values = contacts.map(c => [
    c.id,
    c.name,
    c.email,
    c.message,
    new Date(c.createdAt).toLocaleString()
  ]);

  // Update sheet
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: 'Sheet1!A2:E', // Starting from row 2 (after headers)
    valueInputOption: 'RAW',
    resource: { values },
  });

  console.log(`Synced ${contacts.length} contacts to Google Sheets`);
}

syncContacts();
```

#### Option B: Apps Script (Auto-sync every hour)
In your Google Sheet:
1. Go to Extensions > Apps Script
2. Paste this code:

```javascript
function syncContactForms() {
  const apiUrl = 'https://your-replit-url.repl.co/api/contact';
  const sheetName = 'Sheet1';

  // Fetch contacts
  const response = UrlFetchApp.fetch(apiUrl);
  const contacts = JSON.parse(response.getContentText());

  // Get sheet
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);

  // Clear existing data (except header)
  const lastRow = sheet.getLastRow();
  if (lastRow > 1) {
    sheet.getRange(2, 1, lastRow - 1, 5).clear();
  }

  // Add data
  const data = contacts.map(c => [
    c.id,
    c.name,
    c.email,
    c.message,
    new Date(c.createdAt).toLocaleString()
  ]);

  if (data.length > 0) {
    sheet.getRange(2, 1, data.length, 5).setValues(data);
  }

  Logger.log('Synced ' + data.length + ' contacts');
}

// Set up trigger: Run this function once to create hourly trigger
function createTrigger() {
  ScriptApp.newTrigger('syncContactForms')
    .timeBased()
    .everyHours(1)
    .create();
}
```

3. Run `createTrigger()` once to set up automatic hourly sync

#### Option C: Cloud Function (Serverless auto-sync)
Deploy a Cloud Function that runs on a schedule (cron) to pull from `/api/contact` and update Sheets.

## API Endpoint Details

### GET /api/contact
Returns all contact form submissions:

```json
[
  {
    "id": "clxxx1234",
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Great project!",
    "createdAt": "2025-02-13T12:00:00.000Z"
  }
]
```

### POST /api/contact
Submit a new contact form:

**Request:**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "message": "How can I contribute?"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Thank you for contacting us! We'll get back to you soon.",
  "id": "clxxx5678"
}
```

**Response (Error):**
```json
{
  "error": "Invalid email address"
}
```

## Next Steps

1. ✅ Contact form is live on your site
2. ⏳ Deploy to Replit and run `npx prisma db push`
3. ⏳ Set up Google Cloud service account
4. ⏳ Create Google Sheet and share with service account
5. ⏳ Choose sync method (Apps Script recommended for simplicity)
6. ⏳ Test the sync

## Testing

1. Submit a test form on your website
2. Check the database (or Prisma Studio)
3. Run your sync script
4. Verify data appears in Google Sheets

---

Ready for Google Sheets integration! 🚀
