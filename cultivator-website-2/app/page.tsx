"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { BestSellers } from "@/components/best-sellers"
import { Catalog } from "@/components/catalog"
import { Footer } from "@/components/footer"
import { CartDrawer } from "@/components/cart-drawer"
import { ProfileModal } from "@/components/profile-modal"
import { FavoritesModal } from "@/components/favorites-modal"
import { NotificationsModal } from "@/components/notifications-modal"
import { AIChatbot } from "@/components/ai-chatbot"
import { CallbackModal } from "@/components/callback-modal"
import { useAuth } from "@/lib/auth-context"
import { Sprout, Truck, Shield, ArrowRight } from "lucide-react"

export default function Home() {
  const { notifications } = useAuth()
  const unreadNotifications = notifications.filter((n) => !n.read).length
  const [cartOpen, setCartOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [favoritesOpen, setFavoritesOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [callbackOpen, setCallbackOpen] = useState(false)

  return (
    <>
      <main className="min-h-screen grain-overlay">
        <Header
          onCartOpen={() => setCartOpen(true)}
          onProfileOpen={() => setProfileOpen(true)}
          onNotificationsOpen={() => setNotificationsOpen(true)}
          notificationsCount={unreadNotifications}
        />

        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-border/50">
          <div className="hero-mesh absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

          {/* Animated gradient orbs */}
          <div className="absolute -left-32 -top-32 h-64 w-64 rounded-full bg-primary/10 blur-[100px] pulse-glow" />
          <div className="absolute -right-32 bottom-0 h-48 w-48 rounded-full bg-accent/10 blur-[80px] pulse-glow" style={{ animationDelay: "2s" }} />

          <div className="container relative mx-auto px-4 py-20 md:py-28">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary animate-fade-in">
                <Sprout className="h-4 w-4" />
                Надёжный поставщик с 2009 года
              </div>

              <h1 className="shimmer-text mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl animate-slide-up">
                Плодородие-Агро
              </h1>

              <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground/80 animate-slide-up" style={{ animationDelay: "0.1s" }}>
                Поставка сельскохозяйственной навесной и прицепной техники по низким ценам.
                Запчасти для культиваторов, плугов, борон, сеялок и опрыскивателей.
              </p>

              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center animate-slide-up" style={{ animationDelay: "0.2s" }}>
                <a
                  href="/catalog"
                  className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:shadow-[0_0_30px_oklch(0.62_0.19_150/0.3)] btn-glow"
                >
                  Перейти в каталог
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <button
                  onClick={() => setCallbackOpen(true)}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-8 py-3.5 text-sm font-semibold text-foreground backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-card/80"
                >
                  Связаться с менеджером
                </button>
              </div>

              <div className="mx-auto mt-10 max-w-xl rounded-2xl border border-amber-500/20 bg-amber-500/5 px-6 py-4 backdrop-blur-sm animate-slide-up" style={{ animationDelay: "0.3s" }}>
                <p className="text-sm text-amber-600 dark:text-amber-400">
                  Цены на сайте <strong>примерные</strong>. Для уточнения актуальной стоимости свяжитесь с менеджером через{" "}
                  <button onClick={() => setCallbackOpen(true)} className="underline underline-offset-2 hover:text-amber-800 dark:hover:text-amber-300 font-semibold">
                    обратную связь
                  </button>.
                </p>
              </div>
            </div>
          </div>

          {/* Stats ribbon */}
          <div className="relative border-t border-border/30">
            <div className="container mx-auto grid grid-cols-1 gap-0 sm:grid-cols-3">
              {[
                { icon: Sprout, label: "15+ лет на рынке", desc: "Работаем с 2009 года" },
                { icon: Truck, label: "Доставка по РФ", desc: "Собственный транспорт" },
                { icon: Shield, label: "Надёжный дилер", desc: "Российских и зарубежных заводов" },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className={`flex items-center gap-4 px-6 py-5 transition-colors hover:bg-primary/[0.03] ${i < 2 ? "sm:border-r sm:border-border/30" : ""}`}
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <stat.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{stat.label}</p>
                    <p className="text-xs text-muted-foreground">{stat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="section-glow-line" />

        <BestSellers />

        <div className="section-glow-line" />

        <Catalog />
        <Footer />
      </main>

      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
      <ProfileModal open={profileOpen} onClose={() => setProfileOpen(false)} />
      <FavoritesModal open={favoritesOpen} onClose={() => setFavoritesOpen(false)} />
      <NotificationsModal isOpen={notificationsOpen} onClose={() => setNotificationsOpen(false)} />
      <AIChatbot />
      <CallbackModal open={callbackOpen} onClose={() => setCallbackOpen(false)} />
    </>
  )
}
