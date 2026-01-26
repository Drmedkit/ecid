"use client"

import { useState } from "react"
import Image from "next/image"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src="/images/ecid-logo-horizontal.png"
            alt="ECID Logo"
            width={120}
            height={40}
            className="object-contain md:w-[140px] md:h-[50px]"
          />
        </div>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
            About
          </a>
          <a href="#objectives" className="text-muted-foreground hover:text-primary transition-colors">
            Objectives
          </a>
          <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
            Contact
          </a>
          <a href="/learn" className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
            Learn
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile navigation menu */}
      {isOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-border">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <a
              href="#about"
              onClick={() => setIsOpen(false)}
              className="text-foreground hover:text-primary transition-colors py-2"
            >
              About
            </a>
            <a
              href="#objectives"
              onClick={() => setIsOpen(false)}
              className="text-foreground hover:text-primary transition-colors py-2"
            >
              Objectives
            </a>
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="text-foreground hover:text-primary transition-colors py-2"
            >
              Contact
            </a>
            <a
              href="/learn"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-center"
            >
              Learn
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
