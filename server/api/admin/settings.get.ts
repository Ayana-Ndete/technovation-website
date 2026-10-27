import { requireAdmin } from "../../utils/auth"
import { getSiteSettings, publicSiteSettings } from "../../utils/settings"

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  return publicSiteSettings(await getSiteSettings())
})
