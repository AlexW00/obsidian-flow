export type MutableHookResult<T> = [T, Setter<T>];

export type Setter<T> = (value: T) => void;
