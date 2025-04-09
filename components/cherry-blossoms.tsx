"use client"

import type React from "react"

import { useEffect, useState } from "react"

export function CherryBlossoms() {
  const [blossoms, setBlossoms] = useState<{ id: number; style: React.CSSProperties }[]>([])

  useEffect(() => {
    const createBlossom = () => {
      const id = Date.now()
      const left = Math.random() * 100
      const animationDuration = 5 + Math.random() * 10
      const size = 10 + Math.random() * 10
      const rotation = Math.random() * 360

      const style: React.CSSProperties = {
        left: `${left}%`,
        animationDuration: `${animationDuration}s`,
        width: `${size}px`,
        height: `${size}px`,
        transform: `rotate(${rotation}deg)`,
      }

      setBlossoms((prev) => [...prev, { id, style }])

      // Remove blossom after animation completes
      setTimeout(() => {
        setBlossoms((prev) => prev.filter((b) => b.id !== id))
      }, animationDuration * 1000)
    }

    // Create initial blossoms
    for (let i = 0; i < 10; i++) {
      createBlossom()
    }

    // Create new blossoms periodically
    const interval = setInterval(createBlossom, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {blossoms.map(({ id, style }) => (
        <div key={id} className="cherry-blossom animate-fall" style={style} />
      ))}
    </div>
  )
}
