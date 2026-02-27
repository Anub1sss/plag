"use client"

import type React from "react"

import { useState } from "react"
import { Search, Grid3X3, Tractor, Shovel, Rows3, Sprout, CircleDot, ArrowDownToLine } from "lucide-react"
import { Input } from "@/components/ui/input"
import { ProductCard } from "@/components/product-card"
import { allParts, categories } from "@/lib/parts-data"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Grid3X3,
  Tractor,
  Shovel,
  Rows3,
  Sprout,
  CircleDot,
  ArrowDownToLine,
}

export function Catalog() {
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")

  const filteredParts = allParts.filter((part) => {
    const matchesSearch =
      search === "" ||
      part.name.toLowerCase().includes(search.toLowerCase()) ||
      part.article.toLowerCase().includes(search.toLowerCase()) ||
      part.partNumber.toLowerCase().includes(search.toLowerCase())

    const matchesCategory = activeCategory === "all" || part.category === activeCategory

    return matchesSearch && matchesCategory
  })

  return (
    <section id="catalog" className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-2xl font-bold text-foreground">Запчасти</h2>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Поиск по названию, артикулу или номеру детали..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-12 pl-12 text-base"
          />
        </div>

        {/* Categories */}
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((cat) => {
            const Icon = iconMap[cat.icon]
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  activeCategory === cat.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {cat.name}
              </button>
            )
          })}
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {filteredParts.map((part) => (
            <ProductCard key={part.id} product={part} />
          ))}
        </div>

        {filteredParts.length === 0 && <div className="py-12 text-center text-muted-foreground">Товары не найдены</div>}
      </div>
    </section>
  )
}
