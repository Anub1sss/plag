"use client"

import { useRef, useCallback } from "react"
import { Heart, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-provider"
import { useAuth } from "@/lib/auth-context"
import type { Product } from "@/lib/parts-data"
import { getProductImage, getFallbackImage } from "@/lib/image-utils"
import Link from "next/link"
import Image from "next/image"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, toggleFavorite, isFavorite } = useCart()
  const { getProductPrice } = useAuth()
  const displayPrice = getProductPrice(product.id, product.price)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    cardRef.current.style.setProperty("--mouse-x", `${x}%`)
    cardRef.current.style.setProperty("--mouse-y", `${y}%`)
  }, [])

  return (
    <Link href={`/product/${product.id}`} className="block group">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className="product-card relative flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm"
      >
        {/* Ambient glow that follows mouse */}
        <div
          className="pointer-events-none absolute inset-0 z-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: "radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), oklch(0.62 0.19 150 / 0.08), transparent 40%)",
          }}
        />

        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-muted/30 to-muted/60">
          <Image
            src={getProductImage(product)}
            alt={product.name}
            fill
            className="object-contain p-4 transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = getFallbackImage()
            }}
          />

          {/* Top glass overlay on hover */}
          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              toggleFavorite(product)
            }}
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-background/60 backdrop-blur-md transition-all hover:bg-background/80 hover:scale-110"
          >
            <Heart
              className={`h-4 w-4 transition-all ${isFavorite(product.id) ? "fill-red-500 text-red-500 drop-shadow-[0_0_6px_rgba(239,68,68,0.5)]" : "text-foreground/60"}`}
            />
          </button>
        </div>

        <div className="relative z-10 flex flex-1 flex-col p-4">
          {product.article && (
            <span className="mb-1 text-[10px] font-medium uppercase tracking-wider text-primary/60">
              {product.article}
            </span>
          )}

          <h3 className="mb-3 line-clamp-2 flex-1 text-sm font-medium leading-snug text-foreground/90 transition-colors group-hover:text-foreground">
            {product.name}
          </h3>

          {displayPrice && (
            <div className="mb-3">
              <span className="text-lg font-bold text-foreground">
                ~ {displayPrice.toLocaleString("ru-RU")} ₽
              </span>
              <span className="ml-1.5 text-[10px] text-muted-foreground/70">примерная</span>
            </div>
          )}

          <div className="flex items-center justify-end">
            <Button
              size="sm"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                addItem(product)
              }}
              className="h-9 gap-1.5 rounded-xl bg-primary/90 px-4 text-primary-foreground transition-all hover:bg-primary hover:shadow-[0_0_20px_oklch(0.62_0.19_150/0.3)] btn-glow"
            >
              <ShoppingCart className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">В корзину</span>
            </Button>
          </div>
        </div>
      </div>
    </Link>
  )
}
