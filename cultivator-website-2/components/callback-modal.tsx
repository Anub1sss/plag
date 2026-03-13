"use client"

import { useState } from "react"
import { X, Phone, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/lib/auth-context"

interface CallbackModalProps {
  open: boolean
  onClose: () => void
}

export function CallbackModal({ open, onClose }: CallbackModalProps) {
  const { submitCallback, user } = useAuth()
  const [name, setName] = useState(user ? `${user.firstName} ${user.lastName}` : "")
  const [phone, setPhone] = useState(user?.phone || "")
  const [message, setMessage] = useState("")
  const [submitted, setSubmitted] = useState(false)

  if (!open) return null

  const handleSubmit = () => {
    if (!name.trim() || !phone.trim()) return
    submitCallback(name.trim(), phone.trim(), message.trim() || undefined)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setName("")
      setPhone("")
      setMessage("")
      onClose()
    }, 2000)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
      <div
        className="relative w-full max-w-md rounded-3xl glass-strong shadow-2xl shadow-black/30 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/[0.06] p-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
              <Phone className="h-4 w-4 text-primary" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Обратный звонок</h2>
          </div>
          <button onClick={onClose} className="rounded-full p-2 hover:bg-primary/10 transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-5">
          {submitted ? (
            <div className="flex flex-col items-center py-8">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
                <CheckCircle2 className="h-8 w-8 text-emerald-500" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">Заявка отправлена!</h3>
              <p className="text-center text-sm text-muted-foreground">
                Мы свяжемся с вами в ближайшее время
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Оставьте свои данные и мы перезвоним вам в ближайшее время
              </p>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Имя *</label>
                <Input
                  placeholder="Ваше имя"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-11"
                  maxLength={200}
                  autoComplete="name"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Телефон *</label>
                <Input
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/[^\d\s+\-()]/g, ""))}
                  className="h-11"
                  maxLength={30}
                  autoComplete="tel"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Сообщение</label>
                <textarea
                  placeholder="Опишите ваш вопрос (необязательно)"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  rows={3}
                  maxLength={1000}
                />
              </div>

              <Button
                className="w-full h-11 rounded-xl btn-glow"
                onClick={handleSubmit}
                disabled={!name.trim() || !phone.trim()}
              >
                <Phone className="mr-2 h-4 w-4" />
                Заказать звонок
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
