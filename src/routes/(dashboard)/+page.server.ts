import { redirect, type Actions } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { db } from '$lib/server/db'
import { tickets } from '$lib/server/db/schema'
import { and, eq } from 'drizzle-orm'

export const load: PageServerLoad = async ({ locals }) => {
  const user = locals.user

  if (!user) {
    redirect(302, '/auth/sign-in')
  }

  if (user.role === 'admin') {
    redirect(302, '/admin')
  }

  const ticketsQuery = await db
    .select()
    .from(tickets)
    .where(and(eq(tickets.employeeId, user.id), eq(tickets.status, 'open')))

  return {
    tickets: ticketsQuery,
  }
}

export const actions: Actions = {
  cancel: async ({ request, locals }) => {
    const user = await locals.user

    if (!user) {
      throw new Error('Unauthorized')
    }

    const data = await request.formData()

    const ticketId = data.get('id')

    if (!ticketId) {
      throw new Error('Ticket ID is required')
    }

    await db
      .update(tickets)
      .set({
        status: 'closed',
      })
      .where(
        and(eq(tickets.id, ticketId as string), eq(tickets.employeeId, user.id))
      )
  },
}
