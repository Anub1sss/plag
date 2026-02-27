"use client"

import { Heart, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-provider"
import type { Part } from "@/lib/parts-data"
import { getProductImage, getFallbackImage } from "@/lib/image-utils"
import Link from "next/link"
import Image from "next/image"

interface ProductCardProps {
  product: Part
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, toggleFavorite, isFavorite } = useCart()

  return (
    <Link href={`/product/${product.id}`} className="block">
      <div className="product-card group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/30 hover:shadow-lg">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={getProductImage(product)}
            alt={product.name}
            fill
            className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = getFallbackImage()
            }}
          />
          {/* Favorite button */}
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              toggleFavorite(product)
            }}
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm transition-colors hover:bg-background"
          >
            <Heart
              className={`h-5 w-5 transition-colors ${isFavorite(product.id) ? "fill-red-500 text-red-500" : "text-foreground/60"}`}
            />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-4">
          {/* Article */}
          <span className="mb-1 text-xs text-muted-foreground">{product.article}</span>

          {/* Part number */}
          <span className="mb-2 text-xs font-medium text-primary">{product.partNumber}</span>

          {/* Name */}
          <h3 className="mb-3 line-clamp-2 flex-1 text-sm font-medium leading-tight text-foreground">{product.name}</h3>

          {/* Price and cart */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-lg font-bold text-foreground">{product.price} ₽</span>
            <Button
              size="sm"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                addItem(product)
              }}
              className="h-9 gap-1.5 bg-primary px-3 text-primary-foreground hover:bg-primary/90"
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline">В корзину</span>
            </Button>
          </div>
        </div>
      </div>
    </Link>
  )
}
