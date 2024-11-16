import { BlendMode, Jimp } from "jimp"
import { CARD_OVERLAY } from "../domain/utils/paths.js"
import { CardDefinition } from "../domain/cardDefinition.js"
import { Color } from "../domain/color.js"
import { CardImage } from "../domain/cardImage.js"


export class Overlay implements CardImage {
    color: Color
    buffer?: Buffer
    merge = {
        x: 0,
        y: 0,
        blend: {
            mode: BlendMode.ADD,
            opacitySource: .35
        }
    }

    constructor({color}: CardDefinition) {
        this.color = color
    }

    create = async () => {
        const overlay = await Jimp.read(CARD_OVERLAY)
        this.buffer = await overlay.color([
                { apply: 'mix', params: [this.color, 100] }
            ])
            .getBuffer("image/png")
    }
}