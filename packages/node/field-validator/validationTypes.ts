export type Primitives = boolean | string | number | Date | undefined;

export type NestedObject = { [key: string]: Primitives | NestedObject };
