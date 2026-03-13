"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send, Bot, Loader2 } from "lucide-react"

interface Message {
  role: "user" | "assistant"
  content: string
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Здравствуйте! Я AI-ассистент. Помогу подобрать запчасти для вашей сельхозтехники, расскажу о наличии и ценах.",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = { role: "user", content: input.trim() }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({ role: m.role, content: m.content })),
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Ошибка ответа")
      }

      const assistantMessage: Message = {
        role: "assistant",
        content: data.content ?? "Не удалось получить ответ.",
      }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (err) {
      const text = err instanceof Error ? err.message : "Ошибка соединения. Проверьте интернет и попробуйте снова."
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `⚠️ ${text}` },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary shadow-[0_0_30px_oklch(0.62_0.19_150/0.3)] transition-all hover:scale-110 hover:shadow-[0_0_40px_oklch(0.62_0.19_150/0.5)]"
      >
        <MessageCircle className="h-6 w-6 text-primary-foreground" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-md" onClick={() => setIsOpen(false)} />
          <div className="relative flex h-[500px] w-full max-w-md flex-col overflow-hidden rounded-3xl glass-strong shadow-2xl shadow-black/30 animate-slide-up">
            <div className="flex items-center justify-between border-b border-white/[0.06] bg-primary/90 p-4 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                  <Bot className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary-foreground">AI Ассистент</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]" />
                    <p className="text-xs text-primary-foreground/70">Онлайн</p>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="rounded-full p-2 transition-colors hover:bg-white/10">
                <X className="h-5 w-5 text-primary-foreground" />
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                      message.role === "user"
                        ? "rounded-br-md bg-primary text-primary-foreground"
                        : "rounded-bl-md border border-border/30 bg-card/50 text-foreground backdrop-blur-sm"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-white/[0.06] p-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSend()
                }}
                className="flex gap-2"
              >
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Введите сообщение..."
                  className="flex-1 rounded-full border-border/30 bg-card/30 backdrop-blur-sm"
                  maxLength={4000}
                />
                <Button
                  type="submit"
                  size="icon"
                  className="h-10 w-10 shrink-0 rounded-full btn-glow"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
