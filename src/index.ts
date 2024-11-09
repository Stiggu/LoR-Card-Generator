import { program } from "commander";
import { buildCardDefinition } from "./domain/cardDefinition.js";
import { CardEditor } from "./domain/cardEditor.js";

program
    .option('--cost <char>')
    .option('--name <char>')
    .option('--type <char>')
    .option('--image <char>')

program.parse()

const definition = buildCardDefinition(program.opts())
const cardEditor = new CardEditor(definition)

cardEditor.load()

await cardEditor.card.create()
await cardEditor.card.save()
