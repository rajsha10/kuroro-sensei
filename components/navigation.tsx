"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

export function Navigation() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }
    
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrolled])

  return (
    <div className="sticky top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 sticky-nav">
      <nav 
        className={`
          relative flex items-center justify-between px-6 py-3 
          w-full max-w-6xl rounded-lg
          bg-background/80 backdrop-blur-md
          border border-gold/30
          shadow-lg
          transition-all duration-300 ease-in-out
        `}
        style={{
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(255, 215, 0, 0.1)"
        }}
      >
        {/* Decorative elements */}
        <div className="absolute -top-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"></div>
        <div className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"></div>
        <div className="absolute top-0 left-12 w-4 h-4 -translate-y-1/2 bg-cherry rounded-full border-2 border-background"></div>
        <div className="absolute top-0 right-12 w-4 h-4 -translate-y-1/2 bg-cherry rounded-full border-2 border-background"></div>
        
        {/* Brand logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cherry to-gold">黒ろ</span>
          <span className="text-lg relative">
            Kuroro
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cherry group-hover:w-full transition-all duration-300"></span>
          </span>
        </Link>

        {/* Navigation links */}
        <div className="flex items-center gap-6">
          {[
            { name: "Sensei Garden", href: "/garden" },
            { name: "The Dojo", href: "/dojo" },
            { name: "Sanctum", href: "/sanctum" }
          ].map((item) => (
            <Link 
              key={item.href}
              href={item.href} 
              className={`
                relative font-medium hover:text-cherry transition-colors
                ${pathname === item.href ? "text-cherry" : ""}
              `}
            >
              {pathname === item.href && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-cherry"></span>
              )}
              {item.name}
            </Link>
          ))}
          
          <Button 
            variant="outline" 
            className="border-cherry text-cherry hover:bg-cherry/10 ml-2 relative overflow-hidden group"
          >
            <span className="relative z-10">Sign In</span>
            <span className="absolute inset-0 bg-cherry opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
          </Button>
        </div>
      </nav>
    </div>
  )
}