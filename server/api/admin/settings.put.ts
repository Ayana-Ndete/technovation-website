import { createError, readBody } from "h3"
import { requireAdmin } from "../../utils/auth"
import { db } from "../../utils/db"
import { getSiteSettings, publicSiteSettings } from "../../utils/settings"

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const body = await readBody<{ showCodeCentreOnHome?: unknown }>(event)
  if (typeof body?.showCodeCentreOnHome !== "boolean") {
    throw createError({ statusCode: 400, statusMessage: "A boolean setting value is required" })
  }

  await getSiteSettings()
  const settings = await db.siteSettings.update({
    where: { id: 1 },
    data: { showCodeCentreOnHome: body.showCodeCentreOnHome },
  })
  return publicSiteSettings(settings)
})
