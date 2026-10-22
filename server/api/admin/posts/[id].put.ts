import { createError, getRouterParam, readBody } from "h3"
import { requireAdmin } from "../../../utils/auth"
import { db } from "../../../utils/db"
import { validatePostInput } from "../../../utils/posts"

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const id = getRouterParam(event, "id") || ""
  const existing = await db.post.findUnique({ where: { id } })
  if (!existing) throw createError({ statusCode: 404, statusMessage: "Post not found" })

  const input = validatePostInput(await readBody(event))
  return db.post.update({
    where: { id },
    data: {
      ...input,
      publishedAt:
        input.status === "PUBLISHED"
          ? existing.publishedAt ?? new Date()
          : null,
    },
  })
})
