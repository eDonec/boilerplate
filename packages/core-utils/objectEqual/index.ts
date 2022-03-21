const objectEqual = (a: unknown, b: unknown) =>
  JSON.stringify(a) === JSON.stringify(b);

export default objectEqual;
