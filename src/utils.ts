export type Maybe<T> = T | undefined;

export function isDefined<T>(e: Maybe<T>): e is T
{
    return e !== undefined
}

export function isUndefined<T>(e: Maybe<T>): e is undefined
{
    return e === undefined
}