import { faker } from '@faker-js/faker'
import { db } from '.'
import { tickets, users, sessions } from './schema'
import chalk from 'chalk'
import { hash } from '@node-rs/argon2'

/**
 * Clear database
 */
await db.delete(tickets)
await db.delete(users)
await db.delete(sessions)

console.log(chalk.yellow('✔ Database cleared'))

/**
 * Create user
 */
const [client] = await db
  .insert(users)
  .values({
    username: 'admin',
    role: 'admin',
    passwordHash: await hash('admin', {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    }),
  })
  .returning()

console.log(chalk.green('✔ User created'))

type TicketInsert = typeof tickets.$inferInsert

/**
 * Create tickets
 */
function generateTickets() {
  const tickets: TicketInsert[] = []

  for (let i = 0; i < 200; i++) {
    const created = faker.date.past()
    tickets.push({
      title: faker.lorem.sentence().toUpperCase(),
      employeeId: client.id,
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
