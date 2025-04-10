"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Sensei {
  id: string
  name: string
  personality: string
  voice: string
  avatar: string
  avatarPath: string
  category: string
  rating: number
  tokens: number
  createdAt: number
}

interface SenseiState {
  senseis: Sensei[]
  currentSenseiId: string | null
  addSensei: (sensei: Omit<Sensei, "id" | "createdAt">) => string
  setCurrentSensei: (id: string) => void
  getCurrentSensei: () => Sensei | null
  getAllSenseis: () => Sensei[]
}

export const useSenseiStore = create<SenseiState>()(
  persist(
    (set, get) => ({
      senseis: [],
      currentSenseiId: null,

      addSensei: (senseiData) => {
        const id = `sensei_${Date.now()}`
        const newSensei: Sensei = {
          ...senseiData,
          id,
          createdAt: Date.now(),
        }

        set((state) => ({
          senseis: [...state.senseis, newSensei],
          currentSenseiId: id,
        }))

        return id
      },

      setCurrentSensei: (id) => {
        set({ currentSenseiId: id })
      },

      getCurrentSensei: () => {
        const { senseis, currentSenseiId } = get()
        if (!currentSenseiId) return null
        return senseis.find((s) => s.id === currentSenseiId) || null
      },

      getAllSenseis: () => {
        return get().senseis
      },
    }),
    {
      name: "sensei-storage",
    },
  ),
)
