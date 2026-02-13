import type React from "react"
import type { Metadata } from "next"
import { Montserrat, Geist_Mono } from "next/font/google"

import AuthProvider from "@/components/providers/session-provider"
import PasswordGate from "@/components/providers/password-gate"
import "./globals.css"

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

export const metadata: Metadata = {
  title: "ECID - Esports Coaching for Inclusion and Development",
  description:
    "Building a European esports coaching framework that fosters inclusion, responsible digital habits, and player well-being for grassroots youth esports.",
  icons: {
    icon: "/images/ecid-icon.png",
    apple: "/images/ecid-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">
        <AuthProvider>
          <PasswordGate>
            {children}
          </PasswordGate>
        </AuthProvider>
      </body>
    </html>
  )
}
