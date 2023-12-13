import { faker } from '@faker-js/faker'
import { db } from '.'
import { tickets, type TicketInsert, user } from './schema'
import chalk from 'chalk'
import { eq } from 'drizzle-orm'

/**
 * Clear database
 */
await db.delete(tickets)

console.log(chalk.yellow('✔ Database cleared'))

/**
 * Create user
 */
const users = await db.select().from(user).where(eq(user.role, 'user'))

console.log(chalk.green('✔ User created'))

/**
 * Create tickets
 */
function generateTickets() {
  const tickets: TicketInsert[] = []

  for (let i = 0; i < 200; i++) {
    const created = faker.date.past()
    tickets.push({
      title: faker.lorem.sentence().toUpperCase(),
      employeeId: faker.helpers.arrayElement(users).id,
      createdAt: faker.date.past(),
      description: faker.lorem.paragraph().toUpperCase(),
      updatedAt: faker.date.future({ refDate: created }),
      status: faker.helpers.arrayElement(['open', 'closed']),
    })
  }

  return tickets
}

const ticketsToInsert = generateTickets()
await db.insert(tickets).values(ticketsToInsert)

console.log(chalk.green('✔ Tickets created'))

process.exit(0)
