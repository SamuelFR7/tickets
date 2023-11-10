import {
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
