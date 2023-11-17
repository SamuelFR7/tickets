import { z } from 'zod'

export const ticketSchema = z.object({
  title: z
    .string()
    .min(1, 'Título é obrigatório')
    .max(255, 'Título longo demais')
    .toUpperCase(),
  description: z.string().max(255, 'Descrição longa demais').optional(),
})

export type TicketSchema = typeof ticketSchema
