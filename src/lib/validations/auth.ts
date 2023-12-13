import { z } from 'zod'

export const authSchema = z.object({
  username: z
    .string({ required_error: 'Username is required' })
    .min(1, 'Username is required')
    .max(255, 'Username too long')
    .toLowerCase(),
  password: z
    .string({ required_error: 'Password is required' })
    .min(1, 'Password is required')
    .max(255, 'Password too long'),
})

export type AuthSchema = typeof authSchema

export const newUserSchema = z
  .object({
    username: z
      .string({ required_error: 'Username is required' })
      .min(1, 'Username is required')
      .max(255, 'Username too long')
      .toLowerCase(),
    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(1, 'Password is required')
      .max(255, 'Password too long'),
    passwordConfirmation: z.string({
      required_error: 'Password confirmation is required',
    }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords does not match',
    path: ['passwordConfirmation'],
  })

export type NewUserSchema = typeof newUserSchema
