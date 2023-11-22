import { redirect, type Actions } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { db } from '$lib/server/db'
import { tickets } from '$lib/server/db/schema'
import { and, eq, like, sql } from 'drizzle-orm'

export const load: PageServerLoad = async ({ locals, url }) => {
  const session = await locals.auth.validate()

  if (!session) {
    throw redirect(302, '/auth/sign-in')
  }

  const search = url.searchParams.get('search')
  const page = url.searchParams.get('page')

  const limit = 10

  const numberPage =
    typeof page === 'string' ? (parseInt(page) > 1 ? parseInt(page) : 1) : 1

  const offset = (numberPage - 1) * limit

  const ticketsQuery = await db
    .select()
    .from(tickets)
    .limit(limit)
    .offset(offset)
    .where(
      and(
        eq(tickets.status, 'open'),
        typeof search === 'string'
          ? like(tickets.title, `%${search}%`)
          : undefined
      )
    )

  const totalCount = await db
    .select({ count: sql<number>`count(*)` })
    .from(tickets)
    .where(
      and(
        eq(tickets.status, 'open'),
        typeof search === 'string'
          ? like(tickets.title, `%${search}%`)
          : undefined
      )
    )

  return {
    tickets: ticketsQuery,
    totalCount: totalCount[0].count,
  }
}

export const actions: Actions = {
  close: async ({ request, locals }) => {
    const session = await locals.auth.validate()

    if (!session) {
      throw new Error('Unauthorized')
    }

    const data = await request.formData()

    const ticketId = data.get('id') as string

    await db
      .update(tickets)
      .set({
        status: 'closed',
      })
      .where(eq(tickets.id, ticketId))
  },
}
