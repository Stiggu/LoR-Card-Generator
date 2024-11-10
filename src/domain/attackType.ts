import sharp from "sharp";
import { Jimp } from "jimp";
import { CardDefinition, CardType, Image, ImageFilters, MergeParameters } from "./cardDefinition.js";
import { Color } from "../utils/utils.js";
import { ATTACK_TYPE } from "../utils/paths.js";


export default class AttackType implements Image {
    color: Color
    filter: ImageFilters
    width = 130
    length = 130
    buffer?: Buffer;
    attack: CardType
    merge: MergeParameters = {
        x: 355,
        y: 0
    }

    constructor({color, filter, attack}: CardDefinition) {
        this.color = color
        this.filter = filter
        this.attack = attack ?? "melee"
    }

    create = async () => {
        const base = await sharp(`${ATTACK_TYPE}/${this.attack}.png`)
            .modulate({
                brightness: .9
            })
            .resize(120, 120, {
                fit: 'contain'
            })
            .toBuffer()

        const type = await Jimp.read(base)
        type
            .sepia()
            .color([
                {
                    apply: 'hue',
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

        if(this.attack === "mass") {
            type.rotate(-9)
        }

        this.buffer = await type.getBuffer("image/png")
    }
}