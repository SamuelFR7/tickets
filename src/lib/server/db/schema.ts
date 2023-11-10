import {
  bigint,
  mysqlEnum,
  mysqlTableCreator,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core'
import { createId } from '@paralleldrive/cuid2'

export const mysqlTable = mysqlTableCreator((name) => `tickets_${name}`)

export const tickets = mysqlTable('tickets', {
  id: varchar('id', { length: 255 })
    .primaryKey()
    .$defaultFn(() => createId()),
  title: varchar('title', { length: 255 }).notNull(),
  description: varchar('description', { length: 255 }),
  status: mysqlEnum('status', ['open', 'closed']).notNull().default('open'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().onUpdateNow(),
})

export const user = mysqlTable('auth_user', {
  id: varchar('id', {
    length: 15,
  }).primaryKey(),
  username: varchar('username', {
    length: 150,
  })
    .notNull()
    .unique(),
  role: mysqlEnum('role', ['admin', 'user']).notNull().default('user'),
})

export const key = mysqlTable('user_key', {
  id: varchar('id', {
    length: 15,
  }).primaryKey(),
  userId: varchar('user_id', {
    length: 15,
  }).notNull(),
  hashedPassword: varchar('hashed_password', {
    length: 255,
  }),
})

export const session = mysqlTable('user_session', {
  id: varchar('id', {
    length: 128,
  }).primaryKey(),
  userId: varchar('user_id', {
    length: 15,
  }).notNull(),
  activeExpires: bigint('active_expires', {
    mode: 'number',
  }).notNull(),
  idleExpires: bigint('idle_expires', {
    mode: 'number',
  }).notNull(),
})
