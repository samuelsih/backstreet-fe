import { FileSchema, LinkSchema } from "./schema"
import type { FileError, LinkError } from "./validation"

export const validateLinkClient = (body: object): LinkError => {
    const parsedInput = LinkSchema.safeParse(body)
    if(!parsedInput.success) {        
        const { alias, redirect_to } = parsedInput.error.flatten().fieldErrors

        return {
            hasError: true,
            alias: alias !== undefined ? alias[0] : "",
            redirect_to: redirect_to !== undefined ? redirect_to[0] : "",
        }
    }

    return {
        hasError: false,
        alias: "",
        redirect_to: "",
    }
}

export const validateFileClient = (body: object): FileError => {
    const parsedInput = FileSchema.safeParse(body)
    if(!parsedInput.success) {        
        const { alias, file } = parsedInput.error.flatten().fieldErrors

        return {
            hasError: true,
            alias: alias !== undefined ? alias[0] : "",
            file: file !== undefined ? file[0] : "",
        }
    }

    return {
        hasError: false,
        alias: "",
        file: "",
    }
}