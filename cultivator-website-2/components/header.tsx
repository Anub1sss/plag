"use client"

import { useState } from "react"
import Image from "next/image"
import { Search, ShoppingCart, User, Menu, Sun, Moon, Bell, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "@/components/cart-provider"
import { useTheme } from "@/lib/theme-context"
import { useRouter } from "next/navigation"
import { DeliveryModal } from "@/components/delivery-modal"

interface HeaderProps {
  onCartOpen: () => void
  onProfileOpen: () => void
  onNotificationsOpen?: () => void
  notificationsCount?: number
}

export function Header({ onCartOpen, onProfileOpen, onNotificationsOpen, notificationsCount = 0 }: HeaderProps) {
  const { items } = useCart()
  const { theme, toggleTheme } = useTheme()
  const router = useRouter()
  const [searchOpen, setSearchOpen] = useState(false)
  const [deliveryOpen, setDeliveryOpen] = useState(false)
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

  const handleThemeToggle = () => {
    toggleTheme()
  }

  const isDark = theme === "dark"

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-lg">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10">
              <Image
                src="/placeholder-logo.svg"
                alt="АгроЗапчасти"
                fill
                className="object-contain"
              />
            </div>
            <div className="shimmer-text text-xl font-bold tracking-tight">АгроЗапчасти</div>
          </div>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 md:flex">
            <a href="/" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Главная
            </a>
            <a href="/catalog" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Каталог
            </a>
            <button
              onClick={() => setDeliveryOpen(true)}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Доставка
            </button>
            <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Контакты
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={handleThemeToggle} className="hidden md:flex">
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
            <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)} className="hidden md:flex">
              <Search className="h-5 w-5" />
            </Button>
          <Button variant="ghost" size="icon" onClick={onNotificationsOpen} className="relative hidden md:flex">
            <Bell className="h-5 w-5" />
            {notificationsCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                {notificationsCount}
              </span>
            )}
          </Button>
          <Button variant="ghost" size="icon" onClick={onProfileOpen} className="hidden md:flex">
            <User className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onCartOpen} className="relative">
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {totalItems}
              </span>
            )}
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)} className="md:hidden">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>

    {/* Search Modal */}
    {searchOpen && (
      <div
        className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 p-4 backdrop-blur-sm pt-24"
        onClick={() => setSearchOpen(false)}
      >
        <div
          className="w-full max-w-2xl rounded-2xl bg-card shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <form onSubmit={handleSearch} className="flex items-center gap-2 p-4">
            <Search className="h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Поиск товаров..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 border-0 bg-transparent text-lg focus-visible:ring-0 focus-visible:ring-offset-0"
              autoFocus
            />
            <Button type="submit" size="sm">
              Найти
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => {
                setSearchOpen(false)
                setSearchQuery("")
              }}
            >
              <X className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </div>
    )}

    {/* Mobile Menu */}
    {mobileMenuOpen && (
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden" onClick={() => setMobileMenuOpen(false)}>
        <div
          className="absolute right-0 top-16 w-64 bg-card border-l border-border shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <nav className="flex flex-col p-4 space-y-2">
            <a
              href="/"
              className="px-4 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Главная
            </a>
            <a
              href="/catalog"
              className="px-4 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Каталог
            </a>
            <button
              onClick={() => {
                setDeliveryOpen(true)
                setMobileMenuOpen(false)
              }}
              className="px-4 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors text-left"
            >
              Доставка
            </button>
            <button
              onClick={() => {
                onProfileOpen()
                setMobileMenuOpen(false)
              }}
              className="px-4 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors text-left"
            >
              Личный кабинет
            </button>
            <button
              onClick={() => {
                onCartOpen()
                setMobileMenuOpen(false)
              }}
              className="px-4 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors text-left"
            >
              Корзина {totalItems > 0 && `(${totalItems})`}
            </button>
          </nav>
        </div>
      </div>
    )}

    {/* Delivery Modal */}
    <DeliveryModal open={deliveryOpen} onClose={() => setDeliveryOpen(false)} />
    </>
  )
}
