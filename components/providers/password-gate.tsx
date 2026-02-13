"use client"

import { useState, useEffect } from "react"

export default function PasswordGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const stored = sessionStorage.getItem("site-unlocked")
    if (stored === "true") {
      setUnlocked(true)
    }
    setChecking(false)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === "1234") {
      sessionStorage.setItem("site-unlocked", "true")
      setUnlocked(true)
      setError(false)
    } else {
      setError(true)
    }
  }

  if (checking) {
    return null
  }

  if (unlocked) {
    return <>{children}</>
  }

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: 9999,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#0a0a0a",
    }}>
      <form onSubmit={handleSubmit} style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "16px",
        padding: "40px",
        borderRadius: "12px",
        backgroundColor: "#1a1a1a",
        border: "1px solid #333",
        minWidth: "320px",
      }}>
        <h2 style={{ color: "#fff", fontSize: "20px", margin: 0 }}>Enter Password</h2>
        <input
          type="password"
          value={password}
          onChange={(e) => { setPassword(e.target.value); setError(false) }}
          placeholder="Password"
          autoFocus
          style={{
            width: "100%",
            padding: "10px 14px",
            borderRadius: "8px",
            border: error ? "1px solid #ef4444" : "1px solid #444",
            backgroundColor: "#0a0a0a",
            color: "#fff",
            fontSize: "16px",
            outline: "none",
          }}
        />
        {error && <p style={{ color: "#ef4444", margin: 0, fontSize: "14px" }}>Incorrect password</p>}
        <button type="submit" style={{
          width: "100%",
          padding: "10px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#10b981",
          color: "#fff",
          fontSize: "16px",
          cursor: "pointer",
          fontWeight: 600,
        }}>
          Unlock
        </button>
      </form>
    </div>
  )
}
