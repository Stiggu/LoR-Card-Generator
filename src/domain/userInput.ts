import { z } from 'zod'
import { attacksSchema, attackTypeSchema } from './attackType.js'
import { ErrorMessage } from './utils/errorHandler.js'
import { colorsSchema } from './color.js'
import { cardTypeSchema } from './cardType.js'

const convertAttackInputToType = (value: string) =>
    value.split('/').map((attack) => {
        const isCounter = attack.includes('-')
        const attackName = isCounter ? attack.split('-')[1] : attack

        const { data, error } = attacksSchema.safeParse(attackName)

        if (error) throw new ErrorMessage({
            tag: 'parser',
            message: 'Incorrect attack type!'
        })

        return { name: data, counter: isCounter }
    })

const convertCostInput = (value: string) => {
    const parsedNumber = parseInt(value)

    if (isNaN(parsedNumber))
        throw new ErrorMessage({
            tag: 'parser',
            message: 'Cost should be a number!'
        })

    return parsedNumber
}

export const userInputSchema = z.object({
    attacks: z.string().transform(convertAttackInputToType),
    cost: z.string().transform(convertCostInput),
    name: z.string(),
    range: cardTypeSchema,
    type: z.string().toUpperCase().pipe(colorsSchema),
    image: z.string(),
})

export const cardInputSchema = z.object({
    type: colorsSchema,
    range: cardTypeSchema,
    cost: z.number().int().min(0).max(9),
    name: z.string(),
    image: z.string(),
    attacks: z.array(attackTypeSchema).max(5),
})
export type CardInput = z.infer<typeof cardInputSchema>
