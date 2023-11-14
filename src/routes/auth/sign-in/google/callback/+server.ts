import { db } from '$lib/server/db/index.js'
import { whitelist } from '$lib/server/db/schema.js'
import { auth, googleAuth } from '$lib/server/lucia.js'
import { OAuthRequestError } from '@lucia-auth/oauth'
import { eq } from 'drizzle-orm'

export const GET = async ({ url, cookies, locals }) => {
  const storedState = cookies.get('google_oauth_state')
  const state = url.searchParams.get('state')
  const code = url.searchParams.get('code')
  // validate state

  if (!storedState || !state || storedState !== state || !code) {
    return new Response(null, {
      status: 400,
    })
  }

  try {
    const { getExistingUser, googleUser, createUser } =
      await googleAuth.validateCallback(code)

    const getUser = async () => {
      const existingUser = await getExistingUser()
      if (existingUser) return existingUser

      if (!googleUser.email) {
        return null
      }

      const emailInWhiteListQuery = await db
        .select()
        .from(whitelist)
        .where(eq(whitelist.email, googleUser.email))

      const emailInWhiteList = emailInWhiteListQuery[0]

      if (!emailInWhiteList) {
        return null
      }

      const user = await createUser({
        attributes: {
          username: googleUser.email,
          role: 'user',
        },
      })

      return user
    }

    const user = await getUser()

    if (!user) {
      return new Response('Unauthorized', {
        status: 401,
      })
    }

    const session = await auth.createSession({
      userId: user.userId,
      attributes: {},
    })
    locals.auth.setSession(session)
    return new Response(null, {
      status: 302,
      headers: {
        Location: '/',
      },
    })
  } catch (e) {
    if (e instanceof OAuthRequestError) {
      return new Response(null, {
        status: 400,
      })
    }
    return new Response(null, {
      status: 500,
    })
  }
}
