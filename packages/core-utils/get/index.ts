/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
const getPropByString = <T = any>(obj: T, propString: string) => {
  if (!propString) return obj;

  let prop;
  const props = propString.split(".");
  const iLen = props.length - 1;
  let i = 0;

  for (i = 0; i < iLen; i++) {
    prop = props[i];
    //@ts-ignore
    const candidate = obj[prop];

    if (candidate !== undefined) {
      obj = candidate;
    } else {
      break;
    }
  }

  //@ts-ignore
  return obj[props[i]];
};

export default getPropByString;
