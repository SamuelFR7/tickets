import { faker } from '@faker-js/faker'
import { db } from '.'
import {
  tickets,
  type TicketInsert,
  user,
  key,
  whitelist,
  session,
} from './schema'
import chalk from 'chalk'

/**
 * Clear database
 */
await db.delete(tickets)
await db.delete(key)
await db.delete(whitelist)
await db.delete(session)
await db.delete(user)

console.log(chalk.yellow('✔ Database cleared'))

/**
 * Create user
 */
const [client] = await db
  .insert(user)
  .values({
    id: faker.string.alphanumeric(15),
    username: faker.internet.exampleEmail(),
    role: 'user',
  })
  .returning()

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

/**
 * Add your email to the whitelist
 */
await db.insert(whitelist).values({
  email: process.env.MY_EMAIL!,
})

console.log(chalk.green('✔ Email added to whitelist'))

process.exit(0)
