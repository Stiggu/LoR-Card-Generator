#!/usr/bin/env node

import { program } from "commander";
import { buildCardDefinition } from "./domain/cardDefinition.js";
import { CardEditor } from "./domain/cardEditor.js";

program
    .name('lor-card')
    .description('CLI to generate a Card that looks like from Library of Ruina')
    .version('0.0.1')
    .option('-c, --cost <char>')
    .option('-n, --name <char>')
    .option('-t, --type <char>')
    .option('-i, --image <char>')
    .option('-a, --attacks <char>')
    .action(async (options) => {
        await generate(options)
    })

const generate = async (option: Record<string, string|undefined>) => {
    const definition = buildCardDefinition(option)
    const cardEditor = new CardEditor(definition)
    
    cardEditor.load()
    
    await cardEditor.card.create()
    await cardEditor.card.save()
}

program.parse()