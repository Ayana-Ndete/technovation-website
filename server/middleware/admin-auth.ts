import { getRequestURL, sendRedirect } from "h3"
import { getAdminFromSession } from "../utils/auth"

/** Protect SSR admin page requests while leaving admin API handlers to requireAdmin. */
export default defineEventHandler(async (event) => {
  const pathname = getRequestURL(event).pathname
  const baseURL = useRuntimeConfig(event).app.baseURL.replace(/\/$/, "")
  const adminPath = `${baseURL}/admin`

  if (
    (pathname === adminPath || pathname.startsWith(`${adminPath}/`)) &&
    pathname !== `${adminPath}/login`
  ) {
    if (!(await getAdminFromSession(event))) {
      return sendRedirect(event, `${adminPath}/login`, 302)
    }
  }
})
