"use client"

import { useEffect, useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Link from "next/link"
import { useSenseiStore, type Sensei as SenseiType } from "@/lib/SenseiStore"
import { useRouter } from "next/navigation"

// Default senseis
const defaultSenseis = [
  {
    name: "Quantum Whisperer",
    category: "Science",
    rating: 4.8,
    tokens: 2450,
    type: "default",
    avatar: "scholar",
  },
  {
    name: "Haiku Master",
    category: "Literature",
    rating: 4.6,
    tokens: 1890,
    type: "default",
    avatar: "traditional",
  },
  {
    name: "Code Ninja",
    category: "Programming",
    rating: 4.9,
    tokens: 3200,
    type: "default",
    avatar: "modern",
  },
  {
    name: "History Sage",
    category: "History",
    rating: 4.7,
    tokens: 2100,
    type: "default",
    avatar: "traditional",
  },
  {
    name: "Math Monk",
    category: "Mathematics",
    rating: 4.5,
    tokens: 1750,
    type: "default",
    avatar: "scholar",
  },
  {
    name: "Philosophy Fox",
    category: "Philosophy",
    rating: 4.8,
    tokens: 2300,
    type: "fox",
    avatar: "mystical",
  },
]

export default function GardenPage() {
  const router = useRouter()
  const { getAllSenseis, setCurrentSensei } = useSenseiStore()
  const [allSenseis, setAllSenseis] = useState<SenseiType[]>([])

  useEffect(() => {
    // Get user-created senseis
    const userSenseis = getAllSenseis()

    // Create combined list with default senseis
    const combinedSenseis = [
      ...userSenseis,
      ...defaultSenseis.map((s) => ({
        id: `default_${s.name.toLowerCase().replace(/\s+/g, "_")}`,
        name: s.name,
        personality: "calm",
        voice: "calm",
        avatar: s.avatar,
        avatarPath: `/images/sensie_${s.avatar}.svg`,
        category: s.category,
        rating: s.rating,
        tokens: s.tokens,
        createdAt: 0,
      })),
    ]

    setAllSenseis(combinedSenseis)
  }, [getAllSenseis])

  const handleSelectSensei = (senseiId: string) => {
    setCurrentSensei(senseiId)
    router.push("/chat")
  }

  return (
    <main className="min-h-screen washi-texture pt-20">
      <Navigation />

      <div className="max-w-6xl mx-auto p-4">
        <h1 className="text-4xl font-bold mb-2 text-center">
          <span className="text-gold">庭</span> Sensei Garden
        </h1>
        <p className="text-xl mb-8 text-center">Discover and explore community-built Senseis</p>

        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-4">
            <Button variant="outline" className="border-muted-foreground text-muted-foreground hover:bg-muted/10">
              All Categories
            </Button>
            <Button variant="outline" className="border-muted-foreground text-muted-foreground hover:bg-muted/10">
              Popular
            </Button>
            <Button variant="outline" className="border-muted-foreground text-muted-foreground hover:bg-muted/10">
              New
            </Button>
          </div>

          <Link href="/dojo">
            <Button className="bg-cherry hover:bg-cherry/80 text-cherry-foreground">Create Your Sensei</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allSenseis.map((sensei) => (
            <Card key={sensei.id} className="bg-background/80 backdrop-blur-sm border-gold/20 overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-cherry/5 to-gold/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <CardContent className="p-6 flex flex-col items-center">
                <div className="relative w-24 h-24 rounded-full bg-muted flex items-center justify-center overflow-hidden border-2 border-gold/30 mb-4">
                  <img
                    src={sensei.avatarPath || "/placeholder.svg"}
                    alt={`${sensei.name} avatar`}
                    className="max-w-full max-h-full object-cover"
                    style={{ scale: "1.4" }}
                  />
                </div>
                <h3 className="text-xl font-bold mb-1">{sensei.name}</h3>
                <p className="text-muted-foreground mb-2">{sensei.category}</p>

                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-4 w-4 ${i < Math.floor(sensei.rating) ? "text-gold" : "text-muted-foreground"}`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm">{sensei.rating}</span>
                </div>

                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gold"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
                  </svg>
                  <span className="text-sm">{sensei.tokens} kōkō</span>
                </div>
              </CardContent>

              <CardFooter className="p-6 pt-0 flex justify-center">
                <Button
                  variant="outline"
                  className="border-cherry text-cherry hover:bg-cherry/10"
                  onClick={() => handleSelectSensei(sensei.id)}
                >
                  Learn with Sensei
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}
