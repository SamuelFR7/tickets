import { createId } from '@paralleldrive/cuid2'
import { pgEnum, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core'

export const role = pgEnum('role', ['admin', 'user'])

export const users = pgTable('users', {
  id: varchar('id', { length: 255 })
    .primaryKey()
    .$defaultFn(() => createId()),
  username: varchar('username', {
    length: 150,
  })
    .notNull()
    .unique(),
  role: role('role').notNull().default('user'),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
})

export const sessions = pgTable('sessions', {
  id: varchar('id', { length: 255 }).primaryKey(),
  userId: varchar('user_id', { length: 255 })
    .notNull()
    .references(() => users.id, {
      onUpdate: 'cascade',
      onDelete: 'cascade',
    }),
  expiresAt: timestamp('expires_at', {
    withTimezone: true,
    mode: 'date',
  }).notNull(),
})

export const status = pgEnum('status', ['open', 'closed'])

export const tickets = pgTable('tickets', {
  id: varchar('id', { length: 255 })
    .primaryKey()
    .$defaultFn(() => createId()),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  status: status('status').notNull().default('open'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at'),
  employeeId: varchar('employee_id', { length: 255 })
    .references(() => users.id)
    .notNull(),
})

export type Ticket = typeof tickets.$inferSelect
