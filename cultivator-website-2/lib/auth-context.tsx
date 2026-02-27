"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { CartItem } from "@/components/cart-provider"

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

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  orders: Order[]
  notifications: Notification[]
  paymentMethods: PaymentMethod[]
  login: (email: string, password: string) => boolean
  register: (data: { email: string; password: string; firstName: string; lastName: string; phone: string }) => boolean
  logout: () => void
  updateUser: (data: Partial<User>) => void
  subscribe: (email: string) => void
  createOrder: (items: CartItem[], total: number, email: string) => Order
  markNotificationRead: (id: string) => void
  addPaymentMethod: (method: Omit<PaymentMethod, "id">) => void
  removePaymentMethod: (id: string) => void
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
    const users = JSON.parse(stored) as User[]
    users.forEach((u) => map.set(u.email, u))
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

  // Загрузка из localStorage при монтировании
  useEffect(() => {
    if (typeof window === "undefined") return
    const savedUser = localStorage.getItem("user")
    const savedOrders = localStorage.getItem("orders")
    const savedNotifications = localStorage.getItem("notifications")
    const savedPaymentMethods = localStorage.getItem("paymentMethods")
    
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders))
    }
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications))
    } else {
      // Инициализация уведомлений
      const initialNotifications: Notification[] = [
        {
          id: "1",
          title: "Новый заказ",
          message: "Ваш заказ #ORD-123456 оформлен",
          date: new Date().toISOString(),
          read: false,
          type: "order",
        },
        {
          id: "2",
          title: "Акция",
          message: "Скидка 15% на все запчасти для культиваторов",
          date: new Date(Date.now() - 86400000).toISOString(),
          read: false,
          type: "promotion",
        },
      ]
      setNotifications(initialNotifications)
    }
    if (savedPaymentMethods) {
      setPaymentMethods(JSON.parse(savedPaymentMethods))
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

  const login = (email: string, password: string): boolean => {
    if (typeof window === "undefined") return false
    const usersDB = getUsersDB()
    const foundUser = usersDB.get(email)
    
    if (foundUser && foundUser.password === password) {
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
    const usersDB = getUsersDB()
    
    if (usersDB.has(data.email)) {
      return false // Пользователь уже существует
    }

    const newUser: User = {
      ...data,
      address: "",
      isLegalEntity: false,
      password: data.password,
      isAdmin: false,
    }
    
    usersDB.set(data.email, newUser)
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
      setUser({ ...user, ...data })
    }
  }

  const subscribe = (email: string) => {
    // В реальном приложении - отправка на сервер
    console.log("Подписка на рассылку:", email)
  }

  const createOrder = (items: CartItem[], total: number, email: string): Order => {
    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      date: new Date().toISOString(),
      items: [...items],
      total,
      status: "pending",
      email,
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

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        orders,
        notifications,
        paymentMethods,
        login,
        register,
        logout,
        updateUser,
        subscribe,
        createOrder,
        markNotificationRead,
        addPaymentMethod,
        removePaymentMethod,
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
