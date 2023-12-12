import { sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { user } from './user'

export const key = sqliteTable('user_key', {
  id: text('id', {
    length: 15,
  }).primaryKey(),
  userId: text('user_id', {
    length: 15,
  })
    .notNull()
    .references(() => user.id),
  hashedPassword: text('hashed_password', {
    length: 255,
  }),
})
