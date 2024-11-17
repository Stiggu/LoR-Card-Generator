import { Jimp, loadFont, measureText, ResizeStrategy } from 'jimp'
import { DEFAULT_FONT } from '../domain/utils/paths.js'
import { MergeParameters } from '../domain/mergeParameters.js'
import { CardDefinition } from '../domain/cardDefinition.js'
import { CardImage } from '../domain/cardImage.js'

export default class Name implements CardImage {
    buffer?: Buffer
    merge: MergeParameters = {
        x: -50,
        y: 95,
    }
    title: string

    constructor({ name: title }: CardDefinition) {
        this.title = title ?? 'Placeholder'
    }

    create = async () => {
        const text = new Jimp({
            width: 500,
            height: 50,
            // color: "red"
        })
        const font = await loadFont(DEFAULT_FONT)
        const getTextPosition = () => {
            return text.bitmap.width / 2 - measureText(font, this.title) / 2
        }

        this.buffer = await text
            .print({
                text: this.title,
                font: font,
                x: getTextPosition(),
                y: 0,
            })
            .rotate({
                deg: 12,
                mode: ResizeStrategy.NEAREST_NEIGHBOR,
            })
            .getBuffer('image/png')
    }
}
