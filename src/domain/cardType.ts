import { z } from "zod"

export const cardTypeSchema = z.enum(["melee", "range", "mass"])
export type CardType = z.infer<typeof cardTypeSchema>