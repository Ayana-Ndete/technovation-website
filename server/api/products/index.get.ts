import { listCatalog } from "../../utils/catalog"

export default defineEventHandler(event => listCatalog(event, "products"))
