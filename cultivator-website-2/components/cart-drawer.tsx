"use client"

import { useState } from "react"
import Image from "next/image"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-provider"
import { useAuth } from "@/lib/auth-context"
import { getProductImage, getFallbackImage } from "@/lib/image-utils"
import { Minus, Plus, Trash2, ShoppingBag, CheckCircle2, Mail } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface CartDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const { items, updateQuantity, removeItem, clearCart, total } = useCart()
  const { user, isAuthenticated, createOrder, getProductPrice } = useAuth()
  const [orderPlaced, setOrderPlaced] = useState(false)

  const handleCheckout = () => {
    if (items.length === 0) return

    const email = user?.email || "customer@example.com"
    createOrder(items, total, email)
    clearCart()
    setOrderPlaced(true)

    setTimeout(() => {
      setOrderPlaced(false)
      onOpenChange(false)
    }, 5000)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col border-l-border/20 bg-background/95 backdrop-blur-xl sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="text-xl">Корзина</SheetTitle>
        </SheetHeader>

        {orderPlaced && (
          <Alert className="mx-4 mt-4 border-green-500 bg-green-50 dark:bg-green-950/20">
            <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
            <AlertTitle className="text-green-800 dark:text-green-200">Заказ оформлен!</AlertTitle>
            <AlertDescription className="text-green-700 dark:text-green-300">
              <div className="flex items-center gap-2 mt-1">
                <Mail className="h-4 w-4" />
                <span>Информация отправлена на почту {user?.email || "указанную при регистрации"}</span>
              </div>
            </AlertDescription>
          </Alert>
        )}

        <div className="flex flex-1 flex-col overflow-hidden">
          {items.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center py-12 text-center">
              <ShoppingBag className="mb-4 h-16 w-16 text-muted-foreground/30" />
              <p className="text-lg text-muted-foreground">Корзина пуста</p>
              <p className="text-sm text-muted-foreground">Добавьте товары из каталога</p>
            </div>
          ) : (
            <>
              <div className="flex-1 space-y-3 overflow-y-auto py-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 rounded-xl border border-border bg-muted/30 p-3">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                      <Image
                        src={getProductImage(item)}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="h-full w-full object-contain p-2"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = getFallbackImage()
                        }}
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <h3 className="text-sm font-medium leading-tight text-foreground">{item.name}</h3>
                          <p className="text-xs text-muted-foreground">{item.categoryName}</p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-lg border border-border bg-background transition-colors hover:bg-muted"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-7 text-center text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-lg border border-border bg-background transition-colors hover:bg-muted"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        {(() => {
                          const p = getProductPrice(item.id, item.price)
                          return p ? (
                            <span className="text-sm font-medium text-foreground">~ {p.toLocaleString("ru-RU")} ₽</span>
                          ) : (
                            <span className="text-sm text-muted-foreground">x{item.quantity}</span>
                          )
                        })()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <SheetFooter className="flex-col gap-3 border-t border-border pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Товаров:</span>
                  <span className="text-xl font-bold text-foreground">{total} шт.</span>
                </div>
                {items.some(i => getProductPrice(i.id, i.price)) && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Примерная сумма:</span>
                    <span className="text-lg font-semibold text-foreground">
                      ~ {items.reduce((sum, i) => sum + (getProductPrice(i.id, i.price) || 0) * i.quantity, 0).toLocaleString("ru-RU")} ₽
                    </span>
                  </div>
                )}
                <p className="text-xs text-amber-600 dark:text-amber-400 text-center">
                  Цены примерные. Итоговую стоимость уточнит менеджер после оформления заявки.
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={clearCart}
                    disabled={orderPlaced}
                  >
                    Очистить
                  </Button>
                  <Button className="flex-1" onClick={handleCheckout} disabled={orderPlaced || items.length === 0}>
                    {orderPlaced ? "Заказ оформлен" : "Оформить заявку"}
                  </Button>
                </div>
              </SheetFooter>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
