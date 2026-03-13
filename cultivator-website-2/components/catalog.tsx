"use client"

import { useState, useMemo } from "react"
import { Search, ChevronDown, ChevronUp, LayoutGrid } from "lucide-react"
import { Input } from "@/components/ui/input"
import { ProductCard } from "@/components/product-card"
import { allProducts, categories } from "@/lib/parts-data"

const ITEMS_PER_PAGE = 20

export function Catalog() {
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [showAllCategories, setShowAllCategories] = useState(false)
  const [page, setPage] = useState(1)

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const matchesSearch =
        search === "" ||
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.categoryName.toLowerCase().includes(search.toLowerCase())

      const matchesCategory = activeCategory === "all" || product.category === activeCategory

      return matchesSearch && matchesCategory
    })
  }, [search, activeCategory])

  const paginatedProducts = filteredProducts.slice(0, page * ITEMS_PER_PAGE)
  const hasMore = paginatedProducts.length < filteredProducts.length

  const visibleCategories = showAllCategories ? categories : categories.slice(0, 10)

  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId)
    setPage(1)
  }

  return (
    <section id="catalog" className="relative py-16">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <LayoutGrid className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Каталог товаров</h2>
            <p className="text-sm text-muted-foreground">{allProducts.length} позиций в каталоге</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Поиск по названию или категории..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            className="h-12 rounded-2xl border-border/50 bg-card/50 pl-12 text-base backdrop-blur-sm transition-all focus:border-primary/30 focus:bg-card/80 focus:shadow-[0_0_20px_oklch(0.62_0.19_150/0.08)]"
          />
        </div>

        {/* Category pills */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {visibleCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`cat-pill flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-all ${
                  activeCategory === cat.id
                    ? "active bg-primary text-primary-foreground shadow-[0_0_20px_oklch(0.62_0.19_150/0.25)]"
                    : "border border-border/50 bg-card/50 text-muted-foreground backdrop-blur-sm hover:border-primary/20 hover:bg-card/80 hover:text-foreground"
                }`}
              >
                {cat.name}
                <span className={`text-xs ${activeCategory === cat.id ? "text-primary-foreground/70" : "text-muted-foreground/50"}`}>
                  {cat.productCount}
                </span>
              </button>
            ))}
          </div>
          {categories.length > 10 && (
            <button
              onClick={() => setShowAllCategories(!showAllCategories)}
              className="mt-3 flex items-center gap-1 text-sm text-primary transition-colors hover:text-primary/80"
            >
              {showAllCategories ? (
                <>Свернуть <ChevronUp className="h-4 w-4" /></>
              ) : (
                <>Все категории ({categories.length}) <ChevronDown className="h-4 w-4" /></>
              )}
            </button>
          )}
        </div>

        <p className="mb-6 text-sm text-muted-foreground">
          Найдено: <span className="font-medium text-foreground">{filteredProducts.length}</span> товаров
        </p>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {paginatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {hasMore && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setPage(page + 1)}
              className="rounded-full bg-primary/10 px-10 py-3.5 text-sm font-semibold text-primary transition-all hover:bg-primary/20 hover:shadow-[0_0_20px_oklch(0.62_0.19_150/0.1)] btn-glow"
            >
              Показать ещё
            </button>
          </div>
        )}

        {filteredProducts.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-lg text-muted-foreground">Товары не найдены</p>
            <p className="mt-2 text-sm text-muted-foreground/60">Попробуйте изменить запрос</p>
          </div>
        )}
      </div>
    </section>
  )
}
