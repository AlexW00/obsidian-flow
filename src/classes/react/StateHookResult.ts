export type MutableHookResult<T> = [Result<T>, Setter<T>];

export type Result<T> = T;

export type Setter<T> = (value: T) => void;
