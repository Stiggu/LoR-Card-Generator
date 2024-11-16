import { z } from "zod"
import { attacksSchema } from "./attackType.js"
import { ErrorMessage } from "./utils/errorHandler.js"
import { colorsSchema, validColors } from "./color.js"
import { cardTypeSchema } from "./cardType.js"

const convertAttackInputToType = (value: string) => value.split('/').map(attack => {
    const isCounter = attack.includes('-')
    const attackName = isCounter ? attack.split('-')[1] : attack

    const {data, error} = attacksSchema.safeParse(attackName)

    if(error)
        throw new ErrorMessage('parser', 'Incorrect attack type!');

    return {name: data, counter: isCounter}
})

const convertCostInput = (value: string) => {
    const parsedNumber = parseInt(value)

    if(isNaN(parsedNumber))
        throw new ErrorMessage('parser', 'Cost should be a number!')

    return parsedNumber
}

export const userInputSchema = z.object({
    attacks: z.string().transform(convertAttackInputToType),
    cost: z.string().transform(convertCostInput),
    name: z.string(),
    range: cardTypeSchema,
    type: z.string().transform(value => colorsSchema.parse(value.toUpperCase())).refine(value => validColors.includes(value), { message: "Invalid colour"}),
    image: z.string()
})