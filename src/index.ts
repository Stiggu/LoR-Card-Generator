import { CardDefinition } from "./domain/cardDefinition.js";
import { CardEditor } from "./domain/cardEditor.js";
import { Colors, red } from "./utils/utils.js";

// Example card for now, will be replaced with CLI inputs!
const definition: CardDefinition = {
    color: Colors.RYOSHU,
    filter: red,
    image: "./src/assets/ryoshu.jpg",
    name: "S.T.A.B",
    cost: 1,
    attacks: [
        {
            name: "slash"
        }
    ]
}
const cardEditor = new CardEditor(definition)

cardEditor.load()

await cardEditor.card.create()
await cardEditor.card.save()