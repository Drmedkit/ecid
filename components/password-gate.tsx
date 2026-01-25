"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"

const CORRECT_CODE = "1234"

export function PasswordGate({ children }: { children: React.ReactNode }) {
  const [code, setCode] = useState("")
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    // Check if already unlocked in this session
    const unlocked = sessionStorage.getItem("ecid-unlocked")
    if (unlocked === "true") {
      setIsUnlocked(true)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (code === CORRECT_CODE) {
      setIsUnlocked(true)
      sessionStorage.setItem("ecid-unlocked", "true")
    } else {
      setError(true)
      setCode("")
      setTimeout(() => setError(false), 500)
    }
  }

  if (isUnlocked) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center gap-8 max-w-sm w-full">
        {/* Logo */}
        <div className="relative w-32 h-32">
          <Image src="/images/ecid-icon.png" alt="ECID Logo" fill className="object-contain" />
        </div>

        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">ECID</h1>
          <p className="text-muted-foreground text-sm">Enter access code to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <input
            type="password"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter code"
            className={`w-full px-4 py-3 bg-card border rounded-lg text-center text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
              error ? "border-red-500 animate-shake" : "border-border focus:border-primary"
            }`}
            autoFocus
          />
          <button
            type="submit"
            className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  )
}
