import { BlendMode } from "jimp"
import { Color, Colors, Filters } from "../utils/utils.js"

export interface ImageFilters {
    hue: number
    saturate: number
    darken: number
}

export type CardType = "melee" | "range" | "mass"

export type AttackType = {name: "slash" | "blunt" | "pierce"}

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
    const {attacks, cost, name, range, type, image = "./src/assets/ryoshu.jpg"} = input

    if(typeof attacks !== "string")
        throw new Error("[attacks] has to be passed in the format: x/y/z")
    
    if(typeof cost !== "string" || isNaN(parseInt(cost)))
        throw new Error("[cost] has to be passed in and a number!")
    
    if(typeof type !== "string")
        throw new Error("[type] has to be passed in!")
    
    if(!Object.keys(Colors).includes(type.toUpperCase()) && !Object.keys(Filters).includes(type.toUpperCase())) 
        throw new Error("[type] is incorrect, refer to the docs!")

    return {
        color: Colors[type.toUpperCase()],
        filter: Filters[type.toUpperCase()],
        image,
        name,
        cost: parseInt(cost),
        attack: range as CardType,
        attacks: attacks.split('/').map(attack => {return {name: attack}}) as AttackType[]
    }
}