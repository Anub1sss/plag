"use client"

import { useState } from "react"
import { Heart, ArrowLeft, Search, Grid2X2, List, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "@/components/cart-provider"
import { ProductCard } from "@/components/product-card"
import { CartDrawer } from "@/components/cart-drawer"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProfileModal } from "@/components/profile-modal"
import { NotificationsModal } from "@/components/notifications-modal"
import { BottomNav } from "@/components/bottom-nav"
import Link from "next/link"

export default function FavoritesPage() {
  const { favorites } = useCart()
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [cartOpen, setCartOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  const filtered = favorites.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <>
      <main className="min-h-screen pb-20">
        <Header
          onCartOpen={() => setCartOpen(true)}
          onProfileOpen={() => setProfileOpen(true)}
          onNotificationsOpen={() => setNotificationsOpen(true)}
          notificationsCount={0}
        />

        <div className="container mx-auto px-4 py-6">
          <div className="mb-6 flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Избранное</h1>
              <p className="text-sm text-muted-foreground">
                {favorites.length}{" "}
                {favorites.length === 1
                  ? "товар"
                  : favorites.length < 5
                    ? "товара"
                    : "товаров"}
              </p>
            </div>
          </div>

          {favorites.length > 0 && (
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative max-w-sm flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Поиск в избранном..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="flex items-center gap-1 rounded-lg border border-border p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid2X2 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {favorites.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24">
              <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-muted">
                <Heart className="h-12 w-12 text-muted-foreground/40" />
              </div>
              <h2 className="mb-2 text-xl font-semibold text-foreground">
                В избранном пока пусто
              </h2>
              <p className="mb-6 max-w-sm text-center text-muted-foreground">
                Добавляйте понравившиеся товары в избранное, нажимая на сердечко
              </p>
              <Link href="/catalog">
                <Button>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Перейти в каталог
                </Button>
              </Link>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Search className="mb-4 h-12 w-12 text-muted-foreground/40" />
              <p className="text-muted-foreground">Ничего не найдено</p>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>

        <Footer />
      </main>

      <BottomNav
        activeTab="favorites"
        onTabChange={() => {}}
        onCartOpen={() => setCartOpen(true)}
        onProfileOpen={() => setProfileOpen(true)}
        onFavoritesOpen={() => {}}
      />

      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
      <ProfileModal open={profileOpen} onClose={() => setProfileOpen(false)} />
      <NotificationsModal isOpen={notificationsOpen} onClose={() => setNotificationsOpen(false)} />
    </>
  )
}
