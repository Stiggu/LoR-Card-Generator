import sharp from "sharp";
import { DIRT } from "../domain/utils/paths.js";
import { CardImage } from "../domain/cardImage.js";
import { MergeParameters } from "../domain/mergeParameters.js";

export default class Details implements CardImage {
    buffer?: Buffer;
    merge: MergeParameters = {
        x: 20,
        y: 145
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