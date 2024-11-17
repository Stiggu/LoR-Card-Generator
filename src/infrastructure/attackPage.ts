import sharp from 'sharp'
import { MASK } from '../domain/utils/paths.js'
import { ErrorMessage } from '../domain/utils/errorHandler.js'
import { CardImage } from '../domain/cardImage.js'
import { MergeParameters } from '../domain/mergeParameters.js'
import { CardDefinition } from '../domain/cardDefinition.js'

export class AttackPage implements CardImage {
    image: string
    buffer?: Buffer
    merge: MergeParameters = {
        x: 20,
        y: 190,
    }

    constructor({ image }: CardDefinition) {
        this.image = image
    }

    create = async () => {
        const maskBuffer = sharp(MASK).resize(420, 350)

        let source: Buffer

        try {
            source = await sharp(this.image).png().resize(420, 350).toBuffer()
        } catch (e) {
            console.error(e)
            throw new ErrorMessage(
                'attack page',
                'Cannot find the image provided!',
            )
        }

        this.buffer = await sharp(source)
            .png()
            .composite([
                {
                    input: await maskBuffer.toBuffer(),
                    blend: 'dest-in',
                },
            ])
            .toBuffer()
    }
}
