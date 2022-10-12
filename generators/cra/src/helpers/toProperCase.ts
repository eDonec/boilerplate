export const toPropperCase = ([first, ...rest]: string) =>
  first.toUpperCase() + rest.join("");
