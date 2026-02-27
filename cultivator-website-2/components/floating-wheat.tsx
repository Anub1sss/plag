"use client"

import { useEffect, useState } from "react"

export function FloatingWheat() {
  const [wheats, setWheats] = useState<{ id: number; side: "left" | "right"; duration: number; delay: number }[]>([])
  const [gears, setGears] = useState<
    { id: number; side: "left" | "right"; duration: number; delay: number; size: number }[]
  >([])

  useEffect(() => {
    const wheatElements = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      side: i % 2 === 0 ? "left" : ("right" as "left" | "right"),
      duration: 15 + Math.random() * 10, // 15-25 seconds
      delay: Math.random() * 10, // 0-10 seconds delay
    }))
    setWheats(wheatElements)

    const gearElements = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      side: i % 2 === 0 ? "left" : ("right" as "left" | "right"),
      duration: 20 + Math.random() * 15, // 20-35 seconds
      delay: Math.random() * 12, // 0-12 seconds delay
      size: 30 + Math.random() * 25, // 30-55px
    }))
    setGears(gearElements)
  }, [])

  return (
    <>
      {wheats.map((wheat) => (
        <div
          key={`wheat-${wheat.id}`}
          className="floating-element text-4xl opacity-20"
          style={{
            left: wheat.side === "left" ? `${Math.random() * 8}%` : "auto",
            right: wheat.side === "right" ? `${Math.random() * 8}%` : "auto",
            animationDuration: `${wheat.duration}s`,
            animationDelay: `${wheat.delay}s`,
          }}
        >
          🌾
        </div>
      ))}
      {gears.map((gear) => (
        <div
          key={`gear-${gear.id}`}
          className="floating-gear opacity-15"
          style={{
            left: gear.side === "left" ? `${Math.random() * 10}%` : "auto",
            right: gear.side === "right" ? `${Math.random() * 10}%` : "auto",
            animationDuration: `${gear.duration}s`,
            animationDelay: `${gear.delay}s`,
            fontSize: `${gear.size}px`,
          }}
        >
          ⚙️
        </div>
      ))}
    </>
  )
}
