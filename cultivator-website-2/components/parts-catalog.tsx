"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, ShoppingCart } from "lucide-react"
import { kpu9Parts, kpu12Parts } from "@/lib/parts-data"
import Image from "next/image"
import { useCart } from "@/components/cart-provider"
import { getProductImage, getFallbackImage } from "@/lib/image-utils"

export function PartsCatalog() {
  const [searchQuery9, setSearchQuery9] = useState("")
  const [searchQuery12, setSearchQuery12] = useState("")
  const { addItem } = useCart()

  const filteredKpu9 = kpu9Parts.filter(
    (part) =>
      part.name.toLowerCase().includes(searchQuery9.toLowerCase()) ||
      part.partNumber.toLowerCase().includes(searchQuery9.toLowerCase()) ||
      part.article.toLowerCase().includes(searchQuery9.toLowerCase()),
  )

  const filteredKpu12 = kpu12Parts.filter(
    (part) =>
      part.name.toLowerCase().includes(searchQuery12.toLowerCase()) ||
      part.partNumber.toLowerCase().includes(searchQuery12.toLowerCase()) ||
      part.article.toLowerCase().includes(searchQuery12.toLowerCase()),
  )

  return (
    <section id="parts" className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">Каталог запасных частей</h2>
          <p className="text-lg text-muted-foreground">
            Полный перечень деталей для КПУ-9 и КПУ-12 с актуальными ценами
          </p>
        </div>
        <Card className="neon-border mx-auto max-w-7xl">
          <CardHeader className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
            <CardTitle className="text-2xl">Запасные части</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="kpu9" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="kpu9">КПУ-9</TabsTrigger>
                <TabsTrigger value="kpu12">КПУ-12</TabsTrigger>
              </TabsList>
              <TabsContent value="kpu9" className="mt-6">
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Поиск по наименованию, номеру детали или артикулу..."
                      value={searchQuery9}
                      onChange={(e) => setSearchQuery9(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-24">Фото</TableHead>
                        <TableHead>Артикул</TableHead>
                        <TableHead>Номер детали</TableHead>
                        <TableHead>Наименование</TableHead>
                        <TableHead className="text-right">Цена, руб.</TableHead>
                        <TableHead className="w-24"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredKpu9.map((part) => (
                        <TableRow key={part.id} className="hover:bg-primary/5 transition-colors">
                          <TableCell>
                            <div className="relative h-16 w-16 overflow-hidden rounded-lg border-2 border-primary/30 bg-muted shadow-lg">
                              <Image
                                src={getProductImage(part)}
                                alt={part.name}
                                fill
                                className="object-contain p-2"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement
                                  target.src = getFallbackImage()
                                }}
                              />
                            </div>
                          </TableCell>
                          <TableCell className="font-mono text-sm text-primary">{part.article}</TableCell>
                          <TableCell className="font-mono text-sm text-secondary">{part.partNumber}</TableCell>
                          <TableCell className="font-medium">{part.name}</TableCell>
                          <TableCell className="text-right font-bold text-accent">{part.price}</TableCell>
                          <TableCell>
                            <Button
                              size="sm"
                              variant="outline"
                              className="gap-1 border-primary/50 bg-primary/10 hover:bg-primary/20 hover:scale-110 transition-all"
                              onClick={() => addItem(part)}
                            >
                              <ShoppingCart className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              <TabsContent value="kpu12" className="mt-6">
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Поиск по наименованию, номеру детали или артикулу..."
                      value={searchQuery12}
                      onChange={(e) => setSearchQuery12(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-24">Фото</TableHead>
                        <TableHead>Артикул</TableHead>
                        <TableHead>Номер детали</TableHead>
                        <TableHead>Наименование</TableHead>
                        <TableHead className="text-right">Цена, руб.</TableHead>
                        <TableHead className="w-24"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredKpu12.map((part) => (
                        <TableRow key={part.id} className="hover:bg-primary/5 transition-colors">
                          <TableCell>
                            <div className="relative h-16 w-16 overflow-hidden rounded-lg border-2 border-primary/30 bg-muted shadow-lg">
                              <Image
                                src={getProductImage(part)}
                                alt={part.name}
                                fill
                                className="object-contain p-2"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement
                                  target.src = getFallbackImage()
                                }}
                              />
                            </div>
                          </TableCell>
                          <TableCell className="font-mono text-sm text-primary">{part.article}</TableCell>
                          <TableCell className="font-mono text-sm text-secondary">{part.partNumber}</TableCell>
                          <TableCell className="font-medium">{part.name}</TableCell>
                          <TableCell className="text-right font-bold text-accent">{part.price}</TableCell>
                          <TableCell>
                            <Button
                              size="sm"
                              variant="outline"
                              className="gap-1 border-primary/50 bg-primary/10 hover:bg-primary/20 hover:scale-110 transition-all"
                              onClick={() => addItem(part)}
                            >
                              <ShoppingCart className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
