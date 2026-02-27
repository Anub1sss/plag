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
  Home,
  ShoppingCart,
  Heart,
  User,
  Tractor,
  Shovel,
  Rows3,
  Sprout,
  CircleDot,
  ArrowDownToLine,
  Grid3X3,
  ArrowLeft,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ProductCard } from "@/components/product-card"
import { allParts, categories } from "@/lib/parts-data"
import { useCart } from "@/components/cart-provider"
import { CartDrawer } from "@/components/cart-drawer"
import { FavoritesModal } from "@/components/favorites-modal"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Grid3X3,
  Tractor,
  Shovel,
  Rows3,
  Sprout,
  CircleDot,
  ArrowDownToLine,
}

type SortOption = "default" | "price-asc" | "price-desc" | "name-asc" | "name-desc"
type ViewMode = "grid" | "list"

export function CatalogPageClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { items, favorites } = useCart()
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  const [search, setSearch] = useState("")

  // Загрузка параметра search из URL
  useEffect(() => {
    const searchParam = searchParams.get("search")
    if (searchParam) {
      setSearch(searchParam)
    }
  }, [searchParams])
  const [activeCategories, setActiveCategories] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [sortOption, setSortOption] = useState<SortOption>("default")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 15000])
  const [inStockOnly, setInStockOnly] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false)

  // Calculate price bounds
  const priceBounds = useMemo(() => {
    const prices = allParts.map((p) => Number.parseFloat(p.price.replace(",", ".")))
    return {
      min: Math.floor(Math.min(...prices)),
      max: Math.ceil(Math.max(...prices)),
    }
  }, [])

  // Filter and sort products
  const filteredParts = useMemo(() => {
    let result = allParts.filter((part) => {
      const matchesSearch =
        search === "" ||
        part.name.toLowerCase().includes(search.toLowerCase()) ||
        part.article.toLowerCase().includes(search.toLowerCase()) ||
        part.partNumber.toLowerCase().includes(search.toLowerCase())

      const matchesCategory = activeCategories.length === 0 || activeCategories.includes(part.category)

      const price = Number.parseFloat(part.price.replace(",", "."))
      const matchesPrice = price >= priceRange[0] && price <= priceRange[1]

      const matchesStock = !inStockOnly || part.inStock !== false

      return matchesSearch && matchesCategory && matchesPrice && matchesStock
    })

    // Sort
    switch (sortOption) {
      case "price-asc":
        result = result.sort(
          (a, b) => Number.parseFloat(a.price.replace(",", ".")) - Number.parseFloat(b.price.replace(",", ".")),
        )
        break
      case "price-desc":
        result = result.sort(
          (a, b) => Number.parseFloat(b.price.replace(",", ".")) - Number.parseFloat(a.price.replace(",", ".")),
        )
        break
      case "name-asc":
        result = result.sort((a, b) => a.name.localeCompare(b.name, "ru"))
        break
      case "name-desc":
        result = result.sort((a, b) => b.name.localeCompare(a.name, "ru"))
        break
    }

    return result
  }, [search, activeCategories, priceRange, inStockOnly, sortOption])

  const toggleCategory = (categoryId: string) => {
    setActiveCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((c) => c !== categoryId) : [...prev, categoryId],
    )
  }

  const clearFilters = () => {
    setSearch("")
    setActiveCategories([])
    setPriceRange([priceBounds.min, priceBounds.max])
    setInStockOnly(false)
    setSortOption("default")
  }

  const activeFiltersCount =
    activeCategories.length +
    (inStockOnly ? 1 : 0) +
    (priceRange[0] > priceBounds.min || priceRange[1] < priceBounds.max ? 1 : 0)

  const sortLabels: Record<SortOption, string> = {
    default: "По умолчанию",
    "price-asc": "Сначала дешевые",
    "price-desc": "Сначала дорогие",
    "name-asc": "По названию А-Я",
    "name-desc": "По названию Я-А",
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.push("/")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold">Каталог запчастей</h1>
          </div>
        </div>
      </header>

      {/* Search and controls */}
      <div className="sticky top-[73px] z-30 border-b border-border bg-background/95 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-3">
          {/* Search */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Поиск по названию, артикулу..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 pl-10 pr-10"
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

          {/* Controls row */}
          <div className="flex items-center justify-between gap-2">
            {/* Filter button */}
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="relative bg-transparent">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Фильтры
                  {activeFiltersCount > 0 && (
                    <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                      {activeFiltersCount}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[320px] overflow-y-auto">
                <SheetHeader>
                  <SheetTitle className="flex items-center justify-between">
                    Фильтры
                    {activeFiltersCount > 0 && (
                      <Button variant="ghost" size="sm" onClick={clearFilters}>
                        Сбросить
                      </Button>
                    )}
                  </SheetTitle>
                </SheetHeader>

                <div className="mt-6 space-y-6">
                  {/* Categories */}
                  <div>
                    <h3 className="mb-3 font-semibold">Категории</h3>
                    <div className="space-y-2">
                      {categories.slice(1).map((cat) => {
                        const Icon = iconMap[cat.icon]
                        return (
                          <label
                            key={cat.id}
                            className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted"
                          >
                            <Checkbox
                              checked={activeCategories.includes(cat.id)}
                              onCheckedChange={() => toggleCategory(cat.id)}
                            />
                            <Icon className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{cat.name}</span>
                          </label>
                        )
                      })}
                    </div>
                  </div>

                  {/* Price range */}
                  <div>
                    <h3 className="mb-3 font-semibold">Цена, руб.</h3>
                    <div className="px-2">
                      <Slider
                        value={priceRange}
                        onValueChange={(value) => setPriceRange(value as [number, number])}
                        min={priceBounds.min}
                        max={priceBounds.max}
                        step={100}
                        className="mb-4"
                      />
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{priceRange[0].toLocaleString("ru")} ₽</span>
                        <span>{priceRange[1].toLocaleString("ru")} ₽</span>
                      </div>
                    </div>
                  </div>

                  {/* In stock */}
                  <div>
                    <label className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted">
                      <Checkbox
                        checked={inStockOnly}
                        onCheckedChange={(checked) => setInStockOnly(checked as boolean)}
                      />
                      <span className="text-sm">Только в наличии</span>
                    </label>
                  </div>
                </div>

                <div className="mt-6">
                  <Button className="w-full" onClick={() => setIsFilterOpen(false)}>
                    Показать {filteredParts.length} товаров
                  </Button>
                </div>
              </SheetContent>
            </Sheet>

            {/* Sort dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <ArrowUpDown className="mr-2 h-4 w-4" />
                  {sortLabels[sortOption]}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {Object.entries(sortLabels).map(([key, label]) => (
                  <DropdownMenuItem
                    key={key}
                    onClick={() => setSortOption(key as SortOption)}
                    className={sortOption === key ? "bg-muted" : ""}
                  >
                    {label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* View mode toggle */}
            <div className="flex rounded-lg border border-border">
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="icon"
                className="h-9 w-9 rounded-r-none"
                onClick={() => setViewMode("grid")}
              >
                <Grid2X2 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="icon"
                className="h-9 w-9 rounded-l-none"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Active filters chips */}
      {activeFiltersCount > 0 && (
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-wrap gap-2">
            {activeCategories.map((catId) => {
              const cat = categories.find((c) => c.id === catId)
              return (
                <button
                  key={catId}
                  onClick={() => toggleCategory(catId)}
                  className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm text-primary"
                >
                  {cat?.name}
                  <X className="h-3 w-3" />
                </button>
              )
            })}
            {inStockOnly && (
              <button
                onClick={() => setInStockOnly(false)}
                className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm text-primary"
              >
                В наличии
                <X className="h-3 w-3" />
              </button>
            )}
            {(priceRange[0] > priceBounds.min || priceRange[1] < priceBounds.max) && (
              <button
                onClick={() => setPriceRange([priceBounds.min, priceBounds.max])}
                className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm text-primary"
              >
                {priceRange[0].toLocaleString("ru")} - {priceRange[1].toLocaleString("ru")} ₽
                <X className="h-3 w-3" />
              </button>
            )}
            <button onClick={clearFilters} className="text-sm text-muted-foreground underline">
              Сбросить все
            </button>
          </div>
        </div>
      )}

      {/* Results count */}
      <div className="container mx-auto px-4 py-2">
        <p className="text-sm text-muted-foreground">Найдено: {filteredParts.length} товаров</p>
      </div>

      {/* Products */}
      <div className="container mx-auto px-4 pb-8">
        {viewMode === "grid" ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {filteredParts.map((part) => (
              <ProductCard key={part.id} product={part} />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredParts.map((part) => (
              <ProductListItem key={part.id} product={part} />
            ))}
          </div>
        )}

        {filteredParts.length === 0 && (
          <div className="py-20 text-center">
            <div className="mb-4 text-6xl">🔍</div>
            <h3 className="mb-2 text-lg font-semibold">Ничего не найдено</h3>
            <p className="mb-4 text-muted-foreground">Попробуйте изменить параметры поиска или фильтры</p>
            <Button variant="outline" onClick={clearFilters}>
              Сбросить фильтры
            </Button>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur-lg">
        <div className="flex items-center justify-around py-2">
          <button
            onClick={() => router.push("/")}
            className="flex flex-col items-center gap-1 px-4 py-2 text-muted-foreground transition-colors"
          >
            <Home className="h-6 w-6" />
            <span className="text-xs">Главная</span>
          </button>
          <button className="flex flex-col items-center gap-1 px-4 py-2 text-primary transition-colors">
            <Grid2X2 className="h-6 w-6" />
            <span className="text-xs">Каталог</span>
          </button>
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex flex-col items-center gap-1 px-4 py-2 text-muted-foreground transition-colors"
          >
            <div className="relative">
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {totalItems}
                </span>
              )}
            </div>
            <span className="text-xs">Корзина</span>
          </button>
          <button
            onClick={() => setIsFavoritesOpen(true)}
            className="relative flex flex-col items-center gap-1 px-4 py-2 text-muted-foreground transition-colors"
          >
            <div className="relative">
              <Heart className="h-6 w-6" />
              {favorites.length > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {favorites.length}
                </span>
              )}
            </div>
            <span className="text-xs">Избранное</span>
          </button>
          <button
            onClick={() => router.push("/profile")}
            className="flex flex-col items-center gap-1 px-4 py-2 text-muted-foreground transition-colors"
          >
            <User className="h-6 w-6" />
            <span className="text-xs">Профиль</span>
          </button>
        </div>
      </nav>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Favorites Modal */}
      <FavoritesModal isOpen={isFavoritesOpen} onClose={() => setIsFavoritesOpen(false)} />
    </div>
  )
}

// List view item component
function ProductListItem({ product }: { product: (typeof allParts)[0] }) {
  const router = useRouter()
  const { addToCart, toggleFavorite, favorites } = useCart()
  const isFavorite = favorites.includes(product.id)

  return (
    <div
      onClick={() => router.push(`/product/${product.id}`)}
      className="flex cursor-pointer gap-4 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-lg"
    >
      {/* Image */}
      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
        <img
          src={`/.jpg?height=96&width=96&query=${encodeURIComponent(product.name + " запчасть")}`}
          alt={product.name}
          className="h-full w-full object-cover"
        />
        {product.inStock === false && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80">
            <span className="text-xs font-medium text-muted-foreground">Нет в наличии</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <p className="mb-1 text-xs text-muted-foreground">{product.article}</p>
          <h3 className="mb-1 line-clamp-2 font-medium">{product.name}</h3>
          <p className="text-xs text-muted-foreground">{product.partNumber}</p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-primary">{product.price} ₽</span>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9"
              onClick={(e) => {
                e.stopPropagation()
                toggleFavorite(product.id)
              }}
            >
              <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
            <Button
              size="sm"
              disabled={product.inStock === false}
              onClick={(e) => {
                e.stopPropagation()
                addToCart(product)
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
