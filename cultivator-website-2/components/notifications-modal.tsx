"use client"

import { X, Package, Bell, Check, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"

interface NotificationsModalProps {
  isOpen: boolean
  onClose: () => void
}

const typeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  order: Package,
  promotion: Bell,
  system: Bell,
}

const typeColors: Record<string, string> = {
  order: "bg-primary/20 text-primary",
  promotion: "bg-amber-500/20 text-amber-600",
  system: "bg-muted text-muted-foreground",
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return "только что"
  if (mins < 60) return `${mins} мин. назад`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours} ч. назад`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days} дн. назад`
  return new Date(dateStr).toLocaleDateString("ru-RU")
}

export function NotificationsModal({ isOpen, onClose }: NotificationsModalProps) {
  const { notifications, markNotificationRead, isAuthenticated } = useAuth()

  if (!isOpen) return null

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAllRead = () => {
    notifications.forEach((n) => {
      if (!n.read) markNotificationRead(n.id)
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-3xl glass-strong shadow-2xl shadow-black/30 animate-slide-up">
        <div className="flex items-center justify-between border-b border-white/[0.06] p-5">
          <div>
            <h2 className="text-lg font-semibold">Уведомления</h2>
            {unreadCount > 0 && <p className="text-sm text-muted-foreground">{unreadCount} непрочитанных</p>}
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {!isAuthenticated ? (
            <div className="flex flex-col items-center justify-center py-12 text-center px-4">
              <Bell className="mb-3 h-12 w-12 text-muted-foreground/30" />
              <p className="text-muted-foreground">Войдите в аккаунт, чтобы видеть уведомления</p>
            </div>
          ) : notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center px-4">
              <Bell className="mb-3 h-12 w-12 text-muted-foreground/30" />
              <p className="text-muted-foreground">Уведомлений пока нет</p>
              <p className="mt-1 text-xs text-muted-foreground">Они появятся при оформлении заказов</p>
            </div>
          ) : (
            notifications.map((notification) => {
              const Icon = typeIcons[notification.type] || Bell
              const color = typeColors[notification.type] || typeColors.system
              return (
                <div
                  key={notification.id}
                  className={`flex gap-4 border-b border-border p-4 transition-colors hover:bg-muted/50 cursor-pointer ${
                    !notification.read ? "bg-primary/5" : ""
                  }`}
                  onClick={() => { if (!notification.read) markNotificationRead(notification.id) }}
                >
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-medium text-foreground">{notification.title}</p>
                      {!notification.read && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{notification.message}</p>
                    <p className="mt-2 text-xs text-muted-foreground">{timeAgo(notification.date)}</p>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {isAuthenticated && notifications.length > 0 && (
          <div className="border-t border-border p-4">
            <Button variant="ghost" className="w-full justify-center gap-2" onClick={markAllRead} disabled={unreadCount === 0}>
              <Check className="h-4 w-4" />
              {unreadCount === 0 ? "Все прочитаны" : "Отметить все как прочитанные"}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
