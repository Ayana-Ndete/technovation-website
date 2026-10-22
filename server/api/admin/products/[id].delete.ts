import { deleteCatalogItem } from "../../../utils/catalog"

export default defineEventHandler(event => deleteCatalogItem(event, "products"))
