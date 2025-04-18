"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CherryBlossoms } from "@/components/cherry-blossoms"
import { Send, Loader, Info } from "lucide-react"
import { generateResponseWithFallback } from "../actions/generate-response-fallback"
import { listAvailableModels } from "../actions/list-models"
import Link from "next/link"
import { useSenseiStore } from "@/lib/SenseiStore"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

interface Message {
  role: "user" | "assistant" | "system"
  content: string
  modelUsed?: string
}

export default function Chat() {
  const { getCurrentSensei } = useSenseiStore()
  const currentSensei = getCurrentSensei()

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Greetings, young scholar. I am ${currentSensei?.name || "your AI Sensei"}. What would you like to learn today?`,
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showDiagnostics, setShowDiagnostics] = useState(false)
  const [diagnosticResults, setDiagnosticResults] = useState<any[]>([])
  const [isDiagnosing, setIsDiagnosing] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = { role: "user" as const, content: input }
    setMessages((prev) => [...prev, userMessage])
    const userInput = input
    setInput("")
    setIsLoading(true)

    try {
      const response = await generateResponseWithFallback(userInput)

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response.success
            ? response.text
            : "Forgive me, but I am unable to provide wisdom at this moment. Please try again later.",
          modelUsed: response.modelUsed,
        },
      ])

      // If there was a model used, add a system message
      if (response.modelUsed) {
        setMessages((prev) => [
          ...prev,
          {
            role: "system",
            content: `Response generated by ${currentSensei?.name || "Sensei"}`,
          },
        ])
      }
    } catch (error) {
      console.error("Error sending message:", error)
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Forgive me, but I am unable to provide wisdom at this moment. Please try again later.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const runDiagnostics = async () => {
    setIsDiagnosing(true)
    try {
      const models = await listAvailableModels()
      setDiagnosticResults(models)

      // Add diagnostic results to chat
      setMessages((prev) => [
        ...prev,
        {
          role: "system",
          content: "Diagnostic results: " + models.map((m) => `${m.name}: ${m.available ? "✅" : "❌"}`).join(", "),
        },
      ])
    } catch (error) {
      console.error("Error running diagnostics:", error)
      setMessages((prev) => [
        ...prev,
        {
          role: "system",
          content: "Error running diagnostics: " + (error as Error).message,
        },
      ])
    } finally {
      setIsDiagnosing(false)
      setShowDiagnostics(false)
    }
  }

  return (
    <main className="relative min-h-screen flex flex-col overflow-hidden">
      <CherryBlossoms />

      <header className="p-4 border-b border-border/50 backdrop-blur-sm bg-background/50 z-10 flex items-center justify-between">
        <Link href={"/"}>
          <Button>Exit Sensei</Button>
        </Link>
        <div className="flex items-center gap-3">
          {currentSensei && (
            <>
              <Avatar className="h-8 w-8">
                <AvatarImage src={currentSensei.avatarPath} alt={currentSensei.name} />
                <AvatarFallback>{currentSensei.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h1 className="text-xl font-bold">{currentSensei.name}</h1>
            </>
          )}
          {!currentSensei && <h1 className="text-xl font-bold">Converse with the Scroll</h1>}
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={() => setShowDiagnostics(!showDiagnostics)}>
            <Info className="h-4 w-4 mr-1" />
            Diagnostics
          </Button>
          <Button variant="ghost" size="sm">
            Share
          </Button>
        </div>
      </header>

      {showDiagnostics && (
        <div className="p-4 bg-card/80 backdrop-blur-sm border-b border-border/50">
          <h2 className="text-lg font-semibold mb-2">Model Diagnostics</h2>
          <p className="mb-2">Check which models are available with your API key:</p>
          <Button onClick={runDiagnostics} disabled={isDiagnosing} size="sm">
            {isDiagnosing ? (
              <>
                <Loader className="h-4 w-4 mr-2 animate-spin" />
                Checking models...
              </>
            ) : (
              "Run Diagnostics"
            )}
          </Button>

          {diagnosticResults.length > 0 && (
            <div className="mt-4">
              <h3 className="text-md font-semibold mb-1">Results:</h3>
              <ul className="space-y-1">
                {diagnosticResults.map((model, index) => (
                  <li key={index} className="flex items-center">
                    <span className="mr-2">{model.available ? "✅" : "❌"}</span>
                    <span className="font-mono">{model.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="flex-1 flex flex-col p-4 md:p-6 overflow-hidden">
        <div className="flex-1 overflow-y-auto mb-4 space-y-4 max-w-4xl mx-auto w-full">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "justify-end" : message.role === "system" ? "justify-center" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : message.role === "system"
                      ? "bg-muted text-muted-foreground text-sm"
                      : "bg-secondary text-secondary-foreground"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] p-3 rounded-lg bg-secondary text-secondary-foreground flex items-center gap-2">
                <Loader className="h-4 w-4 animate-spin" />
                <span>Sensei is thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="max-w-4xl mx-auto w-full">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask your Sensei..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading || !input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </main>
  )
}
