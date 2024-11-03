import sharp from "sharp";
import { CardDefinition, Image, MergeParameters } from "./cardDefinition.js";

const MASK = './src/assets/cards/testclip.png'

export class AttackPage implements Image {
    image: string
    buffer?: Buffer;
    merge: MergeParameters = {
        x: 20,
        y: 190
    }

    constructor({image}: CardDefinition) {
        this.image = image
    }

    create = async () => {
        const maskBuffer = sharp(MASK)
            .resize(420,350)
    
        const source = await sharp(this.image)
            .png()
            .resize(420,350)
            .toBuffer()
    
        this.buffer = await sharp(source)
            .png()
            .composite([{
                input: await maskBuffer.toBuffer(), 
                blend: "dest-in",
            }])
            .toBuffer()
    }
}