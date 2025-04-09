"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { CherryBlossoms } from "@/components/cherry-blossoms"
import { Button } from "@/components/ui/button"
import { ArrowRight, Brain, Gamepad, BookOpen, BarChart3, Globe } from "lucide-react"
import "../../components/compo.css";

export default function AboutPage() {
  const featureRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
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

    featureRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => {
      featureRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref)
      })
    }
  }, [])

  const features = [
    {
      title: "Core Intelligence",
      icon: <Brain className="h-8 w-8 text-cherry" />,
      items: [
        "Interactive Tutoring: Learn through smart conversations — type or speak.",
        "Personalized Pathways: Adapts to your pace, style, and strengths.",
        "Smart Modules: AI-crafted lessons & evolving quizzes based on your progress.",
      ],
    },
    {
      title: "Gamified Mastery",
      icon: <Gamepad className="h-8 w-8 text-cherry" />,
      items: [
        "Shōrei Badges: Collect badges for milestones and daily discipline.",
        "Dynamic Skill Map: Visualize your journey like a branching dojo path.",
      ],
    },
    {
      title: "Study Toolkit",
      icon: <BookOpen className="h-8 w-8 text-cherry" />,
      items: [
        "Knowledge Vault: Stores key learnings, bookmarks & past tutoring.",
        "QuickQuiz Mode: Bite-sized practice with instant clarity.",
      ],
    },
    {
      title: "Insight Engine",
      icon: <BarChart3 className="h-8 w-8 text-cherry" />,
      items: [
        "Kuroro Dashboard: Track streaks, strengths, and focus areas.",
        "Reflex AI: Learns how you learn — and optimizes accordingly.",
      ],
    },
    {
      title: "Fluid Access",
      icon: <Globe className="h-8 w-8 text-cherry" />,
      items: [
        "Zen Onboarding: Set your study goals and preferences in minutes.",
        "Seamless Login: Email, Google, or Web3 Wallet.",
      ],
    },
  ]

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start p-4 washi-texture">
      <CherryBlossoms />

      {/* Navigation */}
      <nav className="w-full max-w-7xl flex items-center justify-between py-6 px-4 z-10">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold">黒ろ Kuroro</span>
        </Link>
        <div className="hidden md:flex space-x-8">
          <Link href="/sensei-garden" className="text-sm font-medium hover:text-cherry transition-colors">
            Sensei Garden
          </Link>
          <Link href="/the-dojo" className="text-sm font-medium hover:text-cherry transition-colors">
            The Dojo
          </Link>
          <Link href="/sanctum" className="text-sm font-medium hover:text-cherry transition-colors">
            Sanctum
          </Link>
        </div>
        <Link href="/sign-in">
          <Button variant="outline" className="border-gray-700 hover:border-cherry hover:text-cherry transition-all">
            Sign In
          </Button>
        </Link>
      </nav>

      {/* Hero Section */}
      <div className="text-center mt-12 mb-16 z-10 px-4 sm:px-8 max-w-4xl">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 tracking-tight leading-tight">
          About <span className="text-cherry">Kuroro</span>
        </h1>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-light italic mb-8">Learn Like a Prodigy</h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Your AI-powered study senpai – interactive, adaptive, and beautifully smart.
        </p>

        {/* Sensei Ghost Image */}
        <div className="relative w-full h-64 my-12">
          <div className="absolute left-1/2 transform -translate-x-1/2 animate-float">
            <div className="relative w-56 h-56 sm:w-64 sm:h-64">
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
              {/* Subtle glow effect */}
              <div className="absolute inset-0 rounded-full bg-cherry opacity-20 blur-xl -z-10"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Philosophy Section */}
      <div className="w-full max-w-4xl mx-auto mb-24 px-4 z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Philosophy</h2>
          <div className="h-1 w-24 bg-cherry mx-auto rounded-full mb-8"></div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Kuroro embraces the principles of wabi-sabi, ikigai, and a soulful approach to learning. We believe that
            knowledge is a journey, not a destination. Our AI-powered platform combines ancient wisdom with cutting-edge
            technology to create a learning experience that adapts to your unique style and pace.
          </p>
        </div>

        <div className="bg-[#1a1a2e]/50 border border-gray-800 p-8 rounded-lg text-center mb-12">
          <p className="text-xl italic text-gold">
            "Perfection lies in stillness, not speed. True mastery comes from deep understanding, not memorization."
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="w-full max-w-6xl mx-auto px-4 z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Features</h2>
          <div className="h-1 w-24 bg-cherry mx-auto rounded-full mb-8"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => (featureRefs.current[index] = el)}
              className="feature-card rounded-lg p-6 opacity-0 translate-y-10 transition-all duration-700"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="feature-icon rounded-full p-4 inline-block mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-4 text-gold">{feature.title}</h3>
              <ul className="space-y-3">
                {feature.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <span className="text-cherry mr-2">•</span>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="w-full max-w-4xl mx-auto px-4 mt-24 mb-24 z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Our Team</h2>
          <div className="h-1 w-24 bg-cherry mx-auto rounded-full mb-8"></div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Kuroro was created by a team of educators, AI researchers, and learning experience designers who believe in
            the power of personalized education. Our mission is to make high-quality, adaptive learning accessible to
            everyone.
          </p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="w-full max-w-4xl mx-auto px-4 mb-24 z-10">
        <div className="bg-[#1a1a2e]/70 border border-gray-800 rounded-lg p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Begin Your Journey?</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            Join Kuroro today and experience a new way of learning that adapts to your unique style and pace.
          </p>
          <Link href="/dojo">
            <div className="text-center">
              <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2 focus:ring-offset-gray-900">
                <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#7D0A0A_0%,#FF6363_50%,#7D0A0A_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-gray-900 px-8 py-1 text-base font-medium text-white backdrop-blur-3xl">
                  Create your first Sensei <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </button>
            </div>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full border-t border-gray-800 py-8 mt-auto z-10">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-lg font-bold">黒ろ Kuroro</p>
            <p className="text-sm text-gray-400">Your path to satori begins here.</p>
          </div>
          <div className="flex gap-8">
            <Link href="/about" className="text-sm hover:text-cherry">
              About
            </Link>
            <Link href="/privacy" className="text-sm hover:text-cherry">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm hover:text-cherry">
              Terms
            </Link>
            <Link href="/contact" className="text-sm hover:text-cherry">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
