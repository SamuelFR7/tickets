import { lucia } from 'lucia'
import { sveltekit } from 'lucia/middleware'
import { dev } from '$app/environment'
import { libsql } from '@lucia-auth/adapter-sqlite'
import { connection } from './db'

export const auth = lucia({
  adapter: libsql(connection, {
    key: 'user_key',
    user: 'auth_user',
    session: 'user_session',
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
