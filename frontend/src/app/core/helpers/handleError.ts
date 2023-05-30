export interface Error {
    message?: string
    data?: any
    status?: number
}

export function handleHttpError({ message, data, status }: Error) {
    return { message, data, status };
}