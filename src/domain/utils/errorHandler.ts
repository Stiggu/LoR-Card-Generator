type ErrorParameters = {
    tag: string
    message: string
    cause?: Error
}

export class ErrorMessage extends Error {
    constructor({ tag, message, cause }: ErrorParameters) {
        super(`[${tag.toUpperCase()}] ${message}`, { cause })
    }
}
