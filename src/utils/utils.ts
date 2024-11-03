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
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : {r:0,g:0,b:0};
}

export const Colors = {
  PINK: hexToRgb('#ce6afb'),
  GREEN: hexToRgb('#2ccb4f'),
  BLUE: hexToRgb('#e1be35'),
  YELLOW: hexToRgb('#ffad00'),
  RYOSHU: hexToRgb('#b00000'),
}

export const yellow = {
  hue: 335,
  saturate: 100,
  darken: 10
}

export const green = {
  hue: 60,
  saturate: 100,
  darken: 5
}

export const red = {
  hue: 300,
  saturate: 100,
  darken: 5
}