import { createError } from "h3"

const topics = new Set(["Java", "DevOps"])
const kinds = new Set(["Error & solution", "Code snippet", "Guide"])
const statuses = new Set(["DRAFT", "PUBLISHED"])

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 100)
}

export function validatePostInput(input: any) {
  const title = String(input?.title ?? "").trim()
  const summary = String(input?.summary ?? "").trim()
  const topic = String(input?.topic ?? "").trim()
  const kind = String(input?.kind ?? "").trim()
  const author = String(input?.author ?? "").trim()
  const body = String(input?.body ?? "").trim()
  const status = String(input?.status ?? "DRAFT").trim().toUpperCase()

  if (!title || !summary || !author || !body) {
    throw createError({ statusCode: 400, statusMessage: "Title, summary, author and content are required" })
  }
  if (!topics.has(topic)) throw createError({ statusCode: 400, statusMessage: "Invalid topic" })
  if (!kinds.has(kind)) throw createError({ statusCode: 400, statusMessage: "Invalid post type" })
  if (!statuses.has(status)) throw createError({ statusCode: 400, statusMessage: "Invalid status" })

  return { title, summary, topic, kind, author, body, status }
}
