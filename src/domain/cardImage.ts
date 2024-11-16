import { MergeParameters } from "./mergeParameters.js"

export interface CardImage {
    buffer?: Buffer
    merge?: MergeParameters
    create: () => Promise<void>
}