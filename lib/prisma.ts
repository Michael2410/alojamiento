import { PrismaClient } from '@prisma/client'

declare global {
  // make prisma available on globalThis for hot-reloading in dev
  // eslint-disable-next-line vars-on-top
  // attach to globalThis as __prisma
  var __prisma: PrismaClient | undefined
}

export const prisma = globalThis.__prisma ?? new PrismaClient()
if (process.env.NODE_ENV !== 'production') globalThis.__prisma = prisma
