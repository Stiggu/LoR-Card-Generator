import chalk from "chalk"

export class ErrorMessage extends Error {
    constructor(tag: string, message: string) {
        super(chalk.redBright(`[${tag.toUpperCase()}] ${message}`))

        this.name = ""
        this.stack = undefined
    }
}