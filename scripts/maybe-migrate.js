#!/usr/bin/env node
const { spawnSync } = require('node:child_process')

const directUrl = process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_URL || process.env.DATABASE_URL

if (!directUrl) {
  console.log('[vercel-build] Skipping prisma migrate deploy: no direct DB URL found (POSTGRES_URL_NON_POOLING/POSTGRES_URL/DATABASE_URL)')
  process.exit(0)
}

// Skip if the URL looks like Prisma Accelerate/Data Proxy (not suitable for migrate deploy)
if (directUrl.startsWith('prisma+postgres://') || /prisma-data\.net|db\.prisma\.io/.test(directUrl)) {
  console.log('[vercel-build] Skipping prisma migrate deploy: URL appears to be Prisma Accelerate/Data Proxy')
  process.exit(0)
}

console.log('[vercel-build] Running prisma migrate deploy...')
const result = spawnSync('npx', ['prisma', 'migrate', 'deploy'], {
  stdio: 'inherit',
  shell: false,
  env: process.env,
})

process.exit(result.status ?? 1)
