import { db } from "./db"

/** Returns the singleton settings row, creating it safely for existing databases. */
export function getSiteSettings() {
  return db.siteSettings.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1, showCodeCentreOnHome: true },
  })
}

export function publicSiteSettings(settings: Awaited<ReturnType<typeof getSiteSettings>>) {
  return { showCodeCentreOnHome: settings.showCodeCentreOnHome }
}
