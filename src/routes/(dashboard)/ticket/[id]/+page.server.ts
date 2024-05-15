import { db } from '$lib/server/db'
import { tickets } from '$lib/server/db/schema'
import { eq } from 'drizzle-orm'
import type { PageServerLoad } from './$types'
import { redirect } from '@sveltejs/kit'

export const load: PageServerLoad = async ({ params, locals }) => {
  const user = locals.user

  if (!user) {
    redirect(302, '/auth/sign-in')
  }

  const id = params.id

  const ticketQuery = await db.select().from(tickets).where(eq(tickets.id, id))

  const ticket = ticketQuery[0]

  if (!ticket) {
    redirect(302, '/')
  }

  return {
    ticket,
  }
}
