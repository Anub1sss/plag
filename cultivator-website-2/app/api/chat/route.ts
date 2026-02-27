import { NextResponse } from "next/server"

const ZHIPU_API_URL = "https://api.z.ai/api/paas/v4/chat/completions"

export async function POST(req: Request) {
  try {
    const apiKey = process.env.ZHIPU_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: "ZHIPU_API_KEY не настроен" },
        { status: 500 }
      )
    }

    const { messages } = (await req.json()) as { messages: { role: string; content: string }[] }
    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Нужен массив messages" },
        { status: 400 }
      )
    }

    // Формат как в примере: только user/assistant, без system
    const body = {
      model: "glm-4.7-flash",
      messages: messages.map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
      max_tokens: 4096,
      temperature: 0.7,
    }

    // Retry механизм для ошибок concurrency
    let lastError: string | null = null
    const maxRetries = 3
    let res: Response | null = null

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      if (attempt > 0) {
        // Экспоненциальная задержка: 1s, 2s, 4s
        const delay = Math.pow(2, attempt - 1) * 1000
        await new Promise((resolve) => setTimeout(resolve, delay))
      }

      res = await fetch(ZHIPU_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(body),
      })

      if (res.ok) {
        break
      }

      const err = await res.text()
      let errMessage = res.status === 401 ? "Неверный ключ API" : res.statusText
      try {
        const errJson = JSON.parse(err) as { error?: { message?: string }; message?: string }
        errMessage = errJson.error?.message ?? errJson.message ?? errMessage
      } catch {
        if (err) errMessage = err.slice(0, 200)
      }

      lastError = errMessage

      // Если это не ошибка concurrency или rate limit, не повторяем
      if (
        res.status !== 429 &&
        !errMessage.toLowerCase().includes("concurrency") &&
        !errMessage.toLowerCase().includes("rate limit")
      ) {
        break
      }
    }

    if (!res || !res.ok) {
      console.error("Zhipu API error after retries:", res?.status, lastError)
      return NextResponse.json(
        {
          error:
            lastError?.includes("concurrency") || lastError?.includes("rate limit")
              ? "Слишком много запросов. Подождите немного и попробуйте снова."
              : "Ошибка API: " + (lastError || res?.statusText || "Неизвестная ошибка"),
        },
        { status: 502 }
      )
    }

    const data = (await res.json()) as {
      choices?: { message?: { content?: string } }[]
      error?: { message?: string }
    }

    if (data.error?.message) {
      return NextResponse.json({ error: data.error.message }, { status: 502 })
    }

    const content = data.choices?.[0]?.message?.content ?? "Не удалось получить ответ."
    return NextResponse.json({ content })
  } catch (e) {
    console.error("Chat API error:", e)
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Ошибка сервера" },
      { status: 500 }
    )
  }
}
