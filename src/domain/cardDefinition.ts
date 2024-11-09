import { BlendMode } from "jimp"
import { Color, Colors, Filters } from "../utils/utils.js"

export interface ImageFilters {
    hue: number
    saturate: number
    darken: number
}

export type CardType = "melee" | "ranged"

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
    const {cost, name, type, image = "./src/assets/ryoshu.jpg"} = input
    
    if(typeof cost !== "string")
        throw new Error("[cost] has to be passed in!")
    
    if(typeof type !== "string")
        throw new Error("[type] has to be passed in!")
    
    if(!Object.keys(Colors).includes(type.toUpperCase()) && !Object.keys(Filters).includes(type.toUpperCase())) 
        throw new Error("[type] is wrong!")

    return {
        color: Colors[type.toUpperCase()],
        filter: Filters[type.toUpperCase()],
        image,
        name,
        cost: parseInt(cost),
        attacks: [
            {
                name: "blunt"
            },
            {
                name: "blunt"
            },
            {
                name: "blunt"
            },
        ]
    }
}