import { BlendMode } from "jimp"
import { Color, Colors, Filters } from "../utils/utils.js"
import { ErrorMessage } from "../utils/errorHandler.js"
import { DEFAULT_IMAGE } from "../utils/paths.js"

export interface ImageFilters {
    hue: number
    saturate: number
    darken: number
}

export type CardType = "melee" | "range" | "mass"

export type AttackType = {name: "slash" | "blunt" | "pierce" | "evade" | "block", counter?: boolean}

export interface CardDefinition {
    attacks: AttackType[]
    color: Color
    image: string

    attack?: CardType
    cost?: number
    filter: ImageFilters
    name?: string
}

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

export const buildCardDefinition = (input: Record<string, string | undefined>): CardDefinition => {
    const {attacks, cost, name, range, type, image = DEFAULT_IMAGE} = input

    if(typeof attacks !== "string")
        throw new ErrorMessage("attacks", "Has to be passed in the format: x/y/z")
    
    if(typeof cost !== "string" || isNaN(parseInt(cost)))
        throw new ErrorMessage("cost", "Has to be passed in and a number!")
    
    if(typeof type !== "string")
        throw new ErrorMessage("type", "Has to be passed in!")
    
    if(!Object.keys(Colors).includes(type.toUpperCase()) && !Object.keys(Filters).includes(type.toUpperCase())) 
        throw new ErrorMessage("type", "Is not correct!")

    const parsedAttacks = attacks.split('/').map(attack => {
        const isCounter = attack.includes('-')
        const attackName = isCounter ? attack.split('-')[1] : attack

        return {name: attackName, counter: isCounter} as AttackType
    })

    return {
        color: Colors[type.toUpperCase()],
        filter: Filters[type.toUpperCase()],
        image,
        name,
        cost: parseInt(cost),
        attack: range as CardType,
        attacks: parsedAttacks
    }
}