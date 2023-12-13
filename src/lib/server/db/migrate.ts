import { createClient } from '@libsql/client'
import chalk from 'chalk'

import { drizzle } from 'drizzle-orm/libsql'
import { migrate } from 'drizzle-orm/libsql/migrator'

const connection = createClient({
  url: process.env.DATABASE_URL!,
  authToken: process.env.DATABASE_AUTH_TOKEN,
})
const db = drizzle(connection)

await migrate(db, { migrationsFolder: 'drizzle' })

console.log(chalk.greenBright('Migrations applied successfully!'))

connection.close()

process.exit()
