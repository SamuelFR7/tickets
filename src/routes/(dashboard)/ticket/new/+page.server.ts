import { superValidate } from 'sveltekit-superforms/server'
import type { PageServerLoad } from './$types'
import { ticketSchema } from '$lib/validations/ticket'
import { fail, type Actions } from '@sveltejs/kit'
import { db } from '$lib/server/db'
import { tickets } from '$lib/server/db/schema'

export const load: PageServerLoad = () => {
  return {
    form: superValidate(ticketSchema),
  }
}

export const actions: Actions = {
  create: async (event) => {
    const session = await event.locals.auth.validate()

    if (!session) {
      throw new Error('Unauthorized')
    }

    const form = await superValidate(event, ticketSchema)

    if (!form.valid) {
      return fail(400, {
        form,
      })
    }

    await db.insert(tickets).values({
      employeeId: session.user.userId,
      status: 'open',
      ...form.data,
    })

    return {
      form,
    }
  },
}
