import { BlendMode } from "jimp"
import { Color } from "../utils/utils.js"

export interface ImageFilters {
    hue: number
    saturate: number
    darken: number
}

export type CardType = "melee" | "ranged"

export type AttackType = {name: "slash" | "blunt" | "pierce"}

export interface CardDefinition {
    attack?: CardType
    color: Color
    cost?: number
    filter: ImageFilters
    image: string
    name?: string
    attacks: AttackType[]
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