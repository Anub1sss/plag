"use client"

import { X, Heart } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { ProductCard } from "@/components/product-card"

interface FavoritesModalProps {
  open: boolean
  onClose: () => void
}

export function FavoritesModal({ open, onClose }: FavoritesModalProps) {
  const { favorites } = useCart()

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="relative w-full max-w-2xl rounded-2xl bg-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border p-4">
          <h2 className="text-lg font-semibold text-foreground">Избранное</h2>
          <button onClick={onClose} className="rounded-full p-2 hover:bg-muted">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto p-4">
          {favorites.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Heart className="mb-4 h-16 w-16 text-muted-foreground/30" />
              <p className="text-muted-foreground">Нет избранных товаров</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {favorites.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
