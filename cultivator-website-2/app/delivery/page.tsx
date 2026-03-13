import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Truck, CreditCard, MapPin, Clock, Package } from "lucide-react"

export const metadata: Metadata = {
  title: "Доставка и оплата",
  description:
    "Условия доставки и оплаты сельскохозяйственной техники от ООО «Плодородие-Агро». Доставка по всей России, самовывоз из Курска.",
}

const deliveryMethods = [
  { icon: Truck, title: "Собственный транспорт", text: "Доставка в пределах Курской области. Срок доставки от 3 до 10 дней." },
  { icon: Package, title: "Транспортные компании", text: "Доставка ТК «ПЭК» и «Деловые Линии». Сроки и цены зависят от объёма заказа и тарифов ТК." },
  { icon: MapPin, title: "Самовывоз", text: "Со склада по адресу: Курск, п. Беседино, ул. Соловьиная, 102. Время работы: 09:00–18:00 (без перерыва и выходных)." },
  { icon: Package, title: "Почта России", text: "Доставка Почтой России для небольших заказов и запчастей." },
]

const regions = [
  "Центральный федеральный округ",
  "Южный федеральный округ",
  "Северо-Западный федеральный округ",
  "Дальневосточный федеральный округ",
  "Сибирский федеральный округ",
  "Уральский федеральный округ",
  "Приволжский федеральный округ",
  "Северо-Кавказский федеральный округ",
]

export default function DeliveryPage() {
  return (
    <div className="min-h-screen bg-background grain-overlay pb-24">
      <header className="sticky top-0 z-40 glass-strong border-b border-white/[0.06]">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground group">
            <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
            <span>На главную</span>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-12">
        <h1 className="shimmer-text mb-8 text-3xl font-bold md:text-4xl">Доставка и оплата</h1>

        <div className="mb-8 rounded-2xl border border-amber-500/15 bg-amber-500/[0.03] p-5 backdrop-blur-sm">
          <p className="text-sm font-medium text-amber-600 dark:text-amber-400">
            Доставка осуществляется только по предоплате.
          </p>
        </div>

        <h2 className="mb-6 text-2xl font-bold text-foreground">Способы доставки</h2>
        <div className="mb-14 grid gap-4 sm:grid-cols-2">
          {deliveryMethods.map((m, i) => (
            <div key={i} className="glow-card rounded-2xl border border-border/20 bg-card/30 p-5 backdrop-blur-sm">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <m.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">{m.title}</h3>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{m.text}</p>
            </div>
          ))}
        </div>

        <h2 className="mb-6 text-2xl font-bold text-foreground">Способы оплаты</h2>
        <div className="mb-14 rounded-2xl border border-border/20 bg-card/30 p-6 backdrop-blur-sm">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <CreditCard className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="mb-2 font-semibold text-foreground">Безналичный расчёт</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Товар отправляется только после предоплаты. Возможна частичная оплата с внесением платежей до и после факта поставки.
              </p>
            </div>
          </div>
        </div>

        <h2 className="mb-6 text-2xl font-bold text-foreground">Регионы доставки</h2>
        <div className="mb-14 rounded-2xl border border-border/20 bg-card/30 p-6 backdrop-blur-sm">
          <p className="mb-5 text-sm text-muted-foreground">Доставка по всей территории Российской Федерации:</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {regions.map((r, i) => (
              <div key={i} className="flex items-center gap-2.5 rounded-xl bg-primary/[0.04] px-4 py-3 transition-colors hover:bg-primary/[0.08]">
                <MapPin className="h-4 w-4 flex-shrink-0 text-primary/70" />
                <span className="text-sm font-medium text-foreground">{r}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-primary/15 bg-primary/[0.04] p-6 backdrop-blur-sm">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="mb-2 font-semibold text-foreground">Самовывоз со склада</h3>
              <p className="text-sm text-muted-foreground">г. Курск, п. Беседино, ул. Соловьиная, 102</p>
              <p className="text-sm text-muted-foreground">Время работы: 09:00–18:00 (без перерыва и выходных)</p>
              <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
                <a href="tel:+74712745900" className="text-primary hover:underline">+7 (4712) 74-59-00</a>
                <a href="tel:88001015046" className="text-primary hover:underline">8-800-101-50-46</a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
