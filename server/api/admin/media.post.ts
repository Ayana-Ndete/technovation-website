import { createError, getHeader, readMultipartFormData } from "h3"
import { requireAdmin } from "../../utils/auth"
import { db } from "../../utils/db"

const MAX_SIZE = 5 * 1024 * 1024

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  if (Number(getHeader(event, "content-length")) > MAX_SIZE + 16384) {
    throw createError({ statusCode: 413, statusMessage: "Images must be 5 MB or smaller" })
  }
  const parts = await readMultipartFormData(event)
  const file = parts?.find(part => part.name === "image" && part.filename)
  if (!file?.data.length) throw createError({ statusCode: 400, statusMessage: "Choose an image to upload" })
  if (file.data.length > MAX_SIZE) throw createError({ statusCode: 413, statusMessage: "Images must be 5 MB or smaller" })
  const bytes = file.data
  let contentType = ""
  if (bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) contentType = "image/png"
  else if (bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255) contentType = "image/jpeg"
  else if (["GIF87a", "GIF89a"].includes(bytes.toString("ascii", 0, 6))) contentType = "image/gif"
  else if (bytes.toString("ascii", 0, 4) === "RIFF" && bytes.toString("ascii", 8, 12) === "WEBP") contentType = "image/webp"
  if (!contentType) throw createError({ statusCode: 400, statusMessage: "Use a PNG, JPEG, GIF or WebP image" })
  const media = await db.media.create({ data: { contentType, data: new Uint8Array(bytes) }, select: { id: true } })
  return { url: `${useRuntimeConfig(event).app.baseURL}api/media/${media.id}` }
})
