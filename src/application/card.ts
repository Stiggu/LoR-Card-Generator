import { CardInput, cardInputSchema } from "../domain/userInput.js";
import { CardEditor } from "../infrastructure/cardEditor.js";
import { Filters } from "../domain/filter.js";
import { Colors } from "../domain/color.js";

export const createCard = async (input: CardInput) => {
    const { attacks, cost, name, range, type, image } = cardInputSchema.parse(input)
    const cardDefinition = {
        color: Colors[type],
        filter: Filters[type],
        image,
        name,
        cost: cost,
        attack: range,
        attacks: attacks,
    }
    
    const editor = new CardEditor(cardDefinition)
    editor.load()

    await editor.card.create()

    if(!editor.card.buffer)
        throw new Error('Card couldn\'t be rendered!')

    return editor.card.buffer
}