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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function DojoPage() {
  const [step, setStep] = useState(1)
  const [files, setFiles] = useState<File[]>([])
  const [senseiName, setSenseiName] = useState("")
  const [senseiPersonality, setSenseiPersonality] = useState("calm")
  const [senseiVoice, setSenseiVoice] = useState("calm")
  const [senseiAvatar, setSenseiAvatar] = useState("traditional")

  // Define available sensei avatars
  const senseiAvatars = [
    { id: "traditional", name: "Traditional Master", path: "/images/sensie_traditional_master.svg" },
    { id: "modern", name: "Modern Sensei", path: "/images/sensie_modern_sensei.svg" },
    { id: "warrior", name: "Warrior Monk", path: "/images/sensie_warrior-monk.svg" },
    { id: "scholar", name: "Scholarly Sage", path: "/images/sensie_scholarly-sage.svg" },
    { id: "mystical", name: "Mystical Guide", path: "/images/sensie_mystical-guide.svg" },
  ]

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep(step + 1)
  }

  // Get current avatar path based on selection
  const getCurrentAvatarPath = () => {
    return senseiAvatars.find(avatar => avatar.id === senseiAvatar)?.path || senseiAvatars[0].path
  }

  return (
    <main className="min-h-screen washi-texture">
      <Navigation />

      <div className="max-w-4xl mx-auto p-4 pt-14">
        <h1 className="text-4xl font-bold mb-2 text-center">
          <span className="text-cherry">道場</span> The Dojo
        </h1>
        <p className="text-xl mb-8 mt-2 text-center">Forge your personal AI Sensei</p>

        <Card className="bg-background/80 backdrop-blur-sm border-gold/20">
          <CardContent className="p-6">
            {step === 1 && (
              <form onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold mb-6">Upload Your Scrolls</h2>

                <div className="mb-6">
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
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <Label htmlFor="sensei-name">Name your Sensei</Label>
                    <Input
                      id="sensei-name"
                      value={senseiName}
                      onChange={(e) => setSenseiName(e.target.value)}
                      placeholder="Enter a name for your Sensei"
                      className="bg-background mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="sensei-voice">Choose voice</Label>
                    <Select value={senseiVoice} onValueChange={setSenseiVoice}>
                      <SelectTrigger id="sensei-voice" className="bg-background mt-1">
                        <SelectValue placeholder="Select a voice" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="calm">Quan Wouk</SelectItem>
                        <SelectItem value="wise">Master Chen</SelectItem>
                        <SelectItem value="energetic">Jade Tiger</SelectItem>
                        <SelectItem value="poetic">Echo Wind</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button type="submit" className="bg-cherry hover:bg-cherry/80 text-cherry-foreground">
                    Generate
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
                      <Select value={senseiVoice} onValueChange={setSenseiVoice}>
                        <SelectTrigger id="sensei-voice" className="bg-background">
                          <SelectValue placeholder="Select a voice style" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="calm">Quan Wouk</SelectItem>
                          <SelectItem value="wise">Master Chen</SelectItem>
                          <SelectItem value="energetic">Jade Tiger</SelectItem>
                          <SelectItem value="poetic">Echo Wind</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="mb-4">
                      <Label className="block mb-2">Choose Avatar Style</Label>
                      <RadioGroup value={senseiAvatar} onValueChange={setSenseiAvatar} className="flex flex-col space-y-2">
                        {senseiAvatars.map((avatar) => (
                          <div key={avatar.id} className="flex items-center space-x-2">
                            <RadioGroupItem value={avatar.id} id={`avatar-${avatar.id}`} />
                            <Label htmlFor={`avatar-${avatar.id}`} className="cursor-pointer">{avatar.name}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center">
                    <div className="relative w-64 h-64 rounded-full bg-muted flex items-center justify-center overflow-hidden border-2 border-gold/30">
                      <img 
                        src={getCurrentAvatarPath()} 
                        alt={`${senseiAvatar} sensei avatar`} 
                        className="max-w-full max-h-full object-cover"
                        style={{scale: "1.4"}}
                      />
                    </div>
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
                  <div className="relative w-64 h-64 rounded-full bg-muted flex items-center justify-center overflow-hidden border-2 border-gold/30 mb-4">
                    <img 
                      src={getCurrentAvatarPath()} 
                      alt={`${senseiAvatar} sensei avatar`} 
                      className="max-w-full max-h-full object-contain"
                      style={{scale:"1.4"}}
                    />
                  </div>
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