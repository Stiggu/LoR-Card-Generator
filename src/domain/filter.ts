import { z } from 'zod'
import { ColorFilterMatch } from './color.js'

export const filterSchema = z.object({
    hue: z.number(),
    saturate: z.number(),
    darken: z.number(),
})
export type Filter = z.infer<typeof filterSchema>

export const Filters: Record<ColorFilterMatch, Filter> = {
    PAPERBACK: {
        hue: 60,
        saturate: 100,
        darken: 5,
    },
    HARDCOVER: {
        hue: 140,
        saturate: 100,
        darken: 5,
    },
    LIMITED: {
        hue: 280,
        saturate: 100,
        darken: 5,
    },
    OBJETDART: {
        hue: 335,
        saturate: 100,
        darken: 10,
    },
    RED: {
        hue: 300,
        saturate: 100,
        darken: 5,
    },
}
