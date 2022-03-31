export const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(() => resolve(), ms));

export type Maybe<T> = T | undefined;
export type UserToken = { idUser: number, token: string }

export function isDefined<T>(e: Maybe<T>): e is T
{
    return e !== undefined
}

export function isUndefined<T>(e: Maybe<T>): e is undefined
{
    return e === undefined
}