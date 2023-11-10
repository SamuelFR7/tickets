import { z } from 'zod'

export const authSchema = z.object({
  username: z
    .string({ required_error: 'Usuário é obrigatório' })
    .min(1, 'Usuário é obrigatório')
    .max(255, 'Usuário grande demais'),
  password: z
    .string({ required_error: 'Senha é obrigatória' })
    .min(1, 'Senha é obrigatória')
    .max(255, 'Senha grande demais'),
})

export type AuthSchema = typeof authSchema
