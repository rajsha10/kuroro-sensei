"use client"

import { useEffect } from "react"
import Link from "next/link"
import { CherryBlossoms } from "@/components/cherry-blossoms"
import "./compo.css"

export default function AboutHero() {
  useEffect(() => {
    const featureItems = document.querySelectorAll(".feature-item")

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0")
            entry.target.classList.remove("opacity-0", "translate-y-10")
          }
        })
      },
      { threshold: 0.1 },
    )

    featureItems.forEach((item) => observer.observe(item))

    return () => {
      featureItems.forEach((item) => observer.unobserve(item))
    }
  }, [])

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start washi-texture">
      <CherryBlossoms />

      {/* Hero Section - Reduced padding bottom */}
      <section className="relative w-full pt-16 pb-8 px-4 overflow-visible">
        <div className="max-w-4xl mx-auto flex flex-col items-center justify-center text-center relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-center w-full">
            {/* Text content */}
            <div className="md:text-left text-center md:w-2/3 pb-16">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight flex-col gap-32">
                <span className="block pb-4">Your AI Sensei.</span>
                <span className="block">Train it. Share it.</span>
              </h1>
            </div>

            {/* Sensei image - Improved responsiveness */}
            <div className="md:w-1/3 relative mt-4 md:mt-0">
              <div className="animate-float relative">
                <img
                  src="/images/sensie_ghost.png"
                  alt="AI Sensei"
                  className="absolute w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 object-cover drop-shadow-2xl"
                  style={{
                    filter: "drop-shadow(0 12px 24px rgba(0, 0, 0, 0.4))",
                    top: "-5rem",
                    right: "5rem"
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Reduced top padding */}
      <section className="py-8 w-full bg-transparent relative overflow-hidden washi-texture">
        {/* Subtle gradient line at bottom */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cherry/30 to-transparent"></div>

        <div className="max-w-5xl mx-auto px-4">
          {/* Reduced gap between cards and improved responsive layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-4 lg:gap-6">
            {/* Feature 1 */}
            <div className="text-center flex flex-col items-center group feature-item opacity-0 translate-y-10 transition-all duration-700">
              <div className="mb-4 relative">
                {/* Glow effect behind icon */}
                <div className="absolute inset-0 bg-cherry/10 rounded-full blur-xl opacity-70 group-hover:opacity-100 transition-opacity"></div>

                {/* Icon container - Better responsive sizing */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-secondary/30 border border-cherry/20 flex items-center justify-center overflow-visible relative shadow-lg shadow-cherry/5">
                  <img 
                    src="/images/sensie_fa.png" 
                    alt="Upload Your Knowledge" 
                    className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-cover"
                    style={{scale: "1.4"}} 
                  />
                </div>
              </div>
              <h3 className="text-lg md:text-xl font-medium text-white mb-2">Upload Your Knowledge</h3>
            </div>

            {/* Feature 2 */}
            <div
              className="text-center flex flex-col items-center group feature-item opacity-0 translate-y-10 transition-all duration-700"
              style={{ transitionDelay: "150ms" }}
            >
              <div className="mb-4 relative">
                {/* Glow effect behind icon */}
                <div className="absolute inset-0 bg-indigo-500/10 rounded-full blur-xl opacity-70 group-hover:opacity-100 transition-opacity"></div>

                {/* Icon container - Better responsive sizing */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-secondary/30 border border-indigo-500/20 flex items-center justify-center overflow-visible relative shadow-lg shadow-indigo-500/5">
                  <img
                    src="/images/sensie_sword.png"
                    alt="Kuroro Builds Your Sensei"
                    className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-cover overflow-visible"
                    style={{ scale: "1.4" }}
                  />
                </div>
              </div>
              <h3 className="text-lg md:text-xl font-medium text-white mb-2">Kuroro Builds Your Sensei</h3>
            </div>

            {/* Feature 3 */}
            <div
              className="text-center flex flex-col items-center group feature-item opacity-0 translate-y-10 transition-all duration-700 sm:col-span-2 md:col-span-1"
              style={{ transitionDelay: "300ms" }}
            >
              <div className="mb-4 relative">
                {/* Glow effect behind icon */}
                <div className="absolute inset-0 bg-gold/10 rounded-full blur-xl opacity-70 group-hover:opacity-100 transition-opacity"></div>

                {/* Icon container - Better responsive sizing */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-secondary/30 border border-gold/20 flex items-center justify-center overflow-hidden relative shadow-lg shadow-gold/5">
                  <img 
                    src="/images/sensie_mask.png" 
                    alt="Share or Learn" 
                    className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-contain" 
                  />
                </div>
              </div>
              <h3 className="text-lg md:text-xl font-medium text-white mb-2">Share or Learn</h3>
            </div>
          </div>

          {/* CTA Button - Reduced top margin */}
          <div className="text-center mt-10">
            <Link href="/dojo">
              <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2 focus:ring-offset-gray-900">
                <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#7D0A0A_0%,#FF6363_50%,#7D0A0A_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-gray-900 px-8 py-1 text-base font-medium text-white backdrop-blur-3xl">
                  Summon Your First Sensei
                </span>
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}