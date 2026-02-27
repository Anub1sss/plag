"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { BestSellers } from "@/components/best-sellers"
import { Catalog } from "@/components/catalog"
import { Footer } from "@/components/footer"
import { CartDrawer } from "@/components/cart-drawer"
import { BottomNav } from "@/components/bottom-nav"
import { ProfileModal } from "@/components/profile-modal"
import { FavoritesModal } from "@/components/favorites-modal"
import { NotificationsModal } from "@/components/notifications-modal"
import { AIChatbot } from "@/components/ai-chatbot"

export default function Home() {
  const [cartOpen, setCartOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [favoritesOpen, setFavoritesOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("home")

  return (
    <>
      <main className="min-h-screen pb-20">
        <Header
          onCartOpen={() => setCartOpen(true)}
          onProfileOpen={() => setProfileOpen(true)}
          onNotificationsOpen={() => setNotificationsOpen(true)}
          notificationsCount={2}
        />

        {/* Hero section */}
        <section className="border-b border-border bg-gradient-to-b from-muted/50 to-background py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="shimmer-text mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              Запчасти для сельхозтехники
            </h1>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Качественные запасные части для культиваторов, плугов, борон, сеялок и другой сельскохозяйственной
              техники. Быстрая доставка по всей России.
            </p>
          </div>
        </section>

        <BestSellers />
        <Catalog />
        <Footer />
      </main>

      <BottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onCartOpen={() => setCartOpen(true)}
        onProfileOpen={() => setProfileOpen(true)}
        onFavoritesOpen={() => setFavoritesOpen(true)}
      />

      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
      <ProfileModal open={profileOpen} onClose={() => setProfileOpen(false)} />
      <FavoritesModal open={favoritesOpen} onClose={() => setFavoritesOpen(false)} />
      <NotificationsModal isOpen={notificationsOpen} onClose={() => setNotificationsOpen(false)} />
      <AIChatbot />
    </>
  )
}
