"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, ShoppingCart } from "lucide-react"
import { allProducts, categories } from "@/lib/parts-data"
import Image from "next/image"
import { useCart } from "@/components/cart-provider"
import { getProductImage, getFallbackImage } from "@/lib/image-utils"

export function PartsCatalog() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const { addItem } = useCart()

  const filtered = useMemo(() => {
    return allProducts.filter((product) => {
      const matchesSearch =
        searchQuery === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.categoryName.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = activeCategory === "all" || product.category === activeCategory

      return matchesSearch && matchesCategory
    }).slice(0, 50)
  }, [searchQuery, activeCategory])

  return (
    <section id="parts" className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">Каталог товаров</h2>
          <p className="text-lg text-muted-foreground">
            Полный перечень сельскохозяйственной техники и оборудования
          </p>
        </div>
        <Card className="neon-border mx-auto max-w-7xl">
          <CardHeader className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
            <CardTitle className="text-2xl">Товары</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Поиск по наименованию или категории..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <div className="mb-4 flex flex-wrap gap-2">
              {categories.slice(0, 10).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                    activeCategory === cat.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-24">Фото</TableHead>
                    <TableHead>Категория</TableHead>
                    <TableHead>Наименование</TableHead>
                    <TableHead>Наличие</TableHead>
                    <TableHead className="w-24"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((product) => (
                    <TableRow key={product.id} className="hover:bg-primary/5 transition-colors">
                      <TableCell>
                        <div className="relative h-16 w-16 overflow-hidden rounded-lg border-2 border-primary/30 bg-muted shadow-lg">
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
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{product.categoryName}</TableCell>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>
                        <span className={`text-sm font-medium ${product.inStock ? "text-emerald-500" : "text-amber-500"}`}>
                          {product.inStock ? "В наличии" : "Под заказ"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-1 border-primary/50 bg-primary/10 hover:bg-primary/20 hover:scale-110 transition-all"
                          onClick={() => addItem(product)}
                        >
                          <ShoppingCart className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
