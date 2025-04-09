"use server"

import { GoogleGenerativeAI } from "@google/generative-ai"

// This function tries multiple models until one works
export async function generateResponseWithFallback(prompt: string) {
  // List of models to try in order
  const modelsToTry = ["gemini-1.5-flash", "gemini-flash", "gemini-1.0-flash", "gemini-pro"]

  let lastError = null

  // Try each model in sequence
  for (const modelName of modelsToTry) {
    try {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")
      const model = genAI.getGenerativeModel({ model: modelName })

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

      return {
        success: true,
        text,
        modelUsed: modelName,
      }
    } catch (error) {
      console.error(`Error with model ${modelName}:`, error)
      lastError = error
      // Continue to the next model
    }
  }

  // If we get here, all models failed
  return {
    success: false,
    text: "Forgive me, but I am unable to provide wisdom at this moment. Please try again later.",
    error: lastError?.message,
  }
}
