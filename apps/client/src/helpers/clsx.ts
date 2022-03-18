/** Merge classes with tailwind-merge with clsx full feature */

export type ClassValue =
  | ClassArray
  | ClassDictionary
  | string
  | number
  | null
  | boolean
  | undefined;

export interface ClassDictionary {
  [id: string]: unknown;
}

type ClassArray = Array<ClassValue>;

type TClsx = (...classes: ClassValue[]) => string;

function toVal(mix: ClassValue) {
  let k,
    y,
    str = '';

  if (typeof mix === 'string' || typeof mix === 'number') {
    str += mix;
  } else if (typeof mix === 'object') {
    if (Array.isArray(mix)) {
      for (k = 0; k < mix.length; k++) {
        if (mix[k]) {
          if ((y = toVal(mix[k]))) {
            str && (str += ' ');
            str += y;
          }
        }
      }
    } else {
      for (k in mix) {
        if (mix?.[k]) {
          str && (str += ' ');
          str += k;
        }
      }
    }
  }

  return str;
}

const clsx: TClsx = (...args) => {
  let i = 0,
    tmp,
    x,
    str = '';

  while (i < args.length) {
    if ((tmp = args[i++])) {
      if ((x = toVal(tmp))) {
        str && (str += ' ');
        str += x;
      }
    }
  }

  return str;
};

export default clsx;
