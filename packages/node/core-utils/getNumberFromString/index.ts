export default (input?: string | null, min = 1): number => {
  const number = Number(input);

  if (Number.isNaN(number)) {
    return min;
  }

  return Math.max(number, min);
};
