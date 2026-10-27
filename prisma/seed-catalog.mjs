import { readFileSync } from "node:fs"
import { pathToFileURL } from "node:url"
import { PrismaClient } from "@prisma/client"

export async function seedCatalog(db) {
  const key = "initial-projects-products-v1"
  const data = JSON.parse(readFileSync(new URL("./catalog-data.json", import.meta.url), "utf8"))
  await db.$transaction(async tx => {
    if (await tx.contentImport.findUnique({ where: { key } })) return
    for (const project of data.projects) {
      await tx.project.upsert({ where: { id: project.id }, update: {}, create: project })
    }
    for (const product of data.products) {
      await tx.product.upsert({ where: { id: product.id }, update: {}, create: product })
    }
    await tx.contentImport.create({ data: { key } })
  })
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const db = new PrismaClient()
  try {
    await seedCatalog(db)
    console.log("Projects and products are ready. Existing edits and deletions are preserved.")
  } finally { await db.$disconnect() }
}
