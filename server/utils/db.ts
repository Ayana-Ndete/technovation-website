import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      import.meta.env.NODE_ENV === "development"
        ? ["error", "warn"]
        : ["error"],
  });

if (import.meta.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
