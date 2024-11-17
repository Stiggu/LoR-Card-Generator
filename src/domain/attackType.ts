import { z } from 'zod'

export const attacksSchema = z.enum([
    'slash',
    'blunt',
    'pierce',
    'evade',
    'block',
])
export const attackTypeSchema = z.object({
    name: attacksSchema,
    counter: z.optional(z.boolean()),
})
export type AttackType = z.infer<typeof attackTypeSchema>
