import { createError, readBody } from "h3"
import { db } from "../../utils/db"
import { verifyPassword } from "../../utils/password"
import { createAdminSession } from "../../utils/auth"

export default defineEventHandler(async (event) => {
  const body = await readBody<{ email?: string; password?: string }>(event)
  const email = String(body?.email ?? "").trim().toLowerCase()
  const password = String(body?.password ?? "")

  if (!email || !password) throw createError({ statusCode: 400, statusMessage: "Email and password are required" })

  const admin = await db.admin.findUnique({ where: { email } })
  if (!admin || !verifyPassword(password, admin.passwordHash)) {
    throw createError({ statusCode: 401, statusMessage: "Invalid email or password" })
  }

  await db.session.deleteMany({ where: { expiresAt: { lt: new Date() } } })
  await createAdminSession(event, admin.id)

  return { admin: { id: admin.id, name: admin.name, email: admin.email } }
})
