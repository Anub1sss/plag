"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { Product } from "@/lib/parts-data"

export interface CartItem extends Product {
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  favorites: Product[]
  addItem: (item: Product) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  total: number
  toggleFavorite: (item: Product) => void
  isFavorite: (id: number) => boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [favorites, setFavorites] = useState<Product[]>([])

  const addItem = (item: Product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id)
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i))
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id)
      return
    }
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity } : i)))
  }

  const clearCart = () => {
    setItems([])
  }

  const toggleFavorite = (item: Product) => {
    setFavorites((prev) => {
      const exists = prev.find((f) => f.id === item.id)
      if (exists) {
        return prev.filter((f) => f.id !== item.id)
      }
      return [...prev, item]
    })
  }

  const isFavorite = (id: number) => {
    return favorites.some((f) => f.id === id)
  }

  const total = items.reduce((sum, item) => {
    return sum + item.quantity
  }, 0)

  return (
    <CartContext.Provider
      value={{ items, favorites, addItem, removeItem, updateQuantity, clearCart, total, toggleFavorite, isFavorite }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within CartProvider")
  }
  return context
}
