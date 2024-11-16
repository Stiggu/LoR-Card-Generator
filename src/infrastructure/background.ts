import sharp from "sharp"
import { Jimp } from "jimp"
import { BASE_CARD_IMAGE } from "../domain/utils/paths.js";
import { CardImage } from "../domain/cardImage.js";
import { Filter } from "../domain/filter.js";
import { CardDefinition } from "../domain/cardDefinition.js";

export class Background implements CardImage {
    filter: Filter
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