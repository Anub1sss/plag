"use client"

import { useState } from "react"
import {
  X,
  User,
  Mail,
  Phone,
  MapPin,
  Package,
  Settings,
  LogOut,
  ChevronRight,
  Bell,
  CreditCard,
  Shield,
  Plus,
  Trash2,
  Lock,
  Eye,
  EyeOff,
  Calendar,
  Truck,
  CheckCircle2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/lib/auth-context"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface ProfileModalProps {
  open: boolean
  onClose: () => void
}

export function ProfileModal({ open, onClose }: ProfileModalProps) {
  const {
    user,
    isAuthenticated,
    orders,
    notifications,
    paymentMethods,
    login,
    register,
    logout,
    markNotificationRead,
    addPaymentMethod,
    removePaymentMethod,
    subscribe,
  } = useAuth()

  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [isRegisterMode, setIsRegisterMode] = useState(false)
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState("")
  const [newCardNumber, setNewCardNumber] = useState("")
  const [newCardName, setNewCardName] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [subscribeEmail, setSubscribeEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  if (!open) return null

  const unreadNotifications = notifications.filter((n) => !n.read).length

  const menuItems = [
    { id: "orders", icon: Package, label: "Мои заказы", count: orders.length },
    { id: "notifications", icon: Bell, label: "Уведомления", count: unreadNotifications },
    { id: "payment", icon: CreditCard, label: "Способы оплаты" },
    { id: "security", icon: Shield, label: "Безопасность" },
    { id: "settings", icon: Settings, label: "Настройки" },
  ]

  const handleLogin = () => {
    setLoginError("")
    if (!loginEmail || !loginPassword) {
      setLoginError("Заполните все поля")
      return
    }
    const success = login(loginEmail, loginPassword)
    if (success) {
      setLoginEmail("")
      setLoginPassword("")
      setActiveSection(null)
    } else {
      setLoginError("Неверный email или пароль")
    }
  }

  const handleRegister = () => {
    setLoginError("")
    if (!registerData.email || !registerData.password || !registerData.firstName || !registerData.lastName || !registerData.phone) {
      setLoginError("Заполните все поля")
      return
    }
    const success = register(registerData)
    if (success) {
      setRegisterData({ email: "", password: "", firstName: "", lastName: "", phone: "" })
      setIsRegisterMode(false)
      setActiveSection(null)
    } else {
      setLoginError("Пользователь с таким email уже существует")
    }
  }

  const handleAddPaymentMethod = () => {
    if (!newCardNumber || !newCardName) return
    addPaymentMethod({
      type: "card",
      last4: newCardNumber.slice(-4),
      name: newCardName,
      isDefault: paymentMethods.length === 0,
    })
    setNewCardNumber("")
    setNewCardName("")
  }

  const handleChangePassword = () => {
    // В реальном приложении - проверка текущего пароля и обновление
    alert("Функция смены пароля будет реализована")
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="relative w-full max-w-md rounded-2xl bg-card max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border p-4 shrink-0">
          <h2 className="text-lg font-semibold text-foreground">Личный кабинет</h2>
          <button onClick={onClose} className="rounded-full p-2 hover:bg-muted">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {!isAuthenticated ? (
            // Login/Register form
            <div className="space-y-4">
              <div className="mb-6 flex flex-col items-center">
                <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                  <User className="h-10 w-10 text-muted-foreground" />
                </div>
                <p className="text-center text-sm text-muted-foreground">
                  {isRegisterMode ? "Создайте аккаунт" : "Войдите чтобы отслеживать заказы и получить персональные предложения"}
                </p>
              </div>

              {loginError && (
                <Alert variant="destructive">
                  <AlertDescription>{loginError}</AlertDescription>
                </Alert>
              )}

              {!isRegisterMode ? (
                <>
                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <label className="text-sm text-muted-foreground">Email</label>
                      <Input
                        type="email"
                        placeholder="example@mail.ru"
                        className="h-11"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm text-muted-foreground">Пароль</label>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Введите пароль"
                          className="h-11 pr-10"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full" onClick={handleLogin}>
                    Войти
                  </Button>

                  <div className="relative flex items-center justify-center">
                    <span className="bg-card px-4 text-sm text-muted-foreground">или</span>
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border" />
                    </div>
                  </div>

                  <Button variant="outline" className="w-full bg-transparent" onClick={() => setIsRegisterMode(true)}>
                    Зарегистрироваться
                  </Button>
                </>
              ) : (
                <>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-sm text-muted-foreground">Имя</label>
                        <Input
                          className="h-11"
                          value={registerData.firstName}
                          onChange={(e) => setRegisterData({ ...registerData, firstName: e.target.value })}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm text-muted-foreground">Фамилия</label>
                        <Input
                          className="h-11"
                          value={registerData.lastName}
                          onChange={(e) => setRegisterData({ ...registerData, lastName: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm text-muted-foreground">Email</label>
                      <Input
                        type="email"
                        className="h-11"
                        value={registerData.email}
                        onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm text-muted-foreground">Телефон</label>
                      <Input
                        type="tel"
                        className="h-11"
                        value={registerData.phone}
                        onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm text-muted-foreground">Пароль</label>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          className="h-11 pr-10"
                          value={registerData.password}
                          onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full" onClick={handleRegister}>
                    Зарегистрироваться
                  </Button>

                  <Button variant="outline" className="w-full bg-transparent" onClick={() => setIsRegisterMode(false)}>
                    Уже есть аккаунт? Войти
                  </Button>
                </>
              )}
            </div>
          ) : activeSection ? (
            // Section content
            <div className="space-y-4">
              <button
                onClick={() => setActiveSection(null)}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
              >
                <ChevronRight className="h-4 w-4 rotate-180" />
                Назад
              </button>

              {activeSection === "orders" && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">Мои заказы</h3>
                  {orders.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Package className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p>У вас пока нет заказов</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {orders.map((order) => (
                        <div key={order.id} className="rounded-lg border border-border bg-muted/30 p-4 space-y-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <Package className="h-4 w-4 text-primary" />
                                <span className="font-semibold">{order.id}</span>
                              </div>
                              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <Calendar className="h-3 w-3" />
                                <span>
                                  {new Date(order.date).toLocaleDateString("ru-RU", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                  })}
                                </span>
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
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeSection === "notifications" && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">Уведомления</h3>
                  {notifications.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Bell className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p>Нет уведомлений</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className={`rounded-lg border border-border p-4 cursor-pointer transition-colors ${
                            notif.read ? "bg-muted/30" : "bg-primary/5"
                          }`}
                          onClick={() => markNotificationRead(notif.id)}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                              <h4 className="font-medium">{notif.title}</h4>
                              <p className="text-sm text-muted-foreground mt-1">{notif.message}</p>
                              <p className="text-xs text-muted-foreground mt-2">
                                {new Date(notif.date).toLocaleString("ru-RU")}
                              </p>
                            </div>
                            {!notif.read && <div className="h-2 w-2 rounded-full bg-primary mt-1" />}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeSection === "payment" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Способы оплаты</h3>
                  {paymentMethods.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <CreditCard className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p>Нет сохраненных способов оплаты</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {paymentMethods.map((method) => (
                        <div key={method.id} className="flex items-center justify-between rounded-lg border border-border p-4">
                          <div className="flex items-center gap-3">
                            <CreditCard className="h-5 w-5 text-primary" />
                            <div>
                              <p className="font-medium">{method.name}</p>
                              {method.last4 && <p className="text-sm text-muted-foreground">**** {method.last4}</p>}
                              {method.isDefault && (
                                <span className="text-xs text-primary">По умолчанию</span>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={() => removePaymentMethod(method.id)}
                            className="text-destructive hover:text-destructive/80"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="rounded-lg border border-border p-4 space-y-3">
                    <h4 className="font-medium">Добавить карту</h4>
                    <Input
                      placeholder="Номер карты"
                      value={newCardNumber}
                      onChange={(e) => setNewCardNumber(e.target.value)}
                      maxLength={16}
                    />
                    <Input
                      placeholder="Имя на карте"
                      value={newCardName}
                      onChange={(e) => setNewCardName(e.target.value)}
                    />
                    <Button onClick={handleAddPaymentMethod} className="w-full" disabled={!newCardNumber || !newCardName}>
                      <Plus className="h-4 w-4 mr-2" />
                      Добавить
                    </Button>
                  </div>
                </div>
              )}

              {activeSection === "security" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Безопасность</h3>
                  <div className="rounded-lg border border-border p-4 space-y-3">
                    <h4 className="font-medium">Смена пароля</h4>
                    <Input
                      type="password"
                      placeholder="Текущий пароль"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <Input
                      type="password"
                      placeholder="Новый пароль"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <Button onClick={handleChangePassword} className="w-full" disabled={!currentPassword || !newPassword}>
                      <Lock className="h-4 w-4 mr-2" />
                      Изменить пароль
                    </Button>
                  </div>
                </div>
              )}

              {activeSection === "settings" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Настройки</h3>
                  <div className="rounded-lg border border-border p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email уведомления</p>
                        <p className="text-sm text-muted-foreground">Получать уведомления на почту</p>
                      </div>
                      <input type="checkbox" defaultChecked className="h-5 w-5" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">SMS уведомления</p>
                        <p className="text-sm text-muted-foreground">Получать SMS о статусе заказов</p>
                      </div>
                      <input type="checkbox" className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="rounded-lg border border-border p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <Mail className="h-5 w-5 text-primary" />
                      <h4 className="font-medium">Подписка на рассылку</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Получайте новости о скидках, новых поступлениях и акциях на вашу почту
                    </p>
                    {subscribed ? (
                      <div className="flex items-center gap-2 rounded-lg bg-green-500/10 p-3 text-sm text-green-600 dark:text-green-400">
                        <CheckCircle2 className="h-5 w-5 shrink-0" />
                        <span>Вы подписаны на рассылку!</span>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <Input
                          type="email"
                          placeholder="Введите ваш email"
                          value={subscribeEmail}
                          onChange={(e) => setSubscribeEmail(e.target.value)}
                          className="flex-1"
                        />
                        <Button
                          onClick={() => {
                            if (subscribeEmail.trim() && subscribeEmail.includes("@")) {
                              subscribe(subscribeEmail.trim())
                              setSubscribed(true)
                              setSubscribeEmail("")
                            }
                          }}
                          disabled={!subscribeEmail.trim() || !subscribeEmail.includes("@")}
                          size="sm"
                          className="shrink-0"
                        >
                          Подписаться
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            // Profile menu
            <div className="space-y-4">
              {/* User info */}
              <div className="flex items-center gap-4 rounded-xl bg-muted p-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <User className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">
                    {user?.firstName} {user?.lastName}
                    {user?.isAdmin && <span className="ml-2 text-xs text-primary">(Админ)</span>}
                  </h3>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
              </div>

              {/* Contact info */}
              <div className="space-y-3 rounded-xl border border-border p-4">
                <h4 className="font-medium text-foreground">Контактные данные</h4>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">{user?.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">{user?.email}</span>
                </div>
                {user?.address && (
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">{user.address}</span>
                  </div>
                )}
              </div>

              {/* Menu */}
              <div className="space-y-1">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className="flex w-full items-center gap-3 rounded-xl p-3 transition-colors hover:bg-muted"
                  >
                    <item.icon className="h-5 w-5 text-muted-foreground" />
                    <span className="flex-1 text-left text-foreground">{item.label}</span>
                    {item.count !== undefined && item.count > 0 && (
                      <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
                        {item.count}
                      </span>
                    )}
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </button>
                ))}
              </div>

              {/* Logout */}
              <Button
                variant="outline"
                className="w-full text-red-500 hover:bg-red-500/10 hover:text-red-500 bg-transparent"
                onClick={() => {
                  logout()
                  setActiveSection(null)
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Выйти
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
