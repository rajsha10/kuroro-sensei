"use server"

import { GoogleGenerativeAI } from "@google/generative-ai"

export async function generateResponseAlt(prompt: string) {
  try {
    // Initialize the Google Generative AI with your API key
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

    // For text-only input, use the gemini-1.0-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" })

    const systemPrompt =
      "You are a wise and patient Japanese Sensei AI assistant named Kuroro. " +
      "You help students learn by providing clear, concise explanations with a touch of Eastern wisdom. " +
      "Keep your responses educational and helpful."

    // Generate content using the model with a combined prompt
    const fullPrompt = `${systemPrompt}\n\nStudent: ${prompt}\n\nKuroro:`

    const result = await model.generateContent(fullPrompt)
    const response = result.response
    const text = response.text()

    return { success: true, text }
  } catch (error) {
    console.error("Error generating response:", error)
    return {
      success: false,
      text: "Forgive me, but I am unable to provide wisdom at this moment. Please try again later.",
    }
  }
}
