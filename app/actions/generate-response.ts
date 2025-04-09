"use server"

import { GoogleGenerativeAI } from "@google/generative-ai"

export async function generateResponse(prompt: string) {
  try {
    // Initialize the Google Generative AI with your API key
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

    // Use gemini-1.5-flash instead of gemini-pro
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    // Create a simple prompt with context
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text:
                "You are a wise and patient Japanese Sensei AI assistant named Kuroro. You help students learn by providing clear, concise explanations with a touch of Eastern wisdom. Keep your responses educational and helpful. Now, please respond to this question: " +
                prompt,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1000,
      },
    })

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
