import sharp from "sharp";
import { Image, MergeParameters } from "./cardDefinition.js";
import { DIRT } from "../utils/paths.js";


export default class Details implements Image {
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