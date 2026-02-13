# ECID - Esports Coaching for Inclusion & Development

## Overview
A Next.js application for a European esports coaching framework that fosters inclusion, responsible digital habits, and player well-being for grassroots youth esports.

## Tech Stack
- **Framework**: Next.js 15 with App Router
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with credentials provider
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI primitives with shadcn/ui

## Project Structure
- `app/` - Next.js App Router pages and API routes
- `components/` - React components
- `lib/` - Utility functions (Prisma client, etc.)
- `prisma/` - Database schema and migrations
- `public/` - Static assets
- `packages/videos/` - Remotion video package (optional)

## Environment Variables
- `DATABASE_URL` - PostgreSQL connection string (auto-configured by Replit)
- `NEXTAUTH_SECRET` - Secret for NextAuth.js session encryption
- `NEXTAUTH_URL` - Base URL for authentication callbacks

## Running Locally
The development server runs on port 5000:
```bash
npm run dev -- -p 5000 -H 0.0.0.0
```

## Database
Run Prisma commands to manage the database:
```bash
npx prisma generate  # Generate Prisma client
npx prisma db push   # Push schema changes
```
