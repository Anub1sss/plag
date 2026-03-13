import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Truck, Users, Building2, BadgeRussianRuble, FileCheck, Handshake, Clock, Star } from "lucide-react"

export const metadata: Metadata = {
  title: "О компании Плодородие-Агро",
  description:
    "ООО «Плодородие-Агро» — надёжный поставщик сельскохозяйственной техники с 2009 года. Работаем по всей России. Курск, п. Беседино.",
}

const advantages = [
  { icon: Users, title: "Профессиональная команда", text: "Наш коллектив состоит из профессиональных сотрудников, которые с радостью помогут в интересующих вопросах. Инженер сервиса подскажет, каким образом функционируют различные агрегаты." },
  { icon: Truck, title: "Собственный автопарк", text: "Для доставки грузов клиентам в нашем автопарке находятся 4 грузовых автомобиля." },
  { icon: Building2, title: "Выставочный зал", text: "В 2014 году предприятие переехало в большой офис с выставочным залом для презентации существующих новинок сельхозтехники." },
  { icon: BadgeRussianRuble, title: "Цены ниже рыночных", text: "Наши цены ниже рыночных — экономия достигается за счёт перевозки продукции собственным транспортом." },
  { icon: FileCheck, title: "Прозрачные условия", text: "Подбираем технику по заявке клиента, заключаем договор, получаем предоплату или полный расчёт, после чего незамедлительно отправляем продукцию." },
  { icon: Handshake, title: "Честные цены", text: "Мы следим за имиджем честного поставщика — наша цена не накручена изначально, чтобы потом делать скидки до 50%." },
  { icon: Clock, title: "Реальные сроки", text: "Компания не обещает того, чего нельзя выполнить — назначаем реальные сроки поставки техники." },
  { icon: Star, title: "Индивидуальный подход", text: "Наши клиенты оставляют положительные отзывы не только за добросовестное исполнение обязательств, но и за индивидуальный подход к каждому." },
]

const partners = [
  "Бобруйскагромаш",
  "КОМЗ-Экспорт Tigarbo",
  "Завод автотехнологий",
  "БДТ-Агро",
  "ЗАО ПК Ярославич",
  "Сельсельмаш",
]

export default function AboutPage() {
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
        <h1 className="shimmer-text mb-8 text-3xl font-bold md:text-4xl">О компании</h1>

        <div className="mb-14 rounded-3xl border border-border/20 bg-card/30 p-6 backdrop-blur-sm md:p-8">
          <p className="text-lg leading-relaxed text-foreground">
            ООО <strong>«Плодородие-Агро»</strong> предоставляет услуги поставщика сельскохозяйственной навесной и прицепной техники по низким ценам.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Наша компания действует в Курске, а также области и соседних районах с <strong className="text-foreground">20.10.2009</strong>, а на сегодняшний момент масштаб продаж охватил все области России. Благодаря деловому подходу и демократичному стилю наша компания имеет статус надёжного дилера среди Российских, Белорусских и Европейских изготовителей сельхозпродукции.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Компания <strong className="text-foreground">Плодородие-Агро</strong> вот уже более 15 лет работает в сфере сельхозтехники. Наши менеджеры постоянно обучаются и помогут вам подобрать именно ту технику, которая нужна под ваши задачи.
          </p>
        </div>

        <h2 className="mb-8 text-2xl font-bold text-foreground">Наши преимущества</h2>
        <div className="mb-14 grid gap-4 sm:grid-cols-2">
          {advantages.map((a, i) => (
            <div key={i} className="glow-card rounded-2xl border border-border/20 bg-card/30 p-5 backdrop-blur-sm">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <a.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">{a.title}</h3>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{a.text}</p>
            </div>
          ))}
        </div>

        <h2 className="mb-8 text-2xl font-bold text-foreground">С нами сотрудничают</h2>
        <div className="mb-14 flex flex-wrap gap-3">
          {partners.map((p, i) => (
            <span key={i} className="cat-pill rounded-full border border-border/30 bg-card/30 px-5 py-2.5 text-sm font-medium text-foreground backdrop-blur-sm">
              {p}
            </span>
          ))}
        </div>

        <div className="rounded-3xl border border-primary/15 bg-primary/[0.04] p-6 backdrop-blur-sm md:p-8">
          <h2 className="mb-5 text-xl font-bold text-foreground">Контакты</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-3 text-sm text-muted-foreground">
              <p><strong className="text-foreground">Телефон:</strong> <a href="tel:+74712745900" className="hover:text-primary transition-colors">+7 (4712) 74-59-00</a></p>
              <p><strong className="text-foreground">Бесплатная линия:</strong> <a href="tel:88001015046" className="hover:text-primary transition-colors">8-800-101-50-46</a></p>
              <p><strong className="text-foreground">Email:</strong> <a href="mailto:plagro@yandex.ru" className="hover:text-primary transition-colors">plagro@yandex.ru</a></p>
            </div>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p><strong className="text-foreground">Адрес:</strong> г. Курск, п. Беседино, ул. Соловьиная, 102</p>
              <p><strong className="text-foreground">Время работы:</strong> 09:00–18:00 (без перерыва и выходных)</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
