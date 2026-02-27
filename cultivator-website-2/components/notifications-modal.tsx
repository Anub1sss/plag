"use client"

import { X, Package, Percent, Bell, Truck, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NotificationsModalProps {
  isOpen: boolean
  onClose: () => void
}

const notifications = [
  {
    id: 1,
    type: "order",
    icon: Package,
    title: "Заказ отправлен",
    message: "Ваш заказ #12345 передан в службу доставки",
    time: "2 часа назад",
    read: false,
  },
  {
    id: 2,
    type: "promo",
    icon: Percent,
    title: "Скидка 15%",
    message: "На все запчасти для культиваторов до конца недели",
    time: "5 часов назад",
    read: false,
  },
  {
    id: 3,
    type: "delivery",
    icon: Truck,
    title: "Доставка завтра",
    message: "Заказ #12340 будет доставлен завтра с 10:00 до 18:00",
    time: "1 день назад",
    read: true,
  },
  {
    id: 4,
    type: "system",
    icon: Bell,
    title: "Новые поступления",
    message: "В каталог добавлены запчасти для сеялок",
    time: "2 дня назад",
    read: true,
  },
]

export function NotificationsModal({ isOpen, onClose }: NotificationsModalProps) {
  if (!isOpen) return null

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-border bg-card shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border p-4">
          <div>
            <h2 className="text-lg font-semibold">Уведомления</h2>
            {unreadCount > 0 && <p className="text-sm text-muted-foreground">{unreadCount} непрочитанных</p>}
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Notifications list */}
        <div className="max-h-96 overflow-y-auto">
          {notifications.map((notification) => {
            const Icon = notification.icon
            return (
              <div
                key={notification.id}
                className={`flex gap-4 border-b border-border p-4 transition-colors hover:bg-muted/50 ${
                  !notification.read ? "bg-primary/5" : ""
                }`}
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                    notification.type === "promo"
                      ? "bg-accent/20 text-accent"
                      : notification.type === "order"
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-medium">{notification.title}</p>
                    {!notification.read && <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{notification.message}</p>
                  <p className="mt-2 text-xs text-muted-foreground">{notification.time}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Footer */}
        <div className="border-t border-border p-4">
          <Button variant="ghost" className="w-full justify-center gap-2">
            <Check className="h-4 w-4" />
            Отметить все как прочитанные
          </Button>
        </div>
      </div>
    </div>
  )
}
