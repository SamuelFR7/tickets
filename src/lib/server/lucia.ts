import { lucia } from 'lucia'
import { sveltekit } from 'lucia/middleware'
import { dev } from '$app/environment'
import { libsql } from '@lucia-auth/adapter-sqlite'
import { connection } from './db'
import { google } from '@lucia-auth/oauth/providers'

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

export const googleAuth = google(auth, {
  clientId: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  redirectUri: 'http://localhost:5173/auth/sign-in/google/callback',
  scope: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
  ],
})

export type Auth = typeof auth
