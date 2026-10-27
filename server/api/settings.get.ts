import { getSiteSettings, publicSiteSettings } from "../utils/settings"

export default defineEventHandler(async () => publicSiteSettings(await getSiteSettings()))
