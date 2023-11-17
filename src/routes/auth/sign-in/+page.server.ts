import { superValidate, setError } from 'sveltekit-superforms/server'
import type { PageServerLoad } from './$types'
import { authSchema } from '$lib/validations/auth'
import { fail, type Actions, redirect } from '@sveltejs/kit'
import { auth } from '$lib/server/lucia'
import { LuciaError } from 'lucia'

export const load: PageServerLoad = async ({ locals }) => {
  const session = await locals.auth.validate()

  if (session) {
    throw redirect(302, '/')
  }

  return {
    form: superValidate(authSchema),
  }
}

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, authSchema)

    if (!form.valid) {
      return fail(400, {
        form,
      })
    }

    try {
      const key = await auth.useKey(
        'username',
        form.data.username,
        form.data.password
      )

      const session = await auth.createSession({
        userId: key.userId,
        attributes: {},
      })

      event.locals.auth.setSession(session)
    } catch (err) {
      if (
        err instanceof LuciaError &&
        (err.message === 'AUTH_INVALID_KEY_ID' ||
          err.message === 'AUTH_INVALID_PASSWORD')
      ) {
        return setError(form, 'password', 'Senha ou usário incorretos')
      }
    }

    return {
      form,
    }
  },
}
