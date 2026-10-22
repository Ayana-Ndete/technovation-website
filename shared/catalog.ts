export const projectLocations = [
  "Kenya", "Uganda", "Tanzania", "Rwanda", "Burundi", "Regional", "Other projects",
] as const

export type CatalogKind = "projects" | "products"

export interface CatalogItem {
  id: string
  name: string
  description: string
  category: string
  image: string
  imageAlt: string
  features: string[]
  status: "DRAFT" | "PUBLISHED"
  sortOrder: number
  createdAt: string
  updatedAt: string
  place?: string
  showInExplorer?: boolean
  featured?: boolean
  client?: string
  imageCreditUrl?: string
  enquiryUrl?: string
}
