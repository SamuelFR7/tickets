import { superValidate } from 'sveltekit-superforms/client'
import type { PageServerLoad } from '../../$types'
import { newUserSchema } from '$lib/validations/auth'

export const load: PageServerLoad = () => {
  return {
    form: superValidate(newUserSchema),
  }
}
