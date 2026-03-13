import { Mail, Phone, MapPin, Truck, CreditCard, Shield, PhoneCall } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer id="contact" className="relative border-t border-border/30">
      {/* Gradient accent line */}
      <div className="section-glow-line" />

      <div className="bg-gradient-to-b from-muted/20 to-background py-14">
        <div className="container mx-auto px-4">
          {/* Features row */}
          <div className="mb-12 grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              { icon: Truck, title: "Быстрая доставка", desc: "По всей России" },
              { icon: CreditCard, title: "Удобная оплата", desc: "Безналичный расчёт" },
              { icon: Shield, title: "Надёжный поставщик", desc: "С 2009 года на рынке" },
            ].map((feature) => (
              <div
                key={feature.title}
                className="glow-card flex items-center gap-4 rounded-2xl border border-border/30 bg-card/40 p-5 backdrop-blur-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <feature.icon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-10 md:grid-cols-4">
            <div className="md:col-span-2">
              <h3 className="shimmer-text mb-4 text-xl font-bold">Плодородие-Агро</h3>
              <p className="mb-6 max-w-md text-sm leading-relaxed text-muted-foreground">
                ООО «Плодородие-Агро» — надёжный поставщик сельскохозяйственной навесной и прицепной техники.
                Работаем с 2009 года, доставка по всей России.
              </p>
              <div className="space-y-3 text-sm">
                {[
                  { icon: Phone, content: <a href="tel:+74712745900" className="transition-colors hover:text-primary">+7 (4712) 74-59-00</a> },
                  { icon: Phone, content: <><a href="tel:88001015046" className="transition-colors hover:text-primary">8-800-101-50-46</a><span className="text-muted-foreground/50 text-xs ml-2">(бесплатно)</span></> },
                  { icon: Mail, content: <a href="mailto:plagro@yandex.ru" className="transition-colors hover:text-primary">plagro@yandex.ru</a> },
                  { icon: MapPin, content: <span>г. Курск, п. Беседино, ул. Соловьиная, 102</span> },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-muted-foreground">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/5">
                      <item.icon className="h-4 w-4 text-primary/70" />
                    </div>
                    {item.content}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-foreground/80">Навигация</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {[
                  { href: "/", label: "Главная" },
                  { href: "/catalog", label: "Каталог техники" },
                  { href: "/about", label: "О компании" },
                  { href: "/delivery", label: "Доставка и оплата" },
                  { href: "#contact", label: "Контакты" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="transition-colors hover:text-primary">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-foreground/80">Информация</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <Link href="/privacy" className="transition-colors hover:text-primary">Политика конфиденциальности</Link>
                </li>
                <li>
                  <Link href="/favorites" className="transition-colors hover:text-primary">Избранное</Link>
                </li>
              </ul>
            </div>
          </div>

          {/* CTA box */}
          <div className="mt-10 rounded-2xl border border-amber-500/15 bg-amber-500/[0.03] p-5 backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-amber-500/10">
                <PhoneCall className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div className="text-sm text-amber-700 dark:text-amber-400">
                <p className="font-semibold">Как сделать заказ</p>
                <p className="mt-1 leading-relaxed text-amber-600/80 dark:text-amber-400/80">
                  Цены на сайте примерные. Для уточнения стоимости и оформления заказа свяжитесь с менеджером
                  через обратную связь — он поможет подобрать нужные запчасти и сообщит актуальный прайс.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-10 flex flex-col items-center gap-3 border-t border-border/20 pt-6 sm:flex-row sm:justify-between">
            <p className="text-sm text-muted-foreground/60">
              &copy; {new Date().getFullYear()} ООО «Плодородие-Агро». Все права защищены.
            </p>
            <a href="/admin" className="text-xs text-muted-foreground/30 transition-colors hover:text-muted-foreground/60">
              Панель управления
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
