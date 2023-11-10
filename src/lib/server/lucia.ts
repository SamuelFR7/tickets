import { lucia } from 'lucia'
import { sveltekit } from 'lucia/middleware'
import { dev } from '$app/environment'
import { planetscale } from '@lucia-auth/adapter-mysql'
import { connection } from './db'

export const auth = lucia({
  adapter: planetscale(connection, {
    key: 'tickets_user_key',
    user: 'tickets_auth_user',
    session: 'tickets_user_session',
  }),
  env: dev ? 'DEV' : 'PROD',
  middleware: sveltekit(),
  getUserAttributes: (data) => {
    return {
      username: data.username,
      role: data.role,
    }
  },
})

export type Auth = typeof auth
