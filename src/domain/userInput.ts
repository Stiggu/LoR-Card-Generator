import { z } from "zod"
import { attacksSchema, AttackType } from "./attackType.js"
import { ErrorMessage } from "./utils/errorHandler.js"
import { ColorFilterMatch, validColors } from "./color.js"
import { cardTypeSchema } from "./cardType.js"

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