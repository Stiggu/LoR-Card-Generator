import { Color } from '../color.js'

export const hexToRgb = (hex: string): Color => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

    return {
        r: parseInt(result?.[1] ?? '00', 16),
        g: parseInt(result?.[2] ?? '00', 16),
        b: parseInt(result?.[3] ?? '00', 16),
    }
}
