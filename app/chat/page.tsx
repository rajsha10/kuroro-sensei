"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Sensei } from "@/components/sensei"

interface Message {
  role: "user" | "sensei"
  content: string
  timestamp: Date
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "sensei",
      content:
        "Greetings, I am your Sensei. I have studied your scrolls and am ready to guide you on your learning journey. What would you like to explore today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: input,
        timestamp: new Date(),
      },
    ])

    // Clear input
    setInput("")

    // Simulate Sensei response after a short delay
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "sensei",
          content:
            "I understand your question. Let me share what I've learned from your scrolls about this topic. The key concept here is to approach it with patience and mindfulness. Would you like me to elaborate further?",
          timestamp: new Date(),
        },
      ])
    }, 1000)
  }

  return (
    <main className="min-h-screen washi-texture pt-20">
      <Navigation />

      <div className="max-w-6xl mx-auto p-4 flex flex-col h-[calc(100vh-80px)]">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">
            <span className="text-cherry">対話</span> Converse with your Sensei
          </h1>

          <div className="flex items-center gap-2">
            <Button variant="outline" className="border-muted-foreground text-muted-foreground hover:bg-muted/10">
              View Sources
            </Button>
            <Button variant="outline" className="border-cherry text-cherry hover:bg-cherry/10">
              Save Chat
            </Button>
          </div>
        </div>

        <Card className="flex-1 bg-background/80 backdrop-blur-sm border-gold/20 flex flex-col overflow-hidden">
          <CardContent className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                {message.role === "sensei" && (
                  <div className="mr-2 flex-shrink-0">
                    <Sensei type="fox" size="sm" />
                  </div>
                )}

                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.role === "user" ? "bg-cherry/20 text-foreground" : "bg-secondary text-foreground"
                  }`}
                >
                  <p>{message.content}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>

                {message.role === "user" && (
                  <div className="ml-2 flex-shrink-0">
                    <div className="w-8 h-8 bg-cherry/20 rounded-full flex items-center justify-center">
                      <span className="text-sm">You</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </CardContent>

          <div className="p-4 border-t border-border">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask your Sensei..."
                className="flex-1 bg-background"
              />
              <Button type="submit" className="bg-cherry hover:bg-cherry/80 text-cherry-foreground">
                Send
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </main>
  )
}
