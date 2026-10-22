import { createError, getRouterParam } from "h3"
import { requireAdmin } from "../../../utils/auth"
import { db } from "../../../utils/db"

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const id = getRouterParam(event, "id") || ""
  const existing = await db.post.findUnique({ where: { id } })
  if (!existing) throw createError({ statusCode: 404, statusMessage: "Post not found" })
  await db.post.delete({ where: { id } })
  return { ok: true }
})
