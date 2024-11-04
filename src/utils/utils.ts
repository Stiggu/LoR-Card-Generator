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
  PINK: hexToRgb('#ce6afb'),
  GREEN: hexToRgb('#2ccb4f'),
  BLUE: hexToRgb('#e1be35'),
  YELLOW: hexToRgb('#ffad00'),
  RED: hexToRgb('#b00000'),
}

export const Filters = {
  YELLOW: {
    hue: 335,
    saturate: 100,
    darken: 10
  },
  GREEN: {
    hue: 60,
    saturate: 100,
    darken: 5
  },
  RED: {
    hue: 300,
    saturate: 100,
    darken: 5
  }
}