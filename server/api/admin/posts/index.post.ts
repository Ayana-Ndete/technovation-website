import { readBody } from "h3"
import { requireAdmin } from "../../../utils/auth"
import { db } from "../../../utils/db"
import { slugify, validatePostInput } from "../../../utils/posts"

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const input = validatePostInput(await readBody(event))

  const base = slugify(input.title) || `post-${Date.now()}`
  let slug = base
  let suffix = 2
  while (await db.post.findUnique({ where: { slug } })) slug = `${base}-${suffix++}`

  return db.post.create({
    data: {
      ...input,
      slug,
      publishedAt: input.status === "PUBLISHED" ? new Date() : null,
    },
  })
})
