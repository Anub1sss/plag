"use client"

import { ArrowLeft, Heart, ShoppingCart, Package, Shield, Truck, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-provider"
import type { Part } from "@/lib/parts-data"
import { getProductImage, getFallbackImage } from "@/lib/image-utils"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

interface ProductDetailClientProps {
  product: Part
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { addItem, toggleFavorite, isFavorite } = useCart()
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product)
    }
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Назад</span>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Product Image */}
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-border/50 bg-card">
            <Image
              src={getProductImage(product)}
              alt={product.name}
              fill
              className="object-contain p-8"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = getFallbackImage()
              }}
            />
            {/* Favorite button */}
            <button
              onClick={() => toggleFavorite(product)}
              className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-background/90 shadow-lg backdrop-blur-sm transition-all hover:scale-110"
            >
              <Heart
                className={`h-6 w-6 transition-colors ${isFavorite(product.id) ? "fill-red-500 text-red-500" : "text-foreground/60"}`}
              />
            </button>
            {/* Stock badge */}
            <div
              className={`absolute left-4 top-4 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium ${product.inStock !== false ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}
            >
              {product.inStock !== false ? (
                <>
                  <Check className="h-4 w-4" />В наличии
                </>
              ) : (
                <>
                  <X className="h-4 w-4" />
                  Под заказ
                </>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            {/* Article & Part Number */}
            <div className="mb-4 flex flex-wrap gap-3">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                {product.article}
              </span>
              <span className="rounded-full bg-muted px-3 py-1 text-sm font-medium text-muted-foreground">
                {product.partNumber}
              </span>
            </div>

            {/* Name */}
            <h1 className="mb-6 text-2xl font-bold leading-tight text-foreground sm:text-3xl">{product.name}</h1>

            {/* Price */}
            <div className="mb-6">
              <span className="text-4xl font-bold text-foreground">{product.price} ₽</span>
            </div>

            {/* Quantity & Add to cart */}
            <div className="mb-8 flex flex-wrap items-center gap-4">
              <div className="flex items-center rounded-xl border border-border bg-card">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex h-12 w-12 items-center justify-center text-xl font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  -
                </button>
                <span className="w-12 text-center text-lg font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="flex h-12 w-12 items-center justify-center text-xl font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  +
                </button>
              </div>
              <Button
                onClick={handleAddToCart}
                size="lg"
                className="h-12 flex-1 gap-2 bg-primary text-primary-foreground hover:bg-primary/90 sm:flex-none sm:px-8"
              >
                <ShoppingCart className="h-5 w-5" />
                Добавить в корзину
              </Button>
            </div>

            {/* Features */}
            <div className="mb-8 grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center gap-2 rounded-xl border border-border/50 bg-card p-4 text-center">
                <Truck className="h-6 w-6 text-primary" />
                <span className="text-xs text-muted-foreground">Доставка по РФ</span>
              </div>
              <div className="flex flex-col items-center gap-2 rounded-xl border border-border/50 bg-card p-4 text-center">
                <Shield className="h-6 w-6 text-primary" />
                <span className="text-xs text-muted-foreground">{product.warranty || "12 месяцев"}</span>
              </div>
              <div className="flex flex-col items-center gap-2 rounded-xl border border-border/50 bg-card p-4 text-center">
                <Package className="h-6 w-6 text-primary" />
                <span className="text-xs text-muted-foreground">Оригинал</span>
              </div>
            </div>

            {/* Description */}
            {product.description && (
              <div className="mb-8">
                <h2 className="mb-3 text-lg font-semibold text-foreground">Описание</h2>
                <p className="leading-relaxed text-muted-foreground">{product.description}</p>
              </div>
            )}

            {/* Specifications */}
            <div className="rounded-2xl border border-border/50 bg-card p-6">
              <h2 className="mb-4 text-lg font-semibold text-foreground">Характеристики</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-border/30 pb-3">
                  <span className="text-muted-foreground">Артикул</span>
                  <span className="font-medium text-foreground">{product.article}</span>
                </div>
                <div className="flex items-center justify-between border-b border-border/30 pb-3">
                  <span className="text-muted-foreground">Номер детали</span>
                  <span className="font-medium text-foreground">{product.partNumber}</span>
                </div>
                {product.weight && (
                  <div className="flex items-center justify-between border-b border-border/30 pb-3">
                    <span className="text-muted-foreground">Вес</span>
                    <span className="font-medium text-foreground">{product.weight}</span>
                  </div>
                )}
                {product.material && (
                  <div className="flex items-center justify-between border-b border-border/30 pb-3">
                    <span className="text-muted-foreground">Материал</span>
                    <span className="font-medium text-foreground">{product.material}</span>
                  </div>
                )}
                {product.manufacturer && (
                  <div className="flex items-center justify-between border-b border-border/30 pb-3">
                    <span className="text-muted-foreground">Производитель</span>
                    <span className="font-medium text-foreground">{product.manufacturer}</span>
                  </div>
                )}
                {product.warranty && (
                  <div className="flex items-center justify-between pb-1">
                    <span className="text-muted-foreground">Гарантия</span>
                    <span className="font-medium text-foreground">{product.warranty}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Compatible with */}
            {product.compatibleWith && product.compatibleWith.length > 0 && (
              <div className="mt-6 rounded-2xl border border-border/50 bg-card p-6">
                <h2 className="mb-4 text-lg font-semibold text-foreground">Совместимость</h2>
                <div className="flex flex-wrap gap-2">
                  {product.compatibleWith.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
