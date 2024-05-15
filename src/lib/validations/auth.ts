import { z } from 'zod'

export const authSchema = z.object({
  username: z.string().toLowerCase(),
  password: z.string(),
})

export type AuthSchema = typeof authSchema
