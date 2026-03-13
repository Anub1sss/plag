"use client"

import { useRouter } from "next/navigation"
import { Home, Grid2X2, ShoppingCart, Heart, User } from "lucide-react"
import { useCart } from "@/components/cart-provider"

interface BottomNavProps {
  activeTab: string
  onTabChange: (tab: string) => void
  onCartOpen: () => void
  onProfileOpen: () => void
  onFavoritesOpen: () => void
}

export function BottomNav({ activeTab, onTabChange, onCartOpen, onFavoritesOpen }: BottomNavProps) {
  const { items, favorites } = useCart()
  const router = useRouter()
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  const navItems = [
    { id: "home", icon: Home, label: "Главная", action: () => onTabChange("home") },
    { id: "catalog", icon: Grid2X2, label: "Каталог", action: () => router.push("/catalog") },
    { id: "cart", icon: ShoppingCart, label: "Корзина", badge: totalItems, action: onCartOpen },
    { id: "favorites", icon: Heart, label: "Избранное", badge: favorites.length, action: () => router.push("/favorites") },
    { id: "profile", icon: User, label: "Профиль", action: () => router.push("/profile") },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur-lg">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={item.action}
            className={`relative flex flex-col items-center gap-1 px-4 py-2 transition-colors ${
              activeTab === item.id ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <div className="relative">
              <item.icon className="h-6 w-6" />
              {item.badge !== undefined && item.badge > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-xs">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}
