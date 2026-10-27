import { requireAdmin } from "../../../utils/auth"
import { db } from "../../../utils/db"

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  return db.post.findMany({ orderBy: { updatedAt: "desc" } })
})
