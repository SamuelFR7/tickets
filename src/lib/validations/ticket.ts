import { z } from 'zod'

export const ticketSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(255, 'Title too long')
    .toUpperCase(),
  description: z.string().max(255, 'Description too long').optional(),
})

export type TicketSchema = typeof ticketSchema
