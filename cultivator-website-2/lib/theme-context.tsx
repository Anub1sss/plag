"use client"

import { useTheme as useNextTheme } from "next-themes"
import { useEffect, useState } from "react"

type Theme = "light" | "dark" | "system"

export function useTheme() {
  const { theme, setTheme: setNextTheme, resolvedTheme } = useNextTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    // Определяем текущую тему: если theme установлен явно, используем его, иначе resolvedTheme
    const currentTheme = theme && theme !== "system" ? theme : (resolvedTheme || "light")
    
    // Переключаем между light и dark
    if (currentTheme === "dark") {
      setNextTheme("light")
    } else {
      setNextTheme("dark")
    }
  }

  // Для отображения используем resolvedTheme, который показывает реальную активную тему
  // Если компонент еще не смонтирован, возвращаем "light" чтобы избежать мигания
  const displayTheme = mounted 
    ? (resolvedTheme || theme || "light") 
    : "light"

  return {
    theme: displayTheme as Theme,
    toggleTheme,
    setTheme: setNextTheme,
  }
}
