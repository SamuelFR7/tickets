import { sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const whitelist = sqliteTable('white_list', {
  email: text('email', { length: 255 }).notNull().unique(),
})
