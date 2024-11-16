 
import { z } from "zod"

export const colorSchema = z.object({
  r: z.number(),
  g: z.number(),
  b: z.number()
})
export type Color = z.infer<typeof colorSchema>

export const filterSchema = z.object({
  hue: z.number(),
  saturate: z.number(),
  darken: z.number()
})
export type Filter = z.infer<typeof filterSchema>

export const isRGBcolor = (color: unknown): color is Color => {
  return (color as Color).r !== undefined
}

export const hexToRgb = (hex: string): Color => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    
    return {
      r: parseInt(result?.[1] ?? "00", 16),
      g: parseInt(result?.[2] ?? "00", 16),
      b: parseInt(result?.[3] ?? "00", 16)
    }
}

export const validColors = ["PAPERBACK", "HARDCOVER", "LIMITED", "OBJETDART", "RED"] as const
export const colorsSchema = z.enum(validColors)
export type ColorFilterMatch = z.infer<typeof colorsSchema>
export const Colors: Record<ColorFilterMatch, Color> = {
  PAPERBACK: hexToRgb('#2ccb4f'),
  HARDCOVER: hexToRgb('#3D82B8'),
  LIMITED: hexToRgb('#ce6afb'),
  OBJETDART: hexToRgb('#ffad00'),
  RED: hexToRgb('#b00000'),
}

export const Filters: Record<ColorFilterMatch, Filter> = {
  PAPERBACK: {
    hue: 60,
    saturate: 100,
    darken: 5
  },
  HARDCOVER: {
    hue: 140,
    saturate: 100,
    darken: 5
  },
  LIMITED: {
    hue: 280,
    saturate: 100,
    darken: 5
  },
  OBJETDART: {
    hue: 335,
    saturate: 100,
    darken: 10
  },
  RED: {
    hue: 300,
    saturate: 100,
    darken: 5
  },
}