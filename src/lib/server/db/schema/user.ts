import { sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const user = sqliteTable('auth_user', {
  id: text('id', {
    length: 15,
  }).primaryKey(),
  username: text('username', {
    length: 150,
  })
    .notNull()
    .unique(),
  role: text('role', { enum: ['admin', 'user'] })
    .notNull()
    .default('user'),
})
