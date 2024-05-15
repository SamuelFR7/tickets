import { fail, redirect } from '@sveltejs/kit'
import type { PageServerLoad, Actions } from './$types'
import { db } from '$lib/server/db'
import { verify } from '@node-rs/argon2'
import { lucia } from '$lib/server/auth'
import { superValidate } from 'sveltekit-superforms/server'
import { authSchema } from '$lib/validations/auth'

export const load: PageServerLoad = async ({ locals }) => {
  const user = locals.user

  if (user) {
    redirect(302, '/')
  }

  return {}
}

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, authSchema)

    if (!form.valid) {
      return fail(400, {
        form,
      })
    }

    const { password, username } = form.data

    const existingUser = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.username, username.toLowerCase()),
    })

    if (!existingUser) {
      return fail(400, {
        message: 'Incorrect username or password',
      })
    }

    const validPassword = await verify(existingUser.passwordHash, password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    })

    if (!validPassword) {
      return fail(400, {
        message: 'Incorrect username or password',
      })
    }

    const session = await lucia.createSession(existingUser.id, {})
    const sessionCookie = lucia.createSessionCookie(session.id)
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: '.',
      ...sessionCookie.attributes,
    })

    return redirect(302, '/')
  },
}
