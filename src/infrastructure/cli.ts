#!/usr/bin/env node

import { program } from 'commander'
import { ErrorMessage } from '../domain/utils/errorHandler.js'
import { cardInputSchema, userInputSchema } from '../domain/userInput.js'
import { createCard } from '../application/card.js'
import { writeFile } from 'node:fs/promises'
import { readFileSync } from 'node:fs'
import chalk from 'chalk'

const generate = async (option: Record<string, string | undefined>) => {
    const { data, error } = userInputSchema
        .pipe(cardInputSchema)
        .safeParse(option)

    if (error) {
        console.table(error.issues)
        throw new ErrorMessage({
            tag: 'parser',
            message: 'The input provided is invalid, please review the table above!',
        })
    }

    const renderedCard = await createCard(data)

    await writeFile('output.png', renderedCard)

    console.log(chalk.greenBright('Card has been created!'))
}

const { version } = JSON.parse(readFileSync(new URL('../../package.json', import.meta.url), 'utf8'),) as { version: string }

program
    .name('lor-card')
    .description('CLI to generate a Card that looks like from Library of Ruina')
    .version(version)
    .option('-a, --attacks <char>')
    .option('-c, --cost <char>')
    .option('-i, --image <char>')
    .option('-n, --name <char>')
    .option('-r, --range <char>')
    .option('-t, --type <char>')
    .action(generate)
    .parseAsync()
    .catch((error) => {
        console.error(chalk.redBright(error instanceof Error ? error.message : String(error)))

        if (error?.cause instanceof Error)
            console.error(chalk.gray(error.cause.message))
        
        process.exitCode = 1
    })