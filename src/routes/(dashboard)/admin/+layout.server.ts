import { redirect } from '@sveltejs/kit'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals }) => {
  const session = await locals.auth.validate()

  if (!session || session.user.role !== 'admin') {
    throw redirect(302, '/')
  }

  return {}
}
