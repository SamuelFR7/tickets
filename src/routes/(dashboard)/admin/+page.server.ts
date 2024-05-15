import { redirect, type Actions } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { db } from '$lib/server/db'
import { tickets, type Ticket } from '$lib/server/db/schema'
import { and, asc, desc, eq, ilike, sql } from 'drizzle-orm'
import { z } from 'zod'

export const load: PageServerLoad = async ({ locals, url }) => {
  const user = locals.user

  if (!user || user.role !== 'admin') {
    redirect(302, '/auth/sign-in')
  }

  const search = url.searchParams.get('search')
  const page = url.searchParams.get('page')
  const orderBy = url.searchParams.get('order_by')
  const status = z
    .enum(['open', 'closed'])
    .parse(url.searchParams.get('status') ?? 'open')

  const [column, order] =
    typeof orderBy === 'string'
      ? (orderBy.split('.') as [
          keyof Ticket | undefined,
          'asc' | 'desc' | undefined,
        ])
      : [undefined, undefined]
  const limit = 10

  const numberPage =
    typeof page === 'string' ? (parseInt(page) > 1 ? parseInt(page) : 1) : 1

  const offset = (numberPage - 1) * limit

  const ticketsQuery = await db
    .select()
    .from(tickets)
    .limit(limit)
    .offset(offset)
    .orderBy(
      column && column in tickets
        ? order === 'asc'
          ? asc(tickets[column])
          : desc(tickets[column])
        : asc(tickets.createdAt)
    )
    .where(
      and(
        status ? eq(tickets.status, status) : undefined,
        typeof search === 'string'
          ? ilike(tickets.title, `%${search}%`)
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
          ? ilike(tickets.title, `%${search}%`)
          : undefined
      )
    )

  return {
    tickets: ticketsQuery,
    totalCount: totalCount[0].count,
    page: numberPage,
    orderBy,
  }
}

export const actions: Actions = {
  close: async ({ request, locals }) => {
    const user = locals.user

    if (!user || user.role !== 'admin') {
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

    return { success: true }
  },
}
