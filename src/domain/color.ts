import { z } from 'zod'
import { hexToRgb } from './utils/utils.js'

export const colorSchema = z.object({
    r: z.number(),
    g: z.number(),
    b: z.number(),
})
export type Color = z.infer<typeof colorSchema>

export const validColors = [
    'PAPERBACK',
    'HARDCOVER',
    'LIMITED',
    'OBJETDART',
    'RED',
] as const
export const colorsSchema = z.enum(validColors)
export type ColorFilterMatch = z.infer<typeof colorsSchema>
export const Colors: Record<ColorFilterMatch, Color> = {
    PAPERBACK: hexToRgb('#2ccb4f'),
    HARDCOVER: hexToRgb('#3D82B8'),
    LIMITED: hexToRgb('#ce6afb'),
    OBJETDART: hexToRgb('#ffad00'),
    RED: hexToRgb('#b00000'),
}
