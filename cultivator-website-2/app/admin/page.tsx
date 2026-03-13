"use client"

import { useState, useEffect, useMemo, useRef } from "react"
import {
  ShieldCheck,
  Package,
  Phone,
  BarChart3,
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  LogOut,
  ArrowLeft,
  Boxes,
  PhoneCall,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
  ShoppingCart,
  Pencil,
  Check,
  X,
  Upload,
  FileSpreadsheet,
  CreditCard,
  Plus,
  Trash2,
  Users,
  AlertTriangle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth, type CallbackRequest, type ServicePayment } from "@/lib/auth-context"
import { safeTelHref } from "@/lib/sanitize"
import { allProducts, categories } from "@/lib/parts-data"
import Link from "next/link"
import { useRouter } from "next/navigation"
import * as XLSX from "xlsx"

type Tab = "dashboard" | "orders" | "products" | "pricelist" | "callbacks" | "payments"

const PRODUCTS_PER_PAGE = 30

export default function AdminPage() {
  const {
    user, isAuthenticated, orders, callbackRequests, updateCallbackStatus,
    login, logout, priceOverrides, updateProductPrice, getProductPrice,
    siteVisits, servicePayments, addServicePayment, updateServicePayment, removeServicePayment,
  } = useAuth()
  const router = useRouter()

  const [activeTab, setActiveTab] = useState<Tab>("dashboard")
  const [searchQuery, setSearchQuery] = useState("")
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [loginError, setLoginError] = useState("")
  const [mounted, setMounted] = useState(false)
  const [editingPriceId, setEditingPriceId] = useState<number | null>(null)
  const [editingPriceValue, setEditingPriceValue] = useState("")

  // Products filters
  const [prodCategoryFilter, setProdCategoryFilter] = useState("")
  const [prodPriceFilter, setProdPriceFilter] = useState<"all" | "with" | "without">("all")
  const [prodStockFilter, setProdStockFilter] = useState<"all" | "instock" | "order">("all")
  const [prodPage, setProdPage] = useState(1)

  // Pricelist state
  const [excelData, setExcelData] = useState<Record<string, string | number>[]>([])
  const [excelFileName, setExcelFileName] = useState("")
  const [excelNameCol, setExcelNameCol] = useState("")
  const [excelPriceCol, setExcelPriceCol] = useState("")
  const [matchResults, setMatchResults] = useState<{ excelName: string; price: number; productId: number | null; productName: string; score: number }[]>([])
  const [priceApplied, setPriceApplied] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Service payment form
  const [spFormOpen, setSpFormOpen] = useState(false)
  const [spEditId, setSpEditId] = useState<string | null>(null)
  const [spName, setSpName] = useState("")
  const [spCost, setSpCost] = useState("")
  const [spDate, setSpDate] = useState("")
  const [spStatus, setSpStatus] = useState<ServicePayment["status"]>("paid")
  const [spDesc, setSpDesc] = useState("")

  useEffect(() => { setMounted(true) }, [])

  const filteredProducts = useMemo(() => {
    const q = searchQuery.toLowerCase()
    return allProducts.filter((p) => {
      if (q && !p.name.toLowerCase().includes(q) && !p.categoryName.toLowerCase().includes(q) && !(p.article || "").toLowerCase().includes(q) && !String(p.id).includes(q)) return false
      if (prodCategoryFilter && p.category !== prodCategoryFilter) return false
      if (prodPriceFilter === "with" && !getProductPrice(p.id, p.price)) return false
      if (prodPriceFilter === "without" && getProductPrice(p.id, p.price)) return false
      if (prodStockFilter === "instock" && !p.inStock) return false
      if (prodStockFilter === "order" && p.inStock) return false
      return true
    })
  }, [searchQuery, prodCategoryFilter, prodPriceFilter, prodStockFilter, priceOverrides])

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!isAuthenticated || !user?.isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-lg">
          <div className="mb-6 flex flex-col items-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <ShieldCheck className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-xl font-bold text-foreground">Админ-панель</h1>
            <p className="mt-1 text-sm text-muted-foreground">Войдите для доступа</p>
          </div>
          {loginError && (
            <div className="mb-4 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{loginError}</div>
          )}
          <div className="space-y-3">
            <Input type="email" placeholder="Email администратора" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} className="h-11" />
            <Input type="password" placeholder="Пароль" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} className="h-11" />
            <Button className="w-full h-11" onClick={() => { setLoginError(""); if (!login(loginEmail, loginPassword)) setLoginError("Неверный email или пароль") }}>Войти</Button>
          </div>
          <div className="mt-4 text-center">
            <Link href="/" className="text-sm text-muted-foreground hover:text-primary">Вернуться на сайт</Link>
          </div>
        </div>
      </div>
    )
  }

  const newCallbacks = callbackRequests.filter((r) => r.status === "new").length
  const totalRevenue = orders.reduce((s, o) => s + o.total, 0)

  const tabs: { id: Tab; icon: React.ComponentType<{ className?: string }>; label: string; badge?: number }[] = [
    { id: "dashboard", icon: BarChart3, label: "Обзор" },
    { id: "orders", icon: Package, label: "Заказы", badge: orders.length },
    { id: "products", icon: Boxes, label: "Товары", badge: allProducts.length },
    { id: "pricelist", icon: FileSpreadsheet, label: "Прайс-лист" },
    { id: "callbacks", icon: PhoneCall, label: "Звонки", badge: newCallbacks },
    { id: "payments", icon: CreditCard, label: "Оплата" },
  ]

  const totalProdPages = Math.max(1, Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE))
  const safeProdPage = Math.min(prodPage, totalProdPages)
  const pagedProducts = filteredProducts.slice((safeProdPage - 1) * PRODUCTS_PER_PAGE, safeProdPage * PRODUCTS_PER_PAGE)

  // Excel handling
  const handleExcelUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setExcelFileName(file.name)
    setPriceApplied(false)
    setMatchResults([])
    const data = await file.arrayBuffer()
    const wb = XLSX.read(data)
    const ws = wb.Sheets[wb.SheetNames[0]]
    const json = XLSX.utils.sheet_to_json<Record<string, string | number>>(ws)
    setExcelData(json)
    if (json.length > 0) {
      const cols = Object.keys(json[0])
      const nameGuess = cols.find((c) => /наименование|название|name|товар|номенклатура/i.test(c)) || cols[0]
      const priceGuess = cols.find((c) => /цена|price|стоимость|прайс|розн/i.test(c)) || cols[1] || ""
      setExcelNameCol(nameGuess)
      setExcelPriceCol(priceGuess)
    }
  }

  const normalize = (s: string) => s.toLowerCase().replace(/[^а-яёa-z0-9]/g, "")

  const runMatching = () => {
    if (!excelNameCol || !excelPriceCol) return
    const results: typeof matchResults = []
    for (const row of excelData) {
      const rawName = String(row[excelNameCol] || "").trim()
      const rawPrice = parseFloat(String(row[excelPriceCol] || "0").replace(/[^\d.,]/g, "").replace(",", "."))
      if (!rawName || isNaN(rawPrice) || rawPrice <= 0) continue
      const normName = normalize(rawName)
      let bestMatch: { id: number; name: string; score: number } | null = null
      for (const p of allProducts) {
        const normP = normalize(p.name)
        if (normP === normName) { bestMatch = { id: p.id, name: p.name, score: 1 }; break }
        if (normP.includes(normName) || normName.includes(normP)) {
          const score = Math.min(normP.length, normName.length) / Math.max(normP.length, normName.length)
          if (!bestMatch || score > bestMatch.score) bestMatch = { id: p.id, name: p.name, score }
        }
      }
      results.push({
        excelName: rawName,
        price: rawPrice,
        productId: bestMatch && bestMatch.score >= 0.5 ? bestMatch.id : null,
        productName: bestMatch && bestMatch.score >= 0.5 ? bestMatch.name : "",
        score: bestMatch?.score ?? 0,
      })
    }
    setMatchResults(results)
  }

  const applyPrices = () => {
    let count = 0
    for (const m of matchResults) {
      if (m.productId !== null) {
        updateProductPrice(m.productId, m.price)
        count++
      }
    }
    setPriceApplied(true)
  }

  const matchedCount = matchResults.filter((m) => m.productId !== null).length

  // Status helpers
  const statusColors: Record<CallbackRequest["status"], string> = {
    new: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    processing: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    done: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  }
  const statusLabels: Record<CallbackRequest["status"], string> = { new: "Новая", processing: "В работе", done: "Выполнена" }
  const orderStatusLabels: Record<string, string> = { pending: "Ожидает", processing: "В обработке", shipped: "Отправлен", delivered: "Доставлен", cancelled: "Отменён" }
  const spStatusColors: Record<ServicePayment["status"], string> = {
    paid: "bg-emerald-500/10 text-emerald-600",
    expiring: "bg-amber-500/10 text-amber-600",
    overdue: "bg-red-500/10 text-red-600",
  }
  const spStatusLabels: Record<ServicePayment["status"], string> = { paid: "Оплачен", expiring: "Истекает", overdue: "Просрочен" }

  const resetSpForm = () => { setSpName(""); setSpCost(""); setSpDate(""); setSpStatus("paid"); setSpDesc(""); setSpEditId(null); setSpFormOpen(false) }

  const handleSpSave = () => {
    if (!spName.trim() || !spCost.trim() || !spDate) return
    if (spEditId) {
      updateServicePayment(spEditId, { name: spName.trim(), cost: parseFloat(spCost), nextPaymentDate: spDate, status: spStatus, description: spDesc.trim() || undefined })
    } else {
      addServicePayment({ name: spName.trim(), cost: parseFloat(spCost), nextPaymentDate: spDate, status: spStatus, description: spDesc.trim() || undefined })
    }
    resetSpForm()
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="hidden w-64 flex-col border-r border-border bg-card lg:flex">
        <div className="flex h-16 items-center gap-2 border-b border-border px-6">
          <ShieldCheck className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold text-foreground">Админ</span>
        </div>
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => { setActiveTab(tab.id); setProdPage(1) }}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${activeTab === tab.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}>
              <tab.icon className="h-5 w-5" />
              <span className="flex-1 text-left">{tab.label}</span>
              {tab.badge !== undefined && tab.badge > 0 && (
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${activeTab === tab.id ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted-foreground/10 text-muted-foreground"}`}>{tab.badge}</span>
              )}
            </button>
          ))}
        </nav>
        <div className="border-t border-border p-3 space-y-1">
          <Link href="/" className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
            <ArrowLeft className="h-5 w-5" />На сайт
          </Link>
          <button onClick={() => { logout(); router.push("/") }} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-500 hover:bg-red-500/10 transition-colors">
            <LogOut className="h-5 w-5" />Выйти
          </button>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        {/* Mobile header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-card px-4 lg:hidden">
          <div className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-primary" /><span className="font-bold">Админ</span></div>
          <Link href="/"><Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button></Link>
        </header>
        {/* Mobile tabs */}
        <div className="flex overflow-x-auto border-b border-border bg-card lg:hidden">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => { setActiveTab(tab.id); setProdPage(1) }}
              className={`flex shrink-0 items-center gap-2 px-4 py-3 text-sm border-b-2 transition-colors ${activeTab === tab.id ? "border-primary text-primary" : "border-transparent text-muted-foreground"}`}>
              <tab.icon className="h-4 w-4" />{tab.label}
              {tab.badge !== undefined && tab.badge > 0 && <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-xs font-medium text-primary">{tab.badge}</span>}
            </button>
          ))}
        </div>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">

          {/* ===== DASHBOARD ===== */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold text-foreground">Обзор</h1>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                <DashCard icon={Package} label="Заказы" value={orders.length} sub="всего" color="text-blue-500" bg="bg-blue-500/10" />
                <DashCard icon={ShoppingCart} label="Выручка" value={`${totalRevenue.toLocaleString("ru-RU")} ₽`} sub="примерная" color="text-emerald-500" bg="bg-emerald-500/10" />
                <DashCard icon={Boxes} label="Товары" value={allProducts.length} sub={`${categories.length} категорий`} color="text-purple-500" bg="bg-purple-500/10" />
                <DashCard icon={PhoneCall} label="Звонки" value={newCallbacks} sub="новых заявок" color="text-amber-500" bg="bg-amber-500/10" />
                <DashCard icon={Users} label="Посещения" value={siteVisits} sub="всего визитов" color="text-cyan-500" bg="bg-cyan-500/10" />
              </div>

              {callbackRequests.length > 0 && (
                <div className="rounded-xl border border-border bg-card p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="font-semibold text-foreground">Последние заявки на звонок</h2>
                    <Button variant="ghost" size="sm" onClick={() => setActiveTab("callbacks")}>Все<ChevronDown className="ml-1 h-4 w-4 -rotate-90" /></Button>
                  </div>
                  <div className="space-y-2">
                    {callbackRequests.slice(0, 5).map((req) => (
                      <div key={req.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                        <div className="flex-1"><p className="font-medium text-foreground">{req.name}</p><p className="text-sm text-muted-foreground">{req.phone}</p></div>
                        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusColors[req.status]}`}>{statusLabels[req.status]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {orders.length > 0 && (
                <div className="rounded-xl border border-border bg-card p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="font-semibold text-foreground">Последние заказы</h2>
                    <Button variant="ghost" size="sm" onClick={() => setActiveTab("orders")}>Все<ChevronDown className="ml-1 h-4 w-4 -rotate-90" /></Button>
                  </div>
                  <div className="space-y-2">
                    {orders.slice(0, 5).map((order) => (
                      <div key={order.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                        <div><p className="font-medium text-foreground">{order.id}</p><p className="text-sm text-muted-foreground">{new Date(order.date).toLocaleDateString("ru-RU")} — {order.email}</p></div>
                        <div className="text-right"><p className="font-semibold">{order.total.toLocaleString("ru-RU")} ₽</p><p className="text-xs text-muted-foreground">{orderStatusLabels[order.status]}</p></div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ===== ORDERS ===== */}
          {activeTab === "orders" && (
            <div className="space-y-4">
              <h1 className="text-2xl font-bold text-foreground">Заказы</h1>
              {orders.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16"><Package className="mb-4 h-16 w-16 text-muted-foreground/30" /><p className="text-muted-foreground">Заказов пока нет</p></div>
              ) : (
                <div className="space-y-3">
                  {orders.map((order) => (
                    <div key={order.id} className="rounded-xl border border-border bg-card p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2"><Package className="h-4 w-4 text-primary" /><span className="font-semibold text-foreground">{order.id}</span></div>
                          <p className="mt-1 text-sm text-muted-foreground">{new Date(order.date).toLocaleString("ru-RU")}</p>
                          <p className="text-sm text-muted-foreground">{order.email}</p>
                        </div>
                        <div className="text-right"><p className="text-lg font-bold">{order.total.toLocaleString("ru-RU")} ₽</p><span className="text-xs text-muted-foreground">{orderStatusLabels[order.status]}</span></div>
                      </div>
                      <div className="border-t border-border pt-3">
                        <p className="mb-2 text-sm font-medium text-muted-foreground">Товары ({order.items.length}):</p>
                        <div className="space-y-1">{order.items.map((item, idx) => (<div key={idx} className="flex items-center justify-between text-sm"><span className="text-foreground">{item.name}</span><span className="text-muted-foreground">x{item.quantity}</span></div>))}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ===== PRODUCTS ===== */}
          {activeTab === "products" && (
            <div className="space-y-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-2xl font-bold text-foreground">Товары ({filteredProducts.length})</h1>
                <div className="flex items-center gap-3">
                  {Object.keys(priceOverrides).length > 0 && (
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">{Object.keys(priceOverrides).length} цен изменено</span>
                  )}
                  <div className="relative max-w-sm">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="Поиск по названию, артикулу, ID..." value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setProdPage(1) }} className="pl-9" />
                  </div>
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-3">
                <select value={prodCategoryFilter} onChange={(e) => { setProdCategoryFilter(e.target.value); setProdPage(1) }}
                  className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground">
                  <option value="">Все категории</option>
                  {categories.filter((c) => c.id !== "all").map((c) => (<option key={c.id} value={c.id}>{c.name}</option>))}
                </select>
                <select value={prodPriceFilter} onChange={(e) => { setProdPriceFilter(e.target.value as typeof prodPriceFilter); setProdPage(1) }}
                  className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground">
                  <option value="all">Цена: все</option>
                  <option value="with">С ценой</option>
                  <option value="without">Без цены</option>
                </select>
                <select value={prodStockFilter} onChange={(e) => { setProdStockFilter(e.target.value as typeof prodStockFilter); setProdPage(1) }}
                  className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground">
                  <option value="all">Наличие: все</option>
                  <option value="instock">В наличии</option>
                  <option value="order">Под заказ</option>
                </select>
              </div>

              <div className="overflow-hidden rounded-xl border border-border">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border bg-muted/50">
                        <th className="px-4 py-3 text-left font-medium text-muted-foreground">ID</th>
                        <th className="px-4 py-3 text-left font-medium text-muted-foreground">Название</th>
                        <th className="px-4 py-3 text-left font-medium text-muted-foreground">Категория</th>
                        <th className="px-4 py-3 text-left font-medium text-muted-foreground">Артикул</th>
                        <th className="px-4 py-3 text-left font-medium text-muted-foreground">Цена (₽)</th>
                        <th className="px-4 py-3 text-left font-medium text-muted-foreground">Наличие</th>
                        <th className="px-4 py-3 text-right font-medium text-muted-foreground">Действия</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pagedProducts.map((product) => {
                        const currentPrice = getProductPrice(product.id, product.price)
                        const isEditing = editingPriceId === product.id
                        const isOverridden = product.id in priceOverrides
                        return (
                          <tr key={product.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                            <td className="px-4 py-3 text-muted-foreground">{product.id}</td>
                            <td className="px-4 py-3 font-medium text-foreground max-w-[200px] truncate">{product.name}</td>
                            <td className="px-4 py-3 text-muted-foreground text-xs">{product.categoryName}</td>
                            <td className="px-4 py-3 text-muted-foreground text-xs">{product.article || "—"}</td>
                            <td className="px-4 py-3">
                              {isEditing ? (
                                <div className="flex items-center gap-1">
                                  <Input type="number" value={editingPriceValue} onChange={(e) => setEditingPriceValue(e.target.value)} className="h-8 w-28 text-sm" placeholder="0" min="0" autoFocus
                                    onKeyDown={(e) => { if (e.key === "Enter") { const val = parseFloat(editingPriceValue); if (!isNaN(val) && val >= 0) updateProductPrice(product.id, val); else if (editingPriceValue === "") updateProductPrice(product.id, null); setEditingPriceId(null) } else if (e.key === "Escape") setEditingPriceId(null) }} />
                                  <button onClick={() => { const val = parseFloat(editingPriceValue); if (!isNaN(val) && val >= 0) updateProductPrice(product.id, val); else if (editingPriceValue === "") updateProductPrice(product.id, null); setEditingPriceId(null) }} className="rounded p-1 text-emerald-600 hover:bg-emerald-500/10"><Check className="h-4 w-4" /></button>
                                  <button onClick={() => setEditingPriceId(null)} className="rounded p-1 text-muted-foreground hover:bg-muted"><X className="h-4 w-4" /></button>
                                </div>
                              ) : (
                                <div className="flex items-center gap-1.5">
                                  <span className={isOverridden ? "text-primary font-medium" : ""}>{currentPrice ? `${currentPrice.toLocaleString("ru-RU")} ₽` : "—"}</span>
                                  {isOverridden && <span className="rounded bg-primary/10 px-1 py-0.5 text-[10px] text-primary">изм.</span>}
                                  <button onClick={() => { setEditingPriceId(product.id); setEditingPriceValue(currentPrice ? String(currentPrice) : "") }} className="rounded p-1 text-muted-foreground/50 hover:text-primary hover:bg-primary/10 transition-colors" title="Изменить цену"><Pencil className="h-3.5 w-3.5" /></button>
                                </div>
                              )}
                            </td>
                            <td className="px-4 py-3">
                              <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${product.inStock ? "bg-emerald-500/10 text-emerald-600" : "bg-amber-500/10 text-amber-600"}`}>{product.inStock ? "Есть" : "Под заказ"}</span>
                            </td>
                            <td className="px-4 py-3 text-right"><Link href={`/product/${product.id}`}><Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button></Link></td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
                {/* Pagination */}
                <div className="flex items-center justify-between border-t border-border bg-muted/30 px-4 py-3">
                  <span className="text-sm text-muted-foreground">Страница {safeProdPage} из {totalProdPages} ({filteredProducts.length} товаров)</span>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" disabled={safeProdPage <= 1} onClick={() => setProdPage(safeProdPage - 1)} className="bg-transparent"><ChevronLeft className="h-4 w-4" /></Button>
                    <Button variant="outline" size="sm" disabled={safeProdPage >= totalProdPages} onClick={() => setProdPage(safeProdPage + 1)} className="bg-transparent"><ChevronRight className="h-4 w-4" /></Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===== PRICELIST ===== */}
          {activeTab === "pricelist" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold text-foreground">Прайс-лист</h1>
              <p className="text-sm text-muted-foreground">Загрузите Excel-файл с прайс-листом (.xls, .xlsx) для автоматического обновления цен на товары.</p>

              <div className="rounded-xl border border-border bg-card p-6">
                <input ref={fileInputRef} type="file" accept=".xls,.xlsx,.csv" onChange={handleExcelUpload} className="hidden" />
                <div className="flex flex-col items-center gap-4 sm:flex-row">
                  <Button onClick={() => fileInputRef.current?.click()} variant="outline" className="gap-2 bg-transparent">
                    <Upload className="h-4 w-4" />Загрузить файл
                  </Button>
                  {excelFileName && <span className="flex items-center gap-2 text-sm text-foreground"><FileSpreadsheet className="h-4 w-4 text-emerald-500" />{excelFileName} — {excelData.length} строк</span>}
                </div>

                {excelData.length > 0 && (
                  <div className="mt-6 space-y-4">
                    <div className="flex flex-wrap gap-4">
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-foreground">Колонка названия</label>
                        <select value={excelNameCol} onChange={(e) => setExcelNameCol(e.target.value)} className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground">
                          {Object.keys(excelData[0]).map((col) => (<option key={col} value={col}>{col}</option>))}
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-foreground">Колонка цены</label>
                        <select value={excelPriceCol} onChange={(e) => setExcelPriceCol(e.target.value)} className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground">
                          {Object.keys(excelData[0]).map((col) => (<option key={col} value={col}>{col}</option>))}
                        </select>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button onClick={runMatching} className="gap-2"><Search className="h-4 w-4" />Найти совпадения</Button>
                      {matchResults.length > 0 && !priceApplied && (
                        <Button onClick={applyPrices} variant="default" className="gap-2 bg-emerald-600 hover:bg-emerald-700"><Check className="h-4 w-4" />Применить ({matchedCount} совпадений)</Button>
                      )}
                    </div>

                    {priceApplied && (
                      <div className="rounded-lg bg-emerald-500/10 p-4 text-sm text-emerald-700 dark:text-emerald-400">
                        <CheckCircle2 className="mr-2 inline h-4 w-4" />Обновлено цен: {matchedCount} из {matchResults.length} позиций в Excel.
                      </div>
                    )}

                    {matchResults.length > 0 && (
                      <div className="overflow-hidden rounded-xl border border-border">
                        <div className="overflow-x-auto max-h-96">
                          <table className="w-full text-sm">
                            <thead className="sticky top-0 bg-muted/90">
                              <tr className="border-b border-border">
                                <th className="px-3 py-2 text-left font-medium text-muted-foreground">Название в Excel</th>
                                <th className="px-3 py-2 text-left font-medium text-muted-foreground">Цена</th>
                                <th className="px-3 py-2 text-left font-medium text-muted-foreground">Совпадение на сайте</th>
                                <th className="px-3 py-2 text-left font-medium text-muted-foreground">Точность</th>
                              </tr>
                            </thead>
                            <tbody>
                              {matchResults.slice(0, 100).map((m, i) => (
                                <tr key={i} className={`border-b border-border last:border-0 ${m.productId ? "" : "opacity-50"}`}>
                                  <td className="px-3 py-2 max-w-[200px] truncate text-foreground">{m.excelName}</td>
                                  <td className="px-3 py-2 text-foreground">{m.price.toLocaleString("ru-RU")} ₽</td>
                                  <td className="px-3 py-2 max-w-[200px] truncate">{m.productId ? <span className="text-emerald-600">{m.productName}</span> : <span className="text-muted-foreground">Не найден</span>}</td>
                                  <td className="px-3 py-2">{m.productId ? <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 text-xs text-emerald-600">{Math.round(m.score * 100)}%</span> : "—"}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        {matchResults.length > 100 && (
                          <div className="border-t border-border bg-muted/30 px-4 py-2 text-center text-xs text-muted-foreground">Показано 100 из {matchResults.length}</div>
                        )}
                      </div>
                    )}

                    {/* Preview first rows */}
                    {matchResults.length === 0 && (
                      <div className="overflow-hidden rounded-xl border border-border">
                        <p className="bg-muted/50 px-4 py-2 text-xs font-medium text-muted-foreground">Предпросмотр (первые 10 строк)</p>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead><tr className="border-b border-border bg-muted/30">{Object.keys(excelData[0]).map((col) => (<th key={col} className={`px-3 py-2 text-left text-xs font-medium ${col === excelNameCol || col === excelPriceCol ? "text-primary" : "text-muted-foreground"}`}>{col}{col === excelNameCol ? " (название)" : col === excelPriceCol ? " (цена)" : ""}</th>))}</tr></thead>
                            <tbody>{excelData.slice(0, 10).map((row, i) => (<tr key={i} className="border-b border-border last:border-0">{Object.entries(row).map(([k, v]) => (<td key={k} className="px-3 py-2 text-xs text-foreground max-w-[150px] truncate">{String(v)}</td>))}</tr>))}</tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ===== CALLBACKS ===== */}
          {activeTab === "callbacks" && (
            <div className="space-y-4">
              <h1 className="text-2xl font-bold text-foreground">Заявки на обратный звонок ({callbackRequests.length})</h1>
              {callbackRequests.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16"><PhoneCall className="mb-4 h-16 w-16 text-muted-foreground/30" /><p className="text-muted-foreground">Заявок пока нет</p></div>
              ) : (
                <div className="space-y-3">
                  {callbackRequests.map((req) => (
                    <div key={req.id} className="rounded-xl border border-border bg-card p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold text-foreground">{req.name}</p>
                          <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                            <Phone className="h-3.5 w-3.5" />
                            {safeTelHref(req.phone) ? (<a href={`tel:${safeTelHref(req.phone)}`} className="hover:text-primary">{req.phone}</a>) : (<span>{req.phone}</span>)}
                          </div>
                          <p className="mt-1 text-xs text-muted-foreground">{new Date(req.date).toLocaleString("ru-RU")}</p>
                        </div>
                        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusColors[req.status]}`}>{statusLabels[req.status]}</span>
                      </div>
                      {req.message && <p className="rounded-lg bg-muted/50 p-3 text-sm text-foreground">{req.message}</p>}
                      <div className="flex gap-2 border-t border-border pt-3">
                        {req.status !== "processing" && <Button variant="outline" size="sm" onClick={() => updateCallbackStatus(req.id, "processing")} className="bg-transparent"><Clock className="mr-1.5 h-3.5 w-3.5" />В работу</Button>}
                        {req.status !== "done" && <Button variant="outline" size="sm" onClick={() => updateCallbackStatus(req.id, "done")} className="bg-transparent text-emerald-600 hover:text-emerald-700"><CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />Выполнена</Button>}
                        {req.status === "done" && <Button variant="outline" size="sm" onClick={() => updateCallbackStatus(req.id, "new")} className="bg-transparent"><XCircle className="mr-1.5 h-3.5 w-3.5" />Переоткрыть</Button>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ===== PAYMENTS ===== */}
          {activeTab === "payments" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-foreground">Оплата сервисов</h1>
                <Button onClick={() => { resetSpForm(); setSpFormOpen(true) }} className="gap-2"><Plus className="h-4 w-4" />Добавить</Button>
              </div>
              <p className="text-sm text-muted-foreground">Управление оплатой сервисов (хостинг, домен, API и т.д.).</p>

              {spFormOpen && (
                <div className="rounded-xl border border-border bg-card p-5 space-y-4">
                  <h3 className="font-semibold text-foreground">{spEditId ? "Редактировать" : "Добавить"} сервис</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5"><label className="text-sm font-medium text-foreground">Название *</label><Input value={spName} onChange={(e) => setSpName(e.target.value)} placeholder="Хостинг, домен и т.д." maxLength={200} /></div>
                    <div className="space-y-1.5"><label className="text-sm font-medium text-foreground">Стоимость (₽) *</label><Input type="number" value={spCost} onChange={(e) => setSpCost(e.target.value)} placeholder="0" min="0" /></div>
                    <div className="space-y-1.5"><label className="text-sm font-medium text-foreground">Дата следующей оплаты *</label><Input type="date" value={spDate} onChange={(e) => setSpDate(e.target.value)} /></div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground">Статус</label>
                      <select value={spStatus} onChange={(e) => setSpStatus(e.target.value as ServicePayment["status"])} className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground">
                        <option value="paid">Оплачен</option><option value="expiring">Истекает</option><option value="overdue">Просрочен</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-1.5"><label className="text-sm font-medium text-foreground">Описание</label><Input value={spDesc} onChange={(e) => setSpDesc(e.target.value)} placeholder="Комментарий (необязательно)" maxLength={500} /></div>
                  <div className="flex gap-3">
                    <Button onClick={handleSpSave} disabled={!spName.trim() || !spCost.trim() || !spDate}><Check className="mr-1.5 h-4 w-4" />Сохранить</Button>
                    <Button variant="outline" onClick={resetSpForm} className="bg-transparent">Отмена</Button>
                  </div>
                </div>
              )}

              {servicePayments.length === 0 && !spFormOpen ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <CreditCard className="mb-4 h-16 w-16 text-muted-foreground/30" />
                  <p className="text-muted-foreground">Сервисов пока нет</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {servicePayments.map((sp) => {
                    const daysLeft = Math.ceil((new Date(sp.nextPaymentDate).getTime() - Date.now()) / 86400000)
                    return (
                      <div key={sp.id} className="rounded-xl border border-border bg-card p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3">
                              <h3 className="font-semibold text-foreground">{sp.name}</h3>
                              <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${spStatusColors[sp.status]}`}>{spStatusLabels[sp.status]}</span>
                            </div>
                            {sp.description && <p className="mt-1 text-sm text-muted-foreground">{sp.description}</p>}
                            <div className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground">
                              <span>Стоимость: <strong className="text-foreground">{sp.cost.toLocaleString("ru-RU")} ₽</strong></span>
                              <span>Следующая оплата: <strong className={daysLeft <= 7 ? "text-amber-600" : daysLeft <= 0 ? "text-red-600" : "text-foreground"}>{new Date(sp.nextPaymentDate).toLocaleDateString("ru-RU")}</strong></span>
                              {daysLeft <= 7 && daysLeft > 0 && <span className="flex items-center gap-1 text-amber-600"><AlertTriangle className="h-3.5 w-3.5" />Через {daysLeft} дн.</span>}
                              {daysLeft <= 0 && <span className="flex items-center gap-1 text-red-600"><AlertTriangle className="h-3.5 w-3.5" />Просрочен</span>}
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <button onClick={() => { setSpEditId(sp.id); setSpName(sp.name); setSpCost(String(sp.cost)); setSpDate(sp.nextPaymentDate); setSpStatus(sp.status); setSpDesc(sp.description || ""); setSpFormOpen(true) }} className="rounded p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"><Pencil className="h-4 w-4" /></button>
                            <button onClick={() => removeServicePayment(sp.id)} className="rounded p-2 text-muted-foreground hover:bg-red-500/10 hover:text-red-500 transition-colors"><Trash2 className="h-4 w-4" /></button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )}

        </main>
      </div>
    </div>
  )
}

function DashCard({ icon: Icon, label, value, sub, color, bg }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string | number; sub: string; color: string; bg: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
        <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${bg}`}><Icon className={`h-5 w-5 ${color}`} /></div>
      </div>
      <p className="text-2xl font-bold text-foreground">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{sub}</p>
    </div>
  )
}
