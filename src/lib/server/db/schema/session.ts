import { blob, text, sqliteTable } from 'drizzle-orm/sqlite-core'
import { user } from './user'

export const session = sqliteTable('user_session', {
  id: text('id', {
    length: 128,
  }).primaryKey(),
  userId: text('user_id', {
    length: 15,
  })
    .notNull()
    .references(() => user.id),
  activeExpires: blob('active_expires', {
    mode: 'bigint',
  }).notNull(),
  idleExpires: blob('idle_expires', {
    mode: 'bigint',
  }).notNull(),
})
