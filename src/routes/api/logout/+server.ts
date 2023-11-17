import { auth } from '$lib/server/lucia'
import type { RequestHandler } from '@sveltejs/kit'

export const POST: RequestHandler = async ({ locals }) => {
  const session = await locals.auth.validate()

  if (!session) {
    return new Response('Unathorized', {
      status: 401,
    })
  }

  await auth.invalidateSession(session.sessionId)

  locals.auth.setSession(null)

  return new Response('', {
    headers: {
      Location: '/auth/sign-in',
    },
    status: 302,
  })
}
