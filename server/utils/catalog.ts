import { createError, getRouterParam, readBody, setHeader, type H3Event } from "h3"
import { Prisma } from "@prisma/client"
import { db } from "./db"
import { requireAdmin } from "./auth"
import { projectLocations, type CatalogKind } from "../../shared/catalog"

function invalid(message: string): never {
  throw createError({ statusCode: 400, statusMessage: message })
}

function text(input: Record<string, unknown>, key: string, max: number, required = false) {
  const value = input[key] ?? ""
  if (typeof value !== "string") invalid(`Invalid ${key}`)
  const result = value.trim()
  if (required && !result) invalid(`${key} is required`)
  if (result.length > max) invalid(`${key} must be at most ${max} characters`)
  return result
}

function url(value: string, label: string, mail = false) {
  if (!value) return value
  if (/[\s\\\u0000-\u001f\u007f]/.test(value)) invalid(`Invalid ${label}`)
  if (value.startsWith("/") && !value.startsWith("//")) return value
  try {
    const parsed = new URL(value)
    if ((["http:", "https:"].includes(parsed.protocol) && !parsed.username && !parsed.password) ||
      (mail && parsed.protocol === "mailto:" && parsed.pathname.includes("@"))) return value
  } catch { /* Report a useful validation error below. */ }
  invalid(`${label} must be a website URL${mail ? ", email link," : ""} or a path starting with /`)
}

function flag(input: Record<string, unknown>, key: string, fallback: boolean) {
  const value = input[key] ?? fallback
  if (typeof value !== "boolean") invalid(`Invalid ${key}`)
  return value
}

function validate(input: unknown, kind: CatalogKind) {
  if (!input || typeof input !== "object" || Array.isArray(input)) invalid("Invalid content")
  const data = input as Record<string, unknown>
  const status = data.status ?? "DRAFT"
  if (status !== "DRAFT" && status !== "PUBLISHED") invalid("Invalid status")
  const sortOrder = data.sortOrder ?? 0
  if (typeof sortOrder !== "number" || !Number.isInteger(sortOrder) || sortOrder < 0 || sortOrder > 10000) {
    invalid("Display order must be a whole number between 0 and 10000")
  }
  const features = data.features ?? []
  if (!Array.isArray(features) || features.length > 12 ||
    features.some(value => typeof value !== "string" || !value.trim() || value.length > 120)) {
    invalid("Add up to 12 features, each between 1 and 120 characters")
  }
  const common = {
    name: text(data, "name", 140, true),
    description: text(data, "description", 3000, true),
    category: text(data, "category", 80, true),
    image: url(text(data, "image", 2000), "Image"),
    imageAlt: text(data, "imageAlt", 200),
    features: [...new Set((features as string[]).map(value => value.trim()))],
    status, sortOrder,
  }
  const place = kind === "projects" ? text(data, "place", 80, true) : ""
  if (kind === "projects" && !projectLocations.includes(place as typeof projectLocations[number])) invalid("Invalid project location")
  if (kind === "projects" && status === "PUBLISHED" && !common.image) invalid("Add an image before publishing this project")
  return {
    common,
    project: {
      place,
      showInExplorer: flag(data, "showInExplorer", true),
      featured: flag(data, "featured", false),
      client: text(data, "client", 100),
      imageCreditUrl: url(text(data, "imageCreditUrl", 2000), "Image credit"),
    },
    product: { enquiryUrl: url(text(data, "enquiryUrl", 2000), "Enquiry link", true) },
  }
}

const orderBy = [{ sortOrder: "asc" }, { createdAt: "asc" }, { id: "asc" }] as const

export async function listCatalog(event: H3Event, kind: CatalogKind, admin = false) {
  if (admin) await requireAdmin(event)
  setHeader(event, "Cache-Control", "no-store")
  const query = { where: admin ? {} : { status: "PUBLISHED" }, orderBy: [...orderBy] }
  const items = kind === "projects" ? await db.project.findMany(query) : await db.product.findMany(query)
  const baseURL = useRuntimeConfig(event).app.baseURL.replace(/\/$/, "")
  return items.map(item => ({
    ...item,
    image: item.image.startsWith("/") && !item.image.startsWith(`${baseURL}/`)
      ? `${baseURL}${item.image}`
      : item.image,
  }))
}

export async function getCatalogItem(event: H3Event, kind: CatalogKind) {
  await requireAdmin(event)
  const id = getRouterParam(event, "id") || ""
  const item = kind === "projects"
    ? await db.project.findUnique({ where: { id } })
    : await db.product.findUnique({ where: { id } })
  if (!item) throw createError({ statusCode: 404, statusMessage: "Item not found" })
  return item
}

export async function saveCatalogItem(event: H3Event, kind: CatalogKind, update = false) {
  await requireAdmin(event)
  const id = getRouterParam(event, "id") || ""
  const { common, project, product } = validate(await readBody(event), kind)
  try {
    if (kind === "projects") {
      const data = { ...common, ...project }
      return update ? await db.project.update({ where: { id }, data }) : await db.project.create({ data })
    }
    const data = { ...common, ...product }
    return update ? await db.product.update({ where: { id }, data }) : await db.product.create({ data })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      throw createError({ statusCode: 404, statusMessage: "Item not found" })
    }
    throw error
  }
}

export async function deleteCatalogItem(event: H3Event, kind: CatalogKind) {
  await requireAdmin(event)
  const id = getRouterParam(event, "id") || ""
  try {
    if (kind === "projects") await db.project.delete({ where: { id } })
    else await db.product.delete({ where: { id } })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      throw createError({ statusCode: 404, statusMessage: "Item not found" })
    }
    throw error
  }
  return { ok: true }
}
