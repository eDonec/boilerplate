export const DIGITS = "0123456789";
export const LOWER_CASE_ALPHABETS = "abcdefghijklmnopqrstuvwxyz";
export const UPPER_CASE_ALPHABETS = LOWER_CASE_ALPHABETS.toUpperCase();
export const SPECIAL_CHARACTERS = "#!&@";
export const DEFAULT_OPTIONS: {
  digits?: boolean;
  lowerCaseAlphabets?: boolean;
  upperCaseAlphabets?: boolean;
  specialChars?: boolean;
  characterExtensions?: string;
} = {
  digits: true,
  lowerCaseAlphabets: false,
  upperCaseAlphabets: false,
  specialChars: false,
  characterExtensions: "",
};
export const DEFAULT_LENGTH = 6;
