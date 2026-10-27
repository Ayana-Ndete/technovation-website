import { createError, getRouterParam } from "h3"
import { db } from "../../utils/db"

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug") || ""
  const post = await db.post.findFirst({ where: { slug, status: "PUBLISHED" } })
  if (!post) throw createError({ statusCode: 404, statusMessage: "Post not found" })

  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    summary: post.summary,
    topic: post.topic,
    kind: post.kind,
    author: post.author,
    date: (post.publishedAt ?? post.createdAt).toISOString().slice(0, 10),
    body: post.body,
  }
})
