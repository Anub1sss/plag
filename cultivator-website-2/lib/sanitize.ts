const HTML_ENTITIES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;",
  "/": "&#x2F;",
  "`": "&#96;",
}

const ENTITY_RE = /[&<>"'`/]/g

/**
 * Escapes HTML special characters to prevent XSS when string
 * might end up in innerHTML or dangerouslySetInnerHTML contexts.
 * React's JSX already escapes text nodes, so this is a defence-in-depth measure
 * for data stored in localStorage / passed to APIs.
 */
export function escapeHtml(str: string): string {
  return str.replace(ENTITY_RE, (char) => HTML_ENTITIES[char] || char)
}

/**
 * Strips all HTML tags from a string.
 */
export function stripTags(str: string): string {
  return str.replace(/<[^>]*>/g, "")
}

/**
 * Sanitizes a general text input: trims, strips HTML tags,
 * and limits length to prevent oversized payloads.
 */
export function sanitizeText(str: string, maxLength = 500): string {
  return stripTags(str).trim().slice(0, maxLength)
}

/**
 * Validates and sanitizes an email address.
 * Returns sanitized email or empty string if invalid.
 */
export function sanitizeEmail(email: string): string {
  const cleaned = stripTags(email).trim().toLowerCase().slice(0, 254)
  const emailRe = /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/
  return emailRe.test(cleaned) ? cleaned : ""
}

/**
 * Validates and sanitizes a phone number.
 * Allows digits, spaces, +, -, (, ) only.
 */
export function sanitizePhone(phone: string): string {
  const cleaned = phone.replace(/[^\d\s+\-()]/g, "").trim().slice(0, 30)
  return cleaned
}

/**
 * Validates that a phone value is safe for use in tel: links.
 * Returns sanitized phone or empty string if suspicious.
 */
export function safeTelHref(phone: string): string {
  const cleaned = sanitizePhone(phone)
  if (!cleaned || cleaned.length < 5) return ""
  if (/javascript:/i.test(phone) || /data:/i.test(phone)) return ""
  return cleaned
}

/**
 * Sanitizes a numeric price input.
 * Returns a valid non-negative number or null.
 */
export function sanitizePrice(value: string | number): number | null {
  const num = typeof value === "string" ? parseFloat(value) : value
  if (isNaN(num) || !isFinite(num) || num < 0) return null
  return Math.round(num * 100) / 100
}

/**
 * Safely parses JSON from localStorage with a fallback.
 * Catches parse errors to prevent crashes from tampered storage.
 */
export function safeJsonParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback
  try {
    const parsed = JSON.parse(raw)
    return parsed as T
  } catch {
    return fallback
  }
}

/**
 * Sanitizes chat message content for sending to an API.
 * Strips tags, limits length, and removes control characters.
 */
export function sanitizeChatMessage(content: string, maxLength = 4000): string {
  // eslint-disable-next-line no-control-regex
  return stripTags(content).replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "").trim().slice(0, maxLength)
}

/**
 * Sanitizes a password — only trims and limits length,
 * no stripping since passwords may contain special chars.
 */
export function sanitizePassword(password: string, maxLength = 128): string {
  return password.slice(0, maxLength)
}
