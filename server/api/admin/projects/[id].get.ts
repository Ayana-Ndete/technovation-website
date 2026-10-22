import { getCatalogItem } from "../../../utils/catalog"

export default defineEventHandler(event => getCatalogItem(event, "projects"))
