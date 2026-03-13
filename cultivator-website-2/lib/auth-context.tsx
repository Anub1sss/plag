"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { CartItem } from "@/components/cart-provider"
import { sanitizeText, sanitizeEmail, sanitizePhone, sanitizePrice, safeJsonParse, sanitizePassword } from "@/lib/sanitize"

export interface User {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  isLegalEntity: boolean
  companyName?: string
  inn?: string
  password?: string
  isAdmin?: boolean
}

export interface Order {
  id: string
  date: string
  items: CartItem[]
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  email: string
}

export interface Notification {
  id: string
  title: string
  message: string
  date: string
  read: boolean
  type: "order" | "promotion" | "system"
}

export interface PaymentMethod {
  id: string
  type: "card" | "bank" | "cash"
  last4?: string
  name: string
  isDefault: boolean
}

export interface CallbackRequest {
  id: string
  name: string
  phone: string
  message?: string
  date: string
  status: "new" | "processing" | "done"
}

export interface ServicePayment {
  id: string
  name: string
  cost: number
  nextPaymentDate: string
  status: "paid" | "expiring" | "overdue"
  description?: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  orders: Order[]
  notifications: Notification[]
  paymentMethods: PaymentMethod[]
  callbackRequests: CallbackRequest[]
  priceOverrides: Record<number, number>
  siteVisits: number
  servicePayments: ServicePayment[]
  login: (email: string, password: string) => boolean
  register: (data: { email: string; password: string; firstName: string; lastName: string; phone: string }) => boolean
  logout: () => void
  updateUser: (data: Partial<User>) => void
  subscribe: (email: string) => void
  createOrder: (items: CartItem[], total: number, email: string) => Order
  markNotificationRead: (id: string) => void
  addPaymentMethod: (method: Omit<PaymentMethod, "id">) => void
  removePaymentMethod: (id: string) => void
  submitCallback: (name: string, phone: string, message?: string) => void
  updateCallbackStatus: (id: string, status: CallbackRequest["status"]) => void
  updateProductPrice: (productId: number, price: number | null) => void
  getProductPrice: (productId: number, basePrice?: number) => number | undefined
  addServicePayment: (sp: Omit<ServicePayment, "id">) => void
  updateServicePayment: (id: string, data: Partial<ServicePayment>) => void
  removeServicePayment: (id: string) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// База данных пользователей (в реальном приложении - на сервере)
const USERS_DB_KEY = "users_db"
const ADMIN_EMAIL = "admin@gmail.com"
const ADMIN_PASSWORD = "admin"

function getUsersDB(): Map<string, User> {
  if (typeof window === "undefined") return new Map()
  const stored = localStorage.getItem(USERS_DB_KEY)
  const map = new Map<string, User>()
  if (stored) {
    const users = safeJsonParse<User[]>(stored, [])
    if (Array.isArray(users)) {
      users.forEach((u) => {
        if (u && typeof u.email === "string") map.set(u.email, u)
      })
    }
  } else {
    // Инициализация с админом
    const admin: User = {
      firstName: "Admin",
      lastName: "Admin",
      email: ADMIN_EMAIL,
      phone: "+7 (999) 000-00-00",
      address: "Администрация",
      isLegalEntity: false,
      password: ADMIN_PASSWORD,
      isAdmin: true,
    }
    map.set(ADMIN_EMAIL, admin)
    localStorage.setItem(USERS_DB_KEY, JSON.stringify([admin]))
  }
  return map
}

function saveUsersDB(users: Map<string, User>) {
  if (typeof window === "undefined") return
  localStorage.setItem(USERS_DB_KEY, JSON.stringify(Array.from(users.values())))
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])
  const [callbackRequests, setCallbackRequests] = useState<CallbackRequest[]>([])
  const [priceOverrides, setPriceOverrides] = useState<Record<number, number>>({})
  const [siteVisits, setSiteVisits] = useState(0)
  const [servicePayments, setServicePayments] = useState<ServicePayment[]>([])

  useEffect(() => {
    if (typeof window === "undefined") return

    const savedUser = safeJsonParse<User | null>(localStorage.getItem("user"), null)
    if (savedUser && typeof savedUser.email === "string") {
      setUser(savedUser)
    }

    const savedOrders = safeJsonParse<Order[]>(localStorage.getItem("orders"), [])
    if (Array.isArray(savedOrders)) setOrders(savedOrders)

    const savedNotifications = safeJsonParse<Notification[]>(localStorage.getItem("notifications"), [])
    if (Array.isArray(savedNotifications)) setNotifications(savedNotifications)

    const savedPaymentMethods = safeJsonParse<PaymentMethod[]>(localStorage.getItem("paymentMethods"), [])
    if (Array.isArray(savedPaymentMethods)) setPaymentMethods(savedPaymentMethods)

    const savedCallbacks = safeJsonParse<CallbackRequest[]>(localStorage.getItem("callbackRequests"), [])
    if (Array.isArray(savedCallbacks)) setCallbackRequests(savedCallbacks)

    const savedPriceOverrides = safeJsonParse<Record<number, number>>(localStorage.getItem("priceOverrides"), {})
    if (savedPriceOverrides && typeof savedPriceOverrides === "object" && !Array.isArray(savedPriceOverrides)) {
      setPriceOverrides(savedPriceOverrides)
    }

    const savedVisits = safeJsonParse<number>(localStorage.getItem("siteVisits"), 0)
    if (typeof savedVisits === "number") setSiteVisits(savedVisits)

    const savedServicePayments = safeJsonParse<ServicePayment[]>(localStorage.getItem("servicePayments"), [])
    if (Array.isArray(savedServicePayments)) setServicePayments(savedServicePayments)

    if (!sessionStorage.getItem("visited")) {
      sessionStorage.setItem("visited", "1")
      const cur = safeJsonParse<number>(localStorage.getItem("siteVisits"), 0)
      const next = (typeof cur === "number" ? cur : 0) + 1
      localStorage.setItem("siteVisits", JSON.stringify(next))
      setSiteVisits(next)
    }
  }, [])

  // Сохранение в localStorage при изменении
  useEffect(() => {
    if (typeof window === "undefined") return
    if (user) {
      const { password, ...userWithoutPassword } = user
      localStorage.setItem("user", JSON.stringify(userWithoutPassword))
    } else {
      localStorage.removeItem("user")
    }
  }, [user])

  useEffect(() => {
    if (typeof window === "undefined") return
    localStorage.setItem("orders", JSON.stringify(orders))
  }, [orders])

  useEffect(() => {
    if (typeof window === "undefined") return
    localStorage.setItem("notifications", JSON.stringify(notifications))
  }, [notifications])

  useEffect(() => {
    if (typeof window === "undefined") return
    localStorage.setItem("paymentMethods", JSON.stringify(paymentMethods))
  }, [paymentMethods])

  useEffect(() => {
    if (typeof window === "undefined") return
    localStorage.setItem("callbackRequests", JSON.stringify(callbackRequests))
  }, [callbackRequests])

  useEffect(() => {
    if (typeof window === "undefined") return
    localStorage.setItem("priceOverrides", JSON.stringify(priceOverrides))
  }, [priceOverrides])

  useEffect(() => {
    if (typeof window === "undefined") return
    localStorage.setItem("servicePayments", JSON.stringify(servicePayments))
  }, [servicePayments])

  const login = (email: string, password: string): boolean => {
    if (typeof window === "undefined") return false
    const cleanEmail = sanitizeEmail(email)
    const cleanPassword = sanitizePassword(password)
    if (!cleanEmail) return false

    const usersDB = getUsersDB()
    const foundUser = usersDB.get(cleanEmail)
    
    if (foundUser && foundUser.password === cleanPassword) {
      const { password: _, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword as User)
      return true
    }
    return false
  }

  const register = (data: {
    email: string
    password: string
    firstName: string
    lastName: string
    phone: string
  }): boolean => {
    if (typeof window === "undefined") return false

    const cleanEmail = sanitizeEmail(data.email)
    if (!cleanEmail) return false

    const cleanData = {
      email: cleanEmail,
      password: sanitizePassword(data.password),
      firstName: sanitizeText(data.firstName, 100),
      lastName: sanitizeText(data.lastName, 100),
      phone: sanitizePhone(data.phone),
    }

    const usersDB = getUsersDB()
    if (usersDB.has(cleanData.email)) {
      return false
    }

    const newUser: User = {
      ...cleanData,
      address: "",
      isLegalEntity: false,
      password: cleanData.password,
      isAdmin: false,
    }
    
    usersDB.set(cleanData.email, newUser)
    saveUsersDB(usersDB)
    
    const { password: _, ...userWithoutPassword } = newUser
    setUser(userWithoutPassword as User)
    return true
  }

  const logout = () => {
    setUser(null)
  }

  const updateUser = (data: Partial<User>) => {
    if (user) {
      const sanitized: Partial<User> = {}
      if (data.firstName !== undefined) sanitized.firstName = sanitizeText(data.firstName, 100)
      if (data.lastName !== undefined) sanitized.lastName = sanitizeText(data.lastName, 100)
      if (data.phone !== undefined) sanitized.phone = sanitizePhone(data.phone)
      if (data.address !== undefined) sanitized.address = sanitizeText(data.address, 300)
      if (data.companyName !== undefined) sanitized.companyName = sanitizeText(data.companyName, 200)
      if (data.inn !== undefined) sanitized.inn = sanitizeText(data.inn, 20)
      if (data.isLegalEntity !== undefined) sanitized.isLegalEntity = !!data.isLegalEntity
      if (data.email !== undefined) {
        const e = sanitizeEmail(data.email)
        if (e) sanitized.email = e
      }
      setUser({ ...user, ...sanitized })
    }
  }

  const subscribe = (email: string) => {
    const cleanEmail = sanitizeEmail(email)
    if (!cleanEmail) return
    console.log("Подписка на рассылку:", cleanEmail)
  }

  const createOrder = (items: CartItem[], total: number, email: string): Order => {
    const cleanEmail = sanitizeEmail(email) || email.trim().slice(0, 254)
    const safeTotal = sanitizePrice(total) ?? 0
    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      date: new Date().toISOString(),
      items: items.map((item) => ({
        ...item,
        name: sanitizeText(item.name, 300),
      })),
      total: safeTotal,
      status: "pending",
      email: cleanEmail,
    }
    setOrders((prev) => [newOrder, ...prev])
    
    // Добавляем уведомление о новом заказе
    const notification: Notification = {
      id: `notif-${Date.now()}`,
      title: "Новый заказ",
      message: `Ваш заказ ${newOrder.id} на сумму ${total.toLocaleString("ru-RU")} ₽ успешно оформлен`,
      date: new Date().toISOString(),
      read: false,
      type: "order",
    }
    setNotifications((prev) => [notification, ...prev])
    
    return newOrder
  }

  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const addPaymentMethod = (method: Omit<PaymentMethod, "id">) => {
    const newMethod: PaymentMethod = {
      ...method,
      id: `pm-${Date.now()}`,
    }
    setPaymentMethods((prev) => {
      const updated = method.isDefault
        ? prev.map((m) => ({ ...m, isDefault: false }))
        : prev
      return [...updated, newMethod]
    })
  }

  const removePaymentMethod = (id: string) => {
    setPaymentMethods((prev) => prev.filter((m) => m.id !== id))
  }

  const updateProductPrice = (productId: number, price: number | null) => {
    if (!Number.isFinite(productId) || productId < 0) return
    const safePrice = price === null ? null : sanitizePrice(price)
    setPriceOverrides((prev) => {
      const next = { ...prev }
      if (safePrice === null) {
        delete next[productId]
      } else {
        next[productId] = safePrice
      }
      return next
    })
  }

  const getProductPrice = (productId: number, basePrice?: number): number | undefined => {
    if (productId in priceOverrides) return priceOverrides[productId]
    return basePrice
  }

  const submitCallback = (name: string, phone: string, message?: string) => {
    const cleanName = sanitizeText(name, 200)
    const cleanPhone = sanitizePhone(phone)
    if (!cleanName || !cleanPhone) return

    const req: CallbackRequest = {
      id: `cb-${Date.now()}`,
      name: cleanName,
      phone: cleanPhone,
      message: message ? sanitizeText(message, 1000) : undefined,
      date: new Date().toISOString(),
      status: "new",
    }
    setCallbackRequests((prev) => [req, ...prev])
  }

  const updateCallbackStatus = (id: string, status: CallbackRequest["status"]) => {
    const validStatuses: CallbackRequest["status"][] = ["new", "processing", "done"]
    if (!validStatuses.includes(status)) return
    const cleanId = sanitizeText(id, 50)
    setCallbackRequests((prev) => prev.map((r) => (r.id === cleanId ? { ...r, status } : r)))
  }

  const addServicePayment = (sp: Omit<ServicePayment, "id">) => {
    const newSp: ServicePayment = {
      ...sp,
      id: `sp-${Date.now()}`,
      name: sanitizeText(sp.name, 200),
      cost: sanitizePrice(sp.cost) ?? 0,
      description: sp.description ? sanitizeText(sp.description, 500) : undefined,
    }
    setServicePayments((prev) => [...prev, newSp])
  }

  const updateServicePayment = (id: string, data: Partial<ServicePayment>) => {
    setServicePayments((prev) =>
      prev.map((sp) => (sp.id === id ? { ...sp, ...data } : sp))
    )
  }

  const removeServicePayment = (id: string) => {
    setServicePayments((prev) => prev.filter((sp) => sp.id !== id))
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        orders,
        notifications,
        paymentMethods,
        callbackRequests,
        priceOverrides,
        siteVisits,
        servicePayments,
        login,
        register,
        logout,
        updateUser,
        subscribe,
        createOrder,
        markNotificationRead,
        addPaymentMethod,
        removePaymentMethod,
        submitCallback,
        updateCallbackStatus,
        updateProductPrice,
        getProductPrice,
        addServicePayment,
        updateServicePayment,
        removeServicePayment,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
