import sharp from "sharp";
import { Jimp } from "jimp";
import { ImageFilters, MergeParameters, CardDefinition, Image } from "./cardDefinition.js";
import { Color } from "../utils/utils.js";

const PATH = './src/assets/cards/icons/'

export default class Cost implements Image {
    color: Color
    cost: number
    filter: ImageFilters
    width = 180
    length = 180
    buffer?: Buffer;
    merge: MergeParameters = {
        x: -25,
        y: -25
    }

    constructor({color, cost, filter}: CardDefinition) {
        this.color = color
        this.cost = cost ?? 0
        this.filter = filter
    }

    create = async () => {
        const base = await sharp(`${PATH}${this.cost}.png`)
        .modulate({
            brightness: .75
        })
        .resize(this.width, this.length, {
            fit: 'contain'
        })
        .toBuffer()
    
        const cost = await Jimp.read(base)
        this.buffer = await cost
            .rotate(4)
            .sepia()
            .color([
                {
                    apply: 'hue',
                    params: [this.filter.hue]
                },
                {
                    apply: "saturate",
                    params: [this.filter.saturate] 
                },
                {
                    apply: "darken",
                    params: [this.filter.darken]
                }
            ])
            .getBuffer("image/png")
    }
}