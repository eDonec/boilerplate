/**
 * Generate OTP from allowed word
 */

import {
  DEFAULT_LENGTH,
  DEFAULT_OPTIONS,
  DIGITS,
  LOWER_CASE_ALPHABETS,
  SPECIAL_CHARACTERS,
  UPPER_CASE_ALPHABETS,
} from "./constants";

/**
 * Generates a one-time password (OTP) of a specified length.
 *
 * @param {number} [length=6] The length of the generated OTP.
 * @param {Object} [options={}] An object that specifies which characters can be included in the generated OTP.
 * @param {boolean} [options.digits=true] Specifies whether to include digits (0-9) in the generated OTP.
 * @param {boolean} [options.lowerCaseAlphabets=false] Specifies whether to include lowercase alphabets (a-z) in the generated OTP.
 * @param {boolean} [options.upperCaseAlphabets=false] Specifies whether to include uppercase alphabets (A-Z) in the generated OTP.
 * @param {boolean} [options.specialChars=false] Specifies whether to include special characters (!@#$%^&*) in the generated OTP.
 * @param {string} [options.characterExtensions=""] Specifies additional characters to be included in the generated OTP.
 * @returns {string} The generated OTP.
 * @example
 * OTPGenerator(6, { digits: true, lowerCaseAlphabets: true, upperCaseAlphabets: true, specialChars: true, characterExtensions: "!@#$%^&*" });
 * // => "1a2B!@#"
 */

const OTPGenerator = (
  length = DEFAULT_LENGTH,
  options: typeof DEFAULT_OPTIONS = DEFAULT_OPTIONS
) => {
  const {
    digits,
    lowerCaseAlphabets,
    upperCaseAlphabets,
    specialChars,
    characterExtensions,
  } = { ...DEFAULT_OPTIONS, ...(options || {}) };
  const allowedCharacters = `${digits ? DIGITS : ""}${
    lowerCaseAlphabets ? LOWER_CASE_ALPHABETS : ""
  }${upperCaseAlphabets ? UPPER_CASE_ALPHABETS : ""}${
    specialChars ? SPECIAL_CHARACTERS : ""
  }${characterExtensions}`;

  let OTP = "";

  while (OTP.length < length) {
    const randomInt = Math.floor(
      Math.random() * (allowedCharacters.length - 1)
    );

    OTP += allowedCharacters[randomInt];
  }

  return OTP;
};

export default OTPGenerator;
