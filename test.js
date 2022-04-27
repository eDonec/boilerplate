const getSquare = (input) => Math.pow(input, 2);

// const ouput =  {
//   attribute: [{ test: { object: [1, 4], attribute2: 4 } }, 4, 16],
//   object: {
//     nestedAttribute: [1,4],
//   },
//   test : 9
// };

const data = {
  attribute: [{ test: { object: [1, 2], attribute2: 2 } }, 2, 4],
  object: {
    nestedAttribute: [1, 2],
  },
  test: 3,
};
const generateValidator = (input) => {
  const ouput = {};
  if (typeof input === "number") {
    const newValue = getSquare(input);
    return newValue;
  }
  if (input instanceof Array) {
    return input.map((el) => generateValidator(el));
  }

  Object.entries(input).forEach(([key, value]) => {
    ouput[key] = generateValidator(value);
  });

  return ouput;
};

console.log(generateValidator(data).attribute[0].test);
