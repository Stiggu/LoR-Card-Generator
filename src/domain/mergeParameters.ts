import { BlendMode } from 'jimp'

export interface MergeParameters {
    x: number
    y: number
    blend?: {
        mode: BlendMode
        opacitySource: number
    }
}
