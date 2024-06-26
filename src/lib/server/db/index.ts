import 'dotenv/config'
import { drizzle } from 'drizzle-orm/postgres-js'
import * as schema from './schema'
import postgres from 'postgres'

export const queryClient = postgres(process.env.DATABASE_URL!)

export const db = drizzle(queryClient, { schema })
