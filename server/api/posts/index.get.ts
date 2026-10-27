import { db } from "../../utils/db"

export default defineEventHandler(async () => {
  const posts = await db.post.findMany({
    where: { status: "PUBLISHED" },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
  })

  return posts.map((post) => ({
    id: post.id,
    slug: post.slug,
    title: post.title,
    summary: post.summary,
    topic: post.topic,
    kind: post.kind,
    author: post.author,
    date: (post.publishedAt ?? post.createdAt).toISOString().slice(0, 10),
    body: post.body,
  }))
})
