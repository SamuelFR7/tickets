import { text, integer, sqliteTable, blob } from 'drizzle-orm/sqlite-core'
import { createId } from '@paralleldrive/cuid2'

export const tickets = sqliteTable('tickets', {
  id: text('id', { length: 255 })
    .primaryKey()
    .$defaultFn(() => createId()),
  title: text('title', { length: 255 }).notNull(),
  description: text('description', { length: 255 }),
  status: text('status', ['open', 'closed']).notNull().default('open'),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
})

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
