import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const ATTACK = resolve(__dirname, '../../../assets/icons/')
export const BASE_CARD_IMAGE = resolve(__dirname, "../../../assets/cards/card.png")
export const MASK = resolve(__dirname, '../../../assets/cards/testclip.png')
export const ATTACK_TYPE = resolve(__dirname, '../../../assets/cards/types/')
export const PATH = resolve(__dirname, '../../../assets/cards/icons/')
export const DIRT = resolve(__dirname, '../../../assets/cards/card_image_borders.png')
export const CARD_OVERLAY = resolve(__dirname, '../../../assets/cards/card_overlay.png')
export const DEFAULT_IMAGE = resolve(__dirname, '../../../assets/ryoshu.jpg')
export const DEFAULT_FONT = resolve(__dirname, '../../../assets/fonts/converted/test.fnt')
