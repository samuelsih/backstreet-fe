import { variables } from "../lib/variables";

/**
 * @param {string} alias
 * @param {string} redirectTo
 */
export async function fetchLinkRequest(alias, redirectTo) {
    const request = {
        alias: alias,
        redirect_to: redirectTo,
        type: "LINK"
    }

    const url = `${variables.CREATE_LINK}`

    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
    }

    const result = await fetch(url, options)
    
    return result.json()
}

/**
 * @param {string} alias
 * @param {any} fileToUpload
 */
export async function fetchFileRequest(alias, fileToUpload) {
    const url = `${variables.CREATE_FILE}`

    const jsonField = {
        alias: alias,
        type: "FILE"
    }

    const formData = new FormData()

    formData.append("json_field", JSON.stringify(jsonField))
    formData.append("file_field", fileToUpload.files[0])

    const result = await fetch(url, {
        method: "POST",
        body: formData,
    })

    return result.json()
}