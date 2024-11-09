export interface Color {
  r: number,
  g: number,
  b: number
}

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

export const Colors = {
  PAPERBACK: hexToRgb('#2ccb4f'),
  HARDCOVER: hexToRgb('#3D82B8'),
  LIMITED: hexToRgb('#ce6afb'),
  OBJETDART: hexToRgb('#ffad00'),
  RED: hexToRgb('#b00000'),
}

export const Filters = {
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