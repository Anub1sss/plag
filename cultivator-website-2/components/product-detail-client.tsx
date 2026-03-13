"use client"

import { useRef, useCallback } from "react"
import { ArrowLeft, Heart, ShoppingCart, Package, Shield, Truck, Check, X, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-provider"
import { useAuth } from "@/lib/auth-context"
import type { Product } from "@/lib/parts-data"
import { getProductImage, getProductImages, getFallbackImage } from "@/lib/image-utils"
import { CallbackModal } from "@/components/callback-modal"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

interface ProductDetailClientProps {
  product: Product
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { addItem, toggleFavorite, isFavorite } = useCart()
  const { getProductPrice } = useAuth()
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [callbackOpen, setCallbackOpen] = useState(false)
  const images = getProductImages(product)
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

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product)
    }
  }

  return (
    <div className="min-h-screen bg-background grain-overlay pb-24">
      <header className="sticky top-0 z-40 glass-strong border-b border-white/[0.06]">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground group"
          >
            <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
            <span>Назад</span>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Image area */}
          <div>
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              className="glow-card relative aspect-square overflow-hidden rounded-3xl border border-border/30 bg-card/50 backdrop-blur-sm"
            >
              <Image
                src={images[selectedImage] || getProductImage(product)}
                alt={product.name}
                fill
                className="object-contain p-8 transition-all duration-500 hover:scale-105"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = getFallbackImage()
                }}
              />
              <button
                onClick={() => toggleFavorite(product)}
                className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-background/40 backdrop-blur-md shadow-lg transition-all hover:scale-110 hover:bg-background/60"
              >
                <Heart
                  className={`h-6 w-6 transition-all ${isFavorite(product.id) ? "fill-red-500 text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]" : "text-foreground/60"}`}
                />
              </button>
              <div
                className={`absolute left-4 top-4 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium backdrop-blur-md ${product.inStock ? "bg-emerald-500/15 text-emerald-400" : "bg-amber-500/15 text-amber-400"}`}
              >
                {product.inStock ? (
                  <><Check className="h-4 w-4" />В наличии</>
                ) : (
                  <><X className="h-4 w-4" />Под заказ</>
                )}
              </div>
            </div>

            {images.length > 1 && (
              <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border-2 bg-card/50 backdrop-blur-sm transition-all ${
                      selectedImage === idx
                        ? "border-primary shadow-[0_0_15px_oklch(0.62_0.19_150/0.2)]"
                        : "border-border/30 hover:border-border"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} ${idx + 1}`}
                      fill
                      className="object-contain p-2"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = getFallbackImage()
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info area */}
          <div className="flex flex-col">
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                {product.categoryName}
              </span>
              {product.subcategory && (
                <span className="rounded-full border border-border/30 bg-card/50 px-3 py-1 text-sm font-medium text-muted-foreground backdrop-blur-sm">
                  {product.subcategory}
                </span>
              )}
            </div>

            <h1 className="mb-6 text-2xl font-bold leading-tight text-foreground sm:text-3xl animate-slide-up">
              {product.name}
            </h1>

            {displayPrice && (
              <div className="mb-6 rounded-2xl border border-amber-500/20 bg-amber-500/[0.04] p-5 backdrop-blur-sm">
                <span className="text-3xl font-bold text-foreground">
                  ~ {displayPrice.toLocaleString("ru-RU")} ₽
                </span>
                <p className="mt-1 text-sm text-amber-600 dark:text-amber-400/80">
                  Примерная цена. Уточняйте актуальную стоимость у менеджера.
                </p>
              </div>
            )}

            <div className="mb-5">
              <Button
                onClick={() => setCallbackOpen(true)}
                size="lg"
                className="w-full h-12 gap-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] transition-all sm:w-auto sm:px-8 btn-glow"
              >
                <Phone className="h-5 w-5" />
                Узнать актуальную цену
              </Button>
              <p className="mt-2 text-xs text-muted-foreground/70">
                Менеджер свяжется с вами и уточнит стоимость и наличие
              </p>
            </div>

            <div className="mb-8 flex flex-wrap items-center gap-4">
              <div className="flex items-center rounded-xl border border-border/30 bg-card/50 backdrop-blur-sm">
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
                variant="outline"
                className="h-12 flex-1 gap-2 rounded-xl border-border/30 bg-transparent backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-primary/5 sm:flex-none sm:px-8"
              >
                <ShoppingCart className="h-5 w-5" />
                В корзину
              </Button>
            </div>

            {/* Feature badges */}
            <div className="mb-8 grid grid-cols-3 gap-3">
              {[
                { icon: Truck, label: "Доставка по РФ" },
                { icon: Shield, label: "Гарантия качества" },
                { icon: Package, label: "Оригинал" },
              ].map((feature) => (
                <div
                  key={feature.label}
                  className="glow-card flex flex-col items-center gap-2.5 rounded-2xl border border-border/20 bg-card/30 p-4 text-center backdrop-blur-sm"
                >
                  <feature.icon className="h-6 w-6 text-primary" />
                  <span className="text-xs text-muted-foreground">{feature.label}</span>
                </div>
              ))}
            </div>

            {/* Specs table */}
            <div className="rounded-2xl border border-border/20 bg-card/30 p-6 backdrop-blur-sm">
              <h2 className="mb-5 text-lg font-semibold text-foreground">Информация</h2>
              <div className="space-y-0">
                {[
                  { label: "Категория", value: product.categoryName },
                  product.subcategory ? { label: "Подкатегория", value: product.subcategory } : null,
                  product.article ? { label: "Артикул", value: product.article } : null,
                  product.bizonCode ? { label: "Код", value: product.bizonCode } : null,
                  {
                    label: "Наличие",
                    value: product.inStock ? "В наличии" : "Под заказ",
                    color: product.inStock ? "text-emerald-500" : "text-amber-500",
                  },
                  { label: "Фото", value: `${images.length} шт.` },
                ]
                  .filter(Boolean)
                  .map((row, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between border-b border-border/10 py-3.5 last:border-0"
                    >
                      <span className="text-sm text-muted-foreground">{row!.label}</span>
                      <span className={`text-sm font-medium ${(row as any)?.color || "text-foreground"}`}>
                        {row!.value}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <CallbackModal open={callbackOpen} onClose={() => setCallbackOpen(false)} />
    </div>
  )
}
