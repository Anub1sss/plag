"use client"

import { X, Truck, MapPin, Clock, Package, CreditCard, Shield, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DeliveryModalProps {
  open: boolean
  onClose: () => void
}

export function DeliveryModal({ open, onClose }: DeliveryModalProps) {
  if (!open) return null

  const deliveryOptions = [
    {
      title: "Курьерская доставка по Москве",
      time: "1-2 рабочих дня",
      price: "Бесплатно при заказе от 10 000 ₽",
      description: "Доставка до двери в пределах МКАД",
    },
    {
      title: "Самовывоз",
      time: "В день заказа",
      price: "Бесплатно",
      description: "Пункт выдачи: г. Москва, ул. Промышленная, д. 15",
    },
    {
      title: "Доставка по России",
      time: "3-7 рабочих дней",
      price: "От 500 ₽",
      description: "Транспортными компаниями: СДЭК, ПЭК, Деловые Линии",
    },
    {
      title: "Экспресс-доставка",
      time: "1-3 рабочих дня",
      price: "От 1 500 ₽",
      description: "Быстрая доставка по всей России",
    },
  ]

  const paymentMethods = [
    { icon: CreditCard, title: "Банковской картой", description: "Онлайн оплата на сайте" },
    { icon: Shield, title: "Наложенный платеж", description: "Оплата при получении" },
    { icon: CreditCard, title: "Банковский перевод", description: "Для юридических лиц" },
  ]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-card p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Truck className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Доставка и оплата</h2>
              <p className="text-sm text-muted-foreground">Условия доставки по всей России</p>
            </div>
          </div>
          <button onClick={onClose} className="rounded-full p-2 hover:bg-muted">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Delivery Options */}
          <section>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              Способы доставки
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              {deliveryOptions.map((option, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-border bg-muted/30 p-5 space-y-3 hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <h4 className="font-semibold text-foreground">{option.title}</h4>
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 ml-2" />
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{option.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-primary">
                    <MapPin className="h-4 w-4" />
                    <span>{option.price}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{option.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Payment Methods */}
          <section>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              Способы оплаты
            </h3>
            <div className="grid gap-4 md:grid-cols-3">
              {paymentMethods.map((method, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center rounded-xl border border-border bg-muted/30 p-5 space-y-3"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <method.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground">{method.title}</h4>
                  <p className="text-sm text-muted-foreground">{method.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Additional Info */}
          <section className="rounded-xl border border-border bg-primary/5 p-6 space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Важная информация
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Бесплатная доставка при заказе от 50 000 ₽ по всей России</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Отслеживание заказа доступно в личном кабинете</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Возможность возврата товара в течение 14 дней</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Гарантия на все товары от производителя</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Упаковка товаров соответствует требованиям перевозки</span>
              </li>
            </ul>
          </section>

          {/* Contact */}
          <section className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Вопросы по доставке?</p>
            <p className="text-lg font-semibold text-foreground">+7 (800) 123-45-67</p>
            <p className="text-sm text-muted-foreground">Звонок бесплатный</p>
          </section>
        </div>
      </div>
    </div>
  )
}
