import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { db } from '$lib/server/db'
import { tickets } from '$lib/server/db/schema'
import { eq } from 'drizzle-orm'

export const load: PageServerLoad = async ({ locals }) => {
  const session = await locals.auth.validate()

  if (!session) {
    throw redirect(302, '/auth/sign-in')
  }

  if (session.user.role === 'admin') {
    throw redirect(302, '/admin')
  }

  const ticketsQuery = await db
    .select()
    .from(tickets)
    .where(eq(tickets.employeeId, session.user.userId))

  return {
    tickets: ticketsQuery,
  }
}
