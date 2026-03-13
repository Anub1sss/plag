"use client"

import { useState } from "react"
import Image from "next/image"
import { Search, ShoppingCart, User, Menu, Sun, Moon, Bell, X, Heart, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "@/components/cart-provider"
import { useTheme } from "@/lib/theme-context"
import { useRouter } from "next/navigation"
import { DeliveryModal } from "@/components/delivery-modal"
import { CallbackModal } from "@/components/callback-modal"

interface HeaderProps {
  onCartOpen: () => void
  onProfileOpen: () => void
  onNotificationsOpen?: () => void
  notificationsCount?: number
}

export function Header({ onCartOpen, onProfileOpen, onNotificationsOpen, notificationsCount = 0 }: HeaderProps) {
  const { items, favorites } = useCart()
  const { theme, toggleTheme } = useTheme()
  const router = useRouter()
  const [searchOpen, setSearchOpen] = useState(false)
  const [deliveryOpen, setDeliveryOpen] = useState(false)
  const [callbackOpen, setCallbackOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/catalog?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setSearchQuery("")
    }
  }

  const isDark = theme === "dark"

  return (
    <>
      <header className="sticky top-0 z-40 glass-strong border-b border-white/[0.06]">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <a href="/" className="flex items-center gap-2 transition-transform hover:scale-[1.02]">
            <Image
              src="/logo.png"
              alt="Плодородие-Агро"
              width={140}
              height={40}
              className="h-10 w-auto object-contain"
              priority
            />
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {[
              { href: "/", label: "Главная" },
              { href: "/catalog", label: "Каталог" },
              { href: "/about", label: "О компании" },
              { href: "/delivery", label: "Доставка" },
              { href: "#contact", label: "Контакты" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative px-3 py-2 text-sm text-muted-foreground transition-all hover:text-foreground group"
              >
                {link.label}
                <span className="absolute inset-x-1 -bottom-[1px] h-[2px] scale-x-0 rounded-full bg-primary transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
            <button
              onClick={() => setCallbackOpen(true)}
              className="ml-2 flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-all hover:bg-primary/20 hover:shadow-[0_0_20px_oklch(0.62_0.19_150/0.15)] btn-glow"
            >
              <Phone className="h-3.5 w-3.5" />
              Обратный звонок
            </button>
          </nav>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="hidden h-9 w-9 rounded-full transition-all hover:bg-primary/10 md:flex"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(true)}
              className="hidden h-9 w-9 rounded-full transition-all hover:bg-primary/10 md:flex"
            >
              <Search className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/favorites")}
              className="relative hidden h-9 w-9 rounded-full transition-all hover:bg-primary/10 md:flex"
            >
              <Heart className="h-4 w-4" />
              {favorites.length > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-[0_0_8px_rgba(239,68,68,0.5)]">
                  {favorites.length}
                </span>
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onNotificationsOpen}
              className="relative hidden h-9 w-9 rounded-full transition-all hover:bg-primary/10 md:flex"
            >
              <Bell className="h-4 w-4" />
              {notificationsCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground shadow-[0_0_8px_oklch(0.65_0.16_85/0.5)]">
                  {notificationsCount}
                </span>
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onProfileOpen}
              className="hidden h-9 w-9 rounded-full transition-all hover:bg-primary/10 md:flex"
            >
              <User className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onCartOpen}
              className="relative h-9 w-9 rounded-full transition-all hover:bg-primary/10"
            >
              <ShoppingCart className="h-4 w-4" />
              {totalItems > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground shadow-[0_0_8px_oklch(0.62_0.19_150/0.5)]">
                  {totalItems}
                </span>
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(true)}
              className="h-9 w-9 rounded-full md:hidden"
            >
              <Search className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="h-9 w-9 rounded-full md:hidden"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-24"
          onClick={() => setSearchOpen(false)}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
          <div
            className="relative w-full max-w-2xl rounded-2xl glass-strong shadow-2xl shadow-black/30 animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handleSearch} className="flex items-center gap-3 p-5">
              <Search className="h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Поиск товаров..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 border-0 bg-transparent text-lg focus-visible:ring-0 focus-visible:ring-offset-0"
                autoFocus
              />
              <Button type="submit" size="sm" className="rounded-full btn-glow">
                Найти
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => {
                  setSearchOpen(false)
                  setSearchQuery("")
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className="absolute right-0 top-16 w-72 glass-strong rounded-bl-2xl shadow-2xl animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="flex flex-col p-4 space-y-1">
              {[
                { href: "/", label: "Главная" },
                { href: "/catalog", label: "Каталог" },
                { href: "/about", label: "О компании" },
                { href: "/delivery", label: "Доставка и оплата" },
                { href: "#contact", label: "Контакты" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2.5 rounded-xl text-sm text-muted-foreground hover:bg-primary/10 hover:text-foreground transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="my-2 section-glow-line" />
              <button
                onClick={() => {
                  setCallbackOpen(true)
                  setMobileMenuOpen(false)
                }}
                className="px-4 py-2.5 rounded-xl text-sm text-primary hover:bg-primary/10 transition-all text-left flex items-center gap-2"
              >
                <Phone className="h-4 w-4" />
                Обратный звонок
              </button>
              <a
                href="/favorites"
                className="px-4 py-2.5 rounded-xl text-sm text-muted-foreground hover:bg-primary/10 hover:text-foreground transition-all flex items-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Heart className="h-4 w-4" />
                Избранное {favorites.length > 0 && `(${favorites.length})`}
              </a>
              <button
                onClick={() => {
                  onProfileOpen()
                  setMobileMenuOpen(false)
                }}
                className="px-4 py-2.5 rounded-xl text-sm text-muted-foreground hover:bg-primary/10 hover:text-foreground transition-all text-left flex items-center gap-2"
              >
                <User className="h-4 w-4" />
                Личный кабинет
              </button>
              <button
                onClick={() => {
                  onCartOpen()
                  setMobileMenuOpen(false)
                }}
                className="px-4 py-2.5 rounded-xl text-sm text-muted-foreground hover:bg-primary/10 hover:text-foreground transition-all text-left flex items-center gap-2"
              >
                <ShoppingCart className="h-4 w-4" />
                Корзина {totalItems > 0 && `(${totalItems})`}
              </button>
            </nav>
          </div>
        </div>
      )}

      <DeliveryModal open={deliveryOpen} onClose={() => setDeliveryOpen(false)} />
      <CallbackModal open={callbackOpen} onClose={() => setCallbackOpen(false)} />
    </>
  )
}
