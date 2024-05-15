import { lucia } from '$lib/server/auth'
import { redirect, type RequestHandler } from '@sveltejs/kit'

export const POST: RequestHandler = async ({ locals, cookies }) => {
  const session = locals.session

  if (!session) {
    return new Response('Unathorized', {
      status: 401,
    })
  }

  await lucia.invalidateSession(session.id)
  const sessionCookie = lucia.createBlankSessionCookie()
  cookies.set(sessionCookie.name, sessionCookie.value, {
    path: '.',
    ...sessionCookie.attributes,
  })

  redirect(302, '/auth/sign-in')
}
