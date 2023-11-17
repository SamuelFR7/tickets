import { db } from '$lib/server/db'
import { tickets } from '$lib/server/db/schema'
import { eq } from 'drizzle-orm'
import type { PageServerLoad } from './$types'
import { redirect } from '@sveltejs/kit'

export const load: PageServerLoad = async ({ params }) => {
  const id = params.id

  const ticketQuery = await db.select().from(tickets).where(eq(tickets.id, id))

  const ticket = ticketQuery[0]

  if (!ticket) {
    throw redirect(302, '/')
  }

  return {
    ticket,
  }
}
