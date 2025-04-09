import { Button } from "@/components/ui/button"
import { CherryBlossoms } from "@/components/cherry-blossoms"
import Link from "next/link"

export default function Dashboard() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <CherryBlossoms />

      <div className="container max-w-5xl z-10">
        <header className="flex items-center justify-between mb-8 p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50">
          <div className="flex items-center gap-2">
            <div className="grid grid-cols-3 gap-1">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="w-1 h-1 bg-primary rounded-full" />
              ))}
            </div>
            <h1 className="text-xl font-bold">Kuroro</h1>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost">My Bots</Button>
            <Button variant="ghost">Share</Button>
            <Button variant="ghost">Export</Button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="flex flex-col items-center justify-center text-center p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 animate-fade-in">
            <h2 className="text-4xl font-bold mb-2">Your AI Sensei.</h2>
            <p className="text-2xl mb-8">Train it. Share it.</p>
            <div className="w-full h-64 relative">
              <div className="absolute inset-0">
                <iframe src="/character-preview" className="w-full h-full" title="Character Preview" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 hover:bg-card/80 transition-colors cursor-pointer">
              <div className="w-24 h-24 mb-4 relative">
                <iframe src="/character-preview?type=fan" className="w-full h-full" title="Fan Character" />
              </div>
              <p className="text-center">Upload Your Knowledge</p>
            </div>

            <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 hover:bg-card/80 transition-colors cursor-pointer">
              <div className="w-24 h-24 mb-4 relative">
                <iframe src="/character-preview" className="w-full h-full" title="Ninja Character" />
              </div>
              <p className="text-center">Kuroro Builds Your Sensei</p>
            </div>

            <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 hover:bg-card/80 transition-colors cursor-pointer">
              <div className="w-24 h-24 mb-4 relative">
                <iframe src="/character-preview?type=fox" className="w-full h-full" title="Fox Character" />
              </div>
              <p className="text-center">Shini or Learn</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Link href="/chat">
            <Button size="lg" className="text-lg px-8">
              Summon Your First Sensei
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
