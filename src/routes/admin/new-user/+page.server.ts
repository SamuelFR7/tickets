import { superValidate } from 'sveltekit-superforms/server'
import type { PageServerLoad } from '../../$types'
import { newUserSchema } from '$lib/validations/auth'
import { fail, type Actions } from '@sveltejs/kit'
import { auth } from '$lib/server/lucia'
import { db } from '$lib/server/db'
import { user } from '$lib/server/db/schema'
import { eq } from 'drizzle-orm'

export const load: PageServerLoad = () => {
  return {
    form: superValidate(newUserSchema),
  }
}

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, newUserSchema)

    if (!form.valid) {
      return fail(400, {
        form,
      })
    }

    const userAlreadyExistsQuery = await db
      .select()
      .from(user)
      .where(eq(user.username, form.data.username))

    const userAlreadyExists = userAlreadyExistsQuery[0]

    if (userAlreadyExists) {
      return fail(400, {
        form,
        error: 'Usuário já existe',
      })
    }

    await auth.createUser({
      key: {
        providerId: 'username',
        providerUserId: form.data.username,
        password: form.data.password,
      },
      attributes: {
        username: form.data.username,
        role: 'user',
      },
    })

    return {
      form,
    }
  },
}
