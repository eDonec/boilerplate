export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

export type RequireOnlyOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> &
      Partial<Record<Exclude<Keys, K>, undefined>>;
  }[Keys];

type Prev = [never, 0, 1, 2, 3, 4, 5, ...0[]];

type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}${"" extends P ? "" : "."}${P}`
    : never
  : never;

export type KeyOfNestedObject<T, D extends number = 3> = [D] extends [never]
  ? never
  : T extends object
  ? {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [K in keyof T]: T[K] extends Array<any>
        ? K extends string
          ? `${K}`
          : ""
        : Join<K, KeyOfNestedObject<T[K], Prev[D]>>;
    }[keyof T]
  : "";

export type KeyOfNestedObjectWithoutArray<T, D extends number = 3> = [
  D
] extends [never]
  ? never
  : T extends object
  ? {
      [K in keyof T]: Join<K, KeyOfNestedObject<T[K], Prev[D]>>;
    }[keyof T]
  : "";
export type NestedObjectPaths<T, D extends number = 5> = [D] extends [never]
  ? never
  : T extends object
  ? {
      [K in keyof T]-?: K extends string | number
        ? `${K}` | Join<K, NestedObjectPaths<T[K], Prev[D]>>
        : never;
    }[keyof T]
  : "";
