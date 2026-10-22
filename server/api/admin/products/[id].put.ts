import { saveCatalogItem } from "../../../utils/catalog"

export default defineEventHandler(event => saveCatalogItem(event, "products", true))
