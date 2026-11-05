import { Jimp } from 'jimp'
import { CardImage } from '../domain/cardImage.js'

export class Card implements CardImage {
    images: CardImage[] = []
    buffer?: Buffer

    add = (image: CardImage) => {
        this.images.push(image)
    }

    create = async () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let base: any

        for (const image of this.images) {
            await image.create()

            if (!image.buffer) {
                continue
            }

            if (!base) {
                base = await Jimp.read(image.buffer)
                continue
            }

            const current = await Jimp.read(image.buffer)
            const { x, y, blend } = image.merge ?? {}
            base.composite(current, x, y, blend)
        }

        this.buffer = await base?.getBuffer('image/png')
    }
}
