#!/usr/bin/env node

import { program } from "commander";
import { buildCardDefinition } from "./domain/cardDefinition.js";
import { CardEditor } from "./domain/cardEditor.js";

const generate = async (option: Record<string, string|undefined>) => {
    const definition = buildCardDefinition(option)
    const cardEditor = new CardEditor(definition)
    
    cardEditor.load()
    
    await cardEditor.card.create()
    await cardEditor.card.save()
}

program
    .name('lor-card')
    .description('CLI to generate a Card that looks like from Library of Ruina')
    .version('0.0.1')
    .option('-a, --attacks <char>')
    .option('-c, --cost <char>')
    .option('-i, --image <char>')
    .option('-n, --name <char>')
    .option('-r, --range <char>')
    .option('-t, --type <char>')
    .action(generate)
    .parse()