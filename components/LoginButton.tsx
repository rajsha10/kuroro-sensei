"use client"

import type React from "react"
import { useOCAuth } from "@opencampus/ocid-connect-js"
import { Button } from "@/components/ui/button"
import { CherryBlossoms } from "@/components/cherry-blossoms"
import Image from "next/image"
import './compo.css';

export default function LoginPage(): React.ReactElement {
  const { ocAuth } = useOCAuth()

  const handleLogin = async (): Promise<void> => {
    try {
      await ocAuth.signInWithRedirect({ state: "opencampus" })
    } catch (error) {
      console.error("Login error:", error)
    }
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 washi-texture">
      <CherryBlossoms />

      <div className="text-center mb-10 z-10 px-4 sm:px-8">
        <div className="relative">
          {/* Increased text size with better mobile responsiveness */}
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold mb-4 tracking-tight leading-tight">
            Learn. Create. Teach.
          </h1>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light italic">
            The <span className="text-white">Kuroro</span> Way
          </h2>
          
          {/* Enhanced Sensei Ghost Image with better positioning */}
          <div className="absolute -right-12 sm:right-0 top-1/2 transform -translate-y-1/2 translate-x-1/4 md:translate-x-3/4 animate-float">
            <div className="relative w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64">
              <Image 
                src="/images/sensie_ghost.png" 
                alt="AI Sensei Ghost" 
                width={256} 
                height={256}
                className="drop-shadow-xl transition-all duration-300 hover:scale-110"
                style={{ 
                  filter: "drop-shadow(0 12px 24px rgba(0, 0, 0, 0.4)) brightness(1.05)",
                  transform: "translateZ(75px) rotate(2deg)",
                }}
              />
              {/* Added subtle glow effect */}
              <div className="absolute inset-0 rounded-full bg-blue-400 opacity-20 blur-xl -z-10"></div>
            </div>
          </div>
        </div>
      </div>

      <Button
        onClick={handleLogin}
        className="bg-[#1a1a2e] hover:bg-[#1a1a2e]/90 text-white border border-gray-700 px-10 py-7 rounded-md text-xl sm:text-2xl font-medium z-10 transition-all hover:shadow-lg"
      >
        Enter Dōjō
      </Button>
    </div>
  )
}