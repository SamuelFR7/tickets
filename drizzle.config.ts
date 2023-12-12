import type { Config } from 'drizzle-kit'

const dbCredentials = {
  url: process.env.DATABASE_URL ?? '',
  authToken: process.env.DATABASE_AUTH_TOKEN!,
}

export default {
  schema: './src/lib/server/db/schema/index.ts',
  out: './drizzle',
  driver: 'turso',
  dbCredentials,
} satisfies Config
