"use client"

import type React from "react"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sensei } from "@/components/sensei"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function DojoPage() {
  const [step, setStep] = useState(1)
  const [files, setFiles] = useState<File[]>([])
  const [senseiName, setSenseiName] = useState("")
  const [senseiPersonality, setSenseiPersonality] = useState("calm")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep(step + 1)
  }

  return (
    <main className="min-h-screen washi-texture pt-20">
      <Navigation />

      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-4xl font-bold mb-2 text-center">
          <span className="text-cherry">道場</span> The Dojo
        </h1>
        <p className="text-xl mb-8 text-center">Forge your personal AI Sensei</p>

        <Card className="bg-background/80 backdrop-blur-sm border-gold/20">
          <CardContent className="p-6">
            {step === 1 && (
              <form onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold mb-6">Upload Your Scrolls</h2>

                <div className="mb-8">
                  <div className="border-2 border-dashed border-muted-foreground/50 rounded-lg p-8 text-center cursor-pointer hover:border-cherry/50 transition-colors">
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <div className="flex flex-col items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-12 w-12 text-muted-foreground mb-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        <p className="text-lg mb-2">Drop your scroll (PDF, notes, docs)</p>
                        <p className="text-sm text-muted-foreground">or click to browse files</p>
                      </div>
                    </label>
                  </div>

                  {files.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm mb-2">{files.length} file(s) selected:</p>
                      <ul className="text-sm text-muted-foreground">
                        {files.map((file, index) => (
                          <li key={index}>{file.name}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="flex justify-end">
                  <Button type="submit" className="bg-cherry hover:bg-cherry/80 text-cherry-foreground">
                    Continue
                  </Button>
                </div>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold mb-6">Customize Your Sensei</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <div className="mb-4">
                      <Label htmlFor="sensei-name">Sensei Name</Label>
                      <Input
                        id="sensei-name"
                        value={senseiName}
                        onChange={(e) => setSenseiName(e.target.value)}
                        placeholder="Enter a name for your Sensei"
                        className="bg-background"
                      />
                    </div>

                    <div className="mb-4">
                      <Label htmlFor="sensei-personality">Personality</Label>
                      <Select value={senseiPersonality} onValueChange={setSenseiPersonality}>
                        <SelectTrigger id="sensei-personality" className="bg-background">
                          <SelectValue placeholder="Select a personality" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="calm">Calm</SelectItem>
                          <SelectItem value="curious">Curious</SelectItem>
                          <SelectItem value="strict">Strict</SelectItem>
                          <SelectItem value="playful">Playful</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="mb-4">
                      <Label htmlFor="sensei-voice">Voice</Label>
                      <Select defaultValue="calm">
                        <SelectTrigger id="sensei-voice" className="bg-background">
                          <SelectValue placeholder="Select a voice style" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="calm">Calm Whisper</SelectItem>
                          <SelectItem value="wise">Wise Elder</SelectItem>
                          <SelectItem value="energetic">Energetic Guide</SelectItem>
                          <SelectItem value="poetic">Poetic Sage</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center">
                    <Sensei type="default" size="lg" />
                    <p className="text-sm mt-4">Your AI Sensei awaits</p>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="border-muted-foreground text-muted-foreground hover:bg-muted/10"
                  >
                    Back
                  </Button>
                  <Button type="submit" className="bg-cherry hover:bg-cherry/80 text-cherry-foreground">
                    Generate Sensei
                  </Button>
                </div>
              </form>
            )}

            {step === 3 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Meet Your Sensei</h2>

                <div className="flex flex-col items-center justify-center mb-8">
                  <Sensei type="default" size="lg" className="mb-4" />
                  <h3 className="text-xl font-bold">{senseiName || "Zen Master"}</h3>
                  <p className="text-muted-foreground mb-4">
                    Personality: {senseiPersonality.charAt(0).toUpperCase() + senseiPersonality.slice(1)}
                  </p>

                  <div className="bg-secondary/50 p-4 rounded-lg max-w-md text-center mt-4">
                    <p className="italic">
                      "Greetings, I am your personal Sensei. I have studied your scrolls and am ready to guide you on
                      your learning journey. What would you like to explore first?"
                    </p>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(2)}
                    className="border-muted-foreground text-muted-foreground hover:bg-muted/10"
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    className="bg-cherry hover:bg-cherry/80 text-cherry-foreground"
                    onClick={() => (window.location.href = "/chat")}
                  >
                    Begin Learning
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
