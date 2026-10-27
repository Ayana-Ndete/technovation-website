import { createError, getRouterParam, setResponseHeaders } from "h3"
import { db } from "../../utils/db"

export default defineEventHandler(async (event) => {
  const media = await db.media.findUnique({ where: { id: getRouterParam(event, "id") || "" } })
  if (!media) throw createError({ statusCode: 404, statusMessage: "Image not found" })
  setResponseHeaders(event, {
    "Content-Type": media.contentType,
    "Content-Length": media.data.length,
    "X-Content-Type-Options": "nosniff",
    "Cache-Control": "public, max-age=31536000, immutable",
  })
  return Buffer.from(media.data)
})
