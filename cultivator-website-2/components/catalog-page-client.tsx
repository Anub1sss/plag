"use client"

import type React from "react"
import { useState, useMemo, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import {
  Search,
  Grid2X2,
  List,
  SlidersHorizontal,
  X,
  ChevronDown,
  ArrowUpDown,
  ArrowLeft,
  ShoppingCart,
  Heart,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ProductCard } from "@/components/product-card"
import { allProducts, categories } from "@/lib/parts-data"
import { useCart } from "@/components/cart-provider"
import { useAuth } from "@/lib/auth-context"
import { CartDrawer } from "@/components/cart-drawer"
import { FavoritesModal } from "@/components/favorites-modal"
import { getProductImage, getFallbackImage } from "@/lib/image-utils"
import Image from "next/image"

type SortOption = "default" | "name-asc" | "name-desc"
type ViewMode = "grid" | "list"

const ITEMS_PER_PAGE = 30

export function CatalogPageClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { items, favorites, addItem, toggleFavorite, isFavorite } = useCart()
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)

  useEffect(() => {
    const searchParam = searchParams.get("search")
    if (searchParam) {
      setSearch(searchParam)
    }
  }, [searchParams])

  const [activeCategories, setActiveCategories] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [sortOption, setSortOption] = useState<SortOption>("default")
  const [inStockOnly, setInStockOnly] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false)

  const filteredProducts = useMemo(() => {
    let result = allProducts.filter((product) => {
      const matchesSearch =
        search === "" ||
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.categoryName.toLowerCase().includes(search.toLowerCase())

      const matchesCategory = activeCategories.length === 0 || activeCategories.includes(product.category)

      const matchesStock = !inStockOnly || product.inStock

      return matchesSearch && matchesCategory && matchesStock
    })

    switch (sortOption) {
      case "name-asc":
        result = [...result].sort((a, b) => a.name.localeCompare(b.name, "ru"))
        break
      case "name-desc":
        result = [...result].sort((a, b) => b.name.localeCompare(a.name, "ru"))
        break
    }

    return result
  }, [search, activeCategories, inStockOnly, sortOption])

  const paginatedProducts = filteredProducts.slice(0, page * ITEMS_PER_PAGE)
  const hasMore = paginatedProducts.length < filteredProducts.length

  const toggleCategory = (categoryId: string) => {
    setActiveCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((c) => c !== categoryId) : [...prev, categoryId],
    )
    setPage(1)
  }

  const clearFilters = () => {
    setSearch("")
    setActiveCategories([])
    setInStockOnly(false)
    setSortOption("default")
    setPage(1)
  }

  const activeFiltersCount = activeCategories.length + (inStockOnly ? 1 : 0)

  const sortLabels: Record<SortOption, string> = {
    default: "По умолчанию",
    "name-asc": "По названию А-Я",
    "name-desc": "По названию Я-А",
  }

  return (
    <div className="min-h-screen bg-background grain-overlay">
      {/* Header */}
      <header className="sticky top-0 z-40 glass-strong border-b border-white/[0.06]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/")}
              className="h-9 w-9 rounded-full hover:bg-primary/10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold">Каталог товаров</h1>
          </div>
        </div>
      </header>

      {/* Toolbar */}
      <div className="sticky top-[73px] z-30 glass border-b border-white/[0.04]">
        <div className="container mx-auto px-4 py-3">
          <div className="relative mb-3">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Поиск по названию или категории..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1) }}
              className="h-10 rounded-xl border-border/30 bg-card/30 pl-10 pr-10 backdrop-blur-sm transition-all focus:border-primary/30 focus:bg-card/60 focus:shadow-[0_0_20px_oklch(0.62_0.19_150/0.08)]"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between gap-2">
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="relative rounded-xl border-border/30 bg-card/30 backdrop-blur-sm hover:border-primary/20">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Фильтры
                  {activeFiltersCount > 0 && (
                    <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground shadow-[0_0_8px_oklch(0.62_0.19_150/0.3)]">
                      {activeFiltersCount}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[320px] overflow-y-auto border-r-border/20 bg-background/95 backdrop-blur-xl">
                <SheetHeader>
                  <SheetTitle className="flex items-center justify-between">
                    Фильтры
                    {activeFiltersCount > 0 && (
                      <Button variant="ghost" size="sm" onClick={clearFilters} className="text-primary">
                        Сбросить
                      </Button>
                    )}
                  </SheetTitle>
                </SheetHeader>

                <div className="mt-6 space-y-6">
                  <div>
                    <h3 className="mb-3 font-semibold">Категории</h3>
                    <div className="space-y-1 max-h-[50vh] overflow-y-auto">
                      {categories.slice(1).map((cat) => (
                        <label
                          key={cat.id}
                          className="flex cursor-pointer items-center gap-3 rounded-xl p-2.5 transition-all hover:bg-primary/5"
                        >
                          <Checkbox
                            checked={activeCategories.includes(cat.id)}
                            onCheckedChange={() => toggleCategory(cat.id)}
                          />
                          <span className="text-sm flex-1">{cat.name}</span>
                          <span className="text-xs text-muted-foreground/60">{cat.productCount}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="section-glow-line" />

                  <div>
                    <label className="flex cursor-pointer items-center gap-3 rounded-xl p-2.5 transition-all hover:bg-primary/5">
                      <Checkbox
                        checked={inStockOnly}
                        onCheckedChange={(checked) => setInStockOnly(checked as boolean)}
                      />
                      <span className="text-sm">Только в наличии</span>
                    </label>
                  </div>
                </div>

                <div className="mt-6">
                  <Button className="w-full rounded-xl btn-glow" onClick={() => setIsFilterOpen(false)}>
                    Показать {filteredProducts.length} товаров
                  </Button>
                </div>
              </SheetContent>
            </Sheet>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="rounded-xl border-border/30 bg-card/30 backdrop-blur-sm hover:border-primary/20">
                  <ArrowUpDown className="mr-2 h-4 w-4" />
                  {sortLabels[sortOption]}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="rounded-xl border-border/30 bg-card/95 backdrop-blur-xl">
                {Object.entries(sortLabels).map(([key, label]) => (
                  <DropdownMenuItem
                    key={key}
                    onClick={() => setSortOption(key as SortOption)}
                    className={`rounded-lg ${sortOption === key ? "bg-primary/10 text-primary" : ""}`}
                  >
                    {label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex rounded-xl border border-border/30 bg-card/30 backdrop-blur-sm">
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="icon"
                className="h-9 w-9 rounded-r-none rounded-l-xl"
                onClick={() => setViewMode("grid")}
              >
                <Grid2X2 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="icon"
                className="h-9 w-9 rounded-l-none rounded-r-xl"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Active filters */}
      {activeFiltersCount > 0 && (
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-wrap gap-2">
            {activeCategories.map((catId) => {
              const cat = categories.find((c) => c.id === catId)
              return (
                <button
                  key={catId}
                  onClick={() => toggleCategory(catId)}
                  className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-sm text-primary transition-all hover:bg-primary/20"
                >
                  {cat?.name}
                  <X className="h-3 w-3" />
                </button>
              )
            })}
            {inStockOnly && (
              <button
                onClick={() => setInStockOnly(false)}
                className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-sm text-primary transition-all hover:bg-primary/20"
              >
                В наличии
                <X className="h-3 w-3" />
              </button>
            )}
            <button onClick={clearFilters} className="text-sm text-muted-foreground/70 underline hover:text-muted-foreground">
              Сбросить все
            </button>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-3">
        <p className="text-sm text-muted-foreground">
          Найдено: <span className="font-medium text-foreground">{filteredProducts.length}</span> товаров
        </p>
      </div>

      {/* Products */}
      <div className="container mx-auto px-4 pb-8">
        {viewMode === "grid" ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {paginatedProducts.map((product) => (
              <ProductListItem key={product.id} product={product} />
            ))}
          </div>
        )}

        {hasMore && (
          <div className="mt-10 text-center">
            <Button
              onClick={() => setPage(page + 1)}
              variant="outline"
              size="lg"
              className="rounded-full border-border/30 bg-card/30 backdrop-blur-sm px-10 hover:border-primary/20 hover:bg-primary/5 btn-glow"
            >
              Показать ещё
            </Button>
          </div>
        )}

        {filteredProducts.length === 0 && (
          <div className="py-20 text-center">
            <h3 className="mb-2 text-lg font-semibold">Ничего не найдено</h3>
            <p className="mb-4 text-muted-foreground/70">Попробуйте изменить параметры поиска</p>
            <Button variant="outline" onClick={clearFilters} className="rounded-xl">
              Сбросить фильтры
            </Button>
          </div>
        )}
      </div>

      <CartDrawer open={isCartOpen} onOpenChange={setIsCartOpen} />
      <FavoritesModal open={isFavoritesOpen} onClose={() => setIsFavoritesOpen(false)} />
    </div>
  )
}

function ProductListItem({ product }: { product: (typeof allProducts)[0] }) {
  const router = useRouter()
  const { addItem, toggleFavorite, isFavorite } = useCart()
  const { getProductPrice } = useAuth()
  const displayPrice = getProductPrice(product.id, product.price)

  return (
    <div
      onClick={() => router.push(`/product/${product.id}`)}
      className="glow-card flex cursor-pointer gap-4 rounded-2xl border border-border/30 bg-card/40 p-4 backdrop-blur-sm"
    >
      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-muted/30">
        <Image
          src={getProductImage(product)}
          alt={product.name}
          fill
          className="object-contain p-2"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = getFallbackImage()
          }}
        />
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div>
          <p className="mb-1 text-xs text-muted-foreground/60">{product.categoryName}</p>
          <h3 className="mb-1 line-clamp-2 font-medium">{product.name}</h3>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            {displayPrice && (
              <span className="text-base font-bold text-foreground">~ {displayPrice.toLocaleString("ru-RU")} ₽</span>
            )}
            <span className={`text-sm font-medium ${product.inStock ? "text-emerald-500" : "text-amber-500"}`}>
              {product.inStock ? "В наличии" : "Под заказ"}
            </span>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full hover:bg-primary/10"
              onClick={(e) => {
                e.stopPropagation()
                toggleFavorite(product)
              }}
            >
              <Heart className={`h-5 w-5 ${isFavorite(product.id) ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
            <Button
              size="sm"
              className="rounded-xl btn-glow"
              onClick={(e) => {
                e.stopPropagation()
                addItem(product)
              }}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />В корзину
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
