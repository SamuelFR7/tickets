import { redirect } from '@sveltejs/kit'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals }) => {
  const session = await locals.auth.validate()

  if (!session) {
    redirect(302, '/auth/sign-in');
  }

  if (session.user.role !== 'user') {
    redirect(302, '/admin');
  }

  return {}
}
