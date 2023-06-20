import get from "../get";

type Prev = [never, 0, 1, 2, 3, 4, 5, ...0[]];

type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}${"" extends P ? "" : "."}${P}`
    : never
  : never;
type KeyOfNestedObject<T, D extends number = 3> = [D] extends [never]
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

const hasOwnNestedProperty = <T>(obj: T, attributes: KeyOfNestedObject<T>) => {
  if (!attributes) return false;
  let objCopy: T | T[keyof T] = structuredClone(obj);

  // @ts-expect-error - we know that attributes is a string
  const properties: (keyof T)[] = (attributes as string).split(".");

  try {
    for (let i = 0; i < properties.length; i++) {
      const prop = properties[i];

      if (
        !objCopy ||
        typeof objCopy !== "object" ||
        !Object.hasOwn(objCopy, prop)
      ) {
        return false;
      }
      objCopy = obj[prop];
    }
  } catch (e) {
    return false;
  }

  return true;
};

const hasNestedAttributes = <T>(obj: T, attributes: KeyOfNestedObject<T>[]) => {
  if (typeof obj === "object" && obj !== null)
    return attributes.every(
      (attr) => hasOwnNestedProperty(obj, attr) && get(obj, attr) !== undefined
    );

  return false;
};

export default hasNestedAttributes;
