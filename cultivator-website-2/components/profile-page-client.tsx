"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Package,
  LogOut,
  ArrowLeft,
  Check,
  Send,
  Building2,
  Sun,
  Moon,
  Calendar,
  Clock,
  Truck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/lib/auth-context"
import { useTheme } from "@/lib/theme-context"
import { BottomNav } from "@/components/bottom-nav"
import { CartDrawer } from "@/components/cart-drawer"
import { FavoritesModal } from "@/components/favorites-modal"

export function ProfilePageClient() {
  const router = useRouter()
  const { user, isAuthenticated, login, register, logout, updateUser, subscribe, orders } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const [activeTab, setActiveTab] = useState("profile")
  const [cartOpen, setCartOpen] = useState(false)
  const [favoritesOpen, setFavoritesOpen] = useState(false)
  const [showOrders, setShowOrders] = useState(false)
  const [isRegisterMode, setIsRegisterMode] = useState(false)

  // Login form
  const [loginInput, setLoginInput] = useState("")
  const [passwordInput, setPasswordInput] = useState("")
  const [loginError, setLoginError] = useState("")

  // Register form
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
  })

  // Subscribe form
  const [subscribeEmail, setSubscribeEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  // Edit mode
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    isLegalEntity: false,
    companyName: "",
    inn: "",
  })

  const handleLogin = () => {
    const success = login(loginInput, passwordInput)
    if (!success) {
      setLoginError("Неверный email или пароль")
    } else {
      setLoginError("")
      setLoginInput("")
      setPasswordInput("")
    }
  }

  const handleRegister = () => {
    if (!registerData.email || !registerData.password || !registerData.firstName || !registerData.lastName || !registerData.phone) {
      setLoginError("Заполните все поля")
      return
    }
    const success = register(registerData)
    if (!success) {
      setLoginError("Пользователь с таким email уже существует")
    } else {
      setLoginError("")
      setRegisterData({ email: "", password: "", firstName: "", lastName: "", phone: "" })
      setIsRegisterMode(false)
    }
  }

  const handleSubscribe = () => {
    if (subscribeEmail) {
      subscribe(subscribeEmail)
      setSubscribed(true)
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  const startEditing = () => {
    if (user) {
      setEditData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        address: user.address,
        isLegalEntity: user.isLegalEntity,
        companyName: user.companyName || "",
        inn: user.inn || "",
      })
      setIsEditing(true)
    }
  }

  const saveEditing = () => {
    updateUser(editData)
    setIsEditing(false)
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    if (tab === "home") router.push("/")
    if (tab === "catalog") router.push("/catalog")
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-lg">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-4">
            <button onClick={() => router.push("/")} className="rounded-full p-2 hover:bg-muted">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-xl font-bold">Личный кабинет</h1>
          </div>
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {!isAuthenticated ? (
          /* Login form */
          <div className="mx-auto max-w-sm space-y-6">
            <div className="flex flex-col items-center">
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                <User className="h-10 w-10 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">Вход в аккаунт</h2>
              <p className="mt-2 text-center text-sm text-muted-foreground">
                Войдите для доступа к заказам и персональным предложениям
              </p>
            </div>

            <div className="space-y-4 rounded-xl border border-border bg-card p-5">
              {!isRegisterMode ? (
                <>
                  <Input
                    type="email"
                    placeholder="Email"
                    value={loginInput}
                    onChange={(e) => setLoginInput(e.target.value)}
                    className="h-11"
                  />
                  <Input
                    type="password"
                    placeholder="Пароль"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="h-11"
                  />

                  {loginError && <p className="text-sm text-red-500">{loginError}</p>}

                  <Button className="w-full h-11" onClick={handleLogin}>
                    Войти
                  </Button>

                  <Button variant="outline" className="w-full h-11 bg-transparent" onClick={() => setIsRegisterMode(true)}>
                    Регистрация
                  </Button>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      placeholder="Имя"
                      value={registerData.firstName}
                      onChange={(e) => setRegisterData({ ...registerData, firstName: e.target.value })}
                      className="h-11"
                    />
                    <Input
                      placeholder="Фамилия"
                      value={registerData.lastName}
                      onChange={(e) => setRegisterData({ ...registerData, lastName: e.target.value })}
                      className="h-11"
                    />
                  </div>
                  <Input
                    type="email"
                    placeholder="Email"
                    value={registerData.email}
                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                    className="h-11"
                  />
                  <Input
                    type="tel"
                    placeholder="Телефон"
                    value={registerData.phone}
                    onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                    className="h-11"
                  />
                  <Input
                    type="password"
                    placeholder="Пароль"
                    value={registerData.password}
                    onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                    className="h-11"
                  />

                  {loginError && <p className="text-sm text-red-500">{loginError}</p>}

                  <Button className="w-full h-11" onClick={handleRegister}>
                    Зарегистрироваться
                  </Button>

                  <Button variant="outline" className="w-full h-11 bg-transparent" onClick={() => setIsRegisterMode(false)}>
                    Уже есть аккаунт? Войти
                  </Button>
                </>
              )}
            </div>

            {/* Subscribe */}
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-3 mb-3">
                <Mail className="h-5 w-5 text-primary" />
                <span className="font-medium">Подписка на рассылку</span>
              </div>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Ваш email"
                  value={subscribeEmail}
                  onChange={(e) => setSubscribeEmail(e.target.value)}
                  className="h-10"
                />
                <Button onClick={handleSubscribe} size="icon" className="h-10 w-10 shrink-0">
                  {subscribed ? <Check className="h-4 w-4" /> : <Send className="h-4 w-4" />}
                </Button>
              </div>
              {subscribed && <p className="mt-2 text-sm text-green-500">Вы подписались!</p>}
            </div>
          </div>
        ) : isEditing ? (
          /* Edit form */
          <div className="mx-auto max-w-md space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Редактирование</h2>
              <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)}>
                Отмена
              </Button>
            </div>

            <div className="space-y-4 rounded-xl border border-border bg-card p-5">
              <div className="grid gap-3 sm:grid-cols-2">
                <Input
                  placeholder="Фамилия"
                  value={editData.lastName}
                  onChange={(e) => setEditData({ ...editData, lastName: e.target.value })}
                  className="h-10"
                />
                <Input
                  placeholder="Имя"
                  value={editData.firstName}
                  onChange={(e) => setEditData({ ...editData, firstName: e.target.value })}
                  className="h-10"
                />
              </div>
              <Input
                type="email"
                placeholder="Email"
                value={editData.email}
                onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                className="h-10"
              />
              <Input
                type="tel"
                placeholder="Телефон"
                value={editData.phone}
                onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                className="h-10"
              />
              <Input
                placeholder="Адрес доставки"
                value={editData.address}
                onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                className="h-10"
              />

              {/* Legal entity toggle */}
              <div className="flex items-center justify-between rounded-lg bg-muted p-3">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-primary" />
                  <span className="text-sm">Юридическое лицо</span>
                </div>
                <button
                  onClick={() => setEditData({ ...editData, isLegalEntity: !editData.isLegalEntity })}
                  className={`relative h-5 w-9 rounded-full transition-colors ${
                    editData.isLegalEntity ? "bg-primary" : "bg-muted-foreground/30"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${
                      editData.isLegalEntity ? "translate-x-4" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>

              {editData.isLegalEntity && (
                <div className="space-y-3 rounded-lg border border-primary/20 bg-primary/5 p-3">
                  <Input
                    placeholder="Название компании"
                    value={editData.companyName}
                    onChange={(e) => setEditData({ ...editData, companyName: e.target.value })}
                    className="h-10"
                  />
                  <Input
                    placeholder="ИНН"
                    value={editData.inn}
                    onChange={(e) => setEditData({ ...editData, inn: e.target.value })}
                    className="h-10"
                  />
                </div>
              )}

              <Button className="w-full h-10" onClick={saveEditing}>
                Сохранить
              </Button>
            </div>
          </div>
        ) : (
          /* Profile view */
          <div className="mx-auto max-w-md space-y-4">
            {/* User card */}
            <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <User className="h-7 w-7 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="font-semibold">
                  {user?.lastName} {user?.firstName}
                </h2>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
                {user?.isLegalEntity && user?.companyName && (
                  <span className="mt-1 inline-flex items-center gap-1 text-xs text-primary">
                    <Building2 className="h-3 w-3" />
                    {user.companyName}
                  </span>
                )}
              </div>
            </div>

            {/* Contact info */}
            <div className="rounded-xl border border-border bg-card p-5 space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{user?.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{user?.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{user?.address}</span>
              </div>
            </div>

            {/* Quick actions */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={startEditing}
                className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 transition-colors hover:bg-muted"
              >
                <User className="h-5 w-5 text-primary" />
                <span className="text-sm">Редактировать</span>
              </button>
              <button
                onClick={() => setShowOrders(!showOrders)}
                className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 transition-colors hover:bg-muted"
              >
                <Package className="h-5 w-5 text-primary" />
                <span className="text-sm">Мои заказы ({orders.length})</span>
              </button>
            </div>

            {/* Orders list */}
            {showOrders && (
              <div className="space-y-3 rounded-xl border border-border bg-card p-5">
                <h3 className="text-lg font-semibold mb-4">История заказов</h3>
                {orders.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Package className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>У вас пока нет заказов</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="rounded-lg border border-border bg-muted/30 p-4 space-y-3"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Package className="h-4 w-4 text-primary" />
                              <span className="font-semibold">{order.id}</span>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                <span>
                                  {new Date(order.date).toLocaleDateString("ru-RU", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                  })}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>
                                  {new Date(order.date).toLocaleTimeString("ru-RU", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </span>
                              </div>
                            </div>
                          </div>
                          <span className="text-lg font-bold">
                            {order.total.toLocaleString("ru-RU", { minimumFractionDigits: 2 })} ₽
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                          <Truck className="h-4 w-4 text-muted-foreground" />
                          <span className="capitalize">
                            {order.status === "pending" && "Ожидает обработки"}
                            {order.status === "processing" && "В обработке"}
                            {order.status === "shipped" && "Отправлен"}
                            {order.status === "delivered" && "Доставлен"}
                            {order.status === "cancelled" && "Отменён"}
                          </span>
                        </div>

                        <div className="text-sm text-muted-foreground">
                          Товаров: {order.items.length} •{" "}
                          {order.items.reduce((sum, item) => sum + item.quantity, 0)} шт.
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Logout */}
            <Button
              variant="outline"
              className="w-full bg-transparent text-destructive hover:bg-destructive/10 hover:text-destructive"
              onClick={logout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Выйти
            </Button>
          </div>
        )}
      </div>

      <BottomNav
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onCartOpen={() => setCartOpen(true)}
        onProfileOpen={() => {}}
        onFavoritesOpen={() => setFavoritesOpen(true)}
      />

      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
      <FavoritesModal open={favoritesOpen} onClose={() => setFavoritesOpen(false)} />
    </div>
  )
}
