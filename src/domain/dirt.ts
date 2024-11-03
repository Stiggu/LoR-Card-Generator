import sharp from "sharp";
import { Image, MergeParameters } from "./cardDefinition.js";

const DIRT = './src/assets/cards/card_image_borders.png'

export default class Dirt implements Image {
    buffer?: Buffer;
    merge: MergeParameters = {
        x: 20,
        y: 145
    }

    constructor() {
    }

    create = async () => {
        this.buffer = await sharp(DIRT)
        .resize(420, 430)
        .modulate({
            // lightness: 1000
        })
        .toBuffer()
    }
}