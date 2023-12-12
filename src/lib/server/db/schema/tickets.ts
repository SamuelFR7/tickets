import { createId } from '@paralleldrive/cuid2'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { user } from './user'

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
  updatedAt: integer('updated_at', { mode: 'timestamp' }),
  employeeId: text('employee_id', { length: 15 })
    .references(() => user.id)
    .notNull(),
})

export type Ticket = typeof tickets.$inferSelect
