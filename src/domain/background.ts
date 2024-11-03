import { CardDefinition, Image, ImageFilters } from "./cardDefinition.js";
import sharp from "sharp"
import { Jimp } from "jimp"

const BASE_CARD_IMAGE = './src/assets/cards/card.png'

export class Background implements Image {
    filter: ImageFilters
    buffer?: Buffer

    constructor({filter}: CardDefinition) {
        this.filter = filter
    }

    create = async () => {
        const buffer = await sharp(BASE_CARD_IMAGE)
        .modulate({
            saturation: 1,
            brightness: .65,
        })
        .toBuffer()

        const base = await Jimp.read(buffer)
        base
            .sepia()
            .color([
                {
                    apply: "hue",
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

        this.buffer = await base.getBuffer("image/png")
    }
}