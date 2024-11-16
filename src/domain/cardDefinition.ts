 
import { BlendMode } from "jimp"
import { ErrorMessage } from "./utils/errorHandler.js"
import { z } from "zod"
import { ColorFilterMatch, colorSchema, validColors } from "./color.js"
import { filterSchema } from "./filter.js"

export interface ImageFilters {
    hue: number
    saturate: number
    darken: number
}

const cardTypeSchema = z.enum(["melee", "range", "mass"])
export type CardType = z.infer<typeof cardTypeSchema>

const attacksSchema = z.enum(["slash", "blunt", "pierce", "evade", "block"])
const attackTypeSchema = z.object({
    name: attacksSchema,
    counter: z.optional(z.boolean())
})
export type AttackType = z.infer<typeof attackTypeSchema>

export const cardDefinitionSchema = z.object({
    attacks: z.array(attackTypeSchema),
    color: colorSchema,
    image: z.string(),
    attack: z.optional(cardTypeSchema),
    cost: z.optional(z.number()),
    filter: filterSchema,
    name: z.string()
})
export type CardDefinition = z.infer<typeof cardDefinitionSchema>

const convertAttackInputToType = (value: string) => value.split('/').map(attack => {
    const isCounter = attack.includes('-')
    const attackName = isCounter ? attack.split('-')[1] : attack

    const result = attacksSchema.safeParse(attackName)

    if(result.error){
        console.table(result.error.issues)
        throw new ErrorMessage('parser', 'Incorrect attack type!');
    }

    return {name: result.data, counter: isCounter} as AttackType
})

export const userInputSchema = z.object({
    attacks: z.string().transform(convertAttackInputToType),
    cost: z.string().transform(value => {
            const parsedNumber = parseInt(value)

            if(isNaN(parsedNumber))
                throw new ErrorMessage('parser', 'Cost should be a number!')

            return parsedNumber
    }),
    name: z.string(),
    range: cardTypeSchema,
    type: z.string().transform(value => value.toUpperCase() as ColorFilterMatch).refine(value => validColors.includes(value), { message: "Invalid colour"}),
    image: z.string()
})

export interface MergeParameters {
    x: number
    y: number
    blend?: {
        mode: BlendMode,
        opacitySource: number
    }
}

export interface Image {
    buffer?: Buffer
    merge?: MergeParameters
    create: () => Promise<void>
}