import { getAdminFromSession } from "../../utils/auth"

export default defineEventHandler(async (event) => {
  const admin = await getAdminFromSession(event)
  return { admin: admin ? { id: admin.id, name: admin.name, email: admin.email } : null }
})
