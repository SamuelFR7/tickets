import { superValidate } from 'sveltekit-superforms/server'
import type { PageServerLoad } from './$types'
import { ticketSchema } from '$lib/validations/ticket'
import { fail, redirect, type Actions } from '@sveltejs/kit'
import { db } from '$lib/server/db'
import { tickets } from '$lib/server/db/schema'

export const load: PageServerLoad = ({ locals }) => {
  const user = locals.user

  if (!user) {
    return redirect(302, '/auth/sign-in')
  }

  return {
    form: superValidate(ticketSchema),
  }
}

export const actions: Actions = {
  create: async (event) => {
    const user = event.locals.user

    if (!user) {
      throw new Error('Unauthorized')
    }

    const form = await superValidate(event, ticketSchema)

    if (!form.valid) {
      return fail(400, {
        form,
      })
    }

    await db.insert(tickets).values({
      employeeId: user.id,
      status: 'open',
      ...form.data,
    })

    return {
      form,
    }
  },
}
