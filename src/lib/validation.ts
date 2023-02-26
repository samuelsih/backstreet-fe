import { FileSchema, LinkSchema } from "./schema";

export type LinkError = {
    hasError: boolean;
    alias: string;
    redirect_to: string;
}

export type FileError = {
    hasError: boolean;
    alias: string;
    file: string;
}

export const validateLinkInput = (input: FormData): LinkError => {
    const body = Object.fromEntries(input)
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
};

export const validateFileInput = (input: FormData): FileError => {
    const body = Object.fromEntries(input)
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
};

