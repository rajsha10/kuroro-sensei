"use server"

import { GoogleGenerativeAI } from "@google/generative-ai"

export async function listAvailableModels() {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

    // Include more non-pro models in our test
    const modelNames = [
      "gemini-1.5-flash",
      "gemini-1.0-flash",
      "gemini-flash",
      "gemini-1.5-pro",
      "gemini-pro",
      "gemini-pro-vision",
    ]

    const results = []

    for (const modelName of modelNames) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName })
        // Just a simple prompt to test if the model works
        const result = await model.generateContent("Hello")
        results.push({
          name: modelName,
          available: true,
          sample: result.response.text().substring(0, 20) + "...",
        })
      } catch (error) {
        results.push({
          name: modelName,
          available: false,
          error: error.message,
        })
      }
    }

    return results
  } catch (error) {
    console.error("Error listing models:", error)
    return []
  }
}
