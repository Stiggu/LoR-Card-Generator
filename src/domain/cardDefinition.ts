import { z } from 'zod'
import { colorSchema } from './color.js'
import { filterSchema } from './filter.js'
import { cardTypeSchema } from './cardType.js'
import { attackTypeSchema } from './attackType.js'

export const cardDefinitionSchema = z.object({
    attacks: z.array(attackTypeSchema),
    color: colorSchema,
    image: z.string(),
    attack: z.optional(cardTypeSchema),
    cost: z.optional(z.number()),
    filter: filterSchema,
    name: z.string(),
})
export type CardDefinition = z.infer<typeof cardDefinitionSchema>
