-- Forward-only migration for installations whose existing schema predates
-- Prisma Migrate. It does not alter or remove existing application data.
CREATE TABLE "SiteSettings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "showCodeCentreOnHome" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" DATETIME NOT NULL
);

INSERT OR IGNORE INTO "SiteSettings" ("id", "showCodeCentreOnHome", "updatedAt")
VALUES (1, true, CURRENT_TIMESTAMP);

CREATE TABLE "SiteContent" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "page" TEXT NOT NULL,
    "section" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL
);

CREATE UNIQUE INDEX "SiteContent_page_section_key_key"
ON "SiteContent"("page", "section", "key");
