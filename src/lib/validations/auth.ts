import { z } from 'zod'

export const inviteUserSchema = z.object({
  email: z
    .string()
    .email()
    .endsWith('@gmail.com', { message: 'Must be a gmail address' }),
})

export type InviteUserSchema = typeof inviteUserSchema
