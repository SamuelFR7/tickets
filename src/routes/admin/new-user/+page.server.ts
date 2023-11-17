import { superValidate } from 'sveltekit-superforms/client'
import type { PageServerLoad } from '../../$types'
import { newUserSchema } from '$lib/validations/auth'
import { fail, type Actions } from '@sveltejs/kit'
import { auth } from '$lib/server/lucia'

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
